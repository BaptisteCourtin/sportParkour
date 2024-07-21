import {
  Column,
  Entity,
  Index,
  JoinColumn,
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

import {
  LENGTH_TITLE,
  LENGTH_DESCRIPTION,
  LENGTH_LITTLE_DESCRIPTION,
  LENGTH_LINK,
} from "../../../variablesLength";

@Entity("epreuve")
@Unique(["title"])
@ObjectType()
class EpreuveEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: LENGTH_TITLE, unique: true })
  @MaxLength(LENGTH_TITLE)
  @Index() // vu que on fait beaucoup de recherche sur le titre
  title: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: LENGTH_DESCRIPTION, nullable: true })
  @MaxLength(LENGTH_DESCRIPTION)
  description: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: LENGTH_LITTLE_DESCRIPTION,
    nullable: true,
  })
  @MaxLength(LENGTH_LITTLE_DESCRIPTION)
  easyToDo: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: LENGTH_LITTLE_DESCRIPTION,
    nullable: true,
  })
  @MaxLength(LENGTH_LITTLE_DESCRIPTION)
  mediumToDo: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: LENGTH_LITTLE_DESCRIPTION,
    nullable: true,
  })
  @MaxLength(LENGTH_LITTLE_DESCRIPTION)
  hardToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: LENGTH_LINK, nullable: true })
  @MaxLength(LENGTH_LINK)
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
  @MaxLength(LENGTH_TITLE)
  title: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_DESCRIPTION)
  description: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_LITTLE_DESCRIPTION)
  easyToDo: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_LITTLE_DESCRIPTION)
  mediumToDo: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_LITTLE_DESCRIPTION)
  hardToDo: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_LINK)
  videoLink: string;

  // ---

  @Field(() => [ImageEpreuveCreateEntity], { nullable: true })
  images: ImageEpreuveCreateEntity[];
}

// obliger de mettre nullable: true si on veut modifier que certain champs
@InputType()
export class EpreuveUpdateEntity {
  @Field({ nullable: true })
  @MaxLength(LENGTH_TITLE)
  title?: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_DESCRIPTION)
  description?: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_LITTLE_DESCRIPTION)
  easyToDo?: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_LITTLE_DESCRIPTION)
  mediumToDo?: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_LITTLE_DESCRIPTION)
  hardToDo?: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_LINK)
  videoLink?: string;

  // ---

  @Field(() => [ImageEpreuveCreateEntity], { nullable: true })
  images?: ImageEpreuveCreateEntity[];

  @Field(() => [Number], { nullable: true })
  deletedImageIds?: number[];
}

export default EpreuveEntity;
