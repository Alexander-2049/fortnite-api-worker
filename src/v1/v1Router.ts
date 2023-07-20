import { Router } from 'itty-router';
import { ExtraData } from '../worker';
import events from './api/events';

// now let's create a router (note the lack of "new")
const router = Router();

const jsonHeaders = {
    'Content-Type': 'application/json; charset=utf-8'
};

// GET collection index
router.get('/v1/events/list', async (data, extra: ExtraData) => {
    const {request, env} = extra;
    
    const result = await events(undefined, undefined, env);

    return new Response(
        JSON.stringify({
            result,
            env: `- ${env.API_TOKEN} -`
        }),
        {
            headers: jsonHeaders
        }
    )
    })

export default router;