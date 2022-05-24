import { 
    BaseEntity, 
    Entity ,
    PrimaryGeneratedColumn,
    Column 
} from "typeorm";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;
}