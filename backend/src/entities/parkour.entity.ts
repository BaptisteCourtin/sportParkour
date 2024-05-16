import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import EpreuveEntity from "./epreuve.entity";

import { Difficulty } from "../enum/difficulty.enum";
import ImageParkourEntity from "./imageParkour.entity";

@Entity("parkour")
@ObjectType()
class ParkourEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ nullable: true })
  time: string;

  @Field()
  @Column({ nullable: true })
  length: string;

  @Field(() => Difficulty)
  @Column({
    type: "text",
    nullable: true,
  })
  difficulty: Difficulty;

  @Field()
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column()
  start: string;

  @Field()
  @Column({ nullable: true })
  note: number;

  @Field()
  @Column({ nullable: true })
  nbVote: number;

  @Field(() => EpreuveEntity)
  @ManyToMany(() => EpreuveEntity, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    nullable: true,
  })
  @JoinTable({
    name: "join_parkour_epreuve",
    joinColumn: {
      name: "parkour_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "epreuve_id",
      referencedColumnName: "id",
    },
  })
  epreuves: EpreuveEntity[];

  @Field(() => [ImageParkourEntity])
  @OneToMany(() => ImageParkourEntity, (img) => img.id_parkour)
  images: ImageParkourEntity[];
}

// ---

@InputType()
export class ParkourCreateEntity {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  time: string;
  @Field()
  length: string;
  @Field(() => Difficulty)
  difficulty: Difficulty;
  @Field()
  city: string;
  @Field()
  start: string;
  @Field()
  note: number;
  @Field()
  nbVote: number;
}

@InputType()
export class ParkourUpdateEntity {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  time: string;
  @Field({ nullable: true })
  length: string;
  @Field(() => Difficulty, { nullable: true })
  difficulty: Difficulty;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  start: string;
  @Field({ nullable: true })
  note: number;
  @Field({ nullable: true })
  nbVote: number;
}

export default ParkourEntity;
