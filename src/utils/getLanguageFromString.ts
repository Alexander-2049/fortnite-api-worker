import { Languages } from "../types/Languages";

export default function getLanguageFromString(language: any): Languages {
    // Custom function to check if the 'region' string exists in the 'Regions' enum
    function isValidLanguage(input: any): input is Languages {
        return Object.values(Languages).includes(input);
    }

    if (isValidLanguage(language)) {
        // Convert the 'region' string to the corresponding 'Regions' enum value
        return language;
    }
    return Languages.ENGLISH;
}
