import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UUID } from 'crypto';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  postId: UUID;

  @Prop({ required: true, max: 100 })
  title: string;

  @Prop({ required: true, max: 1000 })
  desc: string;

  @Prop({ required: true, max: 5000 })
  content: string;

  @Prop({ default: '' })
  categories: string;

  @Prop(
    raw({
      imgType: { type: String },
      filename: { type: String },
      data: { type: Buffer },
      size: { type: String },
    }),
  )
  thumbnail: Record<string, any>;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
