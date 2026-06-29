import { getConfig } from './config.js';
import { generateContent } from './openrouter.js';
import { postToThreads } from './threads-api.js';
import { logger } from './logger.js';

export async function runPipeline(config, opts = {}) {
    const topic = config.searchQueries[Math.floor(Math.random() * config.searchQueries.length)];
    logger.info('Pipeline running', { topic, dryRun: opts.dryRun });
    
    const text = await generateContent(config, topic);
    logger.info('Content generated', { length: text.length, preview: text.slice(0, 80) });
    
    if (opts.dryRun) {
        return { status: 'success', generatedText: text, postId: null, dryRun: true };
    }
    
    const result = await postToThreads(config, text);
    logger.info('Posted to Threads', { postId: result.postId });
    return { status: 'success', generatedText: text, postId: result.postId, dryRun: false };
}
