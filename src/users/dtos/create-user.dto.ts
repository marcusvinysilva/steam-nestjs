import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Informe um endereço de email' })
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  email: string;

  @IsNotEmpty({ message: 'Informe o nome do usuário' })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'Informe uma data de nascimento' })
  @MaxLength(20, {
    message: 'A data de nascimento deve ter menos de 20 caracteres',
  })
  nascimento: string;

  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'Informe a confirmação de senha' })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no minimo 6 caracteres',
  })
  passwordConfirmation: string;
}
