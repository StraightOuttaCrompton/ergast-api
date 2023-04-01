import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { CommonDto } from "../../../common.dto";

export class GetLapsDto extends CommonDto {
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    year: number;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    round: number;

    @IsOptional()
    @IsNotEmpty()
    driverId?: string;
}
