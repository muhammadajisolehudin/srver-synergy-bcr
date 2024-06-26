import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authRepository } from "../repositories/authRepository";

// Mendefinisikan tipe User
interface User {
  name: string;
  username: string;
  password: string;
  no_hp?:string;
}


const login = async (body: { username: string, password: string }) => {
    const { username, password } = body;
    try {
        const user = await authRepository.findByUsername(username);
    
        // Logika bisnis untuk mengecek username dan password
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const payload = {
                    id: user.id,
                    role: user.role
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'secret', {
                    expiresIn: '30d',
                });
                const sanitizedUser = {
                    username: user.username,
                    role: user.role
                };

                return { user: sanitizedUser, token };
            } else {
                return { error: 'INVALID_PASSWORD' };
            }
        }else{
            return{ error: 'USER_NOT_FOUND'}
        }

    } catch (error) {
        throw error;
    }
}

const register = async (body: User) => {
    const { username, password, name, no_hp } = body;

    if (!username || !password || !name ) {
        return { error: 'REQUIRED' };
    }
    try {
        const searchUser = await authRepository.findByUsername(username);
        if(searchUser){
            return { error: 'REGISTRED' };
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await authRepository.register({
                username,
                password: hashedPassword,
                name,
                no_hp,
            })

            return{ status:200, user }
        }
        
    } catch (error) {
        throw error;
    }
}

export {
    login,
    register
}
