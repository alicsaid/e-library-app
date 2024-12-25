const rateLimit = require("express-rate-limit");

// Rate limiter za login rutu
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuta (u milisekundama)
  max: 5, // Maksimalan broj pokušaja u ovom vremenskom periodu
  message: "Too many login attempts, please try again later.", // Poruka kada se premaši broj pokušaja
  standardHeaders: true, // Povratak rate limit informacija u odgovorima
  legacyHeaders: false, // Onemogućavanje starih HTTP hedera
});

module.exports = loginRateLimiter;
