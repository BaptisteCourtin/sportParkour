import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import UserEntity from "./user.entity";
import ParkourEntity from "./parkour.entity";

// se cré si le user met une note ou un like sur un parkour
@Entity("join_user_parkour")
@ObjectType()
export class JoinUserParkourEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: number;

  @Field(() => ID)
  @PrimaryColumn()
  parkour_id: number;

  @Field()
  @Column("decimal", { precision: 3, scale: 2, nullable: true })
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
