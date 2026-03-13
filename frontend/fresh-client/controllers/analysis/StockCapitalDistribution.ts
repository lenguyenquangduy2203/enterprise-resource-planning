import { z } from "zod";
import {
	CapitalDistributionResult,
	GroupBy,
} from "@/http-clients/analysis/AnalysisClient.ts";
import { $Cookie } from "@fresh-web/mod.ts";
import { AppController } from "@/utils/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

const StockCapitalDistributionControllerSchema = z.function({
	input: z.tuple([AccessTokenCookie, GroupBy]),
	output: z.promise(CapitalDistributionResult.shape.distributions),
});

export const StockCapitalDistributionController = AppController(
	StockCapitalDistributionControllerSchema,
);
