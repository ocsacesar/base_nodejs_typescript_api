/**
 * Created by Ovídio César on 10/12/17.
 */
import * as Bcrypt from 'bcryptjs';
import {
    Model, Table, Column, CreatedAt, UpdatedAt, DeletedAt, DefaultScope, Scopes, BeforeCreate,
    BeforeUpdate
} from 'sequelize-typescript';

@DefaultScope({
    attributes: ['id', 'name', 'username', 'password']
})
@Scopes({
    login: {
        attributes: ['id', 'name', 'username', 'password']
    }
})
@Table({tableName: 'user'})
export class User extends Model<User> {

    @Column
    name: string;

    @Column
    username: string;

    @Column
    password: string;

    @CreatedAt
    @Column
    created_at: Date;

    @UpdatedAt
    @Column
    updated_at: Date;

    @DeletedAt
    @Column
    deleted_at: Date;

    @BeforeCreate
    static setPassword(user: User) {
        return Bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => {
                throw new Error();
            });
    }

    @BeforeUpdate
    static updatePassword(user: User) {
        if (user.changed('password')) {
            return Bcrypt.hash(user.password, 10)
                .then(hash => {
                    user.password = hash;
                })
                .catch(err => {
                    throw new Error();
                });
        }
    }
}
