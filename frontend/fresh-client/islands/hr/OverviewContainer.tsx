import { FunctionalComponent } from "preact";

export default function OverviewContainer() {
	return (
		<div class="flex flex-col gap-8 animate-in fade-in duration-500">
			{/* Header with Scoped Accent */}
			<header class="relative pl-6">
				<div class="absolute left-0 top-0 bottom-0 w-1.5 rounded-full bg-(--color-primary)" />
				<h1 class="text-2xl font-bold text-(--color-text)">
					Human Resources Overview
				</h1>
				<p class="text-(--color-secondary)">
					Centralized management for personnel, organizational
					structure, and system access.
				</p>
			</header>

			{/* Quick Stats Grid */}
			<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<OverviewCard
					title="Total Employees"
					value="—"
					description="Active staff members"
					icon="👥"
				/>
				<OverviewCard
					title="Departments"
					value="—"
					description="Organizational units"
					icon="🏢"
				/>
				<OverviewCard
					title="User Accounts"
					value="—"
					description="System access roles"
					icon="🔐"
				/>
			</section>

			{/* Getting Started / Guidance Box */}
			<section class="rounded-2xl border border-(--color-primary)/10 bg-(--color-primary)/5 p-6">
				<div class="flex items-center gap-2 mb-4 text-(--color-primary)">
					<span class="text-xl">🚀</span>
					<h2 class="font-bold uppercase tracking-wider text-xs">
						Getting Started
					</h2>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div class="bg-white/50 p-4 rounded-xl border border-white">
						<p class="text-sm font-semibold text-(--color-text) mb-1">
							1. Navigate
						</p>
						<p class="text-xs text-(--color-secondary)">
							Select a resource from the left sidebar to begin
							managing data.
						</p>
					</div>
					<div class="bg-white/50 p-4 rounded-xl border border-white">
						<p class="text-sm font-semibold text-(--color-text) mb-1">
							2. Actions
						</p>
						<p class="text-xs text-(--color-secondary)">
							Use the top navigation tabs to switch between lists,
							forms, and reports.
						</p>
					</div>
					<div class="bg-white/50 p-4 rounded-xl border border-white">
						<p class="text-sm font-semibold text-(--color-text) mb-1">
							3. Control
						</p>
						<p class="text-xs text-(--color-secondary)">
							Availability of features is determined by your
							specific HR permissions.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}

type OverviewCardProps = {
	title: string;
	value: string;
	description?: string;
	icon: string;
};

const OverviewCard: FunctionalComponent<OverviewCardProps> = (
	{ title, value, description, icon },
) => {
	return (
		<div class="group relative overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white p-6 shadow-sm transition-all hover:shadow-md">
			{/* Subtle background decoration */}
			<div class="absolute -right-4 -top-4 text-6xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
				{icon}
			</div>

			<div class="flex items-center gap-3 mb-3">
				<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-(--color-primary)/10 text-(--color-primary)">
					{icon}
				</span>
				<span class="text-sm font-medium text-(--color-secondary)">
					{title}
				</span>
			</div>

			<div class="text-3xl font-bold text-(--color-text)">
				{value}
			</div>

			{description && (
				<div class="mt-2 text-xs text-(--color-secondary) flex items-center gap-1">
					<span class="h-1 w-1 rounded-full bg-(--color-accent)" />
					{description}
				</div>
			)}
		</div>
	);
};
