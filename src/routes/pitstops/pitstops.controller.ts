import { Controller, Get, Param, Query } from "@nestjs/common";
import { PitstopsService } from "./pitstops.service";
import { GetPitstopsDto } from "./dto/get-pitstops.dto";

@Controller("pitstops")
export class PitstopsController {
    constructor(private readonly pitstopsService: PitstopsService) {}

    @Get()
    findAll(@Query() query: GetPitstopsDto) {
        return this.pitstopsService.getPitstops({ query });
    }

    @Get(":pitstopNumber")
    findOne(@Param("pitstopNumber") pitstopNumber: number, @Query() query: GetPitstopsDto) {
        return this.pitstopsService.getPitstops({ pitstopNumber, query });
    }
}
