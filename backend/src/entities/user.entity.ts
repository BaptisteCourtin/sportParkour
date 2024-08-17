import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { MaxLength } from "class-validator";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

import { Role } from "../enum/role.enum";
import JoinUserParkourNoteEntity from "./joinUserParkourNote.entity";
import JoinUserParkourFavorisEntity from "./joinUserParkourFavoris.entity";
import ReportEntity from "./reportEntity.entity";

const argon2 = require("argon2");

@Entity("user")
@Unique(["email"])
@ObjectType()
class UserEntity {
  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_MAX_PASSWORD,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_MAX_PASSWORD as string))
  password: string;

  @Field()
  @Column({ type: "varchar", length: process.env.NEXT_PUBLIC_LENGTH_NOM })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  name: string;

  @Field()
  @Column({ type: "varchar", length: process.env.NEXT_PUBLIC_LENGTH_NOM })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  firstname: string;

  @Field()
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_EMAIL,
    unique: true,
    transformer: {
      from(value: string | null): string | null {
        return value ? value.toLowerCase() : null;
      },
      to(value: string | null): string | null {
        return value ? value.toLowerCase() : null;
      },
    },
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_EMAIL as string))
  email: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_CITY,
    nullable: true,
    transformer: {
      from(value: string | null): string | null {
        return value ? value.toLowerCase() : null;
      },
      to(value: string | null): string | null {
        return value ? value.toLowerCase() : null;
      },
    },
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_CITY as string))
  city: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_CODE_POSTAL,
    nullable: true,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_CODE_POSTAL as string))
  codePostal: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_PHONE,
    nullable: true,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_PHONE as string))
  phone: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: process.env.NEXT_PUBLIC_LENGTH_LINK,
    nullable: true,
  })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK as string))
  imageProfil: string;

  @Field(() => Role)
  @Column({
    type: "text",
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

  // nb report validé par admin
  @Field({ nullable: true })
  @Column({ type: "int", unsigned: true, default: 0 })
  nbReportValide: number;

  // nb report envoyé
  @Field({ nullable: true })
  @Column({ type: "int", unsigned: true, default: 0 })
  nbReportAjoute: number;

  // ---

  @Field(() => [JoinUserParkourFavorisEntity], { nullable: true })
  @OneToMany(() => JoinUserParkourFavorisEntity, (like) => like.user, {
    nullable: true,
  })
  favorisParkours: JoinUserParkourFavorisEntity[];

  @Field(() => [JoinUserParkourNoteEntity], { nullable: true })
  @OneToMany(() => JoinUserParkourNoteEntity, (note) => note.user, {
    nullable: true,
  })
  notesParkours: JoinUserParkourNoteEntity[];

  // ---

  @Field(() => [ReportEntity], { nullable: true })
  @OneToMany(() => ReportEntity, (report) => report.malfrat, {
    nullable: true,
  })
  reports: ReportEntity[];
}

// ---

// quand le user s'enregistre (la première fois)
@InputType()
export class UserInputRegisterEntity {
  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_MAX_PASSWORD as string))
  password: string;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  name: string;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  firstname: string;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_EMAIL as string))
  email: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_CITY as string))
  city: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_CODE_POSTAL as string))
  codePostal: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_PHONE as string))
  phone: string;
}

// quand le user se login
@InputType()
export class UserInputAuthEntity {
  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_MAX_PASSWORD as string))
  password: string;

  @Field()
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_EMAIL as string))
  email: string;
}

// update du user (changement des infos)
@InputType()
export class UserUpdateEntity {
  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  name: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_NOM as string))
  firstname: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_EMAIL as string))
  email: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_CITY as string))
  city: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_CODE_POSTAL as string))
  codePostal: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_PHONE as string))
  phone: string;

  @Field({ nullable: true })
  @MaxLength(parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK as string))
  imageProfil: string;
}

export default UserEntity;
