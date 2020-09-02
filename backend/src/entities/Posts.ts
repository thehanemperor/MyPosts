import { Entity, PrimaryKey, Property  } from "@mikro-orm/core"
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  //if not include @Field, such column can't be selected
  @Field(()=> Int)
  @PrimaryKey()
  id!: number;

  @Field(()=> String)
  @Property({type: "date"})
  createdAt = new Date();

  @Field(()=> String)
  @Property({ type:"date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({type: "text"})
  title!: string;

 

}