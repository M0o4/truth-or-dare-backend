import { CreatePlayerDto } from '@common/dto/player/create-player.dto';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Observable, of } from 'rxjs';
import * as multer from 'multer';
import { PlayerService } from '@common/services/player';
import { GetPlayerDto, GetPlayerPhotoDto } from '@common/dto/player';

@ApiTags('Players')
@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll(): Observable<string> {
    return of('All players');
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: GetPlayerDto,
  })
  createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Observable<GetPlayerDto> {
    return this.playerService.create(createPlayerDto);
  }

  @Patch('photo/:token')
  @ApiCreatedResponse({
    schema: {
      type: 'string',
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: 'public',
        filename: function (req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  @ApiParam({
    required: true,
    name: 'token',
  })
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  singleFile(
    @Param() { token }: { token: string },
    @UploadedFile() file: File,
  ): Observable<GetPlayerPhotoDto> {
    console.log(token);
    return this.playerService.uploadPhoto(file, token);
  }
}
