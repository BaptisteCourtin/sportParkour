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

import { Role } from "../enum/role.enum";
import JoinUserParkourNoteEntity from "./joinUserParkourNote.entity";
import JoinUserParkourFavorisEntity from "./joinUserParkourFavoris.entity";
import ReportEntity from "./reportEntity.entity";
import { MaxLength } from "class-validator";

import {
  LENGTH_MAX_PASSWORD,
  LENGTH_NOM,
  LENGTH_EMAIL,
  LENGTH_CITY,
  LENGTH_CODE_POSTAL,
  LENGTH_PHONE,
} from "../../../variablesLength";

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
  @Column({ type: "varchar", length: LENGTH_MAX_PASSWORD })
  @MaxLength(LENGTH_MAX_PASSWORD)
  password: string;

  @Field()
  @Column({ type: "varchar", length: LENGTH_NOM })
  @MaxLength(LENGTH_NOM)
  name: string;

  @Field()
  @Column({ type: "varchar", length: LENGTH_NOM })
  @MaxLength(LENGTH_NOM)
  firstname: string;

  @Field()
  @Column({
    type: "varchar",
    length: LENGTH_EMAIL,
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
  @MaxLength(LENGTH_EMAIL)
  email: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: LENGTH_CITY,
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
  @MaxLength(LENGTH_CITY)
  city: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: LENGTH_CODE_POSTAL, nullable: true })
  @MaxLength(LENGTH_CODE_POSTAL)
  codePostal: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: LENGTH_PHONE, nullable: true })
  @MaxLength(LENGTH_PHONE)
  phone: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: LENGTH_CITY, nullable: true })
  @MaxLength(LENGTH_CITY)
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
  @MaxLength(LENGTH_MAX_PASSWORD)
  password: string;

  @Field()
  @MaxLength(LENGTH_NOM)
  name: string;

  @Field()
  @MaxLength(LENGTH_NOM)
  firstname: string;

  @Field()
  @MaxLength(LENGTH_EMAIL)
  email: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_CITY)
  city: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_CODE_POSTAL)
  codePostal: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_PHONE)
  phone: string;
}

// quand le user se login
@InputType()
export class UserInputAuthEntity {
  @Field()
  @MaxLength(LENGTH_MAX_PASSWORD)
  password: string;

  @Field()
  @MaxLength(LENGTH_EMAIL)
  email: string;
}

// update du user (changement des infos)
@InputType()
export class UserUpdateEntity {
  @Field({ nullable: true })
  @MaxLength(LENGTH_NOM)
  name: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_NOM)
  firstname: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_EMAIL)
  email: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_CITY)
  city: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_CODE_POSTAL)
  codePostal: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_PHONE)
  phone: string;

  @Field({ nullable: true })
  @MaxLength(LENGTH_CITY)
  imageProfil: string;
}

export default UserEntity;
