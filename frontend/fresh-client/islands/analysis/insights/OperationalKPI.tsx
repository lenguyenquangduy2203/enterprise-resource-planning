import useOperationalKPI, {
	type KPI,
} from "@/hooks/analytic/useOperationalKPI.ts";
import Chart, { type ChartProps } from "@/islands/Chart.tsx";

type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

export default function OperationalKPI(
	{ resourceActionsRecord }: Readonly<Props>,
) {
	const isPermitted = (resourceActionsRecord["kpi"] || []).includes("read");

	const { data, isLoading, query } = useOperationalKPI({
		enabled: isPermitted,
	});

	if (!isPermitted) return null;

	// Helper to update specific date fields in the signal
	const handleDateChange =
		(field: "createdFrom" | "createdTo") => (e: Event) => {
			const target = e.target as HTMLInputElement;
			// Spread the existing query value to ensure immutability
			query.value = { ...query.value, [field]: target.value };
		};

	const kpiData = data.value;

	return (
		<section class="p-4 space-y-6">
			{/* Control Toolbar */}
			<div class="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
				<div class="flex flex-col">
					<label class="text-xs font-semibold text-gray-500 uppercase">
						From<input
							type="date"
							value={query.value.createdFrom}
							onInput={handleDateChange("createdFrom")}
							class="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
						/>
					</label>
				</div>
				<div class="flex flex-col">
					<label class="text-xs font-semibold text-gray-500 uppercase">
						To<input
							type="date"
							value={query.value.createdTo}
							onInput={handleDateChange("createdTo")}
							class="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
						/>
					</label>
				</div>
				{isLoading.value && (
					<span class="text-sm text-blue-600 animate-pulse self-end pb-1">
						Updating charts...
					</span>
				)}
			</div>

			{/* Charts Grid */}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="bg-white p-4 rounded shadow">
					<Chart {...MovementTypeConfig(kpiData)} />
				</div>
				<div class="bg-white p-4 rounded shadow lg:col-span-2">
					<Chart {...MovementStatusConfig(kpiData)} />
				</div>
				<div class="bg-white p-4 rounded shadow md:col-span-2 lg:col-span-3">
					<Chart {...WarehouseActivityConfig(kpiData)} />
				</div>
			</div>
		</section>
	);
}

// --- Configuration Builders ---

const MOVEMENT_TYPE_COLORS: Record<string, string> = {
	TRANSFER: "#36A2EB", // Blue
	IMPORT: "#FF6384", // Pink/Red
	EXPORT: "#FFCE56", // Yellow
	ADJUSTMENT: "#4BC0C0", // Teal
};

function MovementTypeConfig(data: KPI): ChartProps<"doughnut"> {
	const distributions = Array.from(data.typeDistributions);

	// Map colors specifically to the type present in this data point
	const backgroundColors = distributions.map(
		(d) => MOVEMENT_TYPE_COLORS[d.type] || "#C9CBCF", // Default gray if type is unknown
	);

	return {
		type: "doughnut",
		data: {
			labels: distributions.map((d) => d.type),
			datasets: [{
				label: "Movements",
				data: distributions.map((d) => d.totalMovements),
				backgroundColor: backgroundColors,
			}],
		},
		options: {
			plugins: {
				legend: {
					display: true,
					position: "bottom", // Helps users map color to text
				},
				title: { display: true, text: "Movement Type Distribution" },
			},
		},
	};
}

function MovementStatusConfig(data: KPI): ChartProps<"bar"> {
	const distributions = Array.from(data.statusDistributions);
	// Standard horizontal bar to show "Pipeline" flow
	return {
		type: "bar",
		data: {
			labels: ["Status"],
			datasets: distributions.map((d, i) => ({
				label: d.status,
				data: [d.totalMovements],
				backgroundColor: `hsla(${i * 45}, 70%, 50%, 0.8)`,
			})),
		},
		options: {
			indexAxis: "y",
			scales: { x: { stacked: true }, y: { stacked: true } },
			plugins: {
				title: { display: true, text: "Movement Status Workflow" },
			},
		},
	};
}

function WarehouseActivityConfig(data: KPI): ChartProps<"bar"> {
	const distributions = Array.from(data.warehouseDistributions);
	return {
		type: "bar",
		data: {
			labels: distributions.map((d) => `WH #${d.warehouseId}`),
			datasets: [{
				label: "Total Movements",
				data: distributions.map((d) => d.totalMovements),
				backgroundColor: "#9966FF",
			}],
		},
		options: {
			plugins: {
				title: { display: true, text: "Warehouse Activity Load" },
			},
		},
	};
}
