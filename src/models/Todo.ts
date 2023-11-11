import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("todos")
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ name: "userId" })
    userId: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.todos, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    user: User;
}