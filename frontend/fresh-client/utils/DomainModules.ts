export const MODULE_RESOURCE_MAP = {
	hr: [
		"employees",
		// "departments",
		// "accounts",
	],
	inventory: [
		// "stocks",
		"stock-movements",
		// "warehouses",
	],
	catalog: [
		"products",
		// "categories",
		// "manufacturers",
	],
	analysis: [
		"workforce",
		"capital",
		"kpi",
	],
} as const;

export type ModuleName = keyof typeof MODULE_RESOURCE_MAP;

export const ModuleMeta: Record<ModuleName, { desc: string; icon: string }> = {
	hr: {
		desc:
			"Manage employees, organizational structure, and account provisioning.",
		icon: "👥",
	},
	inventory: {
		desc: "Manage warehouse stock, movements, and inventory levels.",
		icon: "📦",
	},
	catalog: {
		desc: "Manage product definitions, categories, and manufacturers.",
		icon: "🏷️",
	},
	analysis: {
		desc:
			"Strategic intelligence and performance tracking across human, financial, and operational resources.",
		icon: "📊",
	},
};

export function extractResource(permission: string): string | null {
	// employee.read_own → employee
	const [resource] = permission.split(".");
	return resource ?? null;
}

type ResourceActionsRecord = Record<string, string[]>;

export function groupByResource(
	module: ModuleName,
	permissions: string[],
): ResourceActionsRecord {
	const allowedResources = MODULE_RESOURCE_MAP[module] as ReadonlyArray<
		string
	>;

	return permissions.reduce<ResourceActionsRecord>((acc, pem) => {
		const resource = extractResource(pem);
		if (!resource) return acc;

		// ✅ only keep resources belonging to this module
		if (!allowedResources.includes(resource)) return acc;

		const [, action] = pem.split(".");
		if (!action) return acc;

		acc[resource] ??= [];
		acc[resource].push(action);

		return acc;
	}, {});
}
