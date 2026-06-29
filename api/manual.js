import { getConfig } from './config.js';
import { runPipeline } from './pipeline.js';
import { logger } from './logger.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    
    const dryRun = req.query.dry === 'true';
    try {
        const config = getConfig();
        const result = await runPipeline(config, { dryRun });
        res.status(200).json(result);
    } catch(e) {
        logger.error('Manual error', { error: e.message });
        res.status(500).json({ error: e.message });
    }
}
