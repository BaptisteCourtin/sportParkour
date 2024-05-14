import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import EpreuveEntity from "./epreuve.entity";

@Entity("parkour")
@ObjectType()
class ParkourEntity {
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
  time: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  start: string;

  @Field(() => [EpreuveEntity])
  @ManyToMany(() => EpreuveEntity, (ep) => ep.parkours)
  epreuves: EpreuveEntity[];
}

// ---

@InputType()
export class ParkourCreateEntity {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  time: string;
  @Field()
  city: string;
  @Field()
  start: string;
}

@InputType()
export class ParkourUpdateEntity {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  time: string;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  start: string;
}

export default ParkourEntity;
