import { IsString, IsOptional, IsInt, Min, IsEnum, IsBoolean, IsEmail, IsNotEmpty, MinLength, IsNumber } from "class-validator";

export class StartGameDto {
  @IsInt()
  public startNumber: number

  @IsString()
  public player1: string

  @IsString()
  @IsOptional()
  public player2: string
}

export class JoinGameDto {
    @IsString()
    public player2: string

    @IsNumber()
    @IsOptional()
    public inputNumber: number
}

export class MakeMoveDto {
    @IsNumber()
    public inputNumber: number
}
