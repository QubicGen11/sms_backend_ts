import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 15 minutes
    max: 6, // limit each IP to 100 requests per windowMs
    message: 'Too many attempts from , please try again after 2 minutes',
  });
  