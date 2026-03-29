import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import { ComponentChild } from "preact";
import { intoStockMovementsDataSheet } from "@/utils/DataSheetInput.tsx";

type MovementType = "TRANSFER" | "IMPORT" | "EXPORT" | "ADJUSTMENT";
type MovementStatus =
	| "PENDING"
	| "IN_REVIEW"
	| "REJECTED"
	| "ACCEPTED"
	| "EXECUTING"
	| "FAILED"
	| "COMPLETED"
	| "CANCELLED";

type SignalizeAttributes<T extends object> = {
	[K in keyof T]: T[K] extends object ? SignalizeAttributes<T[K]>
		: Signal<T[K]>;
};

type Query = {
	productSku: string | undefined;
	movementType: MovementType | undefined;
	status:
		| MovementStatus
		| undefined;
	fromWarehouseId: number | undefined;
	toWarehouseId: number | undefined;
	performedBy: string | undefined;
	createdFrom: string | undefined;
	createdTo: string | undefined;
};

type Page<T> = {
	[x: string]: unknown;
	content: T[];
	number: number;
	size: number;
	totalElements: number;
	totalPages: number;
};

type StockMovement = {
	id: number;
	product: {
		id: number;
		sku: string;
		name: string;
	};
	movementType: MovementType;
	status: MovementStatus;
	quantity: number;
	fromWarehouse: {
		id: number;
		name: string;
	} | null;
	toWarehouse: {
		id: number;
		name: string;
	} | null;
	performedBy: {
		id: string;
		name: string;
	};
	reviewedBy: {
		id: string;
		name: string;
	} | null;
	createdAt: string;
	updatedAt: string;
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

export default function useStockMovementSearch(
	filter: SignalizeAttributes<Query>,
) {
	const movements = useSignal<{
		id: string;
		content: Record<string, ComponentChild>;
	}[]>([]);
	const isLoading = useSignal(false);
	const pageNumber = useSignal(0);
	const totalPages = useSignal(1);
	const totalElements = useSignal(0);
	const pageSize = 10;

	useSignalEffect(() => {
		const _trigger = {
			productSku: filter.productSku.value,
			movementType: filter.movementType.value,
			status: filter.status.value,
			fromWarehouseId: filter.fromWarehouseId.value,
			toWarehouseId: filter.toWarehouseId.value,
			performedBy: filter.performedBy.value,
			createdFrom: filter.createdFrom.value,
			createdTo: filter.createdTo.value,
		} satisfies Query;

		pageNumber.value = 0;
	});

	useSignalEffect(() => {
		const paramsObj = {
			page: pageNumber.value.toString(),
			size: pageSize.toString(),
			productSku: filter.productSku.value || "",
			movementType: filter.movementType.value || "",
			status: filter.status.value || "",
			fromWarehouseId: filter.fromWarehouseId.value?.toString() || "",
			toWarehouseId: filter.toWarehouseId.value?.toString() || "",
			performedBy: filter.performedBy.value || "",
			createdFrom:
				ISODateToISODateTime(filter.createdFrom.value, "start") ||
				"",
			createdTo: ISODateToISODateTime(filter.createdTo.value, "end") ||
				"",
		};

		const controller = new AbortController();
		const handler = setTimeout(async () => {
			isLoading.value = true;
			try {
				const res = await fetch(
					`/api/inv/stock-movements?${new URLSearchParams(
						paramsObj,
					)}`,
					{
						signal: controller.signal,
					},
				);

				if (res.ok) {
					const page: Page<StockMovement> = await res.json();
					movements.value = page.content.map((mvm) =>
						intoStockMovementsDataSheet(mvm)
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
		movements,
		pageNumber,
		totalPages,
		totalElements,
		pageSize,
	};
}
