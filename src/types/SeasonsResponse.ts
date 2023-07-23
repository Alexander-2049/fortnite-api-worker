import { Languages } from "./Languages"

export type SeasonsResponse = {
    result: boolean,
    lang: Languages,
    seasons: Season[],
}

export type Season = {
    season: number,
    chapter: number,
    seasonInChapter: number,
    displayName: string,
    startDate: string,
    endDate: string,
    patchList: Patch[],
}

type Patch = {
    version: string,
    date: string
}