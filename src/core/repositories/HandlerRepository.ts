import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../../dto/UserDto";

export interface HandlerRepository {
	createUserHandler: (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => void
	loginHandler: (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => void
}
