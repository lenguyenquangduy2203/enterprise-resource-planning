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
				</span>Active
			</span>
		);
	}
	return (
		<span class="inline-flex items-center gap-1.5 text-xs font-bold text-(--color-accent) bg-(--color-accent)/10 px-2.5 py-1 rounded-md border border-(--color-accent)/20">
			<span class="w-1.5 h-1.5 rounded-full bg-(--color-accent)">
			</span>Inactive
		</span>
	);
}

type MovementType = "TRANSFER" | "IMPORT" | "EXPORT" | "ADJUSTMENT";
type MovementStatus =
	| "PENDING"
	| "IN_REVIEW"
	| "REJECTED"
	| "ACCEPTED"
	| "EXECUTING"
	| "FAILED"
	| "COMPLETED"
	| "CANCELLED";

type StockMovement = {
	id: number;
	product: {
		id: number;
		sku: string;
		name: string;
	};
	movementType: MovementType;
	status: MovementStatus;
	quantity: number;
	fromWarehouse: {
		id: number;
		name: string;
	} | null;
	toWarehouse: {
		id: number;
		name: string;
	} | null;
	performedBy: {
		id: string;
		name: string;
	};
	reviewedBy: {
		id: string;
		name: string;
	} | null;
	createdAt: string;
	updatedAt: string;
};

export const intoStockMovementsDataSheet = (mvm: StockMovement) => ({
	id: mvm.id.toString(),
	content: {
		"Product": (
			<div class="flex flex-col">
				<span class="font-bold text-(--color-text)">
					{mvm.product.name}
				</span>
				<span class="text-[10px] font-mono text-(--color-secondary)">
					{mvm.product.sku}
				</span>
			</div>
		),
		"Movement": (
			<div class="flex items-center gap-2">
				<div class="flex flex-col items-end min-w-20">
					<span class="text-[10px] font-bold uppercase text-(--color-secondary)">
						From
					</span>
					<span class="text-xs truncate max-w-[100px]">
						{mvm.fromWarehouse?.name || "External"}
					</span>
				</div>
				<span class="text-(--color-primary) animate-pulse">→</span>
				<div class="flex flex-col items-start min-w-20">
					<span class="text-[10px] font-bold uppercase text-(--color-secondary)">
						To
					</span>
					<span class="text-xs truncate max-w-[100px]">
						{mvm.toWarehouse?.name || "External"}
					</span>
				</div>
			</div>
		),
		"Details": (
			<div class="flex flex-col">
				<span class="text-sm font-bold text-(--color-text)">
					{mvm.quantity}
					<span class="ml-1 text-[10px] font-normal text-(--color-secondary)">
						Qty
					</span>
				</span>
				<span class="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded self-start font-medium mt-1">
					{mvm.movementType}
				</span>
			</div>
		),
		"Status": <MovementStatusBadge status={mvm.status} />,
		"Activity": (
			<div class="text-[10px] text-(--color-secondary) flex flex-col">
				<span>By: {mvm.performedBy.name}</span>
				<span>{new Date(mvm.createdAt).toLocaleDateString()}</span>
			</div>
		),
	},
});

function MovementStatusBadge({ status }: Readonly<{ status: MovementStatus }>) {
	const config: Record<
		MovementStatus,
		{ color: string; bg: string; dot: string }
	> = {
		PENDING: {
			color: "text-amber-700",
			bg: "bg-amber-50",
			dot: "bg-amber-500",
		},
		IN_REVIEW: {
			color: "text-blue-700",
			bg: "bg-blue-50",
			dot: "bg-blue-500",
		},
		ACCEPTED: {
			color: "text-indigo-700",
			bg: "bg-indigo-50",
			dot: "bg-indigo-500",
		},
		EXECUTING: {
			color: "text-cyan-700",
			bg: "bg-cyan-50",
			dot: "bg-cyan-500",
		},
		COMPLETED: {
			color: "text-emerald-700",
			bg: "bg-emerald-50",
			dot: "bg-emerald-500",
		},
		REJECTED: {
			color: "text-rose-700",
			bg: "bg-rose-50",
			dot: "bg-rose-500",
		},
		FAILED: { color: "text-red-700", bg: "bg-red-50", dot: "bg-red-500" },
		CANCELLED: {
			color: "text-slate-500",
			bg: "bg-slate-100",
			dot: "bg-slate-400",
		},
	};

	const { color, bg, dot } = config[status];

	return (
		<span
			class={`inline-flex items-center gap-1.5 text-[10px] font-bold ${color} ${bg} px-2 py-1 rounded-md border border-current/10`}
		>
			<span class={`w-1 h-1 rounded-full ${dot}`}></span>
			{status}
		</span>
	);
}
