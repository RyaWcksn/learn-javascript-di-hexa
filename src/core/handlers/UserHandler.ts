import { NextFunction, Request, Response } from "express";
import { HandlerRepository } from "../repositories/HandlerRepository";
import { ServiceRepository } from "../repositories/ServiceRepository";
import { CreateUserDto } from "../../dto/UserDto";
import { UserEntity } from "../domain/entities/UserEntity";

export const userHandler = (service: ServiceRepository): HandlerRepository => {
	const createUserHandler = async (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => {
		try {
			const dto: CreateUserDto = req.body;
			const user: UserEntity = {
				name: dto.name,
				email: dto.email,
				password: dto.password
			}
			const isCreated: UserEntity = await service.create(user)
			res.json(isCreated);
		} catch (e) {
			next(e)
		}

	}
	const loginHandler = async (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => {
		try {
			const dto: CreateUserDto = req.body;
			const isLogin: UserEntity = await service.login(dto.email, dto.password)
			const loginObject = {
				"message": "logged in!",
				"user": isLogin
			}
			res.json(loginObject);
		} catch (e) {
			next(e)
		}

	}

	return {
		createUserHandler,
		loginHandler
	}
}
