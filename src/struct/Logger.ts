import { createLogger, transports, format } from "winston";

const WinstonLogger = createLogger({
    transports: [new transports.Console()],
    exitOnError: false,
    format: format.printf( info => {
        const { level, message } = info;
        const now = new Date().toLocaleString();
        return `[${level.toUpperCase()}] : ${message} (${now})`
    })
})

export default WinstonLogger