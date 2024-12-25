// utils/logger.js

const winston = require("winston");

// Kreiraj winston logger
const logger = winston.createLogger({
  level: "info", // Nivo logova koji će biti zabeleženi (info, warn, error, etc.)
  format: winston.format.combine(
    winston.format.colorize(), // Dodaj boje za lakše praćenje u konzoli
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Dodaj vreme
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`; // Format loga
    })
  ),
  transports: [
    new winston.transports.Console(), // Logovanje u konzolu
    new winston.transports.File({ filename: "logs/app.log" }), // Logovanje u fajl
  ],
});

module.exports = logger;
