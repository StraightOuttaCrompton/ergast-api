import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { PitstopsService } from "./pitstops.service";
import { GetPitstopsDto } from "./dto/get-pitstops.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("pitstops")
@Controller("pitstops")
export class PitstopsController {
    constructor(private readonly pitstopsService: PitstopsService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(@Query() query: GetPitstopsDto) {
        return this.pitstopsService.getPitstops({ query });
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":pitstopNumber")
    findOne(@Param("pitstopNumber") pitstopNumber: number, @Query() query: GetPitstopsDto) {
        return this.pitstopsService.getPitstops({ pitstopNumber, query });
    }
}
