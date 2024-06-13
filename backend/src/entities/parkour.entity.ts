import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { Max, Min } from "class-validator";

import EpreuveEntity from "./epreuve.entity";
import ImageParkourEntity from "./imageParkour.entity";

import { Difficulty } from "../enum/difficulty.enum";

@Entity("parkour")
@ObjectType()
class ParkourEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 50, unique: true })
  title: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 1000, nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ type: "int", unsigned: true, nullable: true })
  @Min(0, { message: "La valeur minimale est 0." })
  @Max(600, { message: "La valeur maximale est 600." })
  time?: number;

  @Field({ nullable: true })
  @Column({ type: "int", unsigned: true, nullable: true })
  @Min(0, { message: "La valeur minimale est 0." })
  @Max(60, { message: "La valeur maximale est 60." })
  length: number;

  @Field(() => Difficulty, { nullable: true })
  @Column({
    type: "text",
    enum: Difficulty,
    nullable: true,
  })
  difficulty: Difficulty;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: 50,
    nullable: true,
    transformer: {
      from(value: string) {
        return value.toLowerCase();
      },
      to(value: string) {
        return value.toLowerCase();
      },
    },
  })
  city: string;

  // 49.421015, -1.388178
  @Field()
  @Column({ type: "varchar", length: 20 })
  start: string;

  @Field({ nullable: true })
  @Column("decimal", {
    precision: 3,
    scale: 2,
    unsigned: true,
    nullable: true,
    default: 0,
  })
  note: number;

  @Field({ nullable: true })
  @Column({ unsigned: true, nullable: true, default: 0 })
  nbVote: number;

  @Field(() => [ImageParkourEntity], { nullable: true })
  @OneToMany(() => ImageParkourEntity, (img) => img.id_parkour, {
    nullable: true,
  })
  images: ImageParkourEntity[];

  @Field(() => [EpreuveEntity], { nullable: true })
  @ManyToMany(() => EpreuveEntity, {
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
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  time: number;
  @Field({ nullable: true })
  length: number;
  @Field(() => Difficulty, { nullable: true })
  difficulty: Difficulty;
  @Field({ nullable: true })
  city: string;
  @Field()
  start: string;
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
  time: number;
  @Field({ nullable: true })
  length: number;
  @Field(() => Difficulty, { nullable: true })
  difficulty: Difficulty;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  start: string;
  @Field(() => [Int], { nullable: true })
  epreuves: number[];
}

@InputType()
export class ParkourUpdateNoteEntity {
  @Field({ nullable: true })
  note: number;
  @Field({ nullable: true })
  nbVote: number;
}

export default ParkourEntity;
