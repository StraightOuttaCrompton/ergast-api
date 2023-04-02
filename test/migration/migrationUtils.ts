import fs from "fs/promises";
import request from "supertest";
import path from "path";
import { app } from "./setup";

async function getSnapshotExists(containingDirname: string, testFilename: string, testName: string) {
    const snapshotFileLocation = path.resolve(containingDirname, "__snapshots__", `${testFilename}.snap`);
    try {
        await fs.access(snapshotFileLocation);

        const snapshotFile = await fs.readFile(snapshotFileLocation, "utf-8");
        const snapshotExists = snapshotFile.includes(testName + " ");

        return snapshotExists;
    } catch (error) {
        return false;
    }
}

export const getMigrationTest =
    (containingDirname: string, testFilename: string, transformLegacyResponse: (response: any) => any) =>
    async (url: string, legacyUrl: string) => {
        test(url, async () => {
            const response = await request(app.getHttpServer()).get(url);

            const snapshotExists = await getSnapshotExists(containingDirname, testFilename, url);
            if (snapshotExists) {
                expect(response.body).toMatchSnapshot();
                return;
            }

            const legacyResponse = await fetch(legacyUrl);
            const legacyJson = await legacyResponse.json();

            expect(response.body).toEqual(transformLegacyResponse(legacyJson));
            expect(response.body).toMatchSnapshot();
        });
    };
