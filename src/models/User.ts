/**
 * Created by cesar on 10/12/17.
 */
import {Model, Table, Column, CreatedAt, UpdatedAt, DeletedAt} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    birthday: Date;

    @CreatedAt
    @Column
    created_at: Date;

    @UpdatedAt
    @Column
    updated_at: Date;

    @DeletedAt
    @Column
    deleted_at: Date;

}