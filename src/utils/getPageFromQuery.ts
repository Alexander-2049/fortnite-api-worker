export default function getPageFromQuery(query: string | string[] | number | undefined): number {
    if(typeof query === 'string') {
        const replaced = query.replace(/\D/g, '');

        if (replaced !== '') {
          return Number(replaced);
        }
    }
    return 0;
}