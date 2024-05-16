import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
// const argon2 = require("argon2");

import { Role } from "../enum/role.enum";
import ParkourEntity from "./parkour.entity";

// user en entier
@Entity("user")
@ObjectType()
class UserEntity {
  // @BeforeInsert()
  // protected async hashPassword() {
  //   this.password = await argon2.hash(this.password);
  // }

  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ length: 100 })
  password: string;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ length: 100 })
  firstname: string;

  @Field()
  @Column({
    length: 100,
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

  @Field()
  @Column({ length: 200, nullable: true })
  adress: string;

  @Field()
  @Column({ length: 10, nullable: true })
  phone: string;

  @Field(() => Role)
  @Column({
    type: "text",
    default: Role.CLIENT,
  })
  role: Role;

  @Field(() => ParkourEntity)
  @ManyToMany(() => ParkourEntity, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    nullable: true,
  })
  @JoinTable({
    name: "join_user_parkour",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "parkour_id",
      referencedColumnName: "id",
    },
  })
  parkours: ParkourEntity[];
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
export class UserInputLoginEntity {
  @Field()
  password: string;
  @Field()
  email: string;
}

// update du user (changement des infos)
@InputType()
export class UserUpdateEntity {
  @Field({ nullable: true })
  password: string;
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
