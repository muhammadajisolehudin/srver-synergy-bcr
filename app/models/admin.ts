import { Model, ModelObject } from "objection";
import { v4 as uuidv4 } from 'uuid';

export interface Admin {
  id: string;
  name: string;
  role: string;
  username: string;
  password: string;
  no_hp?: string;
  created_at: Date;
  updated_at: Date;
}

export class AdminModel extends Model implements Admin {
  id!: string;
  name!: string;
  role!: string;
  username!: string;
  password!: string;
  no_hp?: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "users";
  }

  // Metode-metode hooks sebelum insert dan update
  $beforeInsert() {
    this.id = uuidv4();
    this.created_at = new Date();
    this.updated_at = new Date();
    if (!this.role) {
      this.role = 'admin'; // Nilai default untuk peran
    }
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

// Tipe ModelObject untuk AdminModel
export type Admins = ModelObject<AdminModel>;
