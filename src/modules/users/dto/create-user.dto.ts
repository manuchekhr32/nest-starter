import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fullName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @Matches(/^[a-z](?:[a-z0-9]*(?:_[a-z0-9]+)*)?$/, {
    message:
      'Username should be in lowercase, start with letter and should not contain double underscore "__"',
  })
  username: string;
}
