import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
const argon2 = require("argon2");

import { Role } from "../enum/role.enum";
import JoinUserParkourEntity from "./joinUserParkour.entity";

@Entity("user")
@ObjectType()
class UserEntity {
  @BeforeInsert()
  protected async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  password: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  name: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  firstname: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
    unique: true,
    transformer: {
      from(value: string) {
        return value.toLowerCase();
        // from ⇒ permet d’altérer la donnée renvoyée lorsque vous la récupérez de la base de donnée
      },
      to(value: string) {
        return value.toLowerCase();
        // to ⇒ permet d’altérer la donnée au moment de l’envoyer en base de donnée
      },
    },
  })
  email: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 200, nullable: true })
  adress: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 10, nullable: true })
  phone: string;

  @Field(() => Role)
  @Column({
    type: "text",
    default: Role.CLIENT,
  })
  role: Role;

  @Field(() => [JoinUserParkourEntity], { nullable: true })
  @OneToMany(() => JoinUserParkourEntity, (join) => join.users, {
    nullable: true,
  })
  parkours: JoinUserParkourEntity[];
}

// ---

// quand le user s'enregistre (la première fois)
@InputType()
export class UserInputRegisterEntity {
  @Field()
  password: string;
  @Field()
  name: string;
  @Field()
  firstname: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  adress: string;
  @Field({ nullable: true })
  phone: string;
}

// quand le user se login
@InputType()
export class UserInputAuthEntity {
  @Field()
  password: string;
  @Field()
  email: string;
}

// update du user (changement des infos)
@InputType()
export class UserUpdateEntity {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  firstname: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  adress: string;
  @Field({ nullable: true })
  phone: string;
}

export default UserEntity;
