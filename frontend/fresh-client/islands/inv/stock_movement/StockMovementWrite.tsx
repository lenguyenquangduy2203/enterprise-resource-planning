import { useComputed, useSignal } from "@preact/signals";
import { JSX } from "preact";
import { useProductLookup } from "../../../hooks/catalog/useProductLookup.ts";
import { useWarehouseLookup } from "../../../hooks/inventory/useWarehouseLookup.ts";

type MovementType = "TRANSFER" | "IMPORT" | "EXPORT" | "ADJUSTMENT";

export default function StockMovementWrite() {
	// 1. Core State
	const type = useSignal<MovementType | "">("");
	const productId = useSignal<number | null>(null);
	const quantity = useSignal<number>(1);
	const fromWarehouseId = useSignal<number | null>(null);
	const toWarehouseId = useSignal<number | null>(null);
	const warehouseId = useSignal<number | null>(null); // For Adjustments
	const isSubmitting = useSignal(false);

	// 2. Lookup Hooks
	const { productSku, products } = useProductLookup();
	const { warehouses } = useWarehouseLookup();

	// 3. Logic: Filtered Warehouses for Transfer
	const availableToWarehouses = useComputed(() => {
		if (type.value !== "TRANSFER") return warehouses.value;
		return warehouses.value.filter((w) => w.id !== fromWarehouseId.value);
	});

	const resetForm = () => {
		type.value = "";
		productId.value = null;
		quantity.value = 1;
		fromWarehouseId.value = null;
		toWarehouseId.value = null;
		warehouseId.value = null;
	};

	async function submit(e: Event) {
		e.preventDefault();
		isSubmitting.value = true;

		const payload = {
			type: type.value,
			productId: productId.value,
			quantity: quantity.value,
			...(type.value === "TRANSFER" &&
				{
					fromWarehouseId: fromWarehouseId.value,
					toWarehouseId: toWarehouseId.value,
				}),
			...(type.value === "IMPORT" &&
				{ toWarehouseId: toWarehouseId.value }),
			...(type.value === "EXPORT" &&
				{ fromWarehouseId: fromWarehouseId.value }),
			...(type.value === "ADJUSTMENT" &&
				{ warehouseId: warehouseId.value }),
		};

		try {
			const res = await fetch("/api/inv/stock-movements", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
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
						Stock Movement Request
					</h2>
					<p class="text-sm text-(--color-secondary)">
						Select the type of movement to begin technical entry.
					</p>
				</header>

				<div class="space-y-6">
					{/* Step 1: Type Selection */}
					<Field label="Movement Type" required>
						<select
							class="custom-input font-bold text-(--color-primary)"
							value={type.value}
							onChange={(e) => {
								resetForm(); // Clear fields when type changes
								type.value = e.currentTarget
									.value as MovementType;
							}}
							required
						>
							<option value="">-- Select Type --</option>
							<option value="IMPORT">
								IMPORT (External to Warehouse)
							</option>
							<option value="EXPORT">
								EXPORT (Warehouse to External)
							</option>
							<option value="TRANSFER">
								TRANSFER (Warehouse to Warehouse)
							</option>
							<option value="ADJUSTMENT">
								ADJUSTMENT (Internal Correction)
							</option>
						</select>
					</Field>

					{type.value && (
						<div class="space-y-6 animate-in slide-in-from-top-2 duration-300">
							{/* Step 2: Product & Quantity */}
							<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div class="md:col-span-2">
									<Field label="Target Product SKU" required>
										<div class="relative">
											<input
												type="text"
												list="product-suggestions"
												class="custom-input font-mono"
												placeholder="Type SKU (e.g. SKU-001)..."
												value={productSku.value}
												onInput={(e) => {
													const inputVal =
														e.currentTarget.value;
													productSku.value = inputVal;

													// Check if the input matches a SKU in our list to set the actual ID
													const match = products.value
														.find((p) =>
															p.sku === inputVal
														);
													if (match) {
														productId.value =
															match.id;
													} else {
														productId.value = null; // Clear ID if they are still typing
													}
												}}
												required
											/>

											<datalist id="product-suggestions">
												{products.value.map((p) => (
													<option value={p.sku}>
														{p.name}
													</option>
												))}
											</datalist>

											{/* Visual Indicator: Show Product Name if ID is resolved */}
											{!!productId.value && (
												<div class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-(--color-primary) bg-(--color-primary)/10 px-2 py-1 rounded">
													{products.value.find((p) =>
														p.id === productId.value
													)
														?.name}
												</div>
											)}
										</div>
									</Field>
								</div>
								<Field label="Quantity" required>
									<input
										type="number"
										class="custom-input"
										min="1"
										value={quantity.value}
										onInput={(e) =>
											quantity.value = Number.parseInt(
												e.currentTarget.value,
											) || 1}
										required
									/>
								</Field>
							</div>

							{/* Step 3: Conditional Warehouse Logic */}
							<div class="p-4 rounded-xl bg-(--color-primary)/5 border border-(--color-primary)/10 grid grid-cols-1 md:grid-cols-2 gap-6">
								{(type.value === "TRANSFER" ||
									type.value === "EXPORT") && (
									<Field label="Source Warehouse" required>
										<select
											class="custom-input"
											value={fromWarehouseId.value ?? ""}
											onChange={(e) =>
												fromWarehouseId.value = Number(
													e.currentTarget.value,
												)}
											required
										>
											<option value="">
												Select origin...
											</option>
											{warehouses.value.map((w) => (
												<option value={w.id}>
													{w.name} ({w.code})
												</option>
											))}
										</select>
									</Field>
								)}

								{(type.value === "TRANSFER" ||
									type.value === "IMPORT") && (
									<Field
										label="Destination Warehouse"
										required
									>
										<select
											class="custom-input"
											value={toWarehouseId.value ?? ""}
											onChange={(e) =>
												toWarehouseId.value = Number(
													e.currentTarget.value,
												)}
											required
										>
											<option value="">
												Select destination...
											</option>
											{availableToWarehouses.value.map((
												w,
											) => (
												<option value={w.id}>
													{w.name} ({w.code})
												</option>
											))}
										</select>
									</Field>
								)}

								{type.value === "ADJUSTMENT" && (
									<Field label="Target Warehouse" required>
										<select
											class="custom-input"
											value={warehouseId.value ?? ""}
											onChange={(e) =>
												warehouseId.value = Number(
													e.currentTarget.value,
												)}
											required
										>
											<option value="">
												Select warehouse...
											</option>
											{warehouses.value.map((w) => (
												<option value={w.id}>
													{w.name}
												</option>
											))}
										</select>
									</Field>
								)}
							</div>
						</div>
					)}
				</div>

				<div class="pt-6 flex items-center justify-between border-t border-[rgba(0,0,0,0.05)]">
					<button
						type="button"
						onClick={resetForm}
						class="text-sm font-bold text-(--color-secondary) hover:text-(--color-text) transition-colors"
						disabled={isSubmitting.value}
					>
						Reset Form
					</button>
					<button
						type="submit"
						class="px-8 py-3 rounded-xl font-bold text-white bg-(--color-primary) hover:opacity-90 shadow-lg shadow-(--color-primary)/20 transition-all active:scale-95 disabled:grayscale"
						disabled={isSubmitting.value || !type.value}
					>
						{isSubmitting.value
							? "Processing..."
							: "Submit Movement"}
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
				{label}{" "}
				{required && <span class="text-(--color-primary) ml-1">*</span>}
			</label>
			{children}
		</div>
	);
}
