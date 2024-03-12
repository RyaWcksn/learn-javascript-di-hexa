import { UserEntity } from "../domain/entities/UserEntity";
import { ServiceRepository } from "../repositories/ServiceRepository";
import { UserRepository } from "../repositories/UserRepository";

export const service = (userImpl: UserRepository): ServiceRepository => {

	const create = async (user: UserEntity): Promise<UserEntity> => {
		try {
			const data: UserEntity = await userImpl.createUser(user)
			return data
		} catch (e) {
			console.error("Got error = " + e)
			throw new Error("error " + e)
		} finally {

		}
	}

	return {
		create,
	}

}
