import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { CommonDto } from "../../../common.dto";

export class GetConstructorsDto extends CommonDto {
    @IsOptional()
    @IsNotEmpty()
    circuitId?: string;

    @IsOptional()
    @IsNotEmpty()
    driverId?: string;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    year?: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    round?: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    grid?: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    result?: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    fastest?: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    status?: number; // TODO: validate for actual status values

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    constructorStandings?: number;
}
