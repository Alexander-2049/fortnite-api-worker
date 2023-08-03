import { IRequest } from "itty-router";
import { ExtraData } from "../worker";
import getLanguageFromString from "../utils/getLanguageFromString";
import { headers } from ".";
import { loot } from "../api/loot";

export async function routeLoot(data: IRequest, extra: ExtraData) {
    const {env} = extra;

    const language = getLanguageFromString(data.query.lang);
    
    const result = await loot(env, language);

    return new Response(
        JSON.stringify({
            ...result
        }), { headers: headers }
    );
}