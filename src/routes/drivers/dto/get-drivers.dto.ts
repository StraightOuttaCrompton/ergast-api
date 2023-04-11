import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { CommonDto } from "../../../common.dto";

export class GetDriversDto extends CommonDto {
    @IsOptional()
    @IsNotEmpty()
    circuitId?: string;

    @IsOptional()
    @IsNotEmpty()
    constructorId?: string;

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
    status?: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    driverStandings?: number;
}
