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

@Entity("image_epreuve")
@ObjectType()
class ImageEpreuveEntity {
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
  @MaxLength(250)
  lien: string;

  @Field()
  isCouverture: boolean;
}

@InputType()
export class ImageEpreuveUpdateEntity {
  @Field()
  isCouverture: boolean;
}

export default ImageEpreuveEntity;
