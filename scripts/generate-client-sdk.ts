import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { mainSwagger } from "../src/main.swagger";
// import { writeFile } from "fs/promises";
import { generate } from "openapi-typescript-codegen";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const document = mainSwagger(app);

    // writeFile("./swagger-spec.json", JSON.stringify(document));

    generate({
        input: document,
        output: "./generated",
        exportSchemas: true,
    });
}

bootstrap();
