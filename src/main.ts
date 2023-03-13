import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { API_PORT } from "./consts";
import { mainConfig } from "./main.config";

async function bootstrap() {
    console.log(`Server is listening on port ${API_PORT}\n`);

    const app = await NestFactory.create(AppModule);
    mainConfig(app);

    await app.listen(API_PORT);
}
bootstrap();
