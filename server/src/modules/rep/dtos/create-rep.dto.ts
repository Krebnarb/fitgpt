import { DistanceUnit, TimeUnit, WeightUnit } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateRepDto {
  @IsInt()
  @IsNotEmpty()
  workoutSetItemInstanceId!: number;

  @IsInt()
  @IsNotEmpty()
  repNumber!: number;

  @IsInt()
  @IsNotEmpty()
  count!: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  weightUnit?: WeightUnit | null;

  @IsOptional()
  @IsNumber()
  distance?: number;

  @IsOptional()
  @IsString()
  distanceUnit?: DistanceUnit | null;

  @IsOptional()
  @IsNumber()
  time?: number;

  @IsOptional()
  @IsString()
  timeUnit?: TimeUnit | null;

  @IsOptional()
  @IsString()
  notes?: string;
}
