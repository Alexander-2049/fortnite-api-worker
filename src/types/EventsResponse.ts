import { Languages } from "./Languages"
import { Regions } from "./Regions"

export type EventsResponse = {
    result: boolean,
    region: Regions,
    lang: Languages,
    season: null | string | number,
    events: Event[]
}

type Event = {
    id: string,
    display_id: string,
    region: Regions,
    detectionDate: string,
    name_line1: string,
    name_line2: string,
    poster: string,
    posterBack: string,
    loadingScreen: string,
    tileImage: string,
    short_description: string,
    long_description: string,
    schedule: string,
    beginTime: string,
    endTime: string,
    cumulative: boolean,
    platforms: string[],
    renderData: RenderData,
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

type Window = {
    windowId: string,
    beginTime: string,
    endTime: string,
}