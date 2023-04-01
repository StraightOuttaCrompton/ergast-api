import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { StatusService } from "./status.service";
import { GetStatusDto } from "./dto/get-status.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("status")
@Controller("status")
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(@Query() query: GetStatusDto) {
        return this.statusService.getStatuses(query);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.statusService.getStatusById(id);
    }
}
