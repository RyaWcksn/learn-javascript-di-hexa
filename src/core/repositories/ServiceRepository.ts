import { UserEntity } from "../domain/entities/UserEntity";

export interface ServiceRepository {
	create: (user: UserEntity) => Promise<UserEntity>
}
