import { define } from "@/utils/mod.ts";
import { StockCapitalDistributionController } from "@/controllers/analysis/StockCapitalDistributionController.ts";
import { AnalysisClient } from "@/http-clients/analysis/AnalysisClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: StockCapitalDistributionController(async (accessToken, groupBy) => {
		const result = await AnalysisClient.getStockCapitalDistribution(
			accessToken,
			groupBy,
		);

		if (groupBy !== result.groupBy) {
			throw new TypeError(
				`Inconsistent group. Requesting ${groupBy} but received ${result.groupBy}`,
			);
		}

		return ResponseEntity.ok(result.distributions);
	}),
});
