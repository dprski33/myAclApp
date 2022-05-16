import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("dan_user")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    // @Column()
    // firstName!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @CreateDateColumn()
    date_created!: Date;

    @UpdateDateColumn()
    last_updated!: Date;
}