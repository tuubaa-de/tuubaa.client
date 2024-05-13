import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "tuubaa.server";

export const trpc = createTRPCReact<AppRouter>({});
