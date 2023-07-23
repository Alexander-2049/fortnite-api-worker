import { IRequest, Router } from 'itty-router';
import { ExtraData } from '../worker';
import { events, eventsActive } from '../api/events';
import { headers } from '.';
import getRegionFromString from '../utils/getRegionFromString';
import getLanguageFromString from '../utils/getLanguageFromString';

export async function routeEventsAll(data: IRequest, extra: ExtraData) {
    const {env} = extra;

    const region = getRegionFromString(data.query.region);
    const language = getLanguageFromString(data.query.lang);
    
    const result = await events(language, region, env);

    return new Response(
        JSON.stringify({
            ...result
        }), { headers: headers }
    );
}

export async function routeEventsActive(data: IRequest, extra: ExtraData) {
    const {env} = extra;

    const region = getRegionFromString(data.query.region);
    const language = getLanguageFromString(data.query.lang);
    
    const result = await eventsActive(language, region, env);

    return new Response(
        JSON.stringify({
            ...result
        }), { headers: headers }
    );
}

// const getFortniteEventsActive = require("../../api/getFortniteEventsActive");
// const customError = require('../../utils/customError');

// const listActive = async (req, res) => {
//     let region = req.query.region || global.defaultRegion;
//     let lang = req.query.lang || global.defaultLanguage;

//     let result;
//     try {
//       result = await getFortniteEventsActive(lang, region); 
//     } catch (error) {
//       return res
//         .status(500)
//         .json(customError(error.message));
//     }
//     return res.json(result);
// }

// module.exports = listActive;