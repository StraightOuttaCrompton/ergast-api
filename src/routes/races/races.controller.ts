import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { RacesService } from "./races.service";
import { GetRacesDto } from "./dto/get-races.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("races")
@Controller("races")
export class RacesController {
    constructor(private readonly racesService: RacesService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(@Query() query: GetRacesDto) {
        return this.racesService.getRaces(query);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":year/:round")
    findOne(@Param("year") year: number, @Param("round") round: number) {
        return this.racesService.getRace(year, round);
    }
}
