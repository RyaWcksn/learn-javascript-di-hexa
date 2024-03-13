import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import { UserRepository } from "../core/repositories/UserRepository";
import { userImpl } from "../core/domain/adapters/UserAdapter";
import { service } from "../core/service/UserService";
import { userHandler } from "../core/handlers/UserHandler";
import { HandlerRepository } from "../core/repositories/HandlerRepository";
import { ServiceRepository } from "../core/repositories/ServiceRepository";

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errorObject = {
		"error": err.message,
	}
	res.status(500).json({ error: errorObject }); // Send a generic error response
};

export const server = (port: number) => {
	const db: PrismaClient = new PrismaClient();
	const userDomain: UserRepository = userImpl(db);
	const svc: ServiceRepository = service(userDomain);
	const handler: HandlerRepository = userHandler(svc);

	const startServer = () => {
		const app = express();
		app.use(express.json()); // Parse JSON bodies

		app.post('/create-user', handler.createUserHandler);
		app.post('/login', handler.loginHandler);

		app.use(errorHandler);

		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
	return {
		startServer
	}

}
