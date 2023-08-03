import { IRequest } from "itty-router";
import { ExtraData } from "../worker";
import { seasons, seasonsCurrent } from "../api/seasons";
import getLanguageFromString from "../utils/getLanguageFromString";
import { headers } from ".";

export async function routeSeasons(data: IRequest, extra: ExtraData) {
    const {env} = extra;

    const language = getLanguageFromString(data.query.lang);
    
    const result = await seasons(env, language);

    return new Response(
        JSON.stringify({
            ...result
        }), { headers: headers }
    );
}

export async function routeSeasonsCurrent(data: IRequest, extra: ExtraData) {
    const {env} = extra;

    const language = getLanguageFromString(data.query.lang);
    
    const result = await seasonsCurrent(env, language);

    return new Response(
        JSON.stringify({
            ...result
        }), { headers: headers }
    );
}