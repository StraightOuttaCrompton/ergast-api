import { Controller, Get, Param, Query } from "@nestjs/common";
import { DriversService } from "./drivers.service";
import { GetDriversDto } from "./dto/get-drivers.dto";

@Controller("drivers")
export class DriversController {
    constructor(private readonly driversService: DriversService) {}

    @Get()
    findAll(@Query() query: GetDriversDto) {
        return this.driversService.getDrivers(query);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.driversService.getDriver(id);
    }
}
