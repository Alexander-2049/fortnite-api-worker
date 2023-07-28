import { Regions } from "./Regions"

export type WindowResponse = {
    result: boolean,
    page: number,
    totalPages: number,
    session: Session
}

type Session = {
    eventId: string,
    eventDisplayId: string,
    region: Regions,
    windowId: string,
    beginTime: string,
    endTime: string,
    matchCap: number,
    finished: boolean,
    useIndividualScores: boolean,
    rules: Rules
}

type Rules = {
    scoring: Scoring[],
    tie: Tie[],
    payout: Payout[],
    results: [] /* TODO */
}

type Payout = {
    scoreId: number | null | string,
    scoringType: string,
    ranks: Ranks[]
}

type Ranks = {
    threshold: number,
    payouts: Payouts[]
}

type Payouts = {
    rewardType: string,
    rewardMode: string,
    value: string,
    quantity: number
}

type Scoring = {
    trackedStat: string,
    matchRule: string,
    rewardTiers: []
}

type Tie = {
    basePointsBits: number,
    components: Components[]
}

type Components = {
    trackedStat: string,
    bits: number,
    multiplier: number | null,
    aggregation: string
}