import { Knex } from 'knex';
import { CarsModel, Car } from '../models/cars';
import knexInstance from '../../config/knex';

export default class CarsRepository {
   private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    public async create(car: Car): Promise<Car> {
        return await CarsModel.query(this.knexInstance).insert(car);
    }

    public async list(): Promise<Car[]> {
        return await CarsModel.query(this.knexInstance);
    }

    public async getById(id: string): Promise<Car | undefined> {
        return await CarsModel.query(this.knexInstance).findById(id);
    }

    public async update(id: string, data: Car): Promise<Car> {
        return await CarsModel.query(this.knexInstance).patchAndFetchById(id, data);
    }

    public async remove(id: string): Promise<void> {
        await CarsModel.query(this.knexInstance).deleteById(id);
    }

    public async searchCars(params: Record<string, string | number>): Promise<Car[]> {
        // try {
            let query = CarsModel.query(this.knexInstance);

            // Loop untuk menambahkan kondisi pencarian berdasarkan parameter yang diterima
            for (const key in params) {
                if (key === 'year') {
                    query = query.where(key, '=', parseInt(params[key] as string, 10)); // Ubah tahun menjadi integer
                } else {
                    query = query.where(key, 'ilike', `%${params[key]}%`); // Pencarian case insensitive
                }
            }

            return await query;
        // } catch (error) {
        //     throw new Error(`Failed to search cars: ${error}`);
        // }
    }




}

export const carsRepository = new CarsRepository(knexInstance);
