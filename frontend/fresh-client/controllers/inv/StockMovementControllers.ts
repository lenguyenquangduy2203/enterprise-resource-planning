import z from "zod";
import { $Cookie, $Form } from "@fresh-web/mod.ts";
import {
	movementRequestSchema,
	PageOf,
	reqStatsSchema,
	StockMovementResponse,
	StockMovementSearchQuery,
} from "@/http-clients/inv/StockMovementClient.ts";
import { AppController } from "@/utils/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

const RequestMovementSchema = z.function({
	input: z.tuple([
		AccessTokenCookie,
		movementRequestSchema.clone().register($Form, { _tag: "form" }),
	]),
	output: z.promise(reqStatsSchema),
});

const SearchMovementSchema = z.function({
	input: z.tuple([AccessTokenCookie, StockMovementSearchQuery]),
	output: z.promise(PageOf(StockMovementResponse)),
});

export const RequestMovementController = AppController(RequestMovementSchema);
export const SearchMovementController = AppController(SearchMovementSchema);
