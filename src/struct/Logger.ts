import { format, transports, createLogger } from "winston";

const WinstonLogger = createLogger({
    transports: [new transports.Console()],
    exitOnError: false,
    format: format.printf(info => {
        const { level, message } = info;
        const time = new Date().toLocaleString();
        return `[${level.toUpperCase()}] • ${message} (${time})`;
    }),
});

export default WinstonLogger;