import { Regions } from "./Regions"

export type OtherRegions = {
    id: string,
    region: Regions,
    closestSession: ClosestSession | null
}

export type ClosestSession = {
    windowId: string,
    beginTime: string,
    endTime: string
}