import z from "zod";
import { AppController } from "@/utils/mod.ts";
import { AcceptResponse } from "@/http-clients/hr/OnboardingClient.ts";
import { $Cookie, $Form } from "@fresh-web/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

const OnboardEmployeeSchema = z.function({
	input: z.tuple([
		AccessTokenCookie,
		z.object({
			fullname: z.string().trim().nonempty(),
			email: z.email(),
			level: z.string().trim().nonempty(),
			departmentCode: z.string().nonempty(),
			positionCode: z.string().nonempty(),
		}).register($Form, { _tag: "form" }),
	]),
	output: z.promise(AcceptResponse),
});

export const OnboardEmployeeController = AppController(OnboardEmployeeSchema);
