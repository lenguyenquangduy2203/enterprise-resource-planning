import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import { ComponentChild } from "preact";
import { intoProductDetailsDataSheet } from "@/utils/DataSheetInput.tsx";

type ProductDetails = {
	sku: string;
	name: string;
	unit: string;
	unitPrice: number;
	categoryCode: string;
	categoryName: string;
	manufacturerCode: string;
	manufacturerName: string;
	status: "ACTIVE" | "INACTIVE";
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

type Query = {
	name: string | undefined;
	categoryCode: string | undefined;
	manufacturerCode: string | undefined;
	minPrice: number | undefined;
	maxPrice: number | undefined;
	status: "ACTIVE" | "INACTIVE" | undefined;
};

export default function useProductSearch(filters: SignalizeAttributes<Query>) {
	const products = useSignal<{
		id: string;
		content: Record<string, ComponentChild>;
	}[]>([]);
	const isLoading = useSignal(false);
	const pageNumber = useSignal(0);
	const totalPages = useSignal(1);
	const totalElements = useSignal(0);
	const pageSize = 10;

	useSignalEffect(() => {
		const _triggerParams = {
			name: filters.name.value,
			categoryCode: filters.categoryCode.value,
			manufacturerCode: filters.manufacturerCode.value,
			minPrice: filters.minPrice.value,
			maxPrice: filters.maxPrice.value,
			status: filters.status.value,
		} satisfies Query;

		pageNumber.value = 0;
	});

	useSignalEffect(() => {
		const paramsObj = {
			page: pageNumber.value.toString(),
			size: pageSize.toString(),
			name: filters.name.value || "",
			categoryCode: filters.categoryCode.value || "",
			manufacturerCode: filters.manufacturerCode.value || "",
			minPrice: filters.minPrice.value?.toString() || "",
			maxPrice: filters.maxPrice.value?.toString() || "",
			status: filters.status.value || "",
		};

		const controller = new AbortController();
		const handler = setTimeout(async () => {
			isLoading.value = true;
			try {
				const res = await fetch(
					`/api/catalog/products?${new URLSearchParams(paramsObj)}`,
					{
						signal: controller.signal,
					},
				);

				if (res.ok) {
					const page: Page<ProductDetails> = await res.json();
					products.value = page.content.map((details) =>
						intoProductDetailsDataSheet(details)
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
		products,
		isLoading,
		pageNumber,
		totalPages,
		totalElements,
		pageSize,
	};
}
