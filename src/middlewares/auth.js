import "dotenv/config";
import jwt from 'jsonwebtoken';
import Redis from 'ioredis';

const redis = new Redis();

// Now you can use the `redis` object to interact with your Redis server


// const REFRESH_TOKEN_SECRET="5b16a4901825d723af457ebeef3c82ace3426ca720b7eee6a0513cc0943f2ad8b4e4a962f8693acd3c4c5a5259f2b411e562c0cfa708fefd8e24843d97c99025"

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next();
    })
}

// API rate limiting using leaky bucket algorithm
// Configure middleware for rate limiting
// export const rateLimiter = async (req, res, next) => {
//     const ipAddress = req.ip;
//     console.log("Hitting rateLimiter");

//     const bucketKey = `rate_limit:${ipAddress}`;
//     console.log(bucketKey)
//     const rateLimit = 5; // Number of requests allowed per minute
//     const refillRate = 1 ; // Requests added per second
//     let token_used=0;
//     // Leaky Bucket Algorithm
//     let currentTimestamp = Math.floor(Date.now() / 1000);
//     const lastRequestTimestamp = await redis.get(bucketKey);
//     const timeElapsed = currentTimestamp - lastRequestTimestamp;
    
//     // Calculate tokensToAdd based on the refillRate
//     const tokensToAdd = timeElapsed * refillRate;
//     const currentTokens = Math.min(rateLimit, Math.ceil(tokensToAdd));

//     console.log("Current Timestamp:", currentTimestamp);
//     console.log("Last Request Timestamp:", lastRequestTimestamp);
//     console.log("Time Elapsed:", timeElapsed);
//     console.log("Tokens To Add:", tokensToAdd);
//     console.log("Current Tokens:", currentTokens);

//     // If there are enough tokens, proceed with the request
//     if (token_used>5){currentTimestamp+=60}
//     if (currentTokens > 0) {
//         await redis.set(bucketKey, currentTimestamp);
//         console.log(`Set Redis Key: ${bucketKey} with value: ${currentTimestamp}`);
//         console.log("Working fine");
//         next();
//     } else {
//         console.log("Error 429");
//         res.status(429).json({ error: 'Too Many Requests' });
//     }
// };


// export const rateLimiter = async (req, res, next) => {
//     const ipAddress = req.ip;
//     console.log("Hitting rateLimiter");

//     const bucketKey = `rate_limit:${ipAddress}`;
//     console.log(bucketKey)
//     const rateLimit = 5; // Number of requests allowed per minute
//     const refillRate = 1 ; // Requests added per second

//     // Leaky Bucket Algorithm
//     let currentTimestamp = Math.floor(Date.now() / 1000);
//     const lastRequestTimestamp = await redis.get(bucketKey);
//     const timeElapsed = currentTimestamp - lastRequestTimestamp;
    
//     // Calculate tokensToAdd based on the refillRate
//     const tokensToAdd = timeElapsed * refillRate;
//     const currentTokens = Math.min(rateLimit, Math.ceil(tokensToAdd));

//     console.log("Current Timestamp:", currentTimestamp);
//     console.log("Last Request Timestamp:", lastRequestTimestamp);
//     console.log("Time Elapsed:", timeElapsed);
//     console.log("Tokens To Add:", tokensToAdd);
//     console.log("Current Tokens:", currentTokens);

//     // If there are enough tokens, proceed with the request
  
//     if (currentTokens > 0) {
//         await redis.set(bucketKey, currentTimestamp);
//         console.log(`Set Redis Key: ${bucketKey} with value: ${currentTimestamp}`);
//         console.log("Working fine");
//         next();
//     } else {
//         console.log("Error 429");
//         res.status(429).json({ error: 'Too Many Requests' });
//     }
// };

// import redis from 'your-redis-library'; // Import your Redis library

// export const rateLimiter = async (req, res, next) => {
//     const ipAddress = req.ip;
//     console.log("Hitting rateLimiter");

//     const loginAttemptsKey = `login_attempts:${ipAddress}`;
//     const blockKey = `block_user:${ipAddress}`;
//     const rateLimit = 5; // Number of login attempts allowed per minute
//     const refillRate = 1; // Login attempts added per second
//     const blockDuration = 60; // Block user for 1 minute (in seconds)

