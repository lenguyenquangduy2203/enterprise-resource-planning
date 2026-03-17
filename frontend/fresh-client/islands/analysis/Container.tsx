import { JSX } from "preact";
import DepartmentWorkforce from "./insights/DepartmentWorkforce.tsx";
import OperationalKPI from "./insights/OperationalKPI.tsx";
import StockCapitalDistributions from "./insights/StockCapitalDistributions.tsx";
import { MODULE_RESOURCE_MAP } from "@/utils/mod.ts";

type InsightKey = typeof MODULE_RESOURCE_MAP["analysis"][number];

type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

type InsightComponent = (props: Readonly<Props>) => JSX.Element | null;

const InsightsMap = {
	workforce: DepartmentWorkforce,
	capital: StockCapitalDistributions,
	kpi: OperationalKPI,
} satisfies Record<InsightKey, InsightComponent>;

const InsightDescriptions: Record<InsightKey, string> = {
	workforce:
		"Comprehensive analysis of personnel distribution, salary costs, and departmental seniority levels.",
	capital:
		"Financial valuation of inventory assets grouped by physical location or product category.",
	kpi: "Operational velocity tracking, including movement types, workflow status, and warehouse load.",
};

export default function Container({ resourceActionsRecord }: Readonly<Props>) {
	// 1. Identify which keys are actually permitted based on "read" access
	const permittedKeys = (Object.keys(InsightsMap) as InsightKey[]).filter((
		key,
	) => (resourceActionsRecord[key] || []).includes("read"));

	const insightsNo = permittedKeys.length;
	if (insightsNo === 0) {
		return (
			<div class="p-12 text-center rounded-2xl border-2 border-dashed border-(--color-secondary)/20 text-(--color-secondary)">
				No analysis insights available for your current permission
				level.
			</div>
		);
	}

	const cols = Math.ceil(Math.sqrt(insightsNo));

	// 2. Chunk the permitted keys into rows for the grid
	const rows: InsightKey[][] = [];
	for (let i = 0; i < permittedKeys.length; i += cols) {
		rows.push(permittedKeys.slice(i, i + cols));
	}

	return (
		<div class="flex flex-col gap-6 w-full animate-in fade-in duration-700">
			{rows.map((row, rowIndex) => (
				<div
					class="flex flex-wrap lg:flex-nowrap gap-6 w-full"
					key={`row-${row.join("-")}`}
				>
					{row.map((key, colIndex) => {
						const Insight = InsightsMap[key];
						const description = InsightDescriptions[key];
						// Calculate an opacity step (0.05, 0.1, 0.15...) for a subtle "layered" look
						const globalIndex = rowIndex * cols + colIndex;
						const opacity = 0.03 + (globalIndex * 0.02);

						return (
							<div
								key={key}
								class="flex-1 min-w-[320px] p-8 rounded-2xl border border-(--color-primary)/10 transition-all hover:shadow-xl hover:shadow-(--color-primary)/5 hover:-translate-y-1 group"
								style={{
									backgroundColor:
										`rgba(51, 65, 85, ${opacity})`,
								}}
							>
								<div class="flex flex-col h-full">
									{/* Header Decorator with Tooltip */}
									<div
										data-tip={description}
										class="w-full h-1.5 rounded-full bg-(--color-accent) mb-6 opacity-40 group-hover:opacity-100 transition-opacity cursor-help"
									/>

									<Insight
										resourceActionsRecord={resourceActionsRecord}
									/>
								</div>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
