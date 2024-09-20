import { createLogger, transports, format, addColors } from "winston";
const { printf, combine, colorize, timestamp } = format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "magenta",
  },
};

// Agregar los colores personalizados a winston
addColors(customLevels.colors);

// Formateo para nuestros logs
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Formato de la consola
const consoleFormat = combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat);

export const logger = createLogger({
  levels: customLevels.levels,
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console({ format: consoleFormat, level: "http" }),
    new transports.File({ filename: "logs/app.log", level: "http" }),
    new transports.File({ filename: "logs/error.log", format: logFormat, level: "error" }),
    new transports.File({ filename: "logs/info.log", format: logFormat, level: "info" }),
    new transports.File({ filename: "logs/warn.log", format: logFormat, level: "warn" }),
  ],
});