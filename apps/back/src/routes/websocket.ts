import { FastifyInstance } from "fastify";
import { websocketControler } from "../controllers/websocket";

export function websocketRoutes( app : FastifyInstance) {

    app.get('/ws', {websocket : true, preHandler : app.authenticate}, websocketControler.ws );
}