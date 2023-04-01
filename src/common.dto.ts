import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "./consts";

export class CommonDto {
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    offset?: number = DEFAULT_OFFSET;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsPositive()
    limit?: number = DEFAULT_LIMIT;
}
