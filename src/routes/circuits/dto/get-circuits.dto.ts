import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { CommonDto } from "../../../common.dto";

export class GetCircuitsDto extends CommonDto {
    @IsOptional()
    @IsNotEmpty()
    driverId: string;

    @IsOptional()
    @IsNotEmpty()
    constructorId: string;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    year: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    round: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    grid: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    result: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    fastest: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    status: number; // TODO: validate for actual status values
}
