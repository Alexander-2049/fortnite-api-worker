import { Window } from "../types/EventsResponse";
import { ClosestSession } from "../types/OtherRegions";

export function getClosestSession(windows: Window[]): ClosestSession | null {
    let result = null;
    if(windows.length < 1) return result;

    windows = windows.sort(function(a,b){
        return new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime();
    });

    if(windows.length === 0) return null;
    result = windows[0];

    for(let i = 0; i < windows.length; i++) {
        let session = windows[i];
        if(new Date(session.endTime) < new Date()) {
            if(windows[i + 1] !== undefined) result = windows[i + 1];
            else return result;
        }
    }

    return result;
}