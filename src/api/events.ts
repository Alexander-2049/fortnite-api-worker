import { EventsResponse } from '../types/EventsResponse';
import { EventTypeCut, EventsResponseCut } from '../types/EventsResponseCut';
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
        
        const currentSeason = await seasonsCurrent(env, Languages.ENGLISH);
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

export async function eventsActiveCut(env: Env, lang: Languages = Languages.ENGLISH, region: Regions = Regions.ALL): Promise<EventsResponseCut | Error> {
    try {
        const activeEvents = await eventsActive(env, lang, region);
        if(activeEvents instanceof Error) throw new Error(activeEvents.message);

        const eventsCut: EventTypeCut[] = activeEvents.events.map(e => {
            return {
                id: e.id,
                region: e.region,
                name_line1: e.name_line1,
                name_line2: e.name_line2,
                poster: e.poster,
                schedule: e.schedule,
                beginTime: e.beginTime,
                endTime: e.endTime,
                platforms: e.platforms,
                // renderData: e.renderData,
                windows: e.windows
            }
        })

        return {
            ...activeEvents,
            events: eventsCut
        };
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
