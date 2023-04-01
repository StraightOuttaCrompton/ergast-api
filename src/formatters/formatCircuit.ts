import { circuits } from "@prisma/client";
import Circuit from "../types/Circuit";

export default function formatCircuit(circuit: Omit<circuits, "circuitId">): Circuit {
    return {
        circuitId: circuit.circuitRef,
        url: circuit.url,
        circuitName: circuit.name,
        Location: {
            // TODO: don't default to 0 here. Remove toPrecision and number cast
            lat: (+(circuit.lat || 0).toPrecision(6)).toString() || "",
            long: (+(circuit.lng || 0).toPrecision(6)).toString() || "",
            // alt: circuit.alt != null ? circuit.alt.toString() : "N/D", // TODO: include
            locality: circuit.location || "",
            country: circuit.country || "",
        },
    };
}
