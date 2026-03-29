import { Signal, useSignal, useSignalEffect } from "@preact/signals";

export type GroupBy = "WAREHOUSE" | "CATEGORY";

type Config = {
	group?: GroupBy;
	enabled?: boolean;
};

type Distribution = Map<string, number>;

async function fetchStockDistribution(group: GroupBy): Promise<Distribution> {
	const resp = await fetch(`/api/analysis/capital?groupBy=${group}`);
	if (!resp.ok) {
		throw new Error(`Failed to fetch stock distribution for ${group}`);
	}

	// Assuming the API returns an object/record that we map into a Map
	const rawData: Record<string, number> = await resp.json();
	return new Map(Object.entries(rawData).map(([k, v]) => [k, v]));
}

export default function useStockCapitalDistribution(
	{ group = "WAREHOUSE", enabled = true }: Config = {},
): {
	query: Signal<GroupBy>;
	data: Signal<Distribution>;
	isLoading: Signal<boolean>;
	error: Signal<Error | undefined>;
} {
	const query = useSignal<GroupBy>(group);
	const data = useSignal<Distribution>(new Map());
	const isLoading = useSignal(false);
	const error = useSignal<Error | undefined>(undefined);

	useSignalEffect(() => {
		if (!enabled) return;

		// Accessing query.value here makes this effect run whenever the signal changes
		const currentGroup = query.value;
		let isAborted = false;

		const loadData = async () => {
			isLoading.value = true;
			try {
				const result = await fetchStockDistribution(currentGroup);
				if (!isAborted) {
					data.value = result;
					error.value = undefined;
				}
			} catch (err) {
				if (!isAborted) {
					error.value = err as Error;
					// Reset to a new empty Map on error to trigger UI update
					data.value = new Map();
				}
			} finally {
				if (!isAborted) {
					isLoading.value = false;
				}
			}
		};

		loadData();

		// Cleanup to handle rapid switching between "WAREHOUSE" and "CATEGORY"
		return () => {
			isAborted = true;
		};
	});

	return { query, data, isLoading, error };
}
