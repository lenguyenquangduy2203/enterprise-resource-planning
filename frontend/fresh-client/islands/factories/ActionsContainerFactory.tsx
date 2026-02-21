import { FunctionalComponent } from "preact";
import { ResourceProps } from "./DashboardContainerFactory.tsx";
import { useActionNav } from "../../hooks/useActionNav.ts";
import TopNav from "../../components/layouts/TopNav.tsx";

type ActionsLazyDispatcher<Action extends string | symbol> = Record<
	Action,
	FunctionalComponent
>;

export default function ActionsContainerFactory<Action extends string | symbol>(
	dispatcher: ActionsLazyDispatcher<Action>,
) {
	return function ({
		resourceActionsRecord,
		activeResource,
	}: Readonly<ResourceProps<string, Action>>) {
		const {
			actions,
			activeAction,
			selectAction,
		} = useActionNav<Action>(resourceActionsRecord, activeResource);
		const SelectedSection: FunctionalComponent =
			dispatcher[activeAction.value] ??
				(() => <div>Unknown Action</div>);

		return (
			<TopNav>
				<TopNav.Nav>
					{actions.value.map((action) => (
						<TopNav.NavItem
							active={activeAction.value === action}
							onClick={() => selectAction(action)}
						>
							{action.toString()}
						</TopNav.NavItem>
					))}
				</TopNav.Nav>
				<TopNav.Section>
					<SelectedSection />
				</TopNav.Section>
			</TopNav>
		);
	} as FunctionalComponent<ResourceProps>;
}
