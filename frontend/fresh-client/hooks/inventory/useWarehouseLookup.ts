import { useSignal, useSignalEffect } from "@preact/signals";

type SelectOptions = {
	id: number;
	code: string;
	name: string;
}[];

export function useWarehouseLookup() {
	const warehouses = useSignal<SelectOptions>([]);

	useSignalEffect(() => {
		fetch("/api/inv/warehouses/lookups")
			.then((res) => res.ok ? res.json() : [])
			.then((data) => warehouses.value = data);
	});

	return { warehouses };
}
