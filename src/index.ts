import * as dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config(); // Load env variables

// Connecting to Redis
const host = process.env.REDIS_HOST || "";
const port = Number.parseInt(process.env.REDIS_PORT || "6379");
const password = process.env.REDIS_PASSWORD || "";
const database = Number.parseInt(process.env.REDIS_DATABASE || "0");
const redisClient = new Redis(port, host, {
	password: password,
	db: database,
});
redisClient.connect().catch(() => {}); // Initial error caused by who knows what

// Create a WS server
// When clients (users) connect to the WS server, they will send an auth token
// and the server will validate that token and return an access token in return
// which can be used in future requests. A client is connected to the WS server
// when they navigate to a bot on the panel. When the client disconnects from
// the WS server, their access token will be invalidated.
//
// Flow:
//  - Navitage to bot
//  - Client sends a connection to the WS server with their auth token
//  - Auth token is validated on the WS server and an access token is returned
//
// In-case there is a timeout and the client doesn't fully disconnect
// from the WS server - every so often, check if there has been recent
// communication between the client and server, and if there hasn't been
// then make the client re-auth
