export default async function handler(req, res) {
    res.status(200).json({
        env: {
            hasAppId: !!process.env.THREADS_APP_ID,
            hasSecret: !!process.env.THREADS_APP_SECRET,
            hasToken: !!process.env.THREADS_ACCESS_TOKEN,
            hasApiKey: !!process.env.OPENROUTER_API_KEY,
            model: process.env.OPENROUTER_MODEL || 'default'
        }
    });
}
