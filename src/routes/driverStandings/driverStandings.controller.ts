import { Controller, Get, Query } from "@nestjs/common";
import { DriverStandingsService } from "./driverStandings.service";
import { GetDriverStandingsDto } from "./dto/get-driver-standings.dto";

@Controller("driverStandings")
export class DriverStandingsController {
    constructor(private readonly driverStandingsService: DriverStandingsService) {}

    @Get()
    findAll(@Query() query: GetDriverStandingsDto) {
        return this.driverStandingsService.getDriverStandings(query);
    }
}
