import fs from "fs/promises";
import path from "path";

export async function getSnapshotExists(containingDirname: string, testFilename: string, testName: string) {
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
