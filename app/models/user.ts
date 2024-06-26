import { Model, ModelObject } from "objection";
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  role: string;
  username: string;
  password: string;
  no_hp?: string;
  created_at: Date;
  updated_at: Date;
}

export class UserModel extends Model implements User {
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

  $beforeInsert() {
    this.id = uuidv4();
    this.created_at = new Date();
    this.updated_at = new Date();
    if (!this.role) {
      this.role = 'member';
    }
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

export type Users = ModelObject<UserModel>;
