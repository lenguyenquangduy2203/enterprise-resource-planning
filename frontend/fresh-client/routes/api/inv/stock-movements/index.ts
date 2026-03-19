import { define } from "@/utils/mod.ts";
import {
	RequestMovementController,
	SearchMovementController,
} from "@/controllers/inv/StockMovementControllers.ts";
import {
	PageSortCodec,
	StockMovementClient,
} from "@/http-clients/inv/StockMovementClient.ts";

export const handler = define.handlers({
	POST: RequestMovementController(async (accessToken, movement) => {
		const resp = await StockMovementClient.requestMovement(
			accessToken,
			movement,
		);

		return new Response(JSON.stringify(resp), { status: 201 });
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

		return new Response(JSON.stringify(summaries), { status: 200 });
	}),
});
