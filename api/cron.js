import { getConfig } from './config.js';
import { runPipeline } from './pipeline.js';
import { logger } from './logger.js';

export default async function handler(req, res) {
    logger.info('Cron triggered');
    try {
        const config = getConfig();
        const result = await runPipeline(config);
        res.status(200).json(result);
    } catch(e) {
        logger.error('Cron error', { error: e.message });
        res.status(500).json({ error: e.message });
    }
}
