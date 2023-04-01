import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { CommonDto } from "../../../common.dto";

export class GetConstructorStandingsDto extends CommonDto {
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
    position?: number;
}
