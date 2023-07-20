import { Languages } from '../types/Languages';
import { Regions } from '../types/Regions';

export default async function events(lang: Languages = 'en', region: Regions = 'EU', env: Env) {
    try {
        const url = `https://fortniteapi.io/v1/events/list?lang=${lang}&region=${region}`;
        const response = await fetch(url, { method: "GET", headers: { Authorization: env.API_TOKEN }, });
        return response.json();
    } catch (error) {
        console.log(error)
    }
}