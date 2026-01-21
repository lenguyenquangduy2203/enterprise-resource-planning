import z from "zod";
import { AppController } from "../../utils.ts";
import { $Cookie } from "@fresh-web/mod.ts";

const HomeControllerSchema = z.function({
	input: z.tuple([
		z.string().optional().register($Cookie, {
			_tag: "cookie",
			key: "access_token",
		}),
	]),
	output: z.union([
		z.object(),
		z.null(),
		z.undefined(),
		z.literal(""),
	]),
});

export const HomeController = AppController(HomeControllerSchema);
