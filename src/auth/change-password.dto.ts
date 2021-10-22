import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres' })
  @MaxLength(32, { message: 'A senha deve ter no máximo 32 caracteres' })
  @IsString({ message: 'Informe uma senha válida' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe a confirmação de senha' })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no minimo 6 caracteres',
  })
  @MaxLength(32, {
    message: 'A confirmação senha deve ter no máximo 32 caracteres',
  })
  @IsString({ message: 'Informe uma confirmação de senha válida' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A confirmação de senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo',
  })
  passwordConfirmation: string;
}
