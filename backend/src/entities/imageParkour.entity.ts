import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { MaxLength } from "class-validator";

import ParkourEntity from "./parkour.entity";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

@Entity("image_parkour")
@ObjectType()
class ImageParkourEntity {
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

  @Field(() => ParkourEntity)
  @ManyToOne(() => ParkourEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parkour_id" })
  parkour_id: ParkourEntity;
}

@InputType()
export class ImageParkourCreateEntity {
  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK as string))
  lien: string;

  @Field()
  isCouverture: boolean;
}

export default ImageParkourEntity;
