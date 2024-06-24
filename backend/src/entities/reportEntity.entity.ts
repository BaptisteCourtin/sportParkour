import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import UserEntity from "./user.entity";
import JoinUserParkourNoteEntity from "./joinUserParkourNote.entity";
import { ReportStatus } from "../enum/statusReport.enum";

// comment éviter le multi report ? vérifier reporter_id + malfrat_id + parkour_id
@Entity("report")
@ObjectType()
export class ReportEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // pour éviter que l'utilisateur enlève le commentaire
  @Field({ nullable: true })
  @Column({ type: "varchar", length: 500, nullable: true })
  commentaireEnFaute: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => ReportStatus)
  @Column({ type: "enum", enum: ReportStatus, default: ReportStatus.NON_VU })
  status: ReportStatus;

  // ---

  // pour vérifier que y'ai pas un chieur
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "reporter_id" })
  reporter: UserEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (malfrat) => malfrat.reports)
  @JoinColumn({ name: "malfrat_id" })
  malfrat: UserEntity;

  @Field(() => JoinUserParkourNoteEntity)
  @ManyToOne(() => JoinUserParkourNoteEntity, (note) => note.reports)
  @JoinColumn([
    { name: "reported_user_id", referencedColumnName: "user_id" },
    { name: "reported_parkour_id", referencedColumnName: "parkour_id" },
  ])
  reportedNote: JoinUserParkourNoteEntity;
}
