import { Head } from "fresh/runtime";
import { define } from "@/utils/mod.ts";

export default define.page(() => {
	return (
		<div class="min-h-screen bg-white">
			<Head>
				<title>ERP System | Logistic Management</title>
			</Head>

			{/* Navigation Bar */}
			<nav class="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
				<div class="flex items-center gap-2">
					<img src="/logo.svg" width="32" height="32" alt="Logo" />
					<span class="text-xl font-bold text-gray-800 tracking-tight">
						ERP<span class="text-green-600">Core</span>
					</span>
				</div>
				<div class="flex items-center gap-6">
					<a
						href="#features"
						class="text-sm font-medium text-gray-600 hover:text-green-600 transition"
					>
						Features
					</a>
					<a
						href="/hub"
						class="px-5 py-2 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition shadow-md shadow-green-200"
					>
						Access Hub
					</a>
				</div>
			</nav>

			{/* Hero Section */}
			<header class="fresh-gradient px-4 py-20 flex flex-col items-center text-center">
				<div class="max-w-4xl mx-auto">
					<h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
						Next-Gen{" "}
						<span class="text-green-600">Logistic ERP</span> <br />
						for Microservice Architectures
					</h1>
					<p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
						A secure, loosely-coupled prototype designed to manage
						products, warehouse stocks, and workforce data with
						centralized Vietnamese regulation compliance.
					</p>
					<div class="mt-10 flex gap-4 justify-center">
						<a
							href="/hub"
							class="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition"
						>
							Get Started
						</a>
						<a
							href="#features"
							class="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition"
						>
							View Modules
						</a>
					</div>
				</div>
			</header>

			{/* Features Grid */}
			<section id="features" class="max-w-6xl mx-auto px-4 py-24">
				<div class="text-center mb-16">
					<h2 class="text-3xl font-bold text-gray-900">
						Core ERP Domains
					</h2>
					<p class="text-gray-500 mt-2">
						Validated architectural and security decisions across
						four critical services.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Auth Module */}
					<div class="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-200 transition">
						<div class="text-3xl mb-4">🔐</div>
						<h3 class="font-bold text-lg mb-2">Auth & Policy</h3>
						<p class="text-sm text-gray-500 leading-relaxed">
							Centralized Auth server enforcing RBAC and secure
							JWT policies across all distributed modules.
						</p>
					</div>

					{/* HR Module */}
					<div class="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-200 transition">
						<div class="text-3xl mb-4">👥</div>
						<h3 class="font-bold text-lg mb-2">Human Resources</h3>
						<p class="text-sm text-gray-500 leading-relaxed">
							Manage employee profiles and organizational roles
							integrated directly with centralized security.
						</p>
					</div>

					{/* Inventory Module */}
					<div class="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-200 transition">
						<div class="text-3xl mb-4">📦</div>
						<h3 class="font-bold text-lg mb-2">
							Inventory Control
						</h3>
						<p class="text-sm text-gray-500 leading-relaxed">
							Real-time stock tracking and product management with
							role-restricted warehouse operations.
						</p>
					</div>

					{/* Analysis Module */}
					<div class="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-200 transition">
						<div class="text-3xl mb-4">📊</div>
						<h3 class="font-bold text-lg mb-2">Data Analytics</h3>
						<p class="text-sm text-gray-500 leading-relaxed">
							Decision support using Chart.js visualizations
							aggregated from cross-service data sources.
						</p>
					</div>
				</div>
			</section>

			{/* Vietnamese Regulation Section */}
			<section class="bg-gray-50 py-20">
				<div class="max-w-4xl mx-auto px-4 text-center">
					<div class="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
						Compliance Ready
					</div>
					<h2 class="text-3xl font-bold mb-6">
						Built for Vietnamese Enterprise Standards
					</h2>
					<p class="text-gray-600 leading-relaxed">
						Our architecture satisfies local data localization laws
						and Vietnamese regulatory requirements through secure
						on-premise cloud deployment, robust audit logging, and
						Gateway-enforced trust boundaries.
					</p>
				</div>
			</section>

			{/* Footer */}
			<footer class="py-12 border-t border-gray-100 text-center">
				<p class="text-sm text-gray-400">
					© {new Date().getFullYear()}{" "}
					ERP Core Prototype. Built with Fresh & Microservices.
				</p>
			</footer>
		</div>
	);
});
