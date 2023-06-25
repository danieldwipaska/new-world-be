import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.postsService.create(createPostDto, file);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':postId')
  findOne(@Param('postId') postId: string) {
    return this.postsService.findOne(postId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  remove(@Param('postId') postId: string) {
    return this.postsService.deleteById(postId);
  }
}
