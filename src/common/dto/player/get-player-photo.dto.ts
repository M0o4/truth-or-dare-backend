import { ApiProperty } from '@nestjs/swagger';

export class GetPlayerPhotoDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  photo: string;
}
