import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { API_PORT } from "./consts";
import { mainConfig } from "./main.config";

async function bootstrap() {
    console.log(`Server is listening on port ${API_PORT}\n`);

    const app = await NestFactory.create(AppModule);
    mainConfig(app);

    const config = new DocumentBuilder()
        .setTitle("Cats example")
        .setDescription("The cats API description")
        .setVersion("1.0")
        .addTag("cats")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
        "api",
        app,
        document
        // {
        //     explorer?: boolean;
        //     swaggerOptions?: Record<string, any>;
        //     customCss?: string;
        //     customCssUrl?: string;
        //     customJs?: string;
        //     customfavIcon?: string;
        //     swaggerUrl?: string;
        //     customSiteTitle?: string;
        //     validatorUrl?: string;
        //     url?: string;
        //     urls?: Record<'url' | 'name', string>[];
        // }
    );

    await app.listen(API_PORT);
}
bootstrap();
