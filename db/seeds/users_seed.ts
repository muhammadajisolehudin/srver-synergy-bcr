import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
   // Generate hashed password using bcrypt
    const hashedPassword = await bcrypt.hash('password', 10);

    // Insert data pengguna ke dalam tabel 'users'
    await knex('users').insert([
        {
            id: uuidv4(), 
            name: 'John Doe',
            username: 'johndoe',
            password: hashedPassword, 
            no_hp: '', 
            role: 'super_admin',
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(), 
            name: 'admin1',
            username: 'admin1',
            password: hashedPassword, 
            no_hp: '123456789', 
            role: 'admin',
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(), 
            name: 'member1',
            username: 'member1',
            password: hashedPassword, 
            no_hp: '081234567890', 
            role: 'member',
            created_at: new Date(),
            updated_at: new Date()
        }
        // Anda dapat menambahkan data pengguna lainnya sesuai kebutuhan
    ]);
};
