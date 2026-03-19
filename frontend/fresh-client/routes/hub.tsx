import { Head } from "fresh/runtime";
import {
	challenge,
	define,
	extractResource,
	MODULE_RESOURCE_MAP,
	ModuleMeta,
	ModuleName,
} from "@/utils/mod.ts";
import { HomeController } from "@/controllers/auth/HomeController.ts";
import {
	PoliciesClient,
	PoliciesSchema,
} from "@/http-clients/auth/PoliciesClient.ts";
import { PageProps } from "fresh";
import z from "zod";

export const handler = define.handlers({
	GET: HomeController(async (accessToken) => {
		if (!accessToken) {
			const authUrl = `http://localhost:9000/oauth2/authorize` +
				`?response_type=code` +
				`&client_id=fresh-client` +
				`&redirect_uri=${
					encodeURIComponent(`http://0.0.0.0:5173/auth/callback`)
				}` +
				`&scope=openid` +
				`&state=erp` +
				"&code_challenge=" + challenge +
				"&code_challenge_method=S256";

			return Response.redirect(authUrl, 302);
		}

		const policies = await PoliciesClient.getJwtPolicies(accessToken);

		return { data: policies };
	}),
});

export default define.page(
	({ data }: PageProps<z.infer<typeof PoliciesSchema>>) => {
		const permissions: string[] = data.permissions ?? [];
		const resources = new Set(
			permissions.map((pem) => extractResource(pem)).filter(Boolean),
		);
		const enabledModules = Object.entries(MODULE_RESOURCE_MAP)
			.filter(([_, moduleResources]) =>
				moduleResources.some((r) => resources.has(r))
			)
			.map(([module]) => module as ModuleName);

		return (
			<>
				<Head>
					<title>Distributed ERP | Unified Workspace</title>
				</Head>

				<main class="default fresh-gradient min-h-screen flex flex-col items-center justify-start pt-20 px-6">
					<header class="text-center mb-12">
						<div class="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-(--color-primary) uppercase bg-white/50 rounded-full backdrop-blur-sm border border-white/20">
							Enterprise Resource Planning
						</div>
						<h1 class="text-4xl font-extrabold text-(--color-text) tracking-tight mb-3">
							Welcome back, System User
						</h1>
						<p class="text-lg text-(--color-secondary) max-w-md mx-auto">
							Select a workspace to manage your organization's
							resources.
						</p>
					</header>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
						{enabledModules.map((module) => (
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

						{enabledModules.length === 0 && (
							<div class="col-span-full bg-white/50 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
								<p class="text-gray-500 font-medium">
									No active modules found for your current
									permissions.
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

					<footer class="mt-auto py-8 text-sm text-gray-400">
						&copy; 2026 ERP Systems Inc. &bull; Secure Session
						Active
					</footer>
				</main>
			</>
		);
	},
);
