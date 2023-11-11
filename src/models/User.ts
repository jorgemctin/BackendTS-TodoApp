import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany  } from "typeorm";
import { Todo } from "./Todo";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany(() => Todo, todo => todo.user )
    todos?: Todo[];


    constructor(id: number, username: string, email: string, password: string ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}