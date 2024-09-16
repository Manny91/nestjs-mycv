import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1930)
  @Max(2060)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(10000000)
  mileage: number;

  @IsNumber()
  @IsLongitude()
  lng: number;

  @IsNumber()
  @IsLatitude()
  lat: number;
}
