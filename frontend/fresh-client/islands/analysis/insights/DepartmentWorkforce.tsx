import useDepartmentWorkforce, {
	type Department,
} from "@/hooks/analytic/useDepartmentWorkforce.ts";
import Chart, { type ChartProps } from "@/islands/Chart.tsx";

type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

export default function DepartmentWorkforce(
	{ resourceActionsRecord }: Readonly<Props>,
) {
	const isPermitted = (resourceActionsRecord["workforce"] || [])
		.includes("read");
	const { data, isLoading, error } = useDepartmentWorkforce({
		enabled: isPermitted,
	});
	if (!isPermitted) return null;

	// 1. Error State
	if (error.value) {
		return (
			<div class="flex flex-col items-center justify-center p-8 text-center bg-(--color-negative)/5 border border-(--color-negative)/20 rounded-2xl">
				<span class="text-2xl mb-2">⚠️</span>
				<h3 class="text-xs font-bold text-(--color-negative) uppercase tracking-tight">
					Analysis Error
				</h3>
				<p class="text-[10px] text-(--color-secondary) mt-1 max-w-[200px]">
					{error.value.message ||
						"Unable to fetch workforce analytics."}
				</p>
			</div>
		);
	}

	// 2. Stable Skeleton State
	if (isLoading.value) {
		return (
			<section class="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 w-full">
				{/* Upper Charts */}
				<div class="bg-(--color-primary)/5 p-6 rounded-xl border border-(--color-primary)/10">
					<div class="skeleton h-4 w-1/2 mb-6" />
					<div class="skeleton h-48 w-full rounded-lg" />
				</div>
				<div class="bg-(--color-primary)/5 p-6 rounded-xl border border-(--color-primary)/10">
					<div class="skeleton h-4 w-1/2 mb-6" />
					<div class="skeleton h-48 w-full rounded-lg" />
				</div>
				{/* Bottom Chart */}
				<div class="bg-(--color-primary)/5 p-6 rounded-xl border border-(--color-primary)/10 md:col-span-2">
					<div class="skeleton h-4 w-1/3 mb-6" />
					<div class="skeleton h-64 w-full rounded-lg" />
				</div>
			</section>
		);
	}

	// Convert Set to Array for processing
	const departments = Array.from(data.value);
	const labels = departments.map((d) => d.departmentName);
	const buildProps = { labels, departments };

	return (
		<section class="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
			<div class="bg-white p-4 rounded-xl border border-(--color-primary)/5 shadow-sm">
				{/* Fixed height wrapper */}
				<div class="h-(--chart-height) w-full relative">
					<Chart {...DepartmentWorkforceSizeConfig(buildProps)} />
				</div>
			</div>
			<div class="bg-white p-4 rounded-xl border border-(--color-primary)/5 shadow-sm">
				<div class="h-(--chart-height) w-full relative">
					<Chart {...SalaryCostDistributionConfig(buildProps)} />
				</div>
			</div>
			<div class="bg-white p-4 rounded-xl border border-(--color-primary)/5 shadow-sm md:col-span-2">
				<div class="h-(--chart-height) w-full relative">
					<Chart {...LevelCompositionConfig(buildProps)} />
				</div>
			</div>
		</section>
	);
}

type ConfigBuildProps = Readonly<{
	labels: string[];
	departments: Array<Department>;
}>;

function DepartmentWorkforceSizeConfig(
	{ labels, departments }: ConfigBuildProps,
): ChartProps<"bar"> {
	return {
		type: "bar",
		data: {
			labels,
			datasets: [{
				label: "Total Employees",
				data: departments.map((d) => d.totalEmployee),
				backgroundColor: "rgba(54, 162, 235, 0.6)",
			}],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			resizeDelay: 200,
			plugins: {
				title: { display: true, text: "Workforce Size by Department" },
			},
		},
	};
}

function SalaryCostDistributionConfig(
	{ labels, departments }: ConfigBuildProps,
): ChartProps<"bar"> {
	return {
		type: "bar",
		data: {
			labels,
			datasets: [{
				label: "Total Salary Cost ($)",
				data: departments.map((d) => d.totalSalaryCost),
				backgroundColor: "rgba(255, 99, 132, 0.6)",
			}],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			resizeDelay: 200,
			plugins: {
				title: { display: true, text: "Salary Cost Distribution" },
			},
		},
	};
}

function LevelCompositionConfig(
	{ labels, departments }: ConfigBuildProps,
): ChartProps<"bar"> {
	const levelSet = new Set<string>();
	departments.forEach((d) => {
		d.levelDistributions.forEach((l) => levelSet.add(l.level));
	});
	const allLevels = Array.from(levelSet);

	const levelDatasets = allLevels.map((level, index) => ({
		label: level,
		// Using a simple map lookup would be faster, but for standard department counts,
		// this is fine.
		data: departments.map((d) => {
			let total = 0;
			for (const dist of d.levelDistributions) {
				if (dist.level === level) {
					total = dist.total;
					break;
				}
			}
			return total;
		}),
		backgroundColor: `hsla(${
			index * (360 / allLevels.length)
		}, 70%, 60%, 0.7)`,
	}));

	return {
		type: "bar",
		data: { labels, datasets: levelDatasets },
		options: {
			responsive: true,
			maintainAspectRatio: false,
			resizeDelay: 200,
			scales: {
				x: { stacked: true },
				y: {
					stacked: true,
					title: { display: true, text: "Employees" },
				},
			},
			plugins: {
				title: {
					display: true,
					text: "Level Composition per Department",
				},
			},
		},
	};
}
