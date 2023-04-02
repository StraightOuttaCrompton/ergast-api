import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { CommonDto } from "../../../common.dto";
import Circuit, { CircuitLocation } from "../../../types/Circuit";

export class GetCircuitsParamsDto extends CommonDto {
    @IsOptional()
    @IsNotEmpty()
    driverId?: string;

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
    status?: number; // TODO: validate for actual status values
}

export class CircuitLocationDto implements CircuitLocation {
    lat: string; // TODO: number?
    long: string; // TODO: number?
    // alt: string; // TODO: number?
    locality: string;
    country: string;

    constructor(location: CircuitLocationDto) {
        Object.assign(this, location);
    }
}

export class CircuitDto implements Circuit {
    circuitId: string; // TODO: rename to id
    url: string;
    circuitName: string; // TODO: rename to name
    Location: CircuitLocationDto;

    constructor(circuit: CircuitDto) {
        Object.assign(this, circuit);
        this.Location = new CircuitLocationDto(circuit.Location);
    }
}
