import { Head } from "fresh/runtime";
import { define } from "@/utils/mod.ts";
import { HomeController } from "@/controllers/auth/HomeController.ts";
import { page } from "fresh";
import { ResponseEntity } from "@fresh-web/mod.ts";
import ModulesContainer from "@/islands/ModulesContainer.tsx";
import { challenge } from "@/utils/PkCE.ts";

export const handler = define.handlers({
	GET: HomeController((accessToken) => {
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

			return ResponseEntity.redirect(authUrl);
		}

		return page();
	}),
});

export default define.page(
	() => {
		return (
			<>
				<Head>
					<title>Distributed ERP | Unified Workspace</title>
				</Head>

				{/* 🔹 Top Navigation */}
				<nav class="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20">
					<div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
						{/* Left: Brand */}
						<div class="font-bold text-(--color-text) tracking-tight">
							ERP Workspace
						</div>

						{/* Right: Logout */}
						<form method="POST" action="/auth/logout">
							<button
								type="submit"
								class="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 bg-(--color-primary) hover:opacity-90 transition"
							>
								Logout
							</button>
						</form>
					</div>
				</nav>

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

					<ModulesContainer />

					<footer class="mt-auto py-8 text-sm text-gray-400">
						&copy; 2026 ERP Systems Inc. &bull; Secure Session
						Active
					</footer>
				</main>
			</>
		);
	},
);
