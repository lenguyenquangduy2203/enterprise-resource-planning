export const MODULE_RESOURCE_MAP = {
	hr: [
		"employee",
		"department",
		"account",
	],
	inventory: [
		"inventory",
		"warehouse",
	],
} as const;

export type ModuleName = keyof typeof MODULE_RESOURCE_MAP;

export function extractResource(permission: string): string | null {
	// employee.read_own → employee
	const [resource] = permission.split(".");
	return resource ?? null;
}
