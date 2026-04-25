import { useSignal, useSignalEffect } from "@preact/signals";
import { ComponentChild } from "preact";
import DataSheet from "@/components/DataSheet.tsx";
import useStockMovementSearch from "../../../hooks/inventory/useStockMovementSearch.ts";

const MovementStatus = [
	"PENDING",
	"IN_REVIEW",
	"REJECTED",
	"ACCEPTED",
	"EXECUTING",
	"FAILED",
	"COMPLETED",
	"CANCELLED",
] as const;
const MovementType = ["TRANSFER", "IMPORT", "EXPORT", "ADJUSTMENT"] as const;

type PerformerOption = {
	id: string;
	fullname: string;
};

export default function StockMovementRead() {
	// 1. Signals for Search Query
	const performerSearch = useSignal(""); // The text user types
	const performers = useSignal<PerformerOption[]>([]);

	const productSku = useSignal("");
	const movementType = useSignal<typeof MovementType[number] | undefined>(
		undefined,
	);
	const status = useSignal<typeof MovementStatus[number] | undefined>(
		undefined,
	);
	const fromWarehouseId = useSignal<number | undefined>(undefined);
	const toWarehouseId = useSignal<number | undefined>(undefined);
	const performedBy = useSignal(""); // UUID string
	const createdFrom = useSignal(""); // ISO string
	const createdTo = useSignal(""); // ISO string

	// 2. Fetch Logic
	useSignalEffect(() => {
		const query = performerSearch.value.trim();
		if (query.length < 2) {
			performers.value = [];
			return;
		}

		const timer = setTimeout(async () => {
			try {
				// Hard-coding the INV and HEAD constraints in the URL
				const params = new URLSearchParams({
					matchName: query,
					departmentCode: "INV", // Hard-coded constraint
					positionCode: "HEAD", // Hard-coded constraint
				});
				const resp = await fetch(
					`/api/hr/performers/lookups?${params.toString()}`,
				);
				if (resp.ok) {
					performers.value = await resp.json();
				}
			} catch (err) {
				console.error("Performer lookup failed", err);
			}
		}, 300); // 300ms debounce

		return () => clearTimeout(timer);
	});

	const { movements, pageNumber, totalPages, totalElements, pageSize } =
		useStockMovementSearch({
			productSku,
			movementType,
			status,
			fromWarehouseId,
			toWarehouseId,
			performedBy,
			createdFrom,
			createdTo,
		});

	const resetAll = () => {
		performerSearch.value = "";
		performers.value = [];
		productSku.value = "";
		movementType.value = undefined;
		status.value = undefined;
		fromWarehouseId.value = undefined;
		toWarehouseId.value = undefined;
		performedBy.value = "";
		createdFrom.value = "";
		createdTo.value = "";
	};

	const today = new Date().toISOString().split("T")[0];

	return (
		<div class="space-y-6">
			{/* Header with Reset Action */}
			<div class="flex items-center justify-between border-b border-[rgba(0,0,0,0.03)] pb-2">
				<h2 class="text-[10px] font-bold uppercase tracking-widest text-(--color-secondary)">
					Movement Filters
				</h2>
				<button
					type="reset"
					onClick={resetAll}
					class="text-xs font-semibold text-(--color-primary) hover:underline transition-all"
				>
					Reset All Filters
				</button>
			</div>

			{/* Search Panel Section - Grouped Structure */}
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
				{/* Group 1: Identity & Type */}
				<div class="space-y-4">
					<Field label="Product SKU">
						<input
							class="custom-input font-mono"
							value={productSku.value}
							onInput={(e) =>
								productSku.value = e.currentTarget.value}
							placeholder="e.g. SKU-123"
						/>
					</Field>
					<Field label="Movement Type">
						<select
							class="custom-input"
							value={movementType.value ?? ""}
							onChange={(e) => {
								const val = e.currentTarget
									.value as typeof MovementType[number];
								movementType.value = MovementType.includes(val)
									? val
									: undefined;
							}}
						>
							<option value="">All Types</option>
							{MovementType.map((t) => (
								<option value={t}>{t}</option>
							))}
						</select>
					</Field>
				</div>

				{/* Group 2: Status & Performer */}
				<div class="space-y-4">
					<Field label="Movement Status">
						<select
							class="custom-input"
							value={status.value ?? ""}
							onChange={(e) => {
								const val = e.currentTarget
									.value as typeof MovementStatus[number];
								status.value = MovementStatus.includes(val)
									? val
									: undefined;
							}}
						>
							<option value="">Any Status</option>
							{MovementStatus.map((s) => (
								<option value={s}>{s}</option>
							))}
						</select>
					</Field>
					<Field label="Performer's Name">
						<div class="relative">
							<input
								type="text"
								list="performer-suggestions"
								class="custom-input text-xs font-medium"
								placeholder="Search Inventory Managers..."
								value={performerSearch.value}
								onInput={(e) => {
									const inputVal = e.currentTarget.value;
									performerSearch.value = inputVal;

									// Map Name back to UUID
									const match = performers.value.find(
										(p) => p.fullname === inputVal,
									);

									if (match) {
										performedBy.value = match.id; // Set the actual UUID
									} else if (!inputVal) {
										// Keep current value if still typing, or clear if empty
										performedBy.value = "";
									}
								}}
							/>

							<datalist id="performer-suggestions">
								{performers.value.map((p) => (
									<option value={p.fullname}>
										ID: {p.id.split("-")[0]}...
									</option>
								))}
							</datalist>

							{/* Visual Indicator: Show Badge when UUID is resolved */}
							{!!performedBy.value && (
								<div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
									<span class="text-[9px] font-black text-white bg-(--color-accent) px-1.5 py-0.5 rounded uppercase tracking-tighter">
										Verified
									</span>
								</div>
							)}
						</div>
					</Field>
				</div>

				{/* Group 3: Logistics (Warehouse & Dates) */}
				<div class="space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<Field label="From Wh ID">
							<input
								type="number"
								class="custom-input"
								value={fromWarehouseId.value ?? ""}
								onInput={(e) =>
									fromWarehouseId.value =
										e.currentTarget.value
											? Number(e.currentTarget.value)
											: undefined}
							/>
						</Field>
						<Field label="To Wh ID">
							<input
								type="number"
								class="custom-input"
								value={toWarehouseId.value ?? ""}
								onInput={(e) =>
									toWarehouseId.value = e.currentTarget.value
										? Number(e.currentTarget.value)
										: undefined}
							/>
						</Field>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<Field label="From Date">
							<input
								type="date"
								class="custom-input"
								value={createdFrom.value}
								max={createdTo.value}
								onChange={(e) =>
									createdFrom.value = e.currentTarget.value}
							/>
						</Field>
						<Field label="To Date">
							<input
								type="date"
								class="custom-input"
								value={createdTo.value}
								min={createdFrom.value}
								max={today}
								onChange={(e) =>
									createdTo.value = e.currentTarget.value}
							/>
						</Field>
					</div>
				</div>
			</div>

			{/* 2. Data Sheet */}
			<DataSheet>
				<DataSheet.TableData data={movements.value} />
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
