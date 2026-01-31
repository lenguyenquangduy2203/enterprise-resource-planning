import { Signal } from "@preact/signals";
import { FunctionalComponent } from "preact";
import TopNav from "../../components/layouts/TopNav.tsx";
import { useActionNav } from "../../hooks/useActionNav.ts";

const ActionSectionDispatcher: Record<string, FunctionalComponent> = {
	read: () => <div>Account.read</div>,
	write: () => <div>Account.write</div>,
};

type Props = {
	resourceActionsRecord: Record<string, string[]>;
	activeResource: Signal<string>;
};

export default function AccountActionsContainer({
	resourceActionsRecord,
	activeResource,
}: Readonly<Props>) {
	const {
		actions,
		activeAction,
		selectAction,
	} = useActionNav(resourceActionsRecord, activeResource);
	const SelectedSection = ActionSectionDispatcher[activeAction.value] ??
		(() => <div>Unknown Action</div>);

	return (
		<TopNav>
			<TopNav.Nav>
				<div class="flex gap-2">
					{actions.value.map((action) => (
						<button
							type="button"
							key={action}
							class={`btn btn-sm ${
								activeAction.value === action
									? "btn-primary"
									: "btn-ghost"
							}`}
							onClick={() => selectAction(action)}
						>
							{action}
						</button>
					))}
				</div>
			</TopNav.Nav>
			<TopNav.Section>
				<SelectedSection />
			</TopNav.Section>
		</TopNav>
	);
}
