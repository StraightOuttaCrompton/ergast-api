import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { DriverStandingsService } from "./driverStandings.service";
import { GetDriverStandingsDto } from "./dto/get-driver-standings.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("driverStandings")
@Controller("driverStandings")
export class DriverStandingsController {
    constructor(private readonly driverStandingsService: DriverStandingsService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(@Query() query: GetDriverStandingsDto) {
        return this.driverStandingsService.getDriverStandings(query);
    }
}
