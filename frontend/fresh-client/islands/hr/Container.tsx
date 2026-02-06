import { FunctionalComponent } from "preact";
import ButtonsList from "../../components/ButtonsList.tsx";
import LeftAside from "../../components/layouts/LeftAside.tsx";
import { useResourceNav } from "../../hooks/useResourceNav.ts";
import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import OverviewContainer from "./OverviewContainer.tsx";

type ResourceProps = {
	resourceActionsRecord: Record<string, string[]>;
	activeResource: Signal<string>;
};

const ResourceLazyDispatcher: Record<
	string,
	() => Promise<FunctionalComponent<ResourceProps>>
> = {
	"employee": async () =>
		await import("./employee/EmployeeActionsContainer.tsx")
			.then((m) => m.default),
	"account": async () =>
		await import("@/islands/hr/AccountActionsContainer.tsx")
			.then((m) => m.default),
};

type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

async function dispatchSection(
	sectionSig: Signal<FunctionalComponent<ResourceProps>>,
	activeResource: Signal<string>,
) {
	const dispatcher = ResourceLazyDispatcher[activeResource.value];
	if (!dispatcher) return;

	sectionSig.value = await dispatcher();
}

export default function Container({
	resourceActionsRecord,
}: Readonly<Props>) {
	const {
		resources,
		activeResource,
		selectResource,
	} = useResourceNav(resourceActionsRecord, "overview");
	const sectionSig = useSignal<FunctionalComponent<ResourceProps>>(
		OverviewContainer,
	);

	useSignalEffect(() => {
		dispatchSection(sectionSig, activeResource);
	});

	const SelectedSection = sectionSig.value;

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
}
