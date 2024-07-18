import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Max, MaxLength, Min } from "class-validator";

import UserEntity from "./user.entity";
import ParkourEntity from "./parkour.entity";
import { LENGTH_COMMENTAIRE } from "../../../variablesLength";

// se cré si le user met une note ou un like sur un parkour
@Entity("join_user_parkour_note")
@Unique(["user_id", "parkour_id"])
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
  @Column("decimal", { precision: 2, scale: 1, unsigned: true })
  @Min(0, { message: "La valeur minimale est 0" })
  @Max(5, { message: "La valeur maximale est 5" })
  note: number;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: LENGTH_COMMENTAIRE, nullable: true })
  @MaxLength(LENGTH_COMMENTAIRE)
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
}

@InputType()
export class JoinUserParkourNoteCreateEntity {
  @Field()
  parkour_id: number;

  @Field()
  @Min(0)
  @Max(5)
  note: number;

  @Field({ nullable: true })
  @MaxLength(LENGTH_COMMENTAIRE)
  commentaire: string;
}

@InputType()
export class JoinUserParkourNoteUpdateEntity {
  @Field()
  parkour_id: number;

  @Field()
  @Min(0)
  @Max(5)
  note: number;

  @Field({ nullable: true })
  @MaxLength(LENGTH_COMMENTAIRE)
  commentaire: string;
}

export default JoinUserParkourNoteEntity;
