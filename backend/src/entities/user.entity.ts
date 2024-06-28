import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
const argon2 = require("argon2");

import { Role } from "../enum/role.enum";
import { JoinUserParkourNoteEntity } from "./joinUserParkourNote.entity";
import JoinUserParkourFavorisEntity from "./joinUserParkourFavoris.entity";
import { ReportEntity } from "./reportEntity.entity";

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
      from(value: string | null): string | null {
        return value ? value.toLowerCase() : null;
      },
      to(value: string | null): string | null {
        return value ? value.toLowerCase() : null;
      },
    },
  })
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
  city: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 5, nullable: true })
  codePostal: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 10, nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
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

  // Vous n'avez pas besoin d'ajouter des @JoinColumn pour ces relations @OneToMany.
  // @JoinColumn est généralement utilisé du côté "propriétaire" de la relation, qui est typiquement le côté "Many" dans une relation @ManyToOne.
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
  password: string;
  @Field()
  name: string;
  @Field()
  firstname: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  codePostal: string;
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
  city: string;
  @Field({ nullable: true })
  codePostal: string;
  @Field({ nullable: true })
  phone: string;
  @Field({ nullable: true })
  imageProfil: string;
}

export default UserEntity;
