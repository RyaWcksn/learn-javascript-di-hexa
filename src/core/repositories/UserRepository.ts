import { UserEntity } from "../domain/entities/UserEntity";

export interface UserRepository {
	createUser: (user: UserEntity) => Promise<UserEntity>
	getUsers: () => Promise<UserEntity[]>
	getUser: (id: number) => Promise<UserEntity>
	updateUser: (id: number, user: UserEntity) => Promise<UserEntity>
	deleteUser: (id: number) => Promise<boolean>
	login: (email: string) => Promise<UserEntity>
}
