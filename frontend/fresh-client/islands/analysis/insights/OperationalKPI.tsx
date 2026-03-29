import useOperationalKPI, {
	type KPI,
} from "@/hooks/analysis/useOperationalKPI.ts";
import Chart, { type ChartProps } from "@/islands/Chart.tsx";

type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

export default function OperationalKPI(
	{ resourceActionsRecord }: Readonly<Props>,
) {
	const isPermitted = (resourceActionsRecord["kpi"] || []).includes("read");

	const { query, data, isLoading, error } = useOperationalKPI({
		enabled: isPermitted,
	});

	if (!isPermitted) return null;

	// Helper to update specific date fields in the signal
	const handleDateChange =
		(field: "createdFrom" | "createdTo") => (e: Event) => {
			const target = e.target as HTMLInputElement;
			const newValue = target.value;
			const current = query.value;

			const invalidInterval =
				(field === "createdFrom" && newValue > current.createdTo) ||
				(field === "createdTo" && newValue < current.createdFrom);
			if (invalidInterval) {
				query.value = {
					...current,
					createdFrom: newValue,
					createdTo: newValue,
				};
			} else {
				query.value = { ...current, [field]: newValue };
			}
		};

	// 1. Error State
	if (error.value) {
		return (
			<div class="m-4 flex flex-col items-center justify-center p-10 text-center bg-(--color-negative)/5 border border-(--color-negative)/20 rounded-2xl">
				<span class="text-3xl mb-3">📡</span>
				<h3 class="text-sm font-bold text-(--color-negative) uppercase tracking-widest">
					KPI Service Unavailable
				</h3>
				<p class="text-[10px] text-(--color-secondary) mt-2 max-w-[250px]">
					{error.value.message ||
						"The operational database could not be reached. Please verify your filters."}
				</p>
			</div>
		);
	}

	// 2. Skeleton State (mirrors the 1-2-3 column grid)
	if (isLoading.value && !data.value) {
		return (
			<section class="p-4 space-y-6">
				<div class="h-20 w-full skeleton rounded-lg opacity-20" />
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div class="h-64 skeleton rounded-xl opacity-10" />
					<div class="h-64 skeleton rounded-xl opacity-10 lg:col-span-2" />
					<div class="h-80 skeleton rounded-xl opacity-10 md:col-span-2 lg:col-span-3" />
				</div>
			</section>
		);
	}

	const kpiData = data.value;
	const today = new Date().toISOString().split("T")[0];

	return (
		<section class="p-4 space-y-6 animate-in fade-in duration-500">
			{/* Control Toolbar - Themed */}
			<div class="flex flex-wrap items-center gap-6 bg-(--color-primary)/5 p-5 rounded-xl border border-(--color-primary)/10">
				<div class="flex flex-col gap-1.5">
					<label class="text-[10px] font-bold text-(--color-secondary) uppercase tracking-wider">
						Created From<input
							type="date"
							value={query.value.createdFrom}
							max={query.value.createdTo}
							onInput={handleDateChange("createdFrom")}
							class="bg-white border border-(--color-primary)/10 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-(--color-accent) outline-none text-(--color-text)"
						/>
					</label>
				</div>
				<div class="flex flex-col gap-1.5">
					<label class="text-[10px] font-bold text-(--color-secondary) uppercase tracking-wider">
						Created To<input
							type="date"
							value={query.value.createdTo}
							min={query.value.createdFrom}
							max={today}
							onInput={handleDateChange("createdTo")}
							class="bg-white border border-(--color-primary)/10 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-(--color-accent) outline-none text-(--color-text)"
						/>
					</label>
				</div>

				{isLoading.value && (
					<div class="flex items-center gap-2 self-end pb-2 ml-auto">
						<span class="w-2 h-2 rounded-full bg-(--color-accent) animate-ping" />
						<span class="text-[10px] font-bold text-(--color-accent) uppercase">
							Refreshing Analytics
						</span>
					</div>
				)}
			</div>

			{/* Charts Grid - Themed Cards */}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="bg-white p-5 rounded-2xl border border-(--color-primary)/5 shadow-sm">
					<div class="h-(--chart-height) w-full relative">
						<Chart {...MovementTypeConfig(kpiData)} />
					</div>
				</div>
				<div class="bg-white p-5 rounded-2xl border border-(--color-primary)/5 shadow-sm lg:col-span-2">
					<div class="h-(--chart-height) w-full relative">
						<Chart {...MovementStatusConfig(kpiData)} />
					</div>
				</div>
				<div class="bg-white p-5 rounded-2xl border border-(--color-primary)/5 shadow-sm md:col-span-2 lg:col-span-3">
					<div class="h-(--chart-height) w-full relative">
						<Chart {...WarehouseActivityConfig(kpiData)} />
					</div>
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
			responsive: true,
			maintainAspectRatio: false,
			resizeDelay: 200,
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
			responsive: true,
			maintainAspectRatio: false,
			resizeDelay: 200,
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
			responsive: true,
			maintainAspectRatio: false,
			resizeDelay: 200,
			plugins: {
				title: { display: true, text: "Warehouse Activity Load" },
			},
		},
	};
}
