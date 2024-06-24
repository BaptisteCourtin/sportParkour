import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Max, Min } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";

import UserEntity from "./user.entity";
import ParkourEntity from "./parkour.entity";
import { ReportEntity } from "./reportEntity.entity";

// se cré si le user met une note ou un like sur un parkour
@Entity("join_user_parkour_note")
@ObjectType()
export class JoinUserParkourNoteEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: string;

  @Field(() => ID)
  @PrimaryColumn()
  parkour_id: number;

  // precision = maximum number of digits that are stored for the values
  // scale = the number of digits to the right of the decimal point
  @Field()
  @Column("decimal", { precision: 3, scale: 2, unsigned: true })
  @Min(0, { message: "La valeur minimale est 0" })
  @Max(5, { message: "La valeur maximale est 5" })
  note: number;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 500, nullable: true })
  commentaire: string;

  // ---

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.notesParkours, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Field(() => ParkourEntity)
  @ManyToOne(() => ParkourEntity, (parkour) => parkour.notesParkours, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parkour_id" })
  parkour: ParkourEntity;

  // ---

  @Field(() => [ReportEntity], { nullable: true })
  @OneToMany(() => ReportEntity, (report) => report.reportedNote, {
    nullable: true,
  })
  reports: ReportEntity[];
}

@InputType()
export class JoinUserParkourNoteCreateEntity {
  @Field()
  parkour_id: number;
  @Field({ nullable: true })
  note: number;
  @Field({ nullable: true })
  commentaire: string;
}

@InputType()
export class JoinUserParkourNoteUpdateEntity {
  @Field()
  parkour_id: number;
  @Field({ nullable: true })
  note: number;
  @Field({ nullable: true })
  commentaire: string;
}

export default JoinUserParkourNoteEntity;
