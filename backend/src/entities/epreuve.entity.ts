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
import { Field, ID, InputType, ObjectType } from "type-graphql";

import ImageEpreuveEntity, {
  ImageEpreuveCreateEntity,
} from "./imageEpreuve.entity";
import ParkourEntity from "./parkour.entity";
import { MaxLength } from "class-validator";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

@Entity("epreuve")
@Unique(["title"])
@ObjectType()
class EpreuveEntity {
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
  @Index() // vu que on fait beaucoup de recherche sur le titre
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
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION,
    nullable: true,
  })
  @MaxLength(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
  )
  easyToDo: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION,
    nullable: true,
  })
  @MaxLength(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
  )
  mediumToDo: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION,
    nullable: true,
  })
  @MaxLength(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
  )
  hardToDo: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_LINK,
    nullable: true,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK as string))
  videoLink: string;

  // ---

  // pas besoin de join column en many to one
  @Field(() => [ImageEpreuveEntity], { nullable: true })
  @OneToMany(() => ImageEpreuveEntity, (img) => img.epreuve_id, {
    nullable: true,
  })
  images: ImageEpreuveEntity[];

  // pour savoir si encore lié
  @Field(() => [ParkourEntity], { nullable: true })
  @ManyToMany(() => ParkourEntity, {
    nullable: true,
  })
  @JoinTable({
    name: "join_parkour_epreuve",
    joinColumn: {
      name: "epreuve_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "parkour_id",
      referencedColumnName: "id",
    },
  })
  parkours: ParkourEntity[];
}

// ---

@InputType()
export class EpreuveCreateEntity {
  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_TITLE as string))
  title: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION as string))
  description: string;

  @Field({ nullable: true })
  @MaxLength(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
  )
  easyToDo: string;

  @Field({ nullable: true })
  @MaxLength(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
  )
  mediumToDo: string;

  @Field({ nullable: true })
  @MaxLength(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
  )
  hardToDo: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK as string))
  videoLink: string;

  // ---

  @Field(() => [ImageEpreuveCreateEntity], { nullable: true })
  images: ImageEpreuveCreateEntity[];
}

// obliger de mettre nullable: true si on veut modifier que certain champs
@InputType()
export class EpreuveUpdateEntity {
  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_TITLE as string))
  title?: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION as string))
  description?: string;

  @Field({ nullable: true })
  @MaxLength(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
  )
  easyToDo?: string;

  @Field({ nullable: true })
  @MaxLength(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
  )
  mediumToDo?: string;

  @Field({ nullable: true })
  @MaxLength(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
  )
  hardToDo?: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK as string))
  videoLink?: string;

  // ---

  @Field(() => [ImageEpreuveCreateEntity], { nullable: true })
  images?: ImageEpreuveCreateEntity[];

  @Field(() => [Number], { nullable: true })
  deletedImageIds?: number[];
}

export default EpreuveEntity;
