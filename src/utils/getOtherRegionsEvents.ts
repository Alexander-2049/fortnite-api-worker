import { EventType, EventsResponse } from "../types/EventsResponse";
import { ClosestSession, OtherRegions } from "../types/OtherRegions";
import { getClosestSession } from "./getClosestSession";

export function getOtherRegionsEvents(event: EventType, data: EventsResponse) {
    const events = data.events.filter(e => event.displayId === e.displayId);
    const result: OtherRegions[] = [];

    for(let i = 0; i < events.length; i++) {
        const {id, region, windows} = events[i];
        const closestSession: ClosestSession | null = getClosestSession(windows);

        result.push({
            id,
            region,
            closestSession
        })
    }

    return result;
}