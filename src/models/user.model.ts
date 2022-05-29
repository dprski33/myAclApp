import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany
} from "typeorm";
import { UserRole } from "./userRole.model";

@Entity("dan_user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // @Column()
    // firstName!: string;

    @Column({ nullable: false })
    name!: string;

    @Column('text', { unique: true, nullable: false })
    email!: string;

    @OneToMany(type => UserRole, role => role.user) //() => UserRole, (role) => role.user, {eager: true})
    roles!: UserRole[] | null;

    @CreateDateColumn()
    date_created!: Date;

    @UpdateDateColumn()
    last_updated!: Date;
}