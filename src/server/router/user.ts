import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";
import { User } from "@prisma/client";

export const userRouter = createRouter();
