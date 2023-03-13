import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CircuitsModule } from "./circuits/circuits.module";

@Module({
    imports: [CircuitsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
