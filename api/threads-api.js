import { logger } from './logger.js';

export async function postToThreads(config, text) {
    if (!config.threadsAccessToken) throw new Error('No Threads access token');
    
    const userId = await getUserId(config);
    const container = await createContainer(config, userId, text);
    const publishResult = await publishContainer(config, userId, container.id);
    
    return { postId: publishResult.id, text };
}

async function getUserId(config) {
    const r = await fetch('https://graph.threads.net/v1.0/me?fields=id&access_token=' + config.threadsAccessToken);
    const data = await r.json();
    if (!r.ok) throw new Error('Get user: ' + JSON.stringify(data));
    return data.id;
}

async function createContainer(config, userId, text) {
    const r = await fetch(`https://graph.threads.net/v1.0/${userId}/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            media_type: 'TEXT',
            text: text,
            access_token: config.threadsAccessToken
        })
    });
    const data = await r.json();
    if (!r.ok) throw new Error('Container: ' + JSON.stringify(data));
    await new Promise(r => setTimeout(r, 5000));
    return data;
}

async function publishContainer(config, userId, containerId) {
    const r = await fetch(`https://graph.threads.net/v1.0/${userId}/threads_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            creation_id: containerId,
            access_token: config.threadsAccessToken
        })
    });
    const data = await r.json();
    if (!r.ok) throw new Error('Publish: ' + JSON.stringify(data));
    return data;
}
