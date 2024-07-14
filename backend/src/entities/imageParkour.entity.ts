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

@Entity("image_parkour")
@ObjectType()
class ImageParkourEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 250 })
  @MaxLength(250)
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
  @MaxLength(250)
  lien: string;

  @Field()
  isCouverture: boolean;
}

export default ImageParkourEntity;
