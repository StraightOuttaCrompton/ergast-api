import { constructors } from "@prisma/client";
import Constructor from "../responseDtos/Constructor.dto";

export default function formatConstructor(constructor: Omit<constructors, "constructorId">) {
    return new Constructor({
        constructorId: constructor.constructorRef,
        url: constructor.url,
        name: constructor.name,
        nationality: constructor.nationality,
    });
}
