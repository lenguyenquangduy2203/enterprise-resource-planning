import z from "zod";
import { AppController } from "@/utils/mod.ts";
import { PoliciesSchema } from "@/http-clients/auth/PoliciesClient.ts";
import { $Cookie } from "@fresh-web/mod.ts";

const HomeControllerSchema = z.function({
	input: z.tuple([
		z.jwt().register($Cookie, {
			_tag: "cookie",
			key: "access_token",
		}),
	]),
	output: z.promise(PoliciesSchema),
});

export const HomeController = AppController(HomeControllerSchema);