//     // Leaky Bucket Algorithm
//     let currentTimestamp = Math.floor(Date.now() / 1000);
    
//     // Check if the user is already blocked
//     const blockedUntil = await redis.get(blockKey);
//     if (blockedUntil && blockedUntil > currentTimestamp) {
//         console.log("User is blocked");
//         res.status(429).json({ error: 'Too Many Requests. User is blocked' });
//         return;
//     }

//     // Check the number of login attempts
//     const loginAttempts = await redis.get(loginAttemptsKey) || 0;
//     const timeElapsed = currentTimestamp - (await redis.get(`${loginAttemptsKey}:timestamp`) || 0);

//     // Calculate attemptsToAdd based on the refillRate
//     const attemptsToAdd = timeElapsed * refillRate;
//     const currentAttempts = Math.min(rateLimit, Math.ceil(attemptsToAdd));

//     console.log("Current Timestamp:", currentTimestamp);
//     console.log("Login Attempts:", loginAttempts);
//     console.log("Time Elapsed:", timeElapsed);
//     console.log("Attempts To Add:", attemptsToAdd);
//     console.log("Current Attempts:", currentAttempts);

//     // If there are enough attempts, block the user
//     if (currentAttempts > 0) {
//         await redis.incr(loginAttemptsKey);
//         await redis.set(`${loginAttemptsKey}:timestamp`, currentTimestamp);
//         console.log(`Incremented login attempts for ${ipAddress}`);
//         next();
//     } else {
//         // Block the user for the specified duration
//         await redis.set(blockKey, currentTimestamp + blockDuration);
//         console.log(`Blocked user ${ipAddress} for ${blockDuration} seconds`);
//         res.status(429).json({ error: 'Too Many Requests. User is blocked' });
//     }
// };


export const rateLimiter = async (req, res, next) => {
    const ipAddress = req.ip;
    console.log("Hitting rateLimiter");

    const loginAttemptsKey = `login_attempts:${ipAddress}`;
    const blockKey = `block_user:${ipAddress}`;
    const rateLimit = 5; // Number of login attempts allowed per minute
    const refillRate = 1; // Login attempts added per second
    const blockDuration = 60; // Block user for 1 minute (in seconds)

    // Leaky Bucket Algorithm
    let currentTimestamp = Math.floor(Date.now() / 1000);

    // Check if the user is already blocked
    const blockedUntil = await redis.get(blockKey);
    if (blockedUntil && blockedUntil > currentTimestamp) {
        console.log("User is blocked");
        res.status(429).json({ error: 'Too Many Requests. User is blocked' });
        return;
    }

    // Check the number of login attempts
    const loginAttempts = await redis.get(loginAttemptsKey) || 0;
    const lastAttemptTimestamp = await redis.get(`${loginAttemptsKey}:timestamp`) || 0;
    const timeElapsed = currentTimestamp - lastAttemptTimestamp;

    // If the user was blocked and the block duration has passed, unblock the user
    if (timeElapsed >= blockDuration) {
        await redis.del(blockKey);
        await redis.del(loginAttemptsKey);
        console.log(`Unblocked user ${ipAddress}`);
    }

    // Calculate attemptsToAdd based on the refillRate
    const attemptsToAdd = timeElapsed * refillRate;
    const currentAttempts = Math.min(rateLimit, Math.ceil(attemptsToAdd));

    console.log("Current Timestamp:", currentTimestamp);
    console.log("Login Attempts:", loginAttempts);
    console.log("Time Elapsed:", timeElapsed);
    console.log("Attempts To Add:", attemptsToAdd);
    console.log("Current Attempts:", currentAttempts);

    // If there are enough attempts, block the user
    if (currentAttempts >= rateLimit) {
        // Block the user for the specified duration
        await redis.set(blockKey, currentTimestamp + blockDuration);
        console.log(`Blocked user ${ipAddress} for ${blockDuration} seconds`);
        res.status(429).json({ error: 'Too Many Requests. User is blocked' });
    } else {
        // Increment the login attempts counter and update the timestamp
        await redis.incr(loginAttemptsKey);
        await redis.set(`${loginAttemptsKey}:timestamp`, currentTimestamp);
        console.log(`Incremented login attempts for ${ipAddress}`);
        next();
    }
};
