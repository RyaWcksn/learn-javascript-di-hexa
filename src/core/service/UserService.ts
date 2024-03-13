import { UserEntity } from "../domain/entities/UserEntity";
import { ServiceRepository } from "../repositories/ServiceRepository";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export const service = (userImpl: UserRepository): ServiceRepository => {

	const create = async (user: UserEntity): Promise<UserEntity> => {
		try {
			if (!user) {
				console.log("empty payload")
				throw new Error("error invalid payload")
			}
			if (!user.email) {
				console.log("empty username")
				throw new Error("error email missing")

			}
			if (!user.password) {
				console.log("empty password")
				throw new Error("error password missing")
			}
			const passwordHash = bcrypt.hashSync(user.password, 10);
			user.password = passwordHash;
			const data: UserEntity = await userImpl.createUser(user)
			return data
		} catch (e) {
			console.error("Got error = " + e)
			throw new Error("error " + e)
		} finally {

		}
	}
	const login = async (email: string, password: string): Promise<UserEntity> => {
		try {
			const user = await userImpl.login(email);
			const isCorrect = validatePassword(user.password, password)
			if (!isCorrect) {
				console.log("Invalid password for email " + email);
				throw new Error("Invalid password")
			}
			return user;
		} catch (e) {
			throw new Error("error " + e)
		}

	}
	const validatePassword = (passwordHash: string, password: string): boolean => {
		return bcrypt.compareSync(password, passwordHash);
	}

	return {
		create,
		login
	}

}
