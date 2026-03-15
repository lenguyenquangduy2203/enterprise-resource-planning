type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

export default function StockCapitalDistributions(
	{ resourceActionsRecord }: Readonly<Props>,
) {
	if (!(resourceActionsRecord["capital"] || []).includes("read")) {
		return null;
	}

	return <div>Stock Capital Distributions</div>;
}
