import { EventsResponse } from '../types/EventsResponse';
import { Languages } from '../types/Languages';
import { Regions } from '../types/Regions';
import { WindowResponse } from '../types/WindowResponse';
import { getOtherRegionsEvents } from '../utils/getOtherRegionsEvents';
import { seasonsCurrent } from './seasons';

export async function events(env: Env, lang: Languages = Languages.ENGLISH, region: Regions = Regions.ALL): Promise<EventsResponse | Error> {
    try {
        const url = `https://fortniteapi.io/v1/events/list?lang=${lang}&region=${region}`;
        const response = await fetch(url, { method: "GET", headers: { Authorization: env.API_TOKEN }, cf: { cacheEverything: true } });
        return response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
          return error;
        } else return new Error('something went wrong');
    }
}

export async function eventsActive(env: Env, lang: Languages = Languages.ENGLISH, region: Regions = Regions.ALL): Promise<EventsResponse | Error> {
    try {
        const url = `https://fortniteapi.io/v1/events/list?lang=${lang}&region=${region}`;
        const response = await fetch(url, { method: "GET", headers: { Authorization: env.API_TOKEN }, cf: { cacheEverything: true } });
        const data: EventsResponse = await response.json();
        
        const currentSeason = await seasonsCurrent(Languages.ENGLISH, env);
        if(currentSeason instanceof Error) throw new Error('something went wrong getting currentSeason');
        data.events = data.events.filter(e => {
            if(new Date(currentSeason.startDate) < new Date(e.beginTime) && new Date(e.beginTime) < new Date(currentSeason.endDate)) {
                return e
            };
        })

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
          return error;
        } else return new Error('something went wrong');
    }
}

export async function eventsWindow(env: Env, windowId: string, page = 0): Promise<WindowResponse | Error> {
    try {
        const url = `https://fortniteapi.io/v1/events/window?windowId=${windowId}&page=${page}`;
        const response = await fetch(url, { method: "GET", headers: { Authorization: env.API_TOKEN }, cf: { cacheEverything: true } });
        const data: WindowResponse = await response.json();

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
          return error;
        } else return new Error('something went wrong');
    }
}

export async function eventsGet(env: Env, eventId: string, windowId?: string, page = 0) {
    const dataEvents = await events(env, Languages.ENGLISH, Regions.ALL);

    if(dataEvents instanceof Error) {
        return dataEvents;
    }

    let dataWindow: WindowResponse | Error | null = null;
    if(!!windowId) {
        dataWindow = await eventsWindow(env, windowId, page);
        if(dataWindow instanceof Error) {
            dataWindow = null;
        }
    }

    const eventFiltered = dataEvents.events.filter(e => e.id === eventId);
    if(eventFiltered.length < 1) return new Error('Event does not exist');
    const event = eventFiltered[0];
    const otherRegions = getOtherRegionsEvents(event, dataEvents);

    return {result: true, ...event, otherRegions, dataWindow};
}





// const { cacheRarely } = require("../cache");
// const getFortniteEvents = require("./getFortniteEvents");
// const getFortniteEventWindow = require("./getFortniteEventWindow");
// const getClosestSession = require("../utils/getClosestSession");

// async function getFortniteEventWindowWithEvent(eventId, windowId, page = 0) {
//     let windowId1 = !windowId ? "none" : windowId;

//     if(!eventId) throw new Error("eventId is required");

//     const cacheName = `event-window-with-event-${eventId}-${windowId1}`;
//     const cachedData = cacheRarely.get(cacheName);
//     if (cachedData) {
//       return cachedData;
//     }

//     let data = await getFortniteEvents('en', 'ALL');

//     let evnt = data.events.filter(e => e.id === eventId);
//     if(evnt.length < 1) throw new Error('Event does not exist');
//     evnt = evnt[0];

//     const otherRegions = getAllRegions(evnt, data);

//     if(!!windowId) {
//         if(evnt.windows.filter(w => w.windowId === windowId).length < 1) {
//             throw new Error('Session does not exist');
//         }

//         let data1 = await getFortniteEventWindow(windowId, page);
//         evnt = {result: true, ...evnt, otherRegions, window: data1};
//     } else {
//         evnt = {result: true, ...evnt, otherRegions, window: null};
//     }

//     cacheRarely.set(cacheName, evnt);
//     return evnt;
// }

// module.exports = getFortniteEventWindowWithEvent;

// function getAllRegions(event, data) {
//     const events = data.events.filter(e => event.displayId === e.displayId);
//     const result = [];

//     for(let i = 0; i < events.length; i++) {
//         // console.log(result[i].id, result[i].region, result[i].windows);
//         const {id, region, windows} = events[i];
//         const closestSession = getClosestSession(windows);

//         result.push({
//             id,
//             region,
//             closestSession
//         })
//     }

//     return result;
// }