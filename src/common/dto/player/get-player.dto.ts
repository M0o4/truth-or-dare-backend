import { ApiProperty } from '@nestjs/swagger';

export class GetPlayerDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  name: string;
}
