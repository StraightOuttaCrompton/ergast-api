import { Controller, Get, Param, Query } from "@nestjs/common";
import { SeasonsService } from "./seasons.service";
import { GetSeasonsDto } from "./dto/get-seasons.dto";

@Controller("seasons")
export class SeasonsController {
    constructor(private readonly seasonsService: SeasonsService) {}

    @Get()
    findAll(@Query() query: GetSeasonsDto) {
        return this.seasonsService.getSeasons(query);
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.seasonsService.getSeason(id);
    }
}
