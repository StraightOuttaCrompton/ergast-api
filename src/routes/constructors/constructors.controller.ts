import { Controller, Get, Param, Query } from "@nestjs/common";
import { ConstructorsService } from "./constructors.service";
import { GetConstructorsDto } from "./dto/get-constructors.dto";

@Controller("constructors")
export class ConstructorsController {
    constructor(private readonly constructorsService: ConstructorsService) {}

    @Get()
    findAll(@Query() query: GetConstructorsDto) {
        return this.constructorsService.getConstructors(query);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.constructorsService.getConstructor(id);
    }
}
