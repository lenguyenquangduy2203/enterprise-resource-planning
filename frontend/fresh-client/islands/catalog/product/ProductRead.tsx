import { useSignal } from "@preact/signals";
import useProductSearch from "../../../hooks/useProductSearch.ts";
import DataSheet from "../../../components/DataSheet.tsx";
import { ComponentChild } from "preact";
import { useProductCategory } from "../../../hooks/useProductCategory.ts";
import { useProductManufacturer } from "../../../hooks/useProductManufacturer.ts";

const ProductStatus = [
	"ACTIVE",
	"INACTIVE",
] as const;

export default function ProductRead() {
	const name = useSignal("");
	const { categoryCode, categories } = useProductCategory();
	const { manufacturerCode, manufacturers } = useProductManufacturer();
	const minPrice = useSignal<number | undefined>();
	const maxPrice = useSignal<number | undefined>();
	const status = useSignal<typeof ProductStatus[number] | undefined>(
		undefined,
	);
	const { products, pageNumber, totalPages, totalElements, pageSize } =
		useProductSearch({
			name,
			categoryCode,
			manufacturerCode,
			minPrice,
			maxPrice,
			status,
		});
	const resetAll = () => {
		name.value = "";
		categoryCode.value = "";
		manufacturerCode.value = "";
		minPrice.value = undefined;
		maxPrice.value = undefined;
		status.value = undefined;
	};

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
				{/* Column 1: Identity & Status */}
				<div class="space-y-4">
					<Field label="Product Name">
						<input
							class="custom-input"
							value={name.value}
							onInput={(e) => name.value = e.currentTarget.value}
							placeholder="Enter product name..."
						/>
					</Field>
					<Field label="Status">
						<select
							class="custom-input"
							value={status.value ?? ""}
							onChange={(e) => {
								const val = e.currentTarget
									.value as typeof ProductStatus[number];
								// Casts string to ProductStatus type or undefined
								status.value = ProductStatus.includes(val)
									? val
									: undefined;
							}}
						>
							<option value="">Any Status</option>
							<option value="ACTIVE">Active</option>
							<option value="INACTIVE">Inactive</option>
						</select>
					</Field>
				</div>

				{/* Column 2: Classification (Codes) */}
				<div class="space-y-4">
					<Field label="Category Code">
						<select
							class="custom-input"
							value={categoryCode.value}
							onChange={(e) =>
								categoryCode.value = e.currentTarget.value}
						>
							<option value="">All Categories</option>
							{categories.value.map((c) => (
								<option value={c.code}>{c.name}</option>
							))}
						</select>
					</Field>
					<Field label="Manufacturer Code">
						<select
							class="custom-input"
							value={manufacturerCode.value}
							onChange={(e) =>
								manufacturerCode.value = e.currentTarget.value}
						>
							<option value="">All Manufacturers</option>
							{manufacturers.value.map((m) => (
								<option value={m.code}>{m.name}</option>
							))}
						</select>
					</Field>
				</div>

				{/* Column 3: Price Range (Numeric Signals) */}
				<div class="space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<Field label="Min Price">
							<input
								type="number"
								class="custom-input"
								value={minPrice.value ?? ""}
								onInput={(e) => {
									const val = e.currentTarget.value;
									minPrice.value = val === ""
										? undefined
										: Number(val);
								}}
								placeholder="0.00"
							/>
						</Field>
						<Field label="Max Price">
							<input
								type="number"
								class="custom-input"
								value={maxPrice.value ?? ""}
								onInput={(e) => {
									const val = e.currentTarget.value;
									maxPrice.value = val === ""
										? undefined
										: Number(val);
								}}
								placeholder="Max"
							/>
						</Field>
					</div>
					{/* Visual spacer to align with other columns */}
					<div class="hidden lg:block h-[58px]" />
				</div>
			</div>

			{/* 2. Data Sheet */}
			<DataSheet>
				<DataSheet.TableData
					data={products.value}
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
