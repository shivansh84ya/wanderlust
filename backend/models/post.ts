// models/post.ts

import { Schema, model, Document, Types } from 'mongoose';

export interface IPost extends Document {
  authorName: string;
  title: string;
  imageLink: string;
  categories: string[];
  description: string;
  isFeaturedPost: boolean;
  timeOfPost: Date;
  authorId: Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  authorName: { type: String, required: true },
  title: { type: String, required: true },
  imageLink: { type: String, required: true },
  categories: { type: [String], required: true },
  description: { type: String, required: true },
  isFeaturedPost: { type: Boolean, default: false },
  timeOfPost: { type: Date, default: Date.now },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Post = model<IPost>('Post', postSchema);
export default Post;
