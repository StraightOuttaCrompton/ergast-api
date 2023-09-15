import { Controller, Get, Param, Query } from "@nestjs/common";
import { ResultsService } from "./results.service";
import { GetResultsDto } from "./dto/get-results.dto";

@Controller("results")
export class ResultsController {
    constructor(private readonly resultsService: ResultsService) {}

    @Get()
    findAll(@Query() query: GetResultsDto) {
        return this.resultsService.getResults(query);
    }

    @Get(":year/:round")
    findOne(@Param("year") year: number, @Param("round") round: number) {
        return this.resultsService.getResult(year, round);
    }
}
