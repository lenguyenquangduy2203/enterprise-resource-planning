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
				{actions.value.map((action) => (
					<TopNav.NavItem
						active={activeAction.value === action}
						onClick={() => selectAction(action)}
					>
						{action}
					</TopNav.NavItem>
				))}
			</TopNav.Nav>
			<TopNav.Section>
				<SelectedSection />
			</TopNav.Section>
		</TopNav>
	);
}
