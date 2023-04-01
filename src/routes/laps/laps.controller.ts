import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { LapsService } from "./laps.service";
import { GetLapsDto } from "./dto/get-laps.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("laps")
@Controller("laps")
export class LapsController {
    constructor(private readonly lapsService: LapsService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(@Query() query: GetLapsDto) {
        return this.lapsService.getLaps({ query });
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":lapNumber")
    findOne(@Param("lapNumber") lapNumber: number, @Query() query: GetLapsDto) {
        return this.lapsService.getLaps({ lapNumber, query });
    }
}
