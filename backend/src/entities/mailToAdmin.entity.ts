import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { MaxLength } from "class-validator";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

import { SujetMailToAdmin } from "../enum/sujetMailToAdmin.enum";

@Entity("mail_to_admin")
@ObjectType()
class MailToAdminEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => SujetMailToAdmin)
  @Column({
    type: "text",
    enum: SujetMailToAdmin,
  })
  sujet: SujetMailToAdmin;

  @Field()
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_NOM,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  name: string;

  @Field()
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_NOM,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  firstname: string;

  @Field()
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_EMAIL,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_EMAIL as string))
  emailUser: string;

  @Field()
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_MESSAGETOADMIN,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_MESSAGETOADMIN as string))
  messageToAdmin: string;
}

@InputType()
export class MailToAdminCreateEntity {
  @Field(() => SujetMailToAdmin)
  sujet: SujetMailToAdmin;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  name: string;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  firstname: string;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_EMAIL as string))
  emailUser: string;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_EMAILTOADMIN as string))
  messageToAdmin: string;
}

export default MailToAdminEntity;
