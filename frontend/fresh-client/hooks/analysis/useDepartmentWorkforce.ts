import { Signal, useSignal, useSignalEffect } from "@preact/signals";

type Config = {
	reloadAfter?: number;
	enabled?: boolean;
};

export type Department = {
	departmentCode: string;
	departmentName: string;
	totalEmployee: number;
	totalSalaryCost: number;
	levelDistributions: Set<{
		level: string;
		total: number;
	}>;
};

async function fetchDepartmentWorkforce(): Promise<Array<Department>> {
	const resp = await fetch("/api/analysis/workforce");
	if (!resp.ok) {
		throw new Error(
			`Cannot aggregate department workforce with status code: ${resp.status}`,
		);
	}

	return resp.json();
}

export default function useDepartmentWorkforce(
	{ reloadAfter = 30 * 60, enabled = true }: Config = {},
): {
	data: Signal<Array<Department>>;
	isLoading: Signal<boolean>;
	error: Signal<Error | undefined>;
} {
	const data = useSignal<Array<Department>>([]);
	const isLoading = useSignal(false);
	const error = useSignal<Error | undefined>(undefined);

	useSignalEffect(() => {
		if (!enabled) return;

		const fetchData = async () => {
			isLoading.value = true;
			try {
				const workforce = await fetchDepartmentWorkforce();
				data.value = workforce;
				error.value = undefined;
			} catch (err) {
				error.value = err as Error;
				data.value = [];
			} finally {
				isLoading.value = false;
			}
		};

		fetchData();

		// Convert reloadAfter to milliseconds and set interval
		const intervalId = setInterval(fetchData, reloadAfter * 1000);

		// CLEANUP: This prevents memory leaks
		return () => clearInterval(intervalId);
	});

	return { data, isLoading, error };
}
