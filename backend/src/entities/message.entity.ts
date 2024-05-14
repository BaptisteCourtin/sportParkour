import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MessageEntity {
  @Field()
  message: string;
  @Field()
  success: boolean;
}
