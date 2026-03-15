type Props = {
	resourceActionsRecord: Record<string, string[]>;
};

export default function DepartmentWorkforce(
	{ resourceActionsRecord }: Readonly<Props>,
) {
	if (!(resourceActionsRecord["workforce"] || []).includes("read")) {
		return null;
	}

	return <div>Department Workforce</div>;
}
