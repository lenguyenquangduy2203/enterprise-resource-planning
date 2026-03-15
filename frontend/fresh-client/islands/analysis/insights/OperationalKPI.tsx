type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

export default function OperationalKPI(
	{ resourceActionsRecord }: Readonly<Props>,
) {
	if (!(resourceActionsRecord["kpi"] || []).includes("read")) {
		return null;
	}

	return <div>Operational KPI</div>;
}
