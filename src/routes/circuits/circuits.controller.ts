import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { CircuitsService } from "./circuits.service";
import { CircuitDto, GetCircuitsParamsDto } from "./dto/get-circuits.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("circuits")
@Controller("circuits")
export class CircuitsController {
    constructor(private readonly circuitsService: CircuitsService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll(@Query() query: GetCircuitsParamsDto) {
        const circuits = await this.circuitsService.getCircuits(query);

        return circuits.map((circuit) => new CircuitDto(circuit));
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.circuitsService.getCircuit(id);
    }
}
