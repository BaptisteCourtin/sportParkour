import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  Unique,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import UserEntity from "./user.entity";
import { ReportStatus } from "../enum/reportStatus.enum";
import ParkourEntity from "./parkour.entity";

@Entity("report")
@Unique(["malfrat_id", "parkour_id", "commentaireEnFaute"])
@ObjectType()
export class ReportEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Index()
  reporter_id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Index()
  malfrat_id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Index()
  parkour_id: number;

  // pour éviter que l'utilisateur enlève le commentaire
  @Field()
  @Column({ type: "varchar", length: 500 })
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

  // pour vérifier que y'ai pas un chieur
  @Field(() => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "reporter_id" })
  reporter: UserEntity;

  // du coup ça sert à rien de garder les reports vu que je peux pas accéder au user ou à son email
  // à moins de rajouter l'email ici ?
  @Field(() => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, {
    nullable: true,
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
