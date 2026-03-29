import { useSignal } from "@preact/signals";
import { JSX } from "preact";
import { useOrgData } from "../../../hooks/hr/useOrgData.ts";

export default function EmployeeWrite() {
	const fullname = useSignal("");
	const email = useSignal("");
	const level = useSignal("");
	const isSubmitting = useSignal(false);

	// Reuse org logic here
	const { departmentCode, positionCode, departments, positions, resetOrg } =
		useOrgData();

	const resetForm = () => {
		fullname.value = "";
		email.value = "";
		level.value = "";
		resetOrg();
	};

	async function submit(e: Event) {
		e.preventDefault();
		isSubmitting.value = true;
		try {
			const res = await fetch("/api/hr/employees", {
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
			if (res.ok) resetForm();
		} finally {
			isSubmitting.value = false;
		}
	}

	return (
		<div class="flex justify-center w-full py-10">
			<form
				onSubmit={submit}
				class="w-full max-w-2xl bg-white rounded-2xl border border-[rgba(0,0,0,0.05)] shadow-sm p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
			>
				<header>
					<h2 class="text-2xl font-bold text-(--color-text)">
						Onboard New Employee
					</h2>
					<p class="text-sm text-(--color-secondary)">
						Enter the personal and professional details to create a
						new staff record.
					</p>
				</header>

				<div class="space-y-6">
					{/* Identification Group */}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Field label="Full Name" required>
							<input
								class="custom-input"
								placeholder="Jane Doe"
								value={fullname.value}
								onInput={(e) =>
									fullname.value =
										(e.target as HTMLInputElement).value}
								required
							/>
						</Field>
						<Field label="Email Address" required>
							<input
								type="email"
								class="custom-input"
								placeholder="jane.doe@company.com"
								value={email.value}
								onInput={(e) =>
									email.value =
										(e.target as HTMLInputElement).value}
								required
							/>
						</Field>
					</div>

					<Field label="Seniority Level">
						<input
							class="custom-input"
							placeholder="e.g. Senior Manager"
							value={level.value}
							onInput={(e) =>
								level.value =
									(e.target as HTMLInputElement).value}
						/>
					</Field>

					{/* Placement Group - Shared row to prevent shifting */}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-(--color-bg) border border-[rgba(0,0,0,0.03)]">
						<Field label="Department" required>
							<select
								class="custom-input"
								value={departmentCode.value}
								onChange={(e) =>
									departmentCode.value =
										(e.target as HTMLSelectElement).value}
								required
							>
								<option value="">Select department...</option>
								{departments.value.map((d) => (
									<option key={d.code} value={d.code}>
										{d.name}
									</option>
								))}
							</select>
						</Field>

						<Field label="Position" required>
							<select
								class={`custom-input transition-opacity duration-300 ${
									departmentCode.value
										? "opacity-100"
										: "opacity-40 cursor-not-allowed"
								}`}
								value={positionCode.value}
								onChange={(e) =>
									positionCode.value =
										(e.target as HTMLSelectElement).value}
								required
								disabled={!departmentCode.value}
							>
								<option value="">
									{departmentCode.value
										? "Select position..."
										: "Select department first"}
								</option>
								{positions.value.map((p) => (
									<option key={p.code} value={p.code}>
										{p.name}
									</option>
								))}
							</select>
						</Field>
					</div>
				</div>

				<div class="pt-6 flex items-center justify-between border-t border-[rgba(0,0,0,0.05)]">
					<button
						type="submit"
						class="px-8 py-3 rounded-xl font-bold text-white bg-(--color-primary) hover:opacity-90 shadow-lg shadow-(--color-primary)/20 transition-all active:scale-95 disabled:grayscale"
						disabled={isSubmitting.value}
					>
						{isSubmitting.value
							? "Processing..."
							: "Confirm Onboarding"}
					</button>
					<button
						type="reset"
						onClick={resetForm}
						class="text-sm font-bold text-(--color-secondary) hover:text-(--color-text) transition-colors px-2 py-1"
						disabled={isSubmitting.value}
						hidden={isSubmitting.value}
					>
						Reset Form
					</button>
				</div>
			</form>
		</div>
	);
}

function Field(
	{ label, required, children }: Readonly<
		{ label: string; required?: boolean; children: JSX.Element }
	>,
) {
	return (
		<div class="flex flex-col gap-1.5">
			<label class="text-xs font-bold uppercase tracking-wide text-(--color-secondary)">
				{label}
				{required && <span class="text-(--color-primary) ml-1">*</span>}
			</label>
			{children}
		</div>
	);
}
