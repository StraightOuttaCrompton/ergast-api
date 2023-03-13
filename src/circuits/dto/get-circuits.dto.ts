import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";

export class GetCircuitsDto {
    /**
     * TODO: extract into class which this inherits from
     */
    @IsOptional()
    @IsInt()
    @IsPositive()
    offset: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    limit: number;
    /**
     * --------------------------------------------------
     */

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
