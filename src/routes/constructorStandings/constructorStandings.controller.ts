import { Controller, Get, Query } from "@nestjs/common";
import { ConstructorStandingsService } from "./constructorStandings.service";
import { GetConstructorStandingsDto } from "./dto/get-constructor-standings.dto";

@Controller("constructorStandings")
export class ConstructorStandingsController {
    constructor(private readonly constructorStandingsService: ConstructorStandingsService) {}

    @Get()
    findAll(@Query() query: GetConstructorStandingsDto) {
        return this.constructorStandingsService.getConstructorStandings(query);
    }
}
