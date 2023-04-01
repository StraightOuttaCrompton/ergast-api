import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { ConstructorsService } from "./constructors.service";
import { GetConstructorsDto } from "./dto/get-constructors.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("constructors")
@Controller("constructors")
export class ConstructorsController {
    constructor(private readonly constructorsService: ConstructorsService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(@Query() query: GetConstructorsDto) {
        return this.constructorsService.getConstructors(query);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.constructorsService.getConstructor(id);
    }
}
