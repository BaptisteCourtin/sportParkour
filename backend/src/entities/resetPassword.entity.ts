import {
  AfterInsert,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user.entity";
import { Field, InputType, ObjectType } from "type-graphql";
import Mailer from "../lib/mailer";

import dotenv from "dotenv";
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
  @Column({ type: "datetime" })
  expirationDate: Date;

  // @Field()
  // @Column({ type: "timestamp" })
  // expirationDate: Date;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

@InputType()
export class ResetPasswordUpdateEntity {
  @Field()
  token: string;

  @Field()
  password: string;
}
