import { useSignal, useSignalEffect } from "@preact/signals";

type ManufacturerSelectOption = {
	code: string;
	name: string;
};

export function useProductManufacturer() {
	const manufacturerCode = useSignal("");
	const manufacturers = useSignal<ManufacturerSelectOption[]>([]);

	useSignalEffect(() => {
		fetch("/api/catalog/manufacturers/lookups")
			.then((res) => res.ok ? res.json() : [])
			.then((data) => manufacturers.value = data);
	});

	return { manufacturerCode, manufacturers };
}
