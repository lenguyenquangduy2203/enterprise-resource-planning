import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import { JSX } from "preact";

type DepartmentSelectOption = {
	code: string;
	name: string;
};

type PositionSelectOption = {
	code: string;
	name: string;
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

export default function EmployeeWrite() {
	// form fields
	const fullname = useSignal("");
	const email = useSignal("");
	const level = useSignal("");
	const departmentCode = useSignal("");
	const positionCode = useSignal("");

	// select options
	const departments = useSignal<DepartmentSelectOption[]>([]);
	const positions = useSignal<PositionSelectOption[]>([]);

	const isSubmitting = useSignal(false);

	/**
	 * Fetch departments on mount
	 */
	useSignalEffect(() => {
		loadDepartments(departments);
	});

	/**
	 * Fetch positions when department changes
	 */
	useSignalEffect(() => {
		loadPositions(departmentCode, positions, positionCode);
	});

	async function submit(e: Event) {
		e.preventDefault();
		isSubmitting.value = true;

		try {
			await fetch("/api/hr/employees", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fullname: fullname.value,
					email: email.value,
					level: level.value || null,
					departmentCode: departmentCode.value,
					positionCode: positionCode.value,
				}),
			});

			// optional: reset form
			fullname.value = "";
			email.value = "";
			level.value = "";
			departmentCode.value = "";
			positionCode.value = "";
		} finally {
			isSubmitting.value = false;
		}
	}

	return (
		<form
			onSubmit={submit}
			class="max-w-3xl space-y-6"
		>
			<h2 class="text-lg font-semibold">
				Create Employee
			</h2>

			{/* Full name */}
			<Field label="Full name" required>
				<input
					class="input input-bordered w-full"
					value={fullname.value}
					onInput={(e) =>
						fullname.value = (e.target as HTMLInputElement).value}
					required
				/>
			</Field>

			{/* Email */}
			<Field label="Email" required>
				<input
					type="email"
					class="input input-bordered w-full"
					value={email.value}
					onInput={(e) =>
						email.value = (e.target as HTMLInputElement).value}
					required
				/>
			</Field>

			{/* Level */}
			<Field label="Level">
				<input
					class="input input-bordered w-full"
					placeholder="e.g. Junior, Senior, Lead"
					value={level.value}
					onInput={(e) =>
						level.value = (e.target as HTMLInputElement).value}
				/>
			</Field>

			{/* Department */}
			<Field label="Department" required>
				<select
					class="select select-bordered w-full"
					value={departmentCode.value}
					onChange={(e) =>
						departmentCode.value =
							(e.target as HTMLSelectElement).value}
					required
				>
					<option value="">Select department</option>
					{departments.value.map((d) => (
						<option key={d.code} value={d.code}>
							{d.name}
						</option>
					))}
				</select>
			</Field>

			{/* Position (conditional) */}
			{departmentCode.value && (
				<Field label="Position" required>
					<select
						class="select select-bordered w-full"
						value={positionCode.value}
						onChange={(e) =>
							positionCode.value =
								(e.target as HTMLSelectElement).value}
						required
					>
						<option value="">Select position</option>
						{positions.value.map((p) => (
							<option key={p.code} value={p.code}>
								{p.name}
							</option>
						))}
					</select>
				</Field>
			)}

			{/* Actions */}
			<div class="pt-4 flex gap-2">
				<button
					type="submit"
					class="btn btn-primary"
					disabled={isSubmitting.value}
				>
					{isSubmitting.value ? "Creating..." : "Create employee"}
				</button>
			</div>
		</form>
	);
}

/* ---------- small helper ---------- */

function Field(
	{ label, required, children }: Readonly<{
		label: string;
		required?: boolean;
		children: JSX.Element;
	}>,
) {
	return (
		<div class="space-y-1">
			<label class="text-sm font-medium">
				{label}
				{required && <span class="text-red-500 ml-1">*</span>}
			</label>
			{children}
		</div>
	);
}
