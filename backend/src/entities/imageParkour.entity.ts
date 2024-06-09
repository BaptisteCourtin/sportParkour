import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import ParkourEntity from "./parkour.entity";

@Entity("image_parkour")
@ObjectType()
class ImageParkourEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  lien: string;

  @Field()
  @Column({ default: false })
  isCouverture: boolean;

  @Field(() => ParkourEntity)
  @ManyToOne(() => ParkourEntity, {
    onDelete: "CASCADE",
  })
  id_parkour: ParkourEntity;
}

export default ImageParkourEntity;
