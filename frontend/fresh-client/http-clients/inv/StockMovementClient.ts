import z from "zod";
import {
	$Body,
	$Client,
	$Header,
	$QueryModel,
	$URI,
	ProcessClientSchema,
} from "@fresh-web/mod.ts";

const JwtAuthHeader = z.jwt()
	.transform((jwt) => `Bearer ${jwt}`)
	.register($Header, {
		_tag: "header",
		key: "Authorization",
	});

const baseMovementSchema = {
	productId: z.number().int().positive(),
	quantity: z.number().int().positive(),
};

export const transferStockSchema = z.object({
	type: z.literal("TRANSFER"),
	...baseMovementSchema,
	fromWarehouseId: z.number().int().positive(),
	toWarehouseId: z.number().int().positive(),
});

export const importStockSchema = z.object({
	type: z.literal("IMPORT"),
	...baseMovementSchema,
	toWarehouseId: z.number().int().positive(),
});

export const exportStockSchema = z.object({
	type: z.literal("EXPORT"),
	...baseMovementSchema,
	fromWarehouseId: z.number().int().positive(),
});

export const adjustmentStockSchema = z.object({
	type: z.literal("ADJUSTMENT"),
	...baseMovementSchema,
	warehouseId: z.number().int().positive(),
});

export const movementRequestSchema = z.discriminatedUnion("type", [
	transferStockSchema,
	importStockSchema,
	exportStockSchema,
	adjustmentStockSchema,
]);

export const MovementStatus = z.literal([
	"PENDING",
	"IN_REVIEW",
	"REJECTED",
	"ACCEPTED",
	"EXECUTING",
	"FAILED",
	"COMPLETED",
	"CANCELLED",
]);

export const reqStatsSchema = z.object({
	movementRequestId: z.number().int().positive(),
	status: MovementStatus,
});

export const ProductSnapshot = z.object({
	id: z.number().int().positive(),
	sku: z.string().trim().max(50),
	name: z.string().trim().nonempty(),
});

export const MovementType = z.literal([
	"TRANSFER",
	"IMPORT",
	"EXPORT",
	"ADJUSTMENT",
]);

export const WarehouseSnapshot = z.object({
	id: z.number().int().positive(),
	name: z.string().trim().nonempty(),
});

export const EmployeeSnapshot = z.object({
	id: z.uuid(),
	name: z.string().trim().nonempty(),
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

export const StockMovementResponse = z.object({
	id: z.number().positive(),
	product: ProductSnapshot,
	movementType: MovementType,
	status: MovementStatus,
	quantity: z.number().nonnegative(),
	fromWarehouse: WarehouseSnapshot.nullable(),
	toWarehouse: WarehouseSnapshot.nullable(),
	performedBy: EmployeeSnapshot,
	reviewedBy: EmployeeSnapshot.nullable(),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
});

export const PageOf = <S extends z.ZodType>(schema: S) =>
	z.object({
		content: z.array(schema),

		// Map to Spring's field names
		number: z.number().int().nonnegative(), // page index
		size: z.number().int().positive(),
		totalElements: z.number().int().nonnegative(),
		totalPages: z.number().int().nonnegative(),

		// Optional fields returned by Spring
		first: z.boolean().optional(),
		last: z.boolean().optional(),
		empty: z.boolean().optional(),
		numberOfElements: z.number().optional(),
		pageable: z.any().optional(),
		sort: z.any().optional(),
	}).loose();

const StockMovementClientSchema = z.object({
	requestMovement: z.function({
		input: z.tuple([
			JwtAuthHeader,
			movementRequestSchema.register($Body, { _tag: "body" }),
		]),
		output: z.promise(reqStatsSchema),
	}).register($URI, { method: "POST", uri: "stock-movements" }),
	searchMovement: z.function({
		input: z.tuple([JwtAuthHeader, StockMovementSearchQuery]),
		output: z.promise(PageOf(StockMovementResponse)),
	}).register($URI, { method: "GET", uri: "stock-movements" }),
}).register($Client, {
	base: "http://gateway:8080/inv/",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const StockMovementClient = ProcessClientSchema(
	StockMovementClientSchema,
);
