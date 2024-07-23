import { Field, ObjectType } from "type-graphql";

@ObjectType()
class MessageEntity {
  @Field()
  message: string;
  @Field()
  success: boolean;
}

export default MessageEntity;
