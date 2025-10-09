import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, type Relation } from "typeorm";
import { Situations } from "./Situations.js";

@Entity("users")
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
    
    @Column({ unique: true })
    email!: string;

    @ManyToOne(() => Situations, (situation) => situation.users)
    @JoinColumn({ name: "situationId" })
    situation!: Relation<Situations>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}