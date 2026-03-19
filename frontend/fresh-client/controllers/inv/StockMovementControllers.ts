import z from "zod";
import { $Cookie, $Form, $QueryModel } from "@fresh-web/mod.ts";
import {
	movementRequestSchema,
	MovementStatus,
	MovementType,
	PageOf,
	reqStatsSchema,
	StockMovementResponse,
} from "@/http-clients/inv/StockMovementClient.ts";
import { AppController } from "@/utils/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

export const StockMovementSearchQuery = z.object({
	productSku: z.string().trim().max(50).optional(),
	movementType: MovementType.optional(),
	status: MovementStatus.optional(),
	fromWarehouseId: z.number().int().positive().optional(),
	toWarehouseId: z.number().int().positive().optional(),
	performedBy: z.uuid().optional(),
	createdFrom: z.iso.datetime().optional(),
	createdTo: z.iso.datetime().optional(),
	page: z.number().nonnegative().default(0),
	size: z.number().nonnegative().default(20),
	orderBy: z.enum(["createdAt", "updatedAt"]).default("createdAt"),
	sort: z.enum(["asc", "desc"]).default("desc"),
}).refine((data) => {
	// 1. Logic: Start must be before End
	if (!data.createdFrom || !data.createdTo) return true;
	return new Date(data.createdFrom) <= new Date(data.createdTo);
}, {
	when: (payload) => payload.issues.length === 0,
	message: "The start date cannot be after the end date",
	path: ["createdFrom"],
}).refine((data) => {
	// 2. Logic: End Date cannot be in the future
	if (!data.createdTo) return true;

	const toDate = new Date(data.createdTo);
	const now = new Date();

	// Set 'now' to the very end of today (23:59:59.999) to be inclusive
	now.setHours(23, 59, 59, 999);

	return toDate <= now;
}, {
	when: (payload) => payload.issues.length === 0,
	message: "Cannot search for movements in the future",
	path: ["createdTo"],
}).register($QueryModel, { _tag: "query-model" });

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
