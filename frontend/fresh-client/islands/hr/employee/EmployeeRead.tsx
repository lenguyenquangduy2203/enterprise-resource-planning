import { useSignal } from "@preact/signals";
import { ComponentChild } from "preact";
import DataSheet from "@/components/DataSheet.tsx";
import { useOrgData } from "@/hooks/useOrgData.ts";
import { useEmployeeSearch } from "@/hooks/useEmployeeSearch.ts";

const ProvisionStatus = [
	"PROVISIONED",
	"NOT_PROVISIONED",
] as const;

export default function EmployeeRead() {
	// Search Filter Signals (Mapping SearchEmployeeQuery)
	const fullname = useSignal("");
	const email = useSignal("");
	const level = useSignal("");
	const accountProvisioningStatus = useSignal<
		typeof ProvisionStatus[number] | undefined
	>(undefined); // AccountProvisioningStatus

	// Use the shared hook
	const org = useOrgData();

	const resetAll = () => {
		fullname.value = "";
		email.value = "";
		level.value = "";
		accountProvisioningStatus.value = undefined;
		org.resetOrg();
	};

	// Use the search hook, passing the necessary signals
	const { employees, pageNumber, totalPages, totalElements, pageSize } =
		useEmployeeSearch({
			fullname,
			email,
			level,
			accountProvisioningStatus,
			departmentCode: org.departmentCode,
			positionCode: org.positionCode,
		});

	return (
		<div class="space-y-6">
			{/* Header with Reset Action */}
			<div class="flex items-center justify-between border-b border-[rgba(0,0,0,0.03)] pb-2">
				<h2 class="text-[10px] font-bold uppercase tracking-widest text-(--color-secondary)">
					Search Filters
				</h2>
				<button
					type="reset"
					onClick={resetAll}
					class="text-xs font-semibold text-(--color-primary) hover:underline transition-all"
				>
					Reset All Filters
				</button>
			</div>
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
							value={org.departmentCode.value}
							onChange={(e) =>
								org.departmentCode.value =
									e.currentTarget.value}
						>
							<option value="">All Departments</option>
							{org.departments.value.map((d) => (
								<option value={d.code}>{d.name}</option>
							))}
						</select>
					</Field>
					<Field label="Position">
						<select
							class={`hr-input transition-all ${
								org.departmentCode.value
									? "border-(--color-primary)/30"
									: "opacity-50"
							}`}
							value={org.positionCode.value}
							onChange={(e) =>
								org.positionCode.value = e.currentTarget.value}
							disabled={!org.departmentCode.value}
						>
							<option value="">
								{org.departmentCode.value
									? "All Positions"
									: "Select Dept First"}
							</option>
							{org.positions.value.map((p) => (
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
							value={accountProvisioningStatus.value}
							onChange={(e) => {
								const value = e.currentTarget
									.value as typeof ProvisionStatus[number];
								accountProvisioningStatus.value =
									ProvisionStatus.includes(value)
										? value
										: undefined;
							}}
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
