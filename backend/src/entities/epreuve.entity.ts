import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import ImageEpreuveEntity from "./imageEpreuve.entity";

@Entity("epreuve")
@ObjectType()
class EpreuveEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ nullable: true })
  easyToDo: string;

  @Field()
  @Column({ nullable: true })
  mediumToDo: string;

  @Field()
  @Column({ nullable: true })
  hardToDo: string;

  @Field()
  @Column({ nullable: true })
  videoLink: string;

  @Field(() => [ImageEpreuveEntity], { nullable: true })
  @OneToMany(() => ImageEpreuveEntity, (img) => img.id_epreuve)
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
