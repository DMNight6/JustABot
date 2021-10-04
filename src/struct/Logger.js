const {createLogger, format, transports} = require('winston');

module.exports.WinstonLogger = createLogger({
    transports: [new transports.Console()],
    exitOnError: false,
    format: format.printf(info => {
        const {level, message} = info;
        const now = new Date().toLocaleString();
        return `[${level}] : ${message} (${now})`
    })
})