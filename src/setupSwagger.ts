import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { API_VERSION, ERGAST_DESCRIPTION } from "./consts";

export default function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle("Ergast")
        .setDescription(ERGAST_DESCRIPTION)
        .setVersion(API_VERSION)
        .build();
    const document = SwaggerModule.createDocument(app, config);

    const path = process.env.NODE_ENV === "production" ? "/" : "/docs";
    SwaggerModule.setup(path, app, document, {
        // explorer?: boolean;
        // swaggerOptions?: Record<string, any>;
        // customCss?: string;
        // customCssUrl?: string;
        // customJs?: string;
        // customfavIcon?: string;
        // swaggerUrl?: string;
        customSiteTitle: "Ergast docs",
        // validatorUrl?: string;
        // url?: string;
        // urls?: Record<'url' | 'name', string>[];
    });

    return document;
}
