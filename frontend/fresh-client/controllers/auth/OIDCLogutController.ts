import { z } from "zod";
import { $Cookie } from "@fresh-web/mod.ts";
import { AppController } from "@/utils/mod.ts";

const OIDCLogoutSchema = z.function({
	input: z.tuple([
		z.string().nonempty().register($Cookie, {
			_tag: "cookie",
			key: "id_token",
		}),
	]),
	output: z.null(),
});

export const OIDCLogoutController = AppController(OIDCLogoutSchema);
