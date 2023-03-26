import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CircuitsModule } from "./circuits/circuits.module";
import { ConstructorsModule } from "./constructors/constructors.module";
import { DriversModule } from "./drivers/drivers.module";

@Module({
    imports: [CircuitsModule, DriversModule, ConstructorsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
