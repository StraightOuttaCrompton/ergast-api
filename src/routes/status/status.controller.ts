import { Controller, Get, Param, Query } from "@nestjs/common";
import { StatusService } from "./status.service";
import { GetStatusDto } from "./dto/get-status.dto";

@Controller("status")
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Get()
    findAll(@Query() query: GetStatusDto) {
        return this.statusService.getStatuses(query);
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.statusService.getStatusById(id);
    }
}
