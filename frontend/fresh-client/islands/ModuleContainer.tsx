import LeftAside from "@/components/layouts/LeftAside.tsx";
import ButtonsList from "@/components/ButtonsList.tsx";
import TopNav from "@/components/layouts/TopNav.tsx";
import { useResourceNav } from "@/hooks/useResourceNav.ts";
import { useActionNav } from "@/hooks/useActionNav.ts";

type Props = {
	moduleName: string;
	resourceActionsRecord: Record<string, string[]>;
};

export default function ModuleContainer(
	{ moduleName, resourceActionsRecord }: Readonly<Props>,
) {
	const { resources, activeResource, selectResource } = useResourceNav(
		resourceActionsRecord,
	);
	const { actions, activeAction, selectAction } = useActionNav(
		resourceActionsRecord,
		activeResource,
	);

	return (
		<LeftAside>
			<LeftAside.Aside>
				<ButtonsList>
					<ButtonsList.Header>
						{moduleName}
					</ButtonsList.Header>

					<ButtonsList.List>
						{resources.map((resource) => (
							(
								<ButtonsList.Item
									key={resource}
									active={activeResource.value === resource}
									onClick={() => selectResource(resource)}
								>
									{resource}
								</ButtonsList.Item>
							)
						))}
					</ButtonsList.List>
				</ButtonsList>
			</LeftAside.Aside>

			<LeftAside.Section>
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
						{activeResource.value} / {activeAction.value}
					</TopNav.Section>
				</TopNav>
			</LeftAside.Section>
		</LeftAside>
	);
}
