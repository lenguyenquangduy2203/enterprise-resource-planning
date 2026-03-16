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

export default function Container({ resourceActionsRecord }: Readonly<Props>) {
	// 1. Identify which keys are actually permitted based on "read" access
	const permittedKeys = (Object.keys(InsightsMap) as InsightKey[]).filter((
		key,
	) => (resourceActionsRecord[key] || []).includes("read"));

	const insightsNo = permittedKeys.length;
	if (insightsNo === 0) return <div>No insights available.</div>;

	const cols = Math.ceil(Math.sqrt(insightsNo));

	// 2. Chunk the permitted keys into rows for the grid
	const rows: InsightKey[][] = [];
	for (let i = 0; i < permittedKeys.length; i += cols) {
		rows.push(permittedKeys.slice(i, i + cols));
	}

	return (
		<div class="flex flex-col gap-6 w-full">
			{rows.map((row, rowIndex) => (
				<div
					class="flex flex-wrap md:flex-nowrap gap-6 w-full"
					key={`row-${row.join("-")}`}
				>
					{row.map((key, colIndex) => {
						const Insight = InsightsMap[key];
						const globalIndex = rowIndex * cols + colIndex;
						const lightness = 95 - (globalIndex * 5);

						return (
							<div
								key={key} // Use the unique key for stable reconciliation
								class="flex-1 min-w-[300px] animate-in fade-in slide-in-from-bottom-2"
								style={{
									backgroundColor:
										`hsl(0, 80%, ${lightness}%)`,
									textAlign: "center",
									padding: "1.5rem",
									borderRadius: "0.75rem",
									transition: "all 0.2s ease",
								}}
							>
								{/* 3. Call as a Component to preserve signal-based updates */}
								<Insight
									resourceActionsRecord={resourceActionsRecord}
								/>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
