import {
  AfterInsert,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

import User from "./user.entity";
import Mailer from "../lib/mailer";

import dotenv from "dotenv";
import { MaxLength } from "class-validator";
dotenv.config({
  path: "../.env",
});

@Entity("reset_password")
@ObjectType()
export default class ResetPasswordEntity {
  @AfterInsert()
  @AfterUpdate()
  async sendTokenByMail() {
    const mailer = new Mailer(
      this.user.email,
      "Réinitialisation de mot de passe",
      `${process.env.FRONT_LINK}/auth/resetPassword/${this.resetToken}`
    );
    await mailer.sender();
  }

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  resetToken: string;

  @Field()
  @Column()
  expirationDate: Date;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({ name: "user" })
  user: User;
}

@InputType()
export class ResetPasswordUpdateEntity {
  @Field()
  token: string;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_MAX_PASSWORD as string))
  password: string;
}
