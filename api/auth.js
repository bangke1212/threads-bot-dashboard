// OAuth endpoint
import crypto from 'crypto';

function getConfig() {
    const id = process.env.THREADS_APP_ID;
    const secret = process.env.THREADS_APP_SECRET;
    const redirect = process.env.THREADS_REDIRECT_URI || 'https://THREADS_BOT_URL.vercel.app/api/auth';
    if (!id || !secret) throw new Error('Missing env vars');
    return { id, secret, redirect };
}

export default async function handler(req, res) {
    const { code } = req.query;
    
    if (code) {
        try {
            const config = getConfig();
            const body = new URLSearchParams({
                client_id: config.id,
                client_secret: config.secret,
                grant_type: 'authorization_code',
                redirect_uri: config.redirect,
                code
            });
            const r = await fetch('https://graph.threads.net/oauth/access_token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString()
            });
            const data = await r.json();
            if (!r.ok) return res.status(500).json({ error: data });
            return res.status(200).json({ success: true, token: data.access_token?.slice(0,10)+'...' });
        } catch(e) {
            return res.status(500).json({ error: e.message });
        }
    }
    
    try {
        const config = getConfig();
        const state = crypto.randomBytes(24).toString('hex');
        const params = new URLSearchParams({
            client_id: config.id,
            redirect_uri: config.redirect,
            scope: 'threads_basic,threads_content_publish',
            response_type: 'code',
            state
        });
        res.redirect('https://threads.net/oauth/authorize?' + params);
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
}
