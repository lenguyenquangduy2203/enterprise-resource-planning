import { FunctionalComponent } from "preact";

export default function OverviewContainer() {
	return (
		<div class="flex flex-col gap-6 p-4">
			{/* Header */}
			<header class="space-y-1">
				<h1 class="text-xl font-semibold">
					Human Resources Dashboard
				</h1>
				<p class="text-sm text-gray-500">
					Manage employees, departments, and accounts from one place.
				</p>
			</header>

			{/* Quick stats (static for now) */}
			<section class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<OverviewCard
					title="Employees"
					value="—"
					description="Total employees"
				/>
				<OverviewCard
					title="Departments"
					value="—"
					description="Active departments"
				/>
				<OverviewCard
					title="Accounts"
					value="—"
					description="Linked user accounts"
				/>
			</section>

			{/* Guidance */}
			<section class="rounded-lg border p-4 bg-gray-50">
				<h2 class="font-medium mb-2">Getting started</h2>
				<ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
					<li>Select a resource from the left sidebar</li>
					<li>Use action tabs to view or modify data</li>
					<li>Permissions control available actions</li>
				</ul>
			</section>
		</div>
	);
}

type OverviewCardProps = {
	title: string;
	value: string;
	description?: string;
};

const OverviewCard: FunctionalComponent<OverviewCardProps> = (
	{ title, value, description },
) => {
	return (
		<div class="rounded-lg border p-4 bg-white">
			<div class="text-sm text-gray-500">{title}</div>
			<div class="text-2xl font-semibold">{value}</div>
			{description && (
				<div class="text-xs text-gray-400 mt-1">
					{description}
				</div>
			)}
		</div>
	);
};
