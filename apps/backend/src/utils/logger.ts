import { createLogger, format, transports } from "winston";

const path = (fileName: string) => `./src/logs/${fileName}`;

const consoleFormat = format.combine(
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  format.colorize({ colors: { info: "blue" } }),
  format.printf(
    ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
  )
);

const fileFormat = format.combine(format.timestamp(), format.json());

const logger = createLogger({
  level: "info",
  transports: [
    new transports.Console({ format: consoleFormat }),
    new transports.File({
      filename: path("info.log"),
      level: "info",
      format: fileFormat,
    }),
    new transports.File({
      filename: path("error.log"),
      level: "error",
      format: fileFormat,
    }),
    new transports.File({
      filename: path("warning.log"),
      level: "warn",
      format: fileFormat,
    }),
  ],
});

export const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};

export default logger;
