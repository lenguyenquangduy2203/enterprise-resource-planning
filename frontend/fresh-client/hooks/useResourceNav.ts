import { useSignal } from "@preact/signals";

export function useResourceNav(
	resourceActionsRecord: Record<string, string[]>,
	defaultResource?: string,
) {
	const resources = Object.keys(resourceActionsRecord);
	const activeResource = useSignal(defaultResource || resources[0]);
	const selectResource = (resource: string) => {
		activeResource.value = resource;
	};

	return {
		resources,
		activeResource,
		selectResource,
	};
}
