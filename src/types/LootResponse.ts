import { Languages } from "./Languages";

export interface LootResponse {
    result:  boolean;
    lang:    Languages;
    weapons: Weapon[];
}

export interface Weapon {
    id:           string;
    enabled:      boolean;
    name:         string;
    description:  null | string;
    rarity:       Rarity;
    type:         Type;
    gameplayTags: string[];
    searchTags:   string;
    images:       Images;
    mainStats:    MainStats;
}

export interface Images {
    icon:       null | string;
    background: null | string;
}

export interface MainStats {
    DmgPB:               number;
    FiringRate:          number;
    ClipSize:            number;
    ReloadTime:          number;
    BulletsPerCartridge: number;
    Spread:              number;
    SpreadDownsights:    number;
    DamageZone_Critical: number;
}

export enum Rarity {
    Common = "common",
    Epic = "epic",
    Exotic = "exotic",
    Legendary = "legendary",
    Mythic = "mythic",
    Rare = "rare",
    Transcendent = "transcendent",
    Uncommon = "uncommon",
}

export enum Type {
    Boss = "boss",
    Seasonal = "seasonal",
    Standard = "standard",
    Starwars = "starwars",
    Sword = "sword",
}
