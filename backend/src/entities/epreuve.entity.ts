import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

import ImageEpreuveEntity, {
  ImageEpreuveCreateEntity,
} from "./imageEpreuve.entity";
import ParkourEntity from "./parkour.entity";

@Entity("epreuve")
@ObjectType()
class EpreuveEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 50, unique: true })
  title: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 1000, nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  easyToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  mediumToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  hardToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 300, nullable: true })
  videoLink: string;

  // pas besoin de join column en many to one
  @Field(() => [ImageEpreuveEntity], { nullable: true })
  @OneToMany(() => ImageEpreuveEntity, (img) => img.epreuve_id, {
    nullable: true,
  })
  images: ImageEpreuveEntity[];

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
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  easyToDo: string;
  @Field({ nullable: true })
  mediumToDo: string;
  @Field({ nullable: true })
  hardToDo: string;
  @Field({ nullable: true })
  videoLink: string;
  @Field(() => [ImageEpreuveCreateEntity], { nullable: true })
  images: ImageEpreuveCreateEntity[];
}

// obliger de mettre nullable: true si on veut modifier que certain champs
@InputType()
export class EpreuveUpdateEntity {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  easyToDo: string;
  @Field({ nullable: true })
  mediumToDo: string;
  @Field({ nullable: true })
  hardToDo: string;
  @Field({ nullable: true })
  videoLink: string;
  @Field(() => [ImageEpreuveCreateEntity], { nullable: true })
  images: ImageEpreuveCreateEntity[];
  @Field(() => [Number], { nullable: true })
  deletedImageIds: number[];
}

export default EpreuveEntity;
