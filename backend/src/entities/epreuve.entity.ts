import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import ParkourEntity from "./parkour.entity";

@Entity("epreuve")
@ObjectType()
class EpreuveEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  easyToDo: string;

  @Field()
  @Column()
  mediumToDo: string;

  @Field()
  @Column()
  hardToDo: string;

  @Field(() => [ParkourEntity])
  @ManyToMany(() => ParkourEntity, (park) => park.epreuves)
  parkours: ParkourEntity[];
}

// ---

@InputType()
export class EpreuveCreateEntity {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field({ nullable: true })
  easyToDo: string;
  @Field({ nullable: true })
  mediumToDo: string;
  @Field({ nullable: true })
  hardToDo: string;
}

@InputType()
export class EpreuveUpdateEntity {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  easyToDo: string;
  @Field({ nullable: true })
  mediumToDo: string;
  @Field({ nullable: true })
  hardToDo: string;
}

export default EpreuveEntity;
