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

	const { data, isLoading, query } = useStockCapitalDistribution({
		enabled: isPermitted,
		group: "WAREHOUSE",
	});

	if (!isPermitted) return null;

	const distributions = data.value;
	const currentGroup = query.value;

	return (
		<section class="p-4 space-y-6">
			{/* Control Toolbar */}
			<div class="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
				<div class="flex items-center gap-3">
					<label class="text-sm font-bold text-gray-700">
						Group By:<select
							value={currentGroup}
							onChange={(e) =>
								query.value = (e.target as HTMLSelectElement)
									.value as GroupBy}
							class="border rounded px-3 py-1 text-sm bg-white outline-none focus:ring-2 focus:ring-green-500"
						>
							<option value="WAREHOUSE">Warehouse</option>
							<option value="CATEGORY">Product Category</option>
						</select>
					</label>
				</div>
				{isLoading.value && (
					<div class="text-sm text-green-600 animate-pulse">
						Calculating Capital...
					</div>
				)}
			</div>

			{/* Dynamic Chart Area */}
			<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
				{currentGroup === "WAREHOUSE"
					? <Chart {...WarehouseCapitalConfig(distributions)} />
					: <Chart {...CategoryCapitalConfig(distributions)} />}
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

function CategoryCapitalConfig(data: Map<string, number>): ChartProps<"pie"> {
	const entries = Array.from(data.entries());

	return {
		type: "pie",
		data: {
			labels: entries.map(([id]) => `Category #${id}`),
			datasets: [{
				label: "Capital Distribution",
				data: entries.map(([, value]) => value),
				backgroundColor: entries.map((_, i) =>
					`hsla(${i * 137.5}, 65%, 55%, 0.8)`
				),
			}],
		},
		options: {
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
