import { Signal } from "@preact/signals";
import { useActionNav } from "../../../hooks/useActionNav.ts";
import TopNav from "../../../components/layouts/TopNav.tsx";
import { FunctionalComponent } from "preact";
import EmployeeWrite from "../employee/EmployeeWrite.tsx";
import EmployeeRead from "../employee/EmployeeRead.tsx";

const ActionSectionDispatcher: Record<string, FunctionalComponent> = {
	read: () => <EmployeeRead />,
	write: () => <EmployeeWrite />,
};

type Props = {
	resourceActionsRecord: Record<string, string[]>;
	activeResource: Signal<string>;
};

export default function EmployeeActionsContainer({
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
