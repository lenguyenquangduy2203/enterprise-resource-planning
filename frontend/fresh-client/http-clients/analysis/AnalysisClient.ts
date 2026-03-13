import { z } from "zod";
import {
	$Client,
	$Header,
	$Param,
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

export const StockMovementStatsQuery = z.object({
	createdFrom: z.iso.datetime().nonoptional(),
	createdTo: z.iso.datetime().nonoptional(),
}).register($QueryModel, {
	_tag: "query-model",
});

export const GroupBy = z.literal(["WAREHOUSE", "CATEGORY"]).register($Param, {
	_tag: "param",
	key: "GroupBy",
});

const LevelCount = z.object({
	level: z.string().nonempty().nonoptional(),
	total: z.number().positive().nonoptional(),
});
const DepartmentStructure = z.object({
	departmentCode: z.string().nonempty().nonoptional(),
	departmentName: z.string().nonempty().nonoptional(),
	totalEmployee: z.number().positive().nonoptional(),
	totalSalaryCost: z.number().multipleOf(0.01).positive().nonoptional(),
	levelDistributions: z.set(LevelCount).nonoptional(),
});
export const Workforce = z.object({
	departments: z.set(DepartmentStructure).nonoptional(),
});

const MovementTypeCount = z.object({
	type: z.literal(["TRANSFER", "IMPORT", "EXPORT", "ADJUSTMENT"])
		.nonoptional(),
	totalMovements: z.number().positive().nonoptional(),
});
const MovementStatusCount = z.object({
	status: z.literal([
		"PENDING",
		"IN_REVIEW",
		"REJECTED",
		"ACCEPTED",
		"EXECUTING",
		"FAILED",
		"COMPLETED",
		"CANCELLED",
	]).nonoptional(),
	totalMovements: z.number().positive().nonoptional(),
});
const WarehouseCount = z.object({
	warehouseId: z.number().positive().nonoptional(),
	totalMovements: z.number().positive().nonoptional(),
});
export const MovementStatistics = z.object({
	typeDistributions: z.set(MovementTypeCount).nonoptional(),
	statusDistributions: z.set(MovementStatusCount).nonoptional(),
	warehouseDistributions: z.set(WarehouseCount).nonoptional(),
});

export const CapitalDistributionResult = z.object({
	groupBy: GroupBy,
	distributions: z.map(z.string().nonempty(), z.number().positive()),
});

const AnalysisClientSchema = z.object({
	getDepartmentsWorkforce: z.function({
		input: z.tuple([JwtAuthHeader]),
		output: z.promise(Workforce),
	}).register($URI, {
		method: "GET",
		uri: "workforce",
	}),
	getOperationKPI: z.function({
		input: z.tuple([JwtAuthHeader, StockMovementStatsQuery]),
		output: z.promise(MovementStatistics),
	}).register($URI, { method: "GET", uri: "kpi" }),
	getStockCapitalDistribution: z.function({
		input: z.tuple([JwtAuthHeader, GroupBy]),
		output: z.promise(CapitalDistributionResult),
	}).register($URI, {
		method: "GET",
		uri: "capital",
	}),
}).register($Client, {
	base: "http://gateway:8080/analysis/",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const AnalysisClient = ProcessClientSchema(AnalysisClientSchema);
