export default function getEventIdFromQuery(query: string | string[] | undefined): string {
    if(typeof query === 'string') {
        return query;
    } else {
        return "none";
    }
}