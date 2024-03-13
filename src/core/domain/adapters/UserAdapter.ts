import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import { UserEntity } from "../entities/UserEntity";

export const userImpl = (db: PrismaClient): UserRepository => {
	const createUser = async (user: UserEntity): Promise<UserEntity> => {
		try {
			const data: UserEntity = await db.user.create({
				data: {
					name: user.name,
					email: user.email,
					password: user.password
				}
			});
			return data;
		} catch (e) {
			console.error("Got error = " + e)
			throw new Error("error " + e)
		}

	}
	const getUsers = async (): Promise<UserEntity[]> => {
		try {
			const users: UserEntity[] = await db.user.findMany();
			return users;
		} catch (e) {
			console.error("Got error = " + e)
			throw new Error("error " + e)
		}

	}
	const getUser = async (id: number): Promise<UserEntity> => {
		try {
			const data = await db.user.findUnique({
				select: {
					id: true,
					name: true,
					email: true,
					password: true
				},
				where: {
					id: id
				}
			});
			const user: UserEntity = {
				name: data?.name || "",
				email: data?.email || "",
				password: data?.password || ""
			}
			return user;
		} catch (e) {
			console.error("Got error = " + e)
			throw new Error("error " + e)
		}
	}
	const updateUser = async (id: number, userData: UserEntity): Promise<UserEntity> => {
		try {
			const user: UserEntity = await db.user.update({
				data: {
					name: userData.name,
					email: userData.email,
					password: userData.password
				},
				where: {
					id: id
				}
			});
			return user;
		} catch (e) {
			console.error("Got error = " + e)
			throw new Error("error " + e)
		}
	}
	const deleteUser = async (id: number): Promise<boolean> => {
		try {
			const user: UserEntity = await db.user.delete({
				where: {
					id: id
				}
			});
			console.log(user.name + " deleted")
			return true;
		} catch (e) {
			console.error("Got error = " + e)
			throw new Error("error " + e)
		}
	}

	const login = async (email: string): Promise<UserEntity> => {
		try {
			const data = await db.user.findUnique({
				select: {
					id: true,
					name: true,
					email: true,
					password: true
				},
				where: {
					email: email
				}
			});
			const user: UserEntity = {
				name: data?.name || "",
				email: data?.email || "",
				password: data?.password || ""
			}
			return user;
		} catch (e) {
			console.error("Got error = " + e)
			throw new Error("error " + e)
		}
	}
	return {
		createUser,
		getUsers,
		getUser,
		updateUser,
		deleteUser,
		login,
	}

}
