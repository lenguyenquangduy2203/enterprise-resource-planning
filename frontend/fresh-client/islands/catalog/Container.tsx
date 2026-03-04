import DashboardContainerFactory from "@/islands/factories/DashboardContainerFactory.tsx";
import OverviewContainer from "./OverviewContainer.tsx";
import { MODULE_RESOURCE_MAP } from "@/utils/mod.ts";

type Resource = "overview" | typeof MODULE_RESOURCE_MAP.catalog[number];

const Container = DashboardContainerFactory<Resource>({
	overview: async () => await Promise.resolve(OverviewContainer),
	products: async () =>
		await import("./product/ProductActionsContainer.tsx")
			.then((m) => m.default),
	// categories: async () => await Promise.resolve(() => <div>Category</div>),
	// manufacturers: async () =>
	// 	await Promise.resolve(() => <div>Manufacturer</div>),
}, {
	defaultSection: {
		key: "overview",
		Component: OverviewContainer,
	},
});
export default Container;
