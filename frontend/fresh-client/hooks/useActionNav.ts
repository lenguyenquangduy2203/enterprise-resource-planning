import { useComputed, useSignal } from "@preact/signals";

export function useActionNav(
	resourceActionsRecord: Record<string, string[]>,
	activeResource: { value: string },
) {
	const actions = useComputed(
		() => resourceActionsRecord[activeResource.value] ?? [],
	);
	const activeAction = useSignal(actions.value[0]);
	const selectAction = (action: string) => {
		activeAction.value = action;
	};

	// reset action when resource changes
	useComputed(() => {
		const _ = activeResource.value;
		activeAction.value = actions.value[0];
	});

	return {
		actions,
		activeAction,
		selectAction,
	};
}
