import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import { ComponentChild } from "preact";
import { intoEmployeeSummaryDataSheet } from "@/utils/DataSheetInput.tsx";
import type { SearchEmployeeQuery } from "@/controllers/hr/EmployeeSummariesController.ts";

type EmployeeSummary = {
	id: string;
	fullname: string;
	email: string;
	level: string;
	positionCode: string;
	positionName: string;
	departmentCode: string;
	departmentName: string;
	hasAccount: boolean;
};

type Page<T> = {
	[x: string]: unknown;
	content: T[];
	number: number;
	size: number;
	totalElements: number;
	totalPages: number;
};

type SignalizeAttributes<T extends object> = {
	[K in keyof T]: T[K] extends object ? SignalizeAttributes<T[K]>
		: Signal<T[K]>;
};

type Query = Omit<SearchEmployeeQuery, "page" | "size" | "sort">;

export function useEmployeeSearch(
	filters: SignalizeAttributes<Query>,
) {
	const employees = useSignal<
		{ id: string; content: Record<string, ComponentChild> }[]
	>([]);
	const isLoading = useSignal(false);
	const pageNumber = useSignal(0);
	const totalPages = useSignal(1);
	const totalElements = useSignal(0);
	const pageSize = 10;

	useSignalEffect(() => {
		// Touch all filter signals
		const _triggerParams = {
			fullname: filters.fullname?.value,
			email: filters.email?.value,
			level: filters.level?.value,
			departmentCode: filters.departmentCode?.value,
			positionCode: filters.positionCode?.value,
			accountProvisionStatus: filters.accountProvisioningStatus?.value,
		};

		// Reset the page number
		pageNumber.value = 0;
	});

	useSignalEffect(() => {
		// Synchronously touch all dependency signals for Preact tracking
		const paramsObj = {
			page: pageNumber.value.toString(),
			size: pageSize.toString(),
			fullname: filters.fullname?.value || "",
			email: filters.email?.value || "",
			level: filters.level?.value || "",
			departmentCode: filters.departmentCode?.value || "",
			positionCode: filters.positionCode?.value || "",
			accountProvisioningStatus:
				filters.accountProvisioningStatus?.value || "",
		};

		const controller = new AbortController();
		const handler = setTimeout(async () => {
			isLoading.value = true;
			try {
				const res = await fetch(
					`/api/hr/employees?${new URLSearchParams(paramsObj)}`,
					{
						signal: controller.signal,
					},
				);

				if (res.ok) {
					const page: Page<EmployeeSummary> = await res.json();
					// Perform transformation logic here (as seen in your original code)
					employees.value = page.content.map((summary) =>
						intoEmployeeSummaryDataSheet(summary)
					);
					totalPages.value = page.totalPages;
					totalElements.value = page.totalElements;
				}
			} catch (err) {
				if ((err as Error).name !== "AbortError") console.error(err);
			} finally {
				isLoading.value = false;
			}
		}, 400);

		return () => {
			clearTimeout(handler);
			controller.abort();
		};
	});

	return {
		employees,
		isLoading,
		pageNumber,
		totalPages,
		totalElements,
		pageSize,
	};
}
