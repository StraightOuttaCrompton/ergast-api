import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { CommonDto } from "../../../common.dto";

export class GetStatusDto extends CommonDto {
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

    @IsOptional()
    @IsNotEmpty()
    driverId?: string;

    @IsOptional()
    @IsNotEmpty()
    constructorId?: string;

    @IsOptional()
    @IsNotEmpty()
    circuitId?: string;

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
}
