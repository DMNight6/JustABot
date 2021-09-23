import { createLogger, format, transports } from "winston";

const WinstonLogger = createLogger({
    transports: [new transports.Console()],
    exitOnError: false,
    format: format.printf((info: any) => {
        const { level, msg } = info;
        const now = new Date().toLocaleString;
        return `[${level.toUpperCase()}] ${msg} (${now})`
    })
})

export default WinstonLogger;