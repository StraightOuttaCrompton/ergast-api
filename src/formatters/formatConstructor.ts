import { constructors } from "@prisma/client";
import Constructor from "../responseDtos/Constructor.dto";

export default function formatConstructor(constructor: constructors) {
    return new Constructor({
        constructorId: constructor.constructorRef,
        url: constructor.url,
        name: constructor.name,
        nationality: constructor.nationality,
    });
}
