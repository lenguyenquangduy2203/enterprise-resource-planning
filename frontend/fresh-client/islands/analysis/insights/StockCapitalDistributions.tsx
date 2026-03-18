import useStockCapitalDistribution, {
	type GroupBy,
} from "@/hooks/analytic/useStockCapitalDistribution.ts";
import Chart, { type ChartProps } from "@/islands/Chart.tsx";

type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

export default function StockCapitalDistributions(
	{ resourceActionsRecord }: Readonly<Props>,
) {
	const isPermitted = (resourceActionsRecord["capital"] || []).includes(
		"read",
	);

	const { query, data, isLoading, error } = useStockCapitalDistribution({
		enabled: isPermitted,
		group: "WAREHOUSE",
	});

	if (!isPermitted) return null;

	// 1. Error State
	if (error.value) {
		return (
			<div class="m-4 flex flex-col items-center justify-center p-10 text-center bg-(--color-negative)/5 border border-(--color-negative)/20 rounded-2xl">
				<span class="text-3xl mb-3">💰</span>
				<h3 class="text-sm font-bold text-(--color-negative) uppercase tracking-widest">
					Capital Valuation Failed
				</h3>
				<p class="text-[10px] text-(--color-secondary) mt-2 max-w-[250px]">
					{error.value.message ||
						"Financial data could not be aggregated. Please check your connection to the catalog service."}
				</p>
			</div>
		);
	}

	// 2. Initial Loading State (Skeleton)
	if (isLoading.value && !data.value) {
		return (
			<section class="p-4 space-y-6">
				<div class="h-16 w-full skeleton rounded-xl opacity-20" />
				<div class="h-96 w-full skeleton rounded-2xl opacity-10" />
			</section>
		);
	}

	const distributions = data.value;
	const currentGroup = query.value;

	return (
		<section class="p-4 space-y-6 animate-in fade-in duration-500">
			{/* Control Toolbar - Themed */}
			<div class="flex items-center justify-between bg-(--color-primary)/5 p-4 rounded-xl border border-(--color-primary)/10">
				<div class="flex items-center gap-4">
					<label class="text-xs font-bold text-(--color-secondary) uppercase tracking-wide">
						Group Capital By:<select
							value={currentGroup}
							onChange={(e) =>
								query.value = (e.target as HTMLSelectElement)
									.value as GroupBy}
							class="bg-white border border-(--color-primary)/10 rounded-lg px-4 py-1.5 text-sm font-medium focus:ring-2 focus:ring-(--color-accent) outline-none text-(--color-text) cursor-pointer transition-all"
						>
							<option value="WAREHOUSE">
								Warehouse Location
							</option>
							<option value="CATEGORY">Product Category</option>
						</select>
					</label>
				</div>

				{isLoading.value && (
					<div class="flex items-center gap-2">
						<div class="flex gap-1">
							<span class="w-1 h-1 rounded-full bg-(--color-accent) animate-bounce [animation-delay:-0.3s]" />
							<span class="w-1 h-1 rounded-full bg-(--color-accent) animate-bounce [animation-delay:-0.15s]" />
							<span class="w-1 h-1 rounded-full bg-(--color-accent) animate-bounce" />
						</div>
						<span class="text-[10px] font-bold text-(--color-accent) uppercase tracking-tighter">
							Valuating
						</span>
					</div>
				)}
			</div>

			{/* Dynamic Chart Area - Themed Card */}
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-(--color-primary)/5">
				{/* The container is now 450px tall regardless of data */}
				<div class="h-(--chart-height) w-full relative flex items-center justify-center">
					{currentGroup === "WAREHOUSE"
						? <Chart {...WarehouseCapitalConfig(distributions)} />
						: <Chart {...CategoryCapitalConfig(distributions)} />}
				</div>
			</div>
		</section>
	);
}

// --- Configuration Builders ---

function WarehouseCapitalConfig(data: Map<string, number>): ChartProps<"bar"> {
	const entries = Array.from(data.entries());

	return {
		type: "bar",
		data: {
			labels: entries.map(([id]) => `Warehouse #${id}`),
			datasets: [{
				label: "Capital Value ($)",
				data: entries.map(([, value]) => value),
				backgroundColor: "rgba(75, 192, 192, 0.7)",
				borderColor: "rgb(75, 192, 192)",
				borderWidth: 1,
			}],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			resizeDelay: 200,
			indexAxis: "y", // Horizontal bars look better for location lists
			plugins: {
				title: { display: true, text: "Inventory Capital by Location" },
				legend: { display: false },
			},
			scales: {
				x: { title: { display: true, text: "Value (USD)" } },
			},
		},
	};
}

function getCategoryColor(id: string): string {
	let hash = 0;
	for (let i = 0; i < id.length; i++) {
		hash = (id.codePointAt(i) || 0) + ((hash << 5) - hash);
	}

	// 1. Hue: Still using the Golden Ratio for best spread
	const h = (Math.abs(hash) * 0.618033988749895 * 360) % 360;

	// 2. Saturation: Stay between 65% (Clean) and 90% (Punchy)
	// This removes the "dim/grey" feeling.
	const s = (Math.abs(hash >> 2) % 2 === 0) ? 65 : 90;

	// 3. Lightness: Stay between 55% and 70%
	// This ensures no color is too "heavy" or "blackish."
	const l = (Math.abs(hash >> 4) % 2 === 0) ? 55 : 70;

	return `hsla(${h}, ${s}%, ${l}%, 0.85)`;
}

function CategoryCapitalConfig(data: Map<string, number>): ChartProps<"pie"> {
	const entries = Array.from(data.entries());

	return {
		type: "pie",
		data: {
			labels: entries.map(([id]) => `Category #${id}`),
			datasets: [{
				label: "Capital Distribution",
				data: entries.map(([, value]) => value),
				backgroundColor: entries.map(([id, _]) => getCategoryColor(id)),
			}],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			resizeDelay: 200,
			plugins: {
				title: {
					display: true,
					text: "Capital Concentration by Category",
				},
				legend: { position: "right" },
			},
		},
	};
}
