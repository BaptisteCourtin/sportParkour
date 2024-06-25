import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

import UserEntity from "./user.entity";
import ParkourEntity from "./parkour.entity";

@Entity("join_user_parkour_favoris")
@Unique(["user_id", "parkour_id"])
@ObjectType()
export class JoinUserParkourFavorisEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: string;

  @Field(() => ID)
  @PrimaryColumn()
  parkour_id: number;

  // ---

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.favorisParkours, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Field(() => ParkourEntity)
  @ManyToOne(() => ParkourEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parkour_id" })
  parkour: ParkourEntity;
}

@InputType()
export class JoinUserParkourFavorisCreateEntity {
  @Field()
  parkour_id: number;
  @Field({ nullable: true })
  favoris: boolean;
}

export default JoinUserParkourFavorisEntity;
