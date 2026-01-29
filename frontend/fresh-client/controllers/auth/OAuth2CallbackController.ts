import z from "zod";
import { AppController } from "@/utils/mod.ts";
import { $Query, $State } from "@fresh-web/mod.ts";

const CallbackSchema = z.function({
	input: z.tuple([
		z.string().nullable().register($Query, { _tag: "query", key: "code" }),
		z.string().register($State, { _tag: "state", key: "url" }),
	]),
	output: z.promise(z.union([
		z.string(),
		z.object(),
		z.null(),
		z.undefined(),
		z.literal(""),
	])),
});

export const CallbackController = AppController(CallbackSchema);
