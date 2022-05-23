import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

@Entity("dan_user")
export class User extends BaseEntity {
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