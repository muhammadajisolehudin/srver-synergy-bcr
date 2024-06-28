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

    public async search(filters: Record<string, any>): Promise<Car[]> {
        const query = CarsModel.query(this.knexInstance);

        if (filters.plate) {
            query.whereRaw('LOWER(plate) LIKE ?', `%${filters.plate.toLowerCase()}%`);
        }
        if (filters.manufacture) {
            query.whereRaw('LOWER(manufacture) LIKE ?', `%${filters.manufacture.toLowerCase()}%`);
        }
        if (filters.model) {
            query.whereRaw('LOWER(model) LIKE ?', `%${filters.model.toLowerCase()}%`);
        }
        if (filters.year) {
            query.where('year', filters.year);
        }
        // Tambahkan filter lain sesuai kebutuhan

        const result = await query;
        return result;
    }




}

export const carsRepository = new CarsRepository(knexInstance);
