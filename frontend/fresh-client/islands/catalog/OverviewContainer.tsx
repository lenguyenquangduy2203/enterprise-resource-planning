import { FunctionalComponent } from "preact";

export default function OverviewContainer() {
	return (
		<div class="flex flex-col gap-8 animate-in fade-in duration-500">
			{/* Header with Logistics Scoped Accent */}
			<header class="relative pl-6">
				<div class="absolute left-0 top-0 bottom-0 w-1.5 rounded-full bg-(--color-primary)" />
				<h1 class="text-2xl font-bold text-(--color-text)">
					Product Catalog Overview
				</h1>
				<p class="text-(--color-secondary)">
					Manage technical specifications, product classifications,
					and manufacturer relationships.
				</p>
			</header>

			{/* Quick Stats Grid - Logistics Themed */}
			<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<OverviewCard
					title="Active Products"
					value="—"
					description="Live SKU definitions"
					icon="📦"
				/>
				<OverviewCard
					title="Manufacturers"
					value="—"
					description="Supply chain partners"
					icon="🏭"
				/>
				<OverviewCard
					title="Categories"
					value="—"
					description="Logical taxonomies"
					icon="🏷️"
				/>
			</section>

			{/* Catalog Management Guidance */}
			<section class="rounded-2xl border border-(--color-primary)/10 bg-(--color-primary)/5 p-6">
				<div class="flex items-center gap-2 mb-4 text-(--color-primary)">
					<span class="text-xl">🛠️</span>
					<h2 class="font-bold uppercase tracking-wider text-xs">
						Master Data Control
					</h2>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div class="bg-white/50 p-4 rounded-xl border border-white">
						<p class="text-sm font-semibold text-(--color-text) mb-1">
							1. Define
						</p>
						<p class="text-xs text-(--color-secondary)">
							Create base product records with SKUs, units of
							measure, and pricing.
						</p>
					</div>
					<div class="bg-white/50 p-4 rounded-xl border border-white">
						<p class="text-sm font-semibold text-(--color-text) mb-1">
							2. Classify
						</p>
						<p class="text-xs text-(--color-secondary)">
							Assign products to categories and manufacturers for
							supply chain tracking.
						</p>
					</div>
					<div class="bg-white/50 p-4 rounded-xl border border-white">
						<p class="text-sm font-semibold text-(--color-text) mb-1">
							3. Integrate
						</p>
						<p class="text-xs text-(--color-secondary)">
							Catalog data synchronizes directly with Inventory
							and Procurement modules.
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
			{/* Background decoration */}
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
