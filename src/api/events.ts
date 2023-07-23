import { EventsResponse } from '../types/EventsResponse';
import { Languages } from '../types/Languages';
import { Regions } from '../types/Regions';
import { seasonsCurrent } from './seasons';

export async function events(lang: Languages = Languages.ENGLISH, region: Regions = Regions.ALL, env: Env): Promise<EventsResponse | Error> {
    try {
        const url = `https://fortniteapi.io/v1/events/list?lang=${lang}&region=${region}`;
        const response = await fetch(url, { method: "GET", headers: { Authorization: env.API_TOKEN }, });
        return response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
          return error;
        } else return new Error('something went wrong');
    }
}

export async function eventsActive(lang: Languages = Languages.ENGLISH, region: Regions = Regions.ALL, env: Env): Promise<EventsResponse | Error> {
    try {
        const url = `https://fortniteapi.io/v1/events/list?lang=${lang}&region=${region}`;
        const response = await fetch(url, { method: "GET", headers: { Authorization: env.API_TOKEN }, });
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

// const { default: axios } = require("axios");
// const isRegion = require("../../../fortnite-tools-api-server/src/utils/isRegion");
// const { cacheRarely } = require("../cache");
// const isLang = require("../utils/isLang");
// const getFortniteEvents = require("./getFortniteEvents");
// const getFortniteSeasonCurrent = require("./getFortniteSeasonCurrent");

// async function getFortniteEventsActive(lang, region) {
//     if(!isRegion(region)) region = global.defaultRegion;
//     if(!isLang(lang)) lang = global.defaultLanguage;
    
//     const cacheName = `events-list-${lang}-${region}-active`;
//     const cachedData = cacheRarely.get(cacheName);
//     if (cachedData) {
//       return cachedData;
//     }

//     const currentSeason = await getFortniteSeasonCurrent('en');

//     let data = await getFortniteEvents(lang, region);
//     data = JSON.parse(JSON.stringify(data));
//     data.events = data.events.filter(e => {
//         if(new Date(currentSeason.startDate) < new Date(e.beginTime) && new Date(e.beginTime) < new Date(currentSeason.endDate)) {
//             return e
//         };
//     })
//     cacheRarely.set(cacheName, data);
//     return data;
// }

// module.exports = getFortniteEventsActive;