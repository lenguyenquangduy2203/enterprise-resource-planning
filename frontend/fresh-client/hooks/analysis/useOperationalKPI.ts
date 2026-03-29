import { Signal, useSignal, useSignalEffect } from "@preact/signals";

type Query = {
	createdFrom: string;
	createdTo: string;
};

type Range = {
	value: number;
	unit: "day" | "week" | "month" | "year";
};

type Option = "start" | "end";

function ISODateToISODateTime(
	isoDate: string | undefined,
	timeExtensionOption: Option,
): string | undefined {
	if (!isoDate) {
		return undefined;
	}

	if (timeExtensionOption === "start") {
		const localDate = new Date(isoDate + "T00:00:00");
		return localDate.toISOString();
	} else {
		const localDate = new Date(isoDate + "T23:59:59");
		return localDate.toISOString();
	}
}

const getInitialQuery = (range: Range): Query => {
	const to = new Date();
	const from = new Date();

	if (range.unit === "day") from.setDate(to.getDate() - range.value);
	else if (range.unit === "week") {
		from.setDate(to.getDate() - range.value * 7);
	} else if (range.unit === "month") {
		from.setMonth(to.getMonth() - range.value);
	} else if (range.unit === "year") {
		from.setFullYear(to.getFullYear() - range.value);
	}

	return {
		createdFrom: from.toISOString().split("T")[0],
		createdTo: to.toISOString().split("T")[0],
	};
};

type Config = {
	range?: Range;
	enabled?: boolean;
};

export type KPI = {
	typeDistributions: Array<{
		type: "TRANSFER" | "IMPORT" | "EXPORT" | "ADJUSTMENT";
		totalMovements: number;
	}>;
	statusDistributions: Array<{
		status:
			| "PENDING"
			| "IN_REVIEW"
			| "REJECTED"
			| "ACCEPTED"
			| "EXECUTING"
			| "FAILED"
			| "COMPLETED"
			| "CANCELLED";
		totalMovements: number;
	}>;
	warehouseDistributions: Array<{
		warehouseId: number;
		totalMovements: number;
	}>;
};

async function fetchKPI(query: Query): Promise<KPI> {
	const params = new URLSearchParams();

	// Transform simple Date strings to full ISO DateTime
	const fromDateTime = ISODateToISODateTime(query.createdFrom, "start");
	const toDateTime = ISODateToISODateTime(query.createdTo, "end");

	if (fromDateTime) params.append("createdFrom", fromDateTime);
	if (toDateTime) params.append("createdTo", toDateTime);

	const resp = await fetch(`/api/analysis/kpi?${params}`);
	if (!resp.ok) throw new Error("Failed to fetch KPI data");

	return resp.json();
}

export default function useOperationalKPI(
	{ range = { value: 1, unit: "month" }, enabled = true }: Config = {},
): {
	query: Signal<Query>;
	data: Signal<KPI>;
	isLoading: Signal<boolean>;
	error: Signal<Error | undefined>;
} {
	const query = useSignal<Query>(getInitialQuery(range));
	const isLoading = useSignal(false);
	const error = useSignal<Error | undefined>(undefined);
	const data = useSignal<KPI>({
		typeDistributions: [],
		statusDistributions: [],
		warehouseDistributions: [],
	});

	useSignalEffect(() => {
		if (!enabled) return;

		// Accessing query.value here registers it as a dependency
		const currentQuery = query.value;
		let isAborted = false;

		const loadData = async () => {
			isLoading.value = true;
			try {
				const result = await fetchKPI(currentQuery);
				if (!isAborted) {
					data.value = result;
					error.value = undefined;
				}
			} catch (err) {
				if (!isAborted) {
					error.value = err as Error;
				}
			} finally {
				if (!isAborted) {
					isLoading.value = false;
				}
			}
		};

		loadData();

		// Cleanup to prevent race conditions if query changes rapidly
		return () => {
			isAborted = true;
		};
	});

	return { query, data, isLoading, error };
}
