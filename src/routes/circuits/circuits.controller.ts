import { Controller, Get, Param, Query } from "@nestjs/common";
import { CircuitsService } from "./circuits.service";
import { GetCircuitsDto } from "./dto/get-circuits.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("circuits")
@Controller("circuits")
export class CircuitsController {
    constructor(private readonly circuitsService: CircuitsService) {}

    @Get()
    findAll(@Query() query: GetCircuitsDto) {
        return this.circuitsService.getCircuits(query);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.circuitsService.getCircuit(id);
    }
}
