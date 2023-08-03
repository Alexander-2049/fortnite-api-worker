import { Languages } from "../types/Languages";
import { LootResponse } from "../types/LootResponse";

export async function loot(env: Env, lang: Languages = Languages.ENGLISH): Promise<LootResponse | Error> {
    try {
        const url = `https://fortniteapi.io/v1/loot/list?lang=${lang}`;
        const response = await fetch(url, { method: "GET", headers: { Authorization: env.API_TOKEN }, cf: { cacheEverything: true } });
        return response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
          return error;
        } else return new Error('something went wrong');
    }
}