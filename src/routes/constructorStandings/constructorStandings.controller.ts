import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ConstructorStandingsService } from "./constructorStandings.service";
import { GetConstructorStandingsDto } from "./dto/get-constructor-standings.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("constructorStandings")
@Controller("constructorStandings")
export class ConstructorStandingsController {
    constructor(private readonly constructorStandingsService: ConstructorStandingsService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(@Query() query: GetConstructorStandingsDto) {
        return this.constructorStandingsService.getConstructorStandings(query);
    }
}
