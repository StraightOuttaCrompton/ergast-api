import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DriversService } from "./drivers.service";
import { GetDriversDto } from "./dto/get-drivers.dto";

@ApiTags("drivers")
@Controller("drivers")
export class DriversController {
    constructor(private readonly driversService: DriversService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(@Query() query: GetDriversDto) {
        return this.driversService.getDrivers(query);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.driversService.getDriver(id);
    }
}
