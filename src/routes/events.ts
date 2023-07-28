import { IRequest, Router } from 'itty-router';
import { ExtraData } from '../worker';
import { events, eventsActive, eventsGet, eventsWindow } from '../api/events';
import { headers } from '.';
import getRegionFromString from '../utils/getRegionFromString';
import getLanguageFromString from '../utils/getLanguageFromString';
import getWindowIdFromQuery from '../utils/getWindowIdFromQuery';
import getPageFromQuery from '../utils/getPageFromQuery';
import getEventIdFromQuery from '../utils/getEventIdFromQuery';

export async function routeEventsAll(data: IRequest, extra: ExtraData) {
    const {env} = extra;

    const region = getRegionFromString(data.query.region);
    const language = getLanguageFromString(data.query.lang);
    
    const result = await events(env, language, region);

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
    
    const result = await eventsActive(env, language, region);

    return new Response(
        JSON.stringify({
            ...result
        }), { headers: headers }
    );
}

export async function routeEventsGet(data: IRequest, extra: ExtraData) {
    const {env} = extra;

    const eventId = getEventIdFromQuery(data.query.eventId);
    const windowId = getWindowIdFromQuery(data.query.windowId);
    const page = getPageFromQuery(data.query.page);
    
    const result = await eventsGet(env, eventId, windowId, page);

    return new Response(
        JSON.stringify({
            ...result
        }), { headers: headers }
    );
}

export async function routeEventsWindow(data: IRequest, extra: ExtraData) {
    const {env} = extra;

    const windowId = getWindowIdFromQuery(data.query.windowId);
    const page = getPageFromQuery(data.query.page);
    
    const result = await eventsWindow(env, windowId, page);

    return new Response(
        JSON.stringify({
            ...result
        }), { headers: headers }
    );
}