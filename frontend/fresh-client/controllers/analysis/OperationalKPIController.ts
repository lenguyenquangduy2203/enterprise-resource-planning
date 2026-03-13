import { z } from "zod";
import {
	MovementStatistics,
	StockMovementStatsQuery,
} from "@/http-clients/analysis/AnalysisClient.ts";
import { $Cookie } from "@fresh-web/mod.ts";
import { AppController } from "@/utils/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

const OperationalKPIControllerSchema = z.function({
	input: z.tuple([AccessTokenCookie, StockMovementStatsQuery]),
	output: z.promise(MovementStatistics),
});

export const OperationalKPIController = AppController(
	OperationalKPIControllerSchema,
);
