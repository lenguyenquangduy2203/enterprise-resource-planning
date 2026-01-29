import { Head } from "fresh/runtime";
import {
	challenge,
	define,
	extractResource,
	MODULE_RESOURCE_MAP,
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
			permissions.map(extractResource).filter(Boolean),
		);
		const enabledModules = Object.entries(MODULE_RESOURCE_MAP)
			.filter(([_, moduleResources]) =>
				moduleResources.some((r) => resources.has(r))
			)
			.map(([module]) => module as ModuleName);

		return (
			<>
				<Head>
					<title>ERP Home</title>
				</Head>

				<main class="min-h-screen flex flex-col items-center justify-center px-6">
					<h1 class="text-3xl font-bold mb-2">Welcome</h1>
					<p class="text-gray-600 mb-8">
						Modules you have access to
					</p>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
						{enabledModules.map((module) => (
							<a
								key={module}
								href={`/${module}`}
								class="block rounded-xl border border-base-300 p-6 
								hover:shadow-lg hover:border-primary transition"
							>
								<h2 class="text-xl font-semibold capitalize mb-2">
									{module}
								</h2>
								<p class="text-sm text-gray-500">
									Open {module} module
								</p>
							</a>
						))}

						{enabledModules.length === 0 && (
							<p class="text-gray-500 col-span-full text-center">
								You don’t have access to any modules yet.
							</p>
						)}
					</div>
				</main>
			</>
		);
	},
);
