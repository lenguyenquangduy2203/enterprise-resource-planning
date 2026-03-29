import { useSignal } from "@preact/signals";
import { useProductCategory } from "../../../hooks/catalog/useProductCategory.ts";
import { useProductManufacturer } from "../../../hooks/catalog/useProductManufacturer.ts";
import { JSX } from "preact/jsx-runtime";

export default function ProductWrite() {
	const sku = useSignal("");
	const name = useSignal("");
	const unit = useSignal("");
	const unitPrice = useSignal(0.01);
	const description = useSignal("");
	const { categoryCode, categories } = useProductCategory();
	const { manufacturerCode, manufacturers } = useProductManufacturer();
	const isSubmitting = useSignal(false);
	const resetForm = () => {
		sku.value = "";
		name.value = "";
		unit.value = "";
		unitPrice.value = 0.01;
		description.value = "";
		categoryCode.value = "";
		manufacturerCode.value = "";
	};

	async function submit(e: Event) {
		e.preventDefault();
		isSubmitting.value = true;
		try {
			const res = await fetch("/api/catalog/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					sku: sku.value,
					name: name.value,
					unit: unit.value,
					unitPrice: unitPrice.value,
					description: description.value,
					categoryCode: categoryCode.value,
					manufacturerCode: manufacturerCode.value,
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
						Register New Product
					</h2>
					<p class="text-sm text-(--color-secondary)">
						Enter technical specifications and classification
						details to create a new product record.
					</p>
				</header>

				<div class="space-y-6">
					{/* Identification Group */}
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div class="md:col-span-1">
							<Field label="SKU / Item Code" required>
								<input
									class="custom-input font-mono"
									placeholder="PROD-001"
									value={sku.value}
									onInput={(e) =>
										sku.value = e.currentTarget.value}
									required
								/>
							</Field>
						</div>
						<div class="md:col-span-2">
							<Field label="Product Name" required>
								<input
									class="custom-input"
									placeholder="Industrial Grade Component"
									value={name.value}
									onInput={(e) =>
										name.value = e.currentTarget.value}
									required
								/>
							</Field>
						</div>
					</div>

					{/* Specifications Group */}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50/50 border border-slate-100">
						<Field label="Base Unit" required>
							<input
								class="custom-input"
								placeholder="e.g. PCS, KG, Box"
								value={unit.value}
								onInput={(e) =>
									unit.value = e.currentTarget.value}
								required
							/>
						</Field>
						<Field label="Unit Price ($)" required>
							<input
								type="number"
								step="0.01"
								min="0.01"
								class="custom-input"
								value={unitPrice.value}
								onInput={(e) => {
									const val = e.currentTarget.value;
									// Fallback to 0.01 or a valid number to prevent NaN from breaking the signal
									unitPrice.value = val === ""
										? 0.01
										: Number.parseFloat(val);
								}}
								required
							/>
						</Field>
					</div>

					{/* Classification Group */}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Field label="Category" required>
							<select
								class="custom-input"
								value={categoryCode.value}
								onChange={(e) =>
									categoryCode.value = e.currentTarget.value}
								required
							>
								<option value="">Select category...</option>
								{categories.value.map((c) => (
									<option key={c.code} value={c.code}>
										{c.name}
									</option>
								))}
							</select>
						</Field>
						<Field label="Manufacturer" required>
							<select
								class="custom-input"
								value={manufacturerCode.value}
								onChange={(e) =>
									manufacturerCode.value =
										e.currentTarget.value}
								required
							>
								<option value="">Select manufacturer...</option>
								{manufacturers.value.map((m) => (
									<option key={m.code} value={m.code}>
										{m.name}
									</option>
								))}
							</select>
						</Field>
					</div>

					{/* Description */}
					<Field label="Product Description">
						<textarea
							class="custom-input min-h-[100px] resize-y"
							placeholder="Enter detailed specifications or handling instructions..."
							value={description.value}
							onInput={(e) =>
								description.value = e.currentTarget.value}
						/>
					</Field>
				</div>

				<div class="pt-6 flex items-center justify-between border-t border-[rgba(0,0,0,0.05)]">
					<button
						type="button"
						onClick={resetForm}
						class="text-sm font-bold text-(--color-secondary) hover:text-(--color-text) transition-colors px-2 py-1"
						disabled={isSubmitting.value}
					>
						Reset Form
					</button>

					<button
						type="submit"
						class="px-8 py-3 rounded-xl font-bold text-white bg-(--color-primary) hover:opacity-90 shadow-lg shadow-(--color-primary)/20 transition-all active:scale-95 disabled:grayscale"
						disabled={isSubmitting.value}
					>
						{isSubmitting.value
							? "Registering..."
							: "Confirm Registration"}
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
