import { JSX } from "preact";
import DepartmentWorkforce from "./insights/DepartmentWorkforce.tsx";
import OperationalKPI from "./insights/OperationalKPI.tsx";
import StockCapitalDistributions from "./insights/StockCapitalDistributions.tsx";

type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

type InsightComponent = (props: Readonly<Props>) => JSX.Element | null;

const DemoInsight = () => <div>Demo</div>;
const NullInsight = () => null;
const AvailableInsights: InsightComponent[] = [
	DepartmentWorkforce,
	DemoInsight,
	OperationalKPI,
	NullInsight,
	DemoInsight,
	NullInsight,
	StockCapitalDistributions,
	DemoInsight,
	DemoInsight,
	DemoInsight,
];

export default function Container({ resourceActionsRecord }: Readonly<Props>) {
	const PermittedInsights = AvailableInsights
		.map((Insight) => Insight({ resourceActionsRecord }))
		.filter((Insight) => Insight !== null);
	const insightsNo = PermittedInsights.length;
	const cols = Math.ceil(Math.sqrt(insightsNo));
	const rows = [];
	for (let i = 0; i < PermittedInsights.length; i += cols) {
		rows.push(PermittedInsights.slice(i, i + cols));
	}

	return (
		<div class="flex flex-col gap-6 w-full">
			{rows.map((row, rowIndex) => (
				<div class="flex flex-wrap md:flex-nowrap gap-6 w-full">
					{row.map((Insight, colIndex) => {
						// Global index for the color calculation
						const globalIndex = rowIndex * cols + colIndex;
						const lightness = 95 - (globalIndex * 5);

						return (
							<div
								key={globalIndex}
								class="flex-1 min-w-[250px] animate-in fade-in slide-in-from-bottom-2"
								style={{
									backgroundColor:
										`hsl(0, 80%, ${lightness}%)`,
									textAlign: "center",
									padding: "1.5rem",
									borderRadius: "0.75rem",
									transition: "all 0.2s ease",
								}}
							>
								{Insight}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
