import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import { FunctionalComponent } from "preact";
import { useResourceNav } from "@/hooks/useResourceNav.ts";
import ButtonsList from "@/components/ButtonsList.tsx";
import LeftAside from "@/components/layouts/LeftAside.tsx";

export type ResourceProps<
	Resource extends string | symbol = string,
	Action = string,
> = {
	resourceActionsRecord: Record<Resource, Action[]>;
	activeResource: Signal<Resource>;
};

type ResourceLazyDispatcher<Resource extends string | symbol> = Record<
	Resource,
	() => Promise<FunctionalComponent<ResourceProps>>
>;

type DashboardProps = {
	resourceActionsRecord: Record<string, string[]>;
};

type DashboardContainerFactoryConfig<Resource extends string | symbol> = {
	defaultSection: {
		key: Resource & string;
		Component: FunctionalComponent<ResourceProps>;
	};
};

export function getSection<Resource extends string | symbol = string>(
	module: { default: FunctionalComponent<ResourceProps<Resource>> },
) {
	return module.default;
}

export default function DashboardContainerFactory<
	Resource extends string | symbol,
>(
	dispatcher: ResourceLazyDispatcher<Resource>,
	config?: DashboardContainerFactoryConfig<Resource>,
) {
	async function dispatchSection(
		sectionSig: Signal<FunctionalComponent<ResourceProps> | undefined>,
		activeResource: Signal<Resource>,
	) {
		const section = dispatcher[activeResource.value];
		if (!section) return;

		sectionSig.value = await section();
	}

	return function ({ resourceActionsRecord }: Readonly<DashboardProps>) {
		const {
			resources,
			activeResource,
			selectResource,
		} = useResourceNav<Resource & string>(
			resourceActionsRecord,
			config?.defaultSection.key,
		);
		const sectionSig = useSignal(config?.defaultSection.Component);

		useSignalEffect(() => {
			dispatchSection(sectionSig, activeResource);
		});

		const SelectedSection: FunctionalComponent<ResourceProps> =
			sectionSig.value || (() => null);

		return (
			<LeftAside>
				<LeftAside.Aside>
					<ButtonsList>
						<ButtonsList.Header>
							Human Resources
						</ButtonsList.Header>
						{resources.map((resource) => (
							<ButtonsList.Item
								key={resource}
								active={activeResource.value === resource}
								onClick={() => selectResource(resource)}
							>
								{resource}
							</ButtonsList.Item>
						))}
					</ButtonsList>
				</LeftAside.Aside>
				<LeftAside.Section>
					<SelectedSection
						resourceActionsRecord={resourceActionsRecord}
						activeResource={activeResource}
					/>
				</LeftAside.Section>
			</LeftAside>
		);
	};
}
