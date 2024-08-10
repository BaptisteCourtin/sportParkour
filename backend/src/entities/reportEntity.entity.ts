import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  Unique,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";

import { ReportStatus } from "../enum/reportStatus.enum";
import UserEntity from "./user.entity";
import ParkourEntity from "./parkour.entity";
import { MaxLength } from "class-validator";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

@Entity("report")
@Unique(["malfrat_id", "parkour_id", "commentaireEnFaute"])
@ObjectType()
export class ReportEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Index()
  malfrat_id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  parkour_id: number;

  // pour éviter que l'utilisateur enlève le commentaire
  @Field()
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_COMMENTAIRE,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_COMMENTAIRE as string))
  commentaireEnFaute: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => ReportStatus)
  @Column({
    type: "text",
    enum: ReportStatus,
    default: ReportStatus.NON_VU,
  })
  status: ReportStatus;

  // ---

  // du coup ça sert à rien de garder les reports vu que je peux pas accéder au user ou à son email
  // à moins de rajouter l'email ici ?
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "malfrat_id" })
  malfrat: UserEntity;

  @Field(() => ParkourEntity, { nullable: true })
  @ManyToOne(() => ParkourEntity, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "parkour_id" })
  parkour: ParkourEntity;
}

export default ReportEntity;
