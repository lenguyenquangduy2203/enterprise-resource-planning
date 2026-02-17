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

type ProductDetails = {
	sku: string;
	name: string;
	unit: string;
	unitPrice: number;
	categoryCode: string;
	categoryName: string;
	manufacturerCode: string;
	manufacturerName: string;
	status: "ACTIVE" | "INACTIVE";
};

export const intoProductDetailsDataSheet = (product: ProductDetails) => ({
	id: product.sku,
	content: {
		"Product Identity": (
			<div class="flex flex-col">
				<span class="font-bold text-(--color-text)">
					{product.name}
				</span>
				<span class="text-[10px] font-mono uppercase tracking-tighter text-(--color-secondary)">
					SKU: {product.sku}
				</span>
			</div>
		),
		"Classification": (
			<div class="text-xs">
				<div class="font-medium text-(--color-text)">
					{product.categoryName}
				</div>
				<div class="text-(--color-secondary) text-[10px] italic">
					{product.manufacturerName}
				</div>
			</div>
		),
		"Pricing/Unit": (
			<div class="flex flex-col items-start">
				<span class="text-xs font-bold text-(--color-primary)">
					${product.unitPrice.toLocaleString(undefined, {
						minimumFractionDigits: 2,
					})}
				</span>
				<span class="text-[10px] text-(--color-secondary)">
					per {product.unit}
				</span>
			</div>
		),
		"Availability": <ProductStatusBadge status={product.status} />,
	},
});

// Logistics-themed status badge
function ProductStatusBadge(
	{ status }: Readonly<{ status: "ACTIVE" | "INACTIVE" }>,
) {
	if (status === "ACTIVE") {
		return (
			<span class="inline-flex items-center gap-1.5 text-xs font-bold text-(--color-primary) bg-(--color-primary-ring) px-2.5 py-1 rounded-md border border-(--color-primary)/20">
				<span class="w-1.5 h-1.5 rounded-full bg-(--color-primary)">
				</span>
				Active
			</span>
		);
	}
	return (
		<span class="inline-flex items-center gap-1.5 text-xs font-bold text-(--color-accent) bg-(--color-accent)/10 px-2.5 py-1 rounded-md border border-(--color-accent)/20">
			<span class="w-1.5 h-1.5 rounded-full bg-(--color-accent)"></span>
			Inactive
		</span>
	);
}
