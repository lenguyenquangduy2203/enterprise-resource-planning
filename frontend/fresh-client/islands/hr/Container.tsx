import DashboardContainerFactory from "@/islands/factories/DashboardContainerFactory.tsx";
import OverviewContainer from "./OverviewContainer.tsx";
import { MODULE_RESOURCE_MAP } from "@/utils/mod.ts";

type Resource = "overview" | typeof MODULE_RESOURCE_MAP.hr[number];

const Container = DashboardContainerFactory<Resource>({
	overview: async () => await Promise.resolve(OverviewContainer),
	employee: async () =>
		await import("./employee/EmployeeActionsContainer.tsx")
			.then((m) => m.default),
	account: async () =>
		await import("@/islands/hr/AccountActionsContainer.tsx")
			.then((m) => m.default),
	department: async () => await Promise.resolve(() => <div>Department</div>),
}, {
	defaultSection: {
		key: "overview",
		Component: OverviewContainer,
	},
});
export default Container;
