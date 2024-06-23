import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import EpreuveEntity from "./epreuve.entity";

@Entity("image_epreuve")
@ObjectType()
class ImageEpreuveEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 250 })
  lien: string;

  @Field()
  @Column({ default: false })
  isCouverture: boolean;

  @Field(() => EpreuveEntity)
  @ManyToOne(() => EpreuveEntity, {
    onDelete: "CASCADE",
  })
  id_epreuve: EpreuveEntity;
}

export default ImageEpreuveEntity;
