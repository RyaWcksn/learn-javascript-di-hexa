import { UserEntity } from "../domain/entities/UserEntity";

export interface ServiceRepository {
	create: (user: UserEntity) => Promise<UserEntity>
	login: (email: string, password: string) => Promise<UserEntity>
}
