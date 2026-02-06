type EmployeeSummary = {
	id: string;
	fullname: string;
	email: string;
	level: string;
	positionCode: string;
	positionName: string;
	departmentCode: string;
	departmentName: string;
	hasAccount: boolean;
};

export const intoEmployeeSummaryDataSheet = (emp: EmployeeSummary) => ({
	id: emp.id,
	content: {
		"Employee Info": (
			<div class="flex flex-col">
				<span class="font-bold text-(--color-text)">
					{emp.fullname}
				</span>
				<span class="text-xs text-(--color-secondary)">
					{emp.email}
				</span>
			</div>
		),
		"Org Unit": (
			<div class="text-xs">
				<div class="font-medium">{emp.departmentName}</div>
				<div class="text-(--color-secondary)">{emp.positionName}</div>
			</div>
		),
		"Level": <span class="text-xs font-mono">{emp.level || "—"}</span>,
		"System": <AccountStatusBadge hasAccount={emp.hasAccount} />,
	},
});

// Helper component to keep the mapping object even cleaner
function AccountStatusBadge({ hasAccount }: Readonly<{ hasAccount: boolean }>) {
	if (hasAccount) {
		return (
			<span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
				{" "}
				Provisioned
			</span>
		);
	}
	return (
		<span class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
			<span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>{" "}
			No Account
		</span>
	);
}
