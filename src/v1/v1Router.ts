import { Router } from 'itty-router';
import { ExtraData } from '../worker';

// now let's create a router (note the lack of "new")
const router = Router();

const jsonHeaders = {
    'Content-Type': 'application/json; charset=utf-8'
};

// GET collection index
router.get('/v1/events/list', (data, extra: ExtraData) => {
    const {request, env} = extra;
    console.log(request.headers.get('Accept-Language'));

    return new Response(
        JSON.stringify({
            test: 2
        }),
        {
            headers: jsonHeaders
        }
    )
    })

export default router;