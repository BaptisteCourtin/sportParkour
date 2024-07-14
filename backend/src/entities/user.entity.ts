import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

import { Role } from "../enum/role.enum";
import JoinUserParkourNoteEntity from "./joinUserParkourNote.entity";
import JoinUserParkourFavorisEntity from "./joinUserParkourFavoris.entity";
import ReportEntity from "./reportEntity.entity";
import { MaxLength } from "class-validator";

const argon2 = require("argon2");

@Entity("user")
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
  @Column({ type: "varchar", length: 100 })
  @MaxLength(100)
  password: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  @MaxLength(100)
  name: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  @MaxLength(100)
  firstname: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
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
  @MaxLength(255)
  email: string;

  @Field({ nullable: true })
  @Column({
    type: "varchar",
    length: 50,
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
  @MaxLength(50)
  city: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 5, nullable: true })
  @MaxLength(5)
  codePostal: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 10, nullable: true })
  @MaxLength(10)
  phone: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  @MaxLength(250)
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
  @Column({ type: "int", default: 0 })
  nbReportValide: number;

  // nb report envoyé
  @Field({ nullable: true })
  @Column({ type: "int", default: 0 })
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
  @MaxLength(100)
  password: string;

  @Field()
  @MaxLength(100)
  name: string;

  @Field()
  @MaxLength(100)
  firstname: string;

  @Field()
  @MaxLength(255)
  email: string;

  @Field({ nullable: true })
  @MaxLength(50)
  city: string;

  @Field({ nullable: true })
  @MaxLength(5)
  codePostal: string;

  @Field({ nullable: true })
  @MaxLength(10)
  phone: string;
}

// quand le user se login
@InputType()
export class UserInputAuthEntity {
  @Field()
  @MaxLength(100)
  password: string;

  @Field()
  @MaxLength(255)
  email: string;
}

// update du user (changement des infos)
@InputType()
export class UserUpdateEntity {
  @Field({ nullable: true })
  @MaxLength(100)
  name: string;

  @Field({ nullable: true })
  @MaxLength(100)
  firstname: string;

  @Field({ nullable: true })
  @MaxLength(255)
  email: string;

  @Field({ nullable: true })
  @MaxLength(50)
  city: string;

  @Field({ nullable: true })
  @MaxLength(5)
  codePostal: string;

  @Field({ nullable: true })
  @MaxLength(10)
  phone: string;

  @Field({ nullable: true })
  @MaxLength(250)
  imageProfil: string;
}

export default UserEntity;
