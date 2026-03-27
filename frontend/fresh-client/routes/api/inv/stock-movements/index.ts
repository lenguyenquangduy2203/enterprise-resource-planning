import { define } from "@/utils/mod.ts";
import {
	RequestMovementController,
	SearchMovementController,
} from "@/controllers/inv/StockMovementControllers.ts";
import {
	PageSortCodec,
	StockMovementClient,
} from "@/http-clients/inv/StockMovementClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	POST: RequestMovementController(async (accessToken, movement) => {
		const resp = await StockMovementClient.requestMovement(
			accessToken,
			movement,
		);

		return ResponseEntity.created(resp);
	}),
	GET: SearchMovementController(async (accessToken, query) => {
		const summaries = await StockMovementClient.searchMovement(
			accessToken,
			{
				...query,
				sort: PageSortCodec.decode({
					orderBy: query.orderBy,
					sort: query.sort,
				}),
			},
		);

		return ResponseEntity.ok(summaries);
	}),
});
