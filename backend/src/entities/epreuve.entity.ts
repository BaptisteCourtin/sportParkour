import {
  Column,
  Entity,
  Index,
  JoinColumn,
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
import { MaxLength } from "class-validator";

@Entity("epreuve")
@ObjectType()
class EpreuveEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 50, unique: true })
  @MaxLength(50)
  @Index() // vu que on fait beaucoup de recherche sur le titre
  title: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 1000, nullable: true })
  @MaxLength(1000)
  description: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  @MaxLength(250)
  easyToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  @MaxLength(250)
  mediumToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  @MaxLength(250)
  hardToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 150, nullable: true })
  @MaxLength(150)
  videoLink: string;

  // pas besoin de join column en many to one
  @Field(() => [ImageEpreuveEntity], { nullable: true })
  @OneToMany(() => ImageEpreuveEntity, (img) => img.epreuve_id, {
    nullable: true,
  })
  images: ImageEpreuveEntity[];

  // @Field(() => [ParkourEntity], { nullable: true })
  // @ManyToMany(() => ParkourEntity, {
  //   nullable: true,
  // })
  // @JoinTable({
  //   name: "join_parkour_epreuve",
  //   joinColumn: {
  //     name: "epreuve_id",
  //     referencedColumnName: "id",
  //   },
  //   inverseJoinColumn: {
  //     name: "parkour_id",
  //     referencedColumnName: "id",
  //   },
  // })
  // parkours: ParkourEntity[];

  @Field(() => [ParkourEntity], { nullable: true })
  @ManyToMany(() => ParkourEntity, { nullable: true })
  parkours: ParkourEntity[];
}

// ---

@InputType()
export class EpreuveCreateEntity {
  @Field()
  @MaxLength(50)
  title: string;

  @Field({ nullable: true })
  @MaxLength(1000)
  description: string;

  @Field({ nullable: true })
  @MaxLength(250)
  easyToDo: string;

  @Field({ nullable: true })
  @MaxLength(250)
  mediumToDo: string;

  @Field({ nullable: true })
  @MaxLength(250)
  hardToDo: string;

  @Field({ nullable: true })
  @MaxLength(150)
  videoLink: string;

  // ---

  @Field(() => [ImageEpreuveCreateEntity], { nullable: true })
  images: ImageEpreuveCreateEntity[];
}

// obliger de mettre nullable: true si on veut modifier que certain champs
@InputType()
export class EpreuveUpdateEntity {
  @Field({ nullable: true })
  @MaxLength(50)
  title?: string;

  @Field({ nullable: true })
  @MaxLength(1000)
  description?: string;

  @Field({ nullable: true })
  @MaxLength(250)
  easyToDo?: string;

  @Field({ nullable: true })
  @MaxLength(250)
  mediumToDo?: string;

  @Field({ nullable: true })
  @MaxLength(250)
  hardToDo?: string;

  @Field({ nullable: true })
  @MaxLength(150)
  videoLink?: string;

  // ---

  @Field(() => [ImageEpreuveCreateEntity], { nullable: true })
  images?: ImageEpreuveCreateEntity[];

  @Field(() => [Number], { nullable: true })
  deletedImageIds?: number[];
}

export default EpreuveEntity;
