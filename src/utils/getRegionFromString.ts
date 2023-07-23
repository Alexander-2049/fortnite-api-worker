import { Regions } from "../types/Regions";

export default function getRegionFromString(region: any): Regions {
    // Custom function to check if the 'region' string exists in the 'Regions' enum
    function isValidRegion(input: any): input is Regions {
        return Object.values(Regions).includes(input);
    }

    if (isValidRegion(region)) {
        // Convert the 'region' string to the corresponding 'Regions' enum value
        return region;
    }
    return Regions.EUROPE;
}
