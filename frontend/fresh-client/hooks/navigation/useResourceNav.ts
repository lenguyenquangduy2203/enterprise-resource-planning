import { Signal, useSignal } from "@preact/signals";

type Nav<Resource extends string | symbol> = {
	resources: Resource[];
	activeResource: Signal<Resource>;
	selectResource: (resource: Resource) => void;
};

export function useResourceNav<Resource extends string | symbol>(
	resourceActionsRecord: Record<Resource, string[]>,
	defaultResource?: Resource & string,
): Nav<Resource> {
	const resources = Object.keys(resourceActionsRecord) as Resource[];
	const activeResource = useSignal(defaultResource || resources[0]);
	const selectResource = (resource: Resource) => {
		activeResource.value = resource;
	};

	return {
		resources,
		activeResource,
		selectResource,
	};
}
