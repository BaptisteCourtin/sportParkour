import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import ImageEpreuveEntity from "./imageEpreuve.entity";

@Entity("epreuve")
@ObjectType()
class EpreuveEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 50, unique: true })
  title: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 750, nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  easyToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  mediumToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  hardToDo: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 250, nullable: true })
  videoLink: string;

  @Field(() => [ImageEpreuveEntity], { nullable: true })
  @OneToMany(() => ImageEpreuveEntity, (img) => img.id_epreuve, {
    nullable: true,
  })
  images: ImageEpreuveEntity[];
}

// ---

@InputType()
export class EpreuveCreateEntity {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field({ nullable: true })
  easyToDo: string;
  @Field({ nullable: true })
  mediumToDo: string;
  @Field({ nullable: true })
  hardToDo: string;
  @Field({ nullable: true })
  videoLink: string;
}

// obliger de mettre nullable: true si on veut modifier que certain champs
@InputType()
export class EpreuveUpdateEntity {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  easyToDo: string;
  @Field({ nullable: true })
  mediumToDo: string;
  @Field({ nullable: true })
  hardToDo: string;
  @Field({ nullable: true })
  videoLink: string;
}

export default EpreuveEntity;
