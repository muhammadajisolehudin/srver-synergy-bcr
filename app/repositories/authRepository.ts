import { Knex } from "knex";
import { UserModel, User } from "../models/user";
import knexInstance from '../../config/knex';

export default class AuthRepository {
    private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    public async findByUsername(username: string): Promise<User | undefined> {
        try {
            return await UserModel.query(this.knexInstance)
                .where('username', username)
                .first();
        } catch (error) {
            console.error("Error finding user by username:", error);
            throw error;
        }
    }
    
    public async register(user: Partial<User>): Promise<User> {
        try {
            return await UserModel.query(this.knexInstance).insertAndFetch(user);
        } catch (error) {
            console.error("Error registering new user:", error);
            throw error;
        }
    }
}


export const authRepository = new AuthRepository(knexInstance);