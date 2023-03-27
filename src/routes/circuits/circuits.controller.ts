import { Controller, Get, Param, Query } from "@nestjs/common";
import { CircuitsService } from "./circuits.service";
import { GetCircuitsDto } from "./dto/get-circuits.dto";

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
