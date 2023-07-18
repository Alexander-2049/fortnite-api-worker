import { Router } from 'itty-router';

// now let's create a router (note the lack of "new")
const router = Router();

const jsonHeaders = {
    'Content-Type': 'application/json; charset=utf-8'
};

// GET collection index
router.get('/v1/events/list', (data) => new Response(
            JSON.stringify({
                test: 2
            }),
            {
                headers: jsonHeaders
            }
        )
    );

export default router;