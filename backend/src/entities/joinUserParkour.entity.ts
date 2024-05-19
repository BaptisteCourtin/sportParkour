import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Max, Min } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

import UserEntity from "./user.entity";
import ParkourEntity from "./parkour.entity";

// se cré si le user met une note ou un like sur un parkour
@Entity("join_user_parkour")
@ObjectType()
export class JoinUserParkourEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: string;

  @Field(() => ID)
  @PrimaryColumn()
  parkour_id: number;

  // precision = maximum number of digits that are stored for the values
  // scale = the number of digits to the right of the decimal point
  @Field()
  @Column("decimal", { precision: 3, scale: 2, unsigned: true, nullable: true })
  @Min(0, { message: "La valeur minimale est 0." })
  @Max(5, { message: "La valeur maximale est 5." })
  note: number;

  @Field()
  @Column({ default: false })
  favoris: boolean;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.parkours)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Field(() => ParkourEntity)
  @ManyToOne(() => ParkourEntity)
  @JoinColumn({ name: "parkour_id" })
  parkour: ParkourEntity;
}

export default JoinUserParkourEntity;
