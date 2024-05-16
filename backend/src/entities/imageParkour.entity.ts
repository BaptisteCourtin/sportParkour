import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import ParkourEntity from "./parkour.entity";

@Entity("image_parkour")
@ObjectType()
class ImageParkourEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  lien: string;

  @Field(() => ParkourEntity)
  @ManyToOne(() => ParkourEntity, {
    onDelete: "CASCADE",
  })
  id_parkour: ParkourEntity;
}

export default ImageParkourEntity;
