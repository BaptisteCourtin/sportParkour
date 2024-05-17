import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import EpreuveEntity from "./epreuve.entity";

import { Difficulty } from "../enum/difficulty.enum";
import ImageParkourEntity from "./imageParkour.entity";

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  time: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  length: string;

  @Field(() => Difficulty, { nullable: true })
  @Column({
    type: "text",
    enum: Difficulty,
    nullable: true,
  })
  difficulty: Difficulty;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column()
  start: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  note: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nbVote: number;

  @Field(() => [ImageParkourEntity], { nullable: true })
  @OneToMany(() => ImageParkourEntity, (img) => img.id_parkour)
  images: ImageParkourEntity[];

  @Field(() => [EpreuveEntity], { nullable: true })
  @ManyToMany(() => EpreuveEntity, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    nullable: true,
  })
  @JoinTable({
    name: "join_parkour_epreuve",
    joinColumn: {
      name: "parkour_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "epreuve_id",
      referencedColumnName: "id",
    },
  })
  epreuves: EpreuveEntity[];
}

// ---

@InputType()
export class ParkourCreateEntity {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field({ nullable: true })
  time: string;
  @Field({ nullable: true })
  length: string;
  @Field(() => Difficulty, { nullable: true })
  difficulty: Difficulty;
  @Field({ nullable: true })
  city: string;
  @Field()
  start: string;
  @Field({ nullable: true })
  note: number;
  @Field({ nullable: true })
  nbVote: number;
  @Field(() => [Int], { nullable: true })
  epreuves: number[];
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
  length: string;
  @Field(() => Difficulty, { nullable: true })
  difficulty: Difficulty;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  start: string;
  @Field({ nullable: true })
  note: number;
  @Field({ nullable: true })
  nbVote: number;
  @Field(() => [Int], { nullable: true })
  epreuves: number[];
}

export default ParkourEntity;
