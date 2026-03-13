import { z } from "zod";
import { Workforce } from "@/http-clients/analysis/AnalysisClient.ts";
import { $Cookie } from "@fresh-web/mod.ts";
import { AppController } from "@/utils/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

const DepartmentWorkforceControllerSchema = z.function({
	input: z.tuple([AccessTokenCookie]),
	output: z.promise(Workforce.shape.departments),
});

export const DepartmentWorkforceController = AppController(
	DepartmentWorkforceControllerSchema,
);
