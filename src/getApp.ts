import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import mainConfig from "./main.config";
import setupSwagger from "./setupSwagger";

export default async function getApp() {
    const app = await NestFactory.create(AppModule);
    mainConfig(app);
    setupSwagger(app);

    return app;
}
