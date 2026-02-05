import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import { ComponentChild } from "preact";
import DataSheet from "@/components/DataSheet.tsx";

type DepartmentSelectOption = {
	code: string;
	name: string;
};

type PositionSelectOption = {
	code: string;
	name: string;
};

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

type Page<T> = {
	[x: string]: unknown;
	content: T[];
	number: number;
	size: number;
	totalElements: number;
	totalPages: number;
};

async function loadDepartments(departments: Signal<DepartmentSelectOption[]>) {
	const res = await fetch("/api/hr/departments");
	if (!res.ok) return;
	departments.value = await res.json();
}

async function loadPositions(
	departmentCode: Signal<string>,
	positions: Signal<PositionSelectOption[]>,
	positionCode: Signal<string>,
) {
	if (!departmentCode.value) {
		positions.value = [];
		positionCode.value = "";
		return;
	}

	const res = await fetch(
		`/api/hr/departments/${departmentCode.value}/positions`,
	);
	if (!res.ok) return;

	positions.value = await res.json();
}

export default function EmployeeRead() {
	const isLoading = useSignal(false);

	// Search Filter Signals (Mapping SearchEmployeeQuery)
	const fullname = useSignal("");
	const email = useSignal("");
	const level = useSignal("");
	const departmentCode = useSignal("");
	const positionCode = useSignal("");
	const provisioningStatus = useSignal(""); // AccountProvisioningStatus

	// Data and Pagination Signals
	const employees = useSignal<
		{ id: string; content: Record<string, ComponentChild> }[]
	>([]);
	const pageNumber = useSignal(0);
	const totalPages = useSignal(1);
	const totalElements = useSignal(0);
	const pageSize = 10;

	// Options
	const departments = useSignal<DepartmentSelectOption[]>([]);
	const positions = useSignal<PositionSelectOption[]>([]);

	// Load options on mount and when department changes
	useSignalEffect(() => {
		loadDepartments(departments);
	});
	useSignalEffect(() => {
		loadPositions(departmentCode, positions, positionCode);
	});

	// Fetch and Transform Logic
	useSignalEffect(() => {
		// Track the current values to watch
		const paramsObj = {
			page: pageNumber.value.toString(),
			size: pageSize.toString(),
			fullname: fullname.value,
			email: email.value,
			level: level.value,
			departmentCode: departmentCode.value,
			positionCode: positionCode.value,
			accountProvisioningStatus: provisioningStatus.value,
		};

		const controller = new AbortController();

		const handler = setTimeout(async () => {
			isLoading.value = true;
			try {
				const params = new URLSearchParams(paramsObj);

				const res = await fetch(`/api/hr/employees?${params}`, {
					signal: controller.signal,
				});

				if (res.ok) {
					const page: Page<EmployeeSummary> = await res.json();

					employees.value = page.content.map((emp) => ({
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
									<div class="font-medium">
										{emp.departmentName}
									</div>
									<div class="text-(--color-secondary)">
										{emp.positionName}
									</div>
								</div>
							),
							"Level": (
								<span class="text-xs font-mono">
									{emp.level || "—"}
								</span>
							),
							"System": emp.hasAccount
								? (
									<span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
										<span class="w-1.5 h-1.5 rounded-full bg-emerald-500">
										</span>{" "}
										Provisioned
									</span>
								)
								: (
									<span class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
										<span class="w-1.5 h-1.5 rounded-full bg-slate-300">
										</span>{" "}
										No Account
									</span>
								),
						},
					}));

					totalPages.value = page.totalPages;
					totalElements.value = page.totalElements;
				}
			} catch (err) {
				if ((err as Error).name !== "AbortError") console.error(err);
			} finally {
				isLoading.value = false;
			}
		}, 400); // 400ms delay is usually the "sweet spot" for search

		// Cleanup: Clear timeout and abort fetch if signals change again
		return () => {
			clearTimeout(handler);
			controller.abort();
		};
	});

	return (
		<div class="space-y-6">
			{/* Search Panel Section */}
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
				{/* Column 1: Identity */}
				<div class="space-y-4">
					<Field label="Full Name">
						<input
							class="hr-input"
							value={fullname.value}
							onInput={(e) =>
								fullname.value = e.currentTarget.value}
							placeholder="Search names..."
						/>
					</Field>
					<Field label="Email Address">
						<input
							class="hr-input"
							value={email.value}
							onInput={(e) => email.value = e.currentTarget.value}
							placeholder="Search emails..."
						/>
					</Field>
				</div>

				{/* Column 2: Organization (Flattened) */}
				<div class="space-y-4">
					<Field label="Department">
						<select
							class="hr-input"
							value={departmentCode.value}
							onChange={(e) =>
								departmentCode.value = e.currentTarget.value}
						>
							<option value="">All Departments</option>
							{departments.value.map((d) => (
								<option value={d.code}>{d.name}</option>
							))}
						</select>
					</Field>
					<Field label="Position">
						<select
							class={`hr-input transition-all ${
								departmentCode.value
									? "border-(--color-primary)/30"
									: "opacity-50"
							}`}
							value={positionCode.value}
							onChange={(e) =>
								positionCode.value = e.currentTarget.value}
							disabled={!departmentCode.value}
						>
							<option value="">
								{departmentCode.value
									? "All Positions"
									: "Select Dept First"}
							</option>
							{positions.value.map((p) => (
								<option value={p.code}>{p.name}</option>
							))}
						</select>
					</Field>
				</div>

				{/* Column 3: Status & Level */}
				<div class="space-y-4">
					<Field label="Seniority Level">
						<input
							class="hr-input"
							value={level.value}
							onInput={(e) => level.value = e.currentTarget.value}
							placeholder="e.g. Senior"
						/>
					</Field>
					<Field label="Account Status">
						<select
							class="hr-input"
							value={provisioningStatus.value}
							onChange={(e) =>
								provisioningStatus.value =
									e.currentTarget.value}
						>
							<option value="">Any Status</option>
							<option value="PROVISIONED">Provisioned</option>
							<option value="NOT_PROVISIONED">
								Not Provisioned
							</option>
						</select>
					</Field>
				</div>
			</div>

			{/* 2. Data Sheet */}
			<DataSheet>
				<DataSheet.TableData
					data={employees.value}
				/>
				<DataSheet.PageNav
					meta={{
						number: pageNumber,
						size: pageSize,
						totalElements: totalElements.value,
						totalPages: totalPages.value,
					}}
				/>
			</DataSheet>
		</div>
	);
}

function Field(
	{ label, children }: Readonly<{ label: string; children: ComponentChild }>,
) {
	return (
		<div class="flex flex-col gap-1.5">
			<label class="text-[10px] font-bold uppercase tracking-wider text-(--color-secondary)">
				{label}
			</label>
			{children}
		</div>
	);
}
