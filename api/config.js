// Config loader
export function getConfig() {
    return {
        threadsAppId: process.env.THREADS_APP_ID,
        threadsAppSecret: process.env.THREADS_APP_SECRET,
        threadsAccessToken: process.env.THREADS_ACCESS_TOKEN,
        openrouterApiKey: process.env.OPENROUTER_API_KEY,
        openrouterModel: process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash',
        searchQueries: (() => {
            try { return JSON.parse(process.env.SEARCH_QUERIES || '["trending","tech","AI","startup","motivation"]'); }
            catch { return ["trending","tech","AI","startup","motivation"]; }
        })(),
        dbDir: process.env.DB_DIR || '/tmp',
        logLevel: process.env.LOG_LEVEL || 'info'
    };
}
