import { setupWorker } from "msw/browser";
import { handlers } from "./client";

export const worker = setupWorker(...handlers);
