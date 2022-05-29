import { 
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    // JoinColumn,
    // ManyToOne,
    // OneToOne,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Role } from "./role.model";
import { User } from "./user.model";


@Entity()
export class UserRole extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => User, user => user.roles)
    @JoinColumn( { name: "user_id"})
    user!: User;

    @ManyToOne(type => Role)
    @JoinColumn({name: "role_id"})
    role!: Role;

    // @JoinColumn()
    // name!: Role["name"];

    @CreateDateColumn()
    date_created!: Date;

    @UpdateDateColumn()
    last_updated!: Date;
}