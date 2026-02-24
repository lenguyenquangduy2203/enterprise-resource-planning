import DashboardContainerFactory from "@/islands/factories/DashboardContainerFactory.tsx";
import OverviewContainer from "./OverviewContainer.tsx";
import { MODULE_RESOURCE_MAP } from "@/utils/mod.ts";

type Resource = "overview" | typeof MODULE_RESOURCE_MAP.inventory[number];

const Container = DashboardContainerFactory<Resource>({
	overview: async () => await Promise.resolve(OverviewContainer),
	stocks: async () => await Promise.resolve(() => <div>Stock</div>),
	"stock-movements": async () =>
		await import("./stock_movement/StockMovementActionsContainer.tsx")
			.then((m) => m.default),
	warehouses: async () => await Promise.resolve(() => <div>Warehouse</div>),
}, {
	defaultSection: {
		key: "overview",
		Component: OverviewContainer,
	},
});
export default Container;
