export const logger = {
    info: (msg, data) => console.log(JSON.stringify({ level: 'info', msg, ...data })),
    error: (msg, data) => console.error(JSON.stringify({ level: 'error', msg, ...data })),
    debug: (msg, data) => console.log(JSON.stringify({ level: 'debug', msg, ...data }))
};
