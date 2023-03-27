import { Controller, Get, Param, Query } from "@nestjs/common";
import { RacesService } from "./races.service";
import { GetRacesDto } from "./dto/get-races.dto";

@Controller("races")
export class RacesController {
    constructor(private readonly racesService: RacesService) {}

    @Get()
    findAll(@Query() query: GetRacesDto) {
        return this.racesService.getRaces(query);
    }

    @Get(":year/:round")
    findOne(@Param("year") year: number, @Param("round") round: number) {
        return this.racesService.getRace(year, round);
    }
}
