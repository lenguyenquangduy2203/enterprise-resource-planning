import z from "zod";
import { $Cookie } from "@fresh-web/mod.ts";
import {
	EmployeeSummary,
	PageOf,
	SearchEmployeeQuery,
} from "@/http-clients/hr/SummaryClient.ts";
import { AppController } from "@/utils/mod.ts";

const EmployeeSummariesControllerSchema = z.function({
	input: z.tuple([
		z.jwt().register($Cookie, {
			_tag: "cookie",
			key: "access_token",
		}),
		SearchEmployeeQuery,
	]),
	output: z.promise(PageOf(EmployeeSummary)),
});

export const EmployeeSummariesController = AppController(
	EmployeeSummariesControllerSchema,
);
