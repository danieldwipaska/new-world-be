import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  //CREATE A POST
  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const newPost = new this.postModel({
        ...createPostDto,
        postId: v4(),
      });

      const post: Post = await newPost.save();

      return post;
    } catch (err) {
      throw err;
    }
  }

  //FIND ALL POSTS
  async findAll(): Promise<Post[]> {
    try {
      const posts: Post[] = await this.postModel.find();

      return posts;
    } catch (err) {
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  //DELETE A POST
  async deleteById(postId: string): Promise<Post> {
    try {
      const post: Post = await this.postModel.findOneAndDelete({ postId });
      if (!post) throw new NotFoundException('Post Not Found');

      return post;
    } catch (err) {
      throw err;
    }
  }
}