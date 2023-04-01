import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { API_VERSION, ERGAST_DESCRIPTION } from "./consts";

export function mainSwagger(app: INestApplication, { generateFile = false }: { generateFile?: boolean } = {}) {
    const config = new DocumentBuilder()
        .setTitle("Ergast")
        .setDescription(ERGAST_DESCRIPTION)
        .setVersion(API_VERSION)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("", app, document, {
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
