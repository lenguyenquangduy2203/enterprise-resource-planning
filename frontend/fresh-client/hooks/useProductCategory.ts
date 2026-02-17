import { useSignal, useSignalEffect } from "@preact/signals";

type CategorySelectOption = {
	code: string;
	name: string;
};

export function useProductCategory() {
	const categoryCode = useSignal("");
	const categories = useSignal<CategorySelectOption[]>([]);

	useSignalEffect(() => {
		fetch("/api/catalog/categories/lookups")
			.then((res) => res.ok ? res.json() : [])
			.then((data) => categories.value = data);
	});

	return { categoryCode, categories };
}
