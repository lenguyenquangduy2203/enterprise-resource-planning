import {
	ReadonlySignal,
	Signal,
	useComputed,
	useSignal,
} from "@preact/signals";

type Hook<Action extends string | symbol> = {
	actions: ReadonlySignal<Action[]>;
	activeAction: Signal<Action>;
	selectAction: (action: Action) => void;
};

export function useActionNav<Action extends string | symbol>(
	resourceActionsRecord: Record<string, Action[]>,
	activeResource: { value: string },
): Hook<Action> {
	const actions = useComputed(
		() => resourceActionsRecord[activeResource.value] ?? [],
	);
	const activeAction = useSignal(actions.value[0]);
	const selectAction = (action: Action) => {
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
