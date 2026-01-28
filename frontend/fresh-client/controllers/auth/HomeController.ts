import z from "zod";
import { AppController } from "../../utils.ts";
import { $Cookie } from "@fresh-web/mod.ts";
import { PoliciesSchema } from "../../http-clients/auth/PoliciesClient.ts";

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
		z.promise(PoliciesSchema),
	]),
});

export const HomeController = AppController(HomeControllerSchema);
