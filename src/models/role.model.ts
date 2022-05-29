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

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    description!: string;
}