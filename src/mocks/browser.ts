import { setupWorker, SetupWorker } from "msw";
import serviceHandlers from "./api/serviceHandlers";

export const worker: SetupWorker = setupWorker(...serviceHandlers);
