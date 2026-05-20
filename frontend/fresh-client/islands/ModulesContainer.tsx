import {
	extractResource,
	MODULE_RESOURCE_MAP,
	ModuleMeta,
	ModuleName,
} from "@/utils/mod.ts";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals";

type Policies = {
	username: string;
	roles: string[];
	permissions: string[];
};

export default function ModulesContainer() {
	const permissions = useSignal<Policies["permissions"]>([]);
	const resources = useComputed(() =>
		new Set(
			permissions.value.map((pem) => extractResource(pem)).filter(
				Boolean,
			),
		)
	);
	const enabledModules = useComputed(() =>
		Object.entries(MODULE_RESOURCE_MAP)
			.filter(([_, moduleResources]) =>
				moduleResources.some((r) => resources.value.has(r))
			)
			.map(([module]) => module as ModuleName)
	);

	async function fetchPermission() {
		const resp = await fetch("/api/me/permissions");
		if (!resp.ok) {
			console.log("Response is not Ok");
			permissions.value = [];
		}

		const policies: Policies = await resp.json();
		console.log(policies);

		permissions.value = policies.permissions;
	}

	useSignalEffect(() => {
		fetchPermission();
		globalThis.addEventListener("pageshow", fetchPermission);

		return () => {
			globalThis.removeEventListener("pageshow", fetchPermission);
		};
	});

	return (
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
			{enabledModules.value.map((module) => (
				<a
					key={module}
					href={`/${module}`}
					class="group relative block rounded-2xl bg-white/80 border border-white p-8 
                                    shadow-sm backdrop-blur-md transition-all duration-300
                                    hover:-translate-y-1 hover:shadow-xl hover:bg-white"
				>
					<div class="flex items-center justify-between mb-4">
						<span class="text-3xl grayscale group-hover:grayscale-0 transition-all">
							{ModuleMeta[module]?.icon || "🛠️"}
						</span>
						<div class="h-8 w-8 rounded-full bg-(--color-bg) flex items-center justify-center text-(--color-primary) opacity-0 group-hover:opacity-100 transition-opacity">
							→
						</div>
					</div>

					<h2 class="text-xl font-bold capitalize text-(--color-text) mb-2">
						{module.toUpperCase()}
					</h2>
					<p class="text-sm text-(--color-secondary) leading-relaxed">
						{ModuleMeta[module]?.desc ||
							`Access the ${module} management tools.`}
					</p>

					{/* Subtle accent bar on hover */}
					<div class="absolute bottom-0 left-0 h-1 w-0 bg-(--color-accent) transition-all duration-500 group-hover:w-full rounded-b-2xl">
					</div>
				</a>
			))}

			{enabledModules.value.length === 0 && (
				<div class="col-span-full bg-white/50 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
					<p class="text-gray-500 font-medium">
						No active modules found for your current permissions.
					</p>
					<button
						class="mt-4 text-sm text-(--color-primary) underline"
						type="button"
					>
						Contact Administrator
					</button>
				</div>
			)}
		</div>
	);
}
