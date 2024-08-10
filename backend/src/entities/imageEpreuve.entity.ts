import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { MaxLength } from "class-validator";

import EpreuveEntity from "./epreuve.entity";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

@Entity("image_epreuve")
@ObjectType()
class ImageEpreuveEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: process.env.NEXT_PUBLIC_LENGTH_LINK })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK as string))
  lien: string;

  @Field()
  @Column({ default: false })
  isCouverture: boolean;

  // ---

  @Field(() => EpreuveEntity)
  @ManyToOne(() => EpreuveEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "epreuve_id" })
  epreuve_id: EpreuveEntity;
}

@InputType()
export class ImageEpreuveCreateEntity {
  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK as string))
  lien: string;

  @Field()
  isCouverture: boolean;
}

export default ImageEpreuveEntity;
