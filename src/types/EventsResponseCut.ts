import { Languages } from "./Languages"
import { Regions } from "./Regions"

export type EventsResponseCut = {
    result: boolean,
    region: Regions,
    lang: Languages,
    season: null | string | number,
    events: EventTypeCut[]
}

export type EventTypeCut = {
    id: string,
    region: Regions,
    name_line1: string,
    name_line2: string,
    poster: string,
    schedule: string,
    beginTime: string,
    endTime: string,
    platforms: string[],
    renderData?: RenderData,
    windows: Window[]
}

type RenderData = {
    background_text_color: string,
    poster_fade_color: string,
    secondary_color: string,
    title_color: string,
    background_right_color: string,
    highlight_color: string,
    primary_color: string,
    shadow_color: string,
    background_left_color: string,
    base_color: string,
}

export type Window = {
    windowId: string,
    beginTime: string,
    endTime: string,
}