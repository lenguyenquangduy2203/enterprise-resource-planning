import { useSignal, useSignalEffect } from "@preact/signals";

type ProductLookupPage = {
	[x: string]: unknown;
	content: {
		id: number;
		sku: string;
		name: string;
	}[];
};

export function useProductLookup() {
	const productSku = useSignal("");
	const products = useSignal<ProductLookupPage["content"]>([]);

	useSignalEffect(() => {
		const query = productSku.value.trim();
		if (query.length === 0) {
			products.value = [];
			return;
		}

		// Debounce logic: wait 300ms before fetching
		const handler = setTimeout(() => {
			fetch(`/api/catalog/products/lookups?sku=${query}&page=0&size=5`)
				.then((res) => res.ok ? res.json() : { content: [] })
				.then((data) => {
					products.value = data.content;
				});
		}, 300);

		return () => clearTimeout(handler);
	});

	return { productSku, products };
}
