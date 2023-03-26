import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CommonDto {
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    offset: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    limit: number;
}
