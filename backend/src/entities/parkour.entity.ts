import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { Max, MaxLength, Min } from "class-validator";

import { Difficulty } from "../enum/difficulty.enum";
import EpreuveEntity from "./epreuve.entity";
import ImageParkourEntity, {
  ImageParkourCreateEntity,
} from "./imageParkour.entity";
import JoinUserParkourNoteEntity from "./joinUserParkourNote.entity";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

@Entity("parkour")
@Unique(["title"])
@ObjectType()
class ParkourEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_TITLE,
    unique: true,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_TITLE as string))
  @Index()
  title: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION,
    nullable: true,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION as string))
  description: string;

  @Field({ nullable: true })
  @Column({ type: "int", unsigned: true, nullable: true })
  @Min(0, { message: "La valeur minimale est 0." })
  @Max(parseInt(process.env.NEXT_PUBLIC_MAX_TIME as string), {
    message: `La valeur maximale est ${process.env.NEXT_PUBLIC_MAX_TIME}.`,
  })
  time?: number;

  @Field({ nullable: true })
  @Column({ type: "int", unsigned: true, nullable: true })
  @Min(0, { message: "La valeur minimale est 0." })
  @Max(parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH as string), {
    message: `La valeur maximale est ${process.env.NEXT_PUBLIC_MAX_LENGTH}.`,
  })
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
    length: process.env.NEXT_PUBLIC_LENGTH_CITY,
    nullable: true,
    transformer: {
      from(value: string | null): string | null {
        return value ? value.toLowerCase() : null;
      },
      to(value: string | null): string | null {
        return value ? value.toLowerCase() : null;
      },
    },
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_CITY as string))
  city: string;

  // 49.421015, -1.388178
  @Field()
  @Column({ type: "varchar", length: process.env.NEXT_PUBLIC_LENGTH_START })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_START as string))
  start: string;

  // precision = maximum number of digits that are stored for the values
  // scale = the number of digits to the right of the decimal point
  // Avec decimal(6,5), vous pouvez gérer précisément jusqu'à environ 100,000 votes avant de commencer à perdre en précision.
  @Field({ nullable: true })
  @Column("decimal", {
    precision: 6,
    scale: 5,
    unsigned: true,
    nullable: true,
    default: 0,
  })
  @Min(0, { message: "La valeur minimale est 0" })
  @Max(5, { message: "La valeur maximale est 5" })
  note: number;

  @Field({ nullable: true })
  @Column({ unsigned: true, nullable: true, default: 0 })
  nbVote: number;

  // ---

  @Field(() => [ImageParkourEntity], { nullable: true })
  @OneToMany(() => ImageParkourEntity, (img) => img.parkour_id, {
    nullable: true,
  })
  images: ImageParkourEntity[];

  @Field(() => [JoinUserParkourNoteEntity], { nullable: true })
  @OneToMany(() => JoinUserParkourNoteEntity, (notes) => notes.parkour, {
    nullable: true,
  })
  notesParkours: JoinUserParkourNoteEntity[];

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
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_TITLE as string))
  title: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION as string))
  description: string;

  @Field({ nullable: true })
  @Min(0)
  @Max(parseInt(process.env.NEXT_PUBLIC_MAX_TIME as string))
  time: number;

  @Field({ nullable: true })
  @Min(0)
  @Max(parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH as string))
  length: number;

  @Field(() => Difficulty, { nullable: true })
  difficulty: Difficulty;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_CITY as string))
  city: string;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_START as string))
  start: string;

  // ---

  @Field(() => [Int], { nullable: true })
  epreuves: number[];

  @Field(() => [ImageParkourCreateEntity], { nullable: true })
  images: ImageParkourCreateEntity[];
}

@InputType()
export class ParkourUpdateEntity {
  @Field({ nullable: true })
  @MaxLength(50)
  title: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION as string))
  description: string;

  @Field({ nullable: true })
  @Min(0)
  @Max(parseInt(process.env.NEXT_PUBLIC_MAX_TIME as string))
  time: number;

  @Field({ nullable: true })
  @Min(0)
  @Max(parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH as string))
  length: number;

  @Field(() => Difficulty, { nullable: true })
  difficulty: Difficulty;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_CITY as string))
  city: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_START as string))
  start: string;

  // ---

  @Field(() => [Int], { nullable: true })
  epreuves: number[];

  @Field(() => [ImageParkourCreateEntity], { nullable: true })
  images: ImageParkourCreateEntity[];

  @Field(() => [Number], { nullable: true })
  deletedImageIds: number[];
}

@InputType()
export class ParkourUpdateNoteEntity {
  @Field({ nullable: true })
  @Min(0)
  @Max(5)
  note: number;

  @Field({ nullable: true })
  nbVote: number;
}

export default ParkourEntity;
