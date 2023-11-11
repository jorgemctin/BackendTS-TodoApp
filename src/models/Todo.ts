import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("todos")
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    user_id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.todos, {
        onDelete: "CASCADE",
    })
    
    user: User;

    constructor(id: number, text: string, user_id: number, user: User) {
        this.id = id;
        this.text = text;
        this.user_id = user_id;
        this.user = user;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}