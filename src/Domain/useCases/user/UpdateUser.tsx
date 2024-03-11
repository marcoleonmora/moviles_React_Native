import { User } from "../../entities/User";
import { UserRepositoryImpl } from "../../../Data/repositories/UserRepository";

const { update} = new UserRepositoryImpl();

export const UpdateUserUseCase = async (user: User) => {
    return await update(user);
}
