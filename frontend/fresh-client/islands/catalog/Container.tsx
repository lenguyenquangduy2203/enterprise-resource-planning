import DashboardContainerFactory from "@/islands/factories/DashboardContainerFactory.tsx";
import OverviewContainer from "./OverviewContainer.tsx";
import { MODULE_RESOURCE_MAP } from "@/utils/mod.ts";

type Resource = "overview" | typeof MODULE_RESOURCE_MAP.catalog[number];

const Container = DashboardContainerFactory<Resource>({
	overview: async () => await Promise.resolve(OverviewContainer),
	product: async () =>
		await import("./product/ProductActionsContainer.tsx")
			.then((m) => m.default),
	category: async () => await Promise.resolve(() => <div>Category</div>),
	manufacturer: async () =>
		await Promise.resolve(() => <div>Manufacturer</div>),
}, {
	defaultSection: {
		key: "overview",
		Component: OverviewContainer,
	},
});
export default Container;
