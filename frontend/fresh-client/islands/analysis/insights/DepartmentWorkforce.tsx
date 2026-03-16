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
	const { data, isLoading } = useDepartmentWorkforce({
		enabled: isPermitted,
	});
	if (!isPermitted) return null;

	if (isLoading.value) {
		return (
			<div class="p-4 animate-pulse">Loading workforce insights...</div>
		);
	}

	// Convert Set to Array for processing
	const departments = Array.from(data.value);
	const labels = departments.map((d) => d.departmentName);
	const buildProps = { labels, departments };

	return (
		<section class="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
			<div class="bg-white p-4 rounded shadow">
				<Chart {...DepartmentWorkforceSizeConfig(buildProps)} />
			</div>
			<div class="bg-white p-4 rounded shadow">
				<Chart {...SalaryCostDistributionConfig(buildProps)} />
			</div>
			<div class="bg-white p-4 rounded shadow md:col-span-2">
				<Chart {...LevelCompositionConfig(buildProps)} />
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
