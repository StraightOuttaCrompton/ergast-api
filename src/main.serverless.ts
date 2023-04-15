import serverlessExpress from "@vendia/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
import getApp from "./getApp";

let server: Handler;
async function bootstrapServerLess(): Promise<Handler> {
    const app = await getApp();
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await bootstrapServerLess());
    return server(event, context, callback);
};
