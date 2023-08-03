import { Languages } from "../types/Languages";
import { Season, SeasonsResponse } from "../types/SeasonsResponse";

export async function seasons(env: Env, lang: Languages = Languages.ENGLISH): Promise<SeasonsResponse | Error> {
  try {
      const url = `https://fortniteapi.io/v1/seasons/list?lang=${lang}`;
      const response = await fetch(url, { method: "GET", headers: { Authorization: env.API_TOKEN }, cf: { cacheEverything: true } });
      const data: SeasonsResponse = await response.json();
      
      return data;
  } catch (error: unknown) {
      if (error instanceof Error) {
        return error;
      } else return new Error('something went wrong');
  }
}

export async function seasonsCurrent(env: Env, lang: Languages = Languages.ENGLISH): Promise<Season | Error> {
    try {
        const response = await seasons(env, lang);
        if(response instanceof Error) throw new Error('something went wrong');
        const data = response.seasons.filter(e => {
            if(new Date(e.startDate) < new Date() && new Date() < new Date(e.endDate)) return e;
        })
        const data1 = data[0];
        const data2 = {
            result: true,
            lang,
            ...data1
        }
        return data2;
    } catch (error: unknown) {
        if (error instanceof Error) {
          return error;
        } else return new Error('something went wrong');
    }
}

// async function getFortniteSeasonCurrent(lang = 'en') {
//     if(!isLang(lang)) lang = global.defaultLanguage;

//     try {
//         data = await getFortniteSeasons(lang);
//         data = data.seasons.filter(e => {
//             if(new Date(e.startDate) < new Date() && new Date() < new Date(e.endDate)) return e;
//         })
//         data = data[0];
//         data = {
//             result: true,
//             lang,
//             ...data
//         }
//         cacheRarely.set(cacheName, data); 
//     } catch (error) {
//         throw new Error(error.message);
//     }
    
//     return data;
// }

// module.exports = getFortniteSeasonCurrent;

// // https://fortniteapi.io/v1/seasons/list?lang=en

// const { default: axios } = require("axios");
// const { cacheRarely } = require("../cache");
// const isLang = require("../utils/isLang");

// async function getFortniteSeasons(lang = 'en') {
//     if(!isLang(lang)) lang = global.defaultLanguage;

//     const cacheName = `seasons-${lang}`;
//     const cachedData = cacheRarely.get(cacheName);
//     if (cachedData) {
//       return cachedData;
//     }

//     try {
//       const response = await axios.get(`https://fortniteapi.io/v1/seasons/list?lang=${lang}`, {
//         headers: {
//           Authorization: process.env.API_KEY
//         }
//       });

//       if (response.status !== 200) {
//         throw new Error(`Fortnite API returned status code ${response.status}`);
//       }

//       const data = response.data;
//       cacheRarely.set(cacheName, data);
//       return data;
//     } catch (error) {
//       throw new Error(error);
//     }
// }

// module.exports = getFortniteSeasons;