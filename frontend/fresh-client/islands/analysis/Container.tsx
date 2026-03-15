import { JSX } from "preact";
import DepartmentWorkforce from "./insights/DepartmentWorkforce.tsx";
import OperationalKPI from "./insights/OperationalKPI.tsx";
import StockCapitalDistributions from "./insights/StockCapitalDistributions.tsx";

type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

type InsightComponent = (props: Readonly<Props>) => JSX.Element | null;

const AvailableInsights: InsightComponent[] = [
	DepartmentWorkforce,
	OperationalKPI,
	StockCapitalDistributions,
];

export default function Container({ resourceActionsRecord }: Readonly<Props>) {
	const insightsNo = Object.keys(resourceActionsRecord).length;
	const cols = Math.ceil(Math.sqrt(insightsNo));

	return (
		<div
			class="grid gap-6"
			style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
		>
			{AvailableInsights.map((Insight, index) => {
				// 1. Calculate dynamic background color using HSL or HEX logic
				// Using a base red (0) with varying lightness for the "red-100/200" effect
				const lightness = 95 - (index * 5);
				const dynamicStyle = {
					backgroundColor: `hsl(0, 80%, ${lightness}%)`,
					textAlign: "center" as const,
					padding: "1.5rem",
					borderRadius: "0.75rem",
				};

				// 2. Logic for spanning the last row
				const remainder = (index * cols) - insightsNo;
				const isLastRow = 0 < remainder && remainder < cols;

				if (isLastRow) {
					// Tailwind's 'col-span-X' is shorthand for 'grid-column: span X / span X'
					const spanValue = remainder + 1;
					Object.assign(dynamicStyle, {
						gridColumn: `span ${spanValue} / span ${spanValue}`,
					});
				}

				return (
					<div style={dynamicStyle}>
						<Insight
							resourceActionsRecord={resourceActionsRecord}
						/>
					</div>
				);
			})}
		</div>
	);
}
