import { FunctionalComponent } from "preact";
import ProductRead from "./ProductRead.tsx";
import ProductWrite from "./ProductWrite.tsx";
import { Signal } from "@preact/signals";
import { useActionNav } from "@/hooks/useActionNav.ts";
import TopNav from "@/components/layouts/TopNav.tsx";

const ActionSectionDispatcher: Record<string, FunctionalComponent> = {
	read: () => <ProductRead />,
	write: () => <ProductWrite />,
};

type Props = {
	resourceActionsRecord: Record<string, string[]>;
	activeResource: Signal<string>;
};

export default function ProductActionsContainer({
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
