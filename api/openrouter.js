import { logger } from './logger.js';

export async function generateContent(config, topic) {
    const prompt = `Create a viral Threads post about "${topic}". 

Requirements:
- Max 500 characters
- Indonesian or English (mix is ok)
- Engaging hook in first line
- Relatable, authentic voice
- Include relevant emojis
- End with question or CTA
- NO hashtags
- Don't sound like AI — be genuine

Return ONLY the post text, nothing else.`;

    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.openrouterApiKey
        },
        body: JSON.stringify({
            model: config.openrouterModel,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300,
            temperature: 0.9
        })
    });
    
    const data = await r.json();
    if (!r.ok) throw new Error('OpenRouter: ' + JSON.stringify(data));
    return data.choices[0].message.content.trim();
}
