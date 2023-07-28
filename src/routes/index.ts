import { Router } from 'itty-router';
import { routeEventsActive, routeEventsAll, routeEventsGet, routeEventsWindow } from './events';
import { routeSeasons, routeSeasonsCurrent } from './seasons';

// now let's create a router (note the lack of "new")
const router = Router();

export const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    "Cache-Control": "max-age=1500"
};

// GET collection index
router.get('/events/list', routeEventsAll);
router.get('/events/list/active', routeEventsActive);
router.get('/events/window', routeEventsWindow);
router.get('/events/get', routeEventsGet);
router.get('/seasons/list', routeSeasons);
router.get('/seasons/current', routeSeasonsCurrent);
router.get('*', () => {
    return new Response(undefined, { status: 404 });
});

export default router;