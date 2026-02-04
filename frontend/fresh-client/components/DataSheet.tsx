import { ComponentChild } from "preact";
import { Signal } from "@preact/signals";

function Root({ children }: Readonly<{ children: ComponentChild }>) {
	return (
		<div class="w-full flex flex-col gap-4 animate-in fade-in duration-500">
			{children}
		</div>
	);
}

function TableData(
	{ data }: Readonly<
		{ data: { id: string; content: Record<string, ComponentChild> }[] }
	>,
) {
	if (data.length === 0) {
		return (
			<div class="p-12 border-2 border-dashed border-[rgba(0,0,0,0.05)] rounded-2xl text-center text-(--color-secondary)">
				No records found.
			</div>
		);
	}

	const headers = Object.keys(data[0].content);

	return (
		<div class="overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white shadow-sm">
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="bg-(--color-bg) border-b border-[rgba(0,0,0,0.05)]">
							{headers.map((header) => (
								<th
									key={header}
									class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-(--color-secondary)"
								>
									{header.replaceAll("_", " ")}
								</th>
							))}
						</tr>
					</thead>
					<tbody class="divide-y divide-[rgba(0,0,0,0.03)]">
						{data.map((row) => (
							<tr
								key={row.id}
								class="hover:bg-(--color-primary)/2 transition-colors"
							>
								{headers.map((header) => (
									<td
										key={header}
										class="px-6 py-4 text-sm text-(--color-text)"
									>
										{row.content[header]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

type PageMeta = {
	number: Signal<number>;
	size: number;
	totalElements: number;
	totalPages: number;
};

function PageNav({ meta }: Readonly<{ meta: PageMeta }>) {
	const isFirst = meta.number.value === 0;
	const isLast = meta.number.value >= meta.totalPages - 1;

	return (
		<div class="flex items-center justify-between px-2 py-3">
			<div class="text-sm text-(--color-secondary)">
				Showing{" "}
				<span class="font-semibold text-(--color-text)">
					{meta.totalElements > 0
						? (meta.number.value * meta.size) + 1
						: 0}
				</span>{" "}
				to{" "}
				<span class="font-semibold text-(--color-text)">
					{Math.min(
						(meta.number.value + 1) * meta.size,
						meta.totalElements,
					)}
				</span>{" "}
				of{" "}
				<span class="font-semibold text-(--color-text)">
					{meta.totalElements}
				</span>{" "}
				results
			</div>

			<div class="flex gap-2">
				<button
					type="button"
					onClick={() => meta.number.value--}
					disabled={isFirst}
					class="nav-btn"
				>
					Previous
				</button>
				<div class="flex items-center px-4 text-sm font-medium text-(--color-primary) bg-(--color-primary)/5 rounded-lg border border-(--color-primary)/10">
					Page {meta.number.value + 1} of {meta.totalPages}
				</div>
				<button
					type="button"
					onClick={() => meta.number.value++}
					disabled={isLast}
					class="nav-btn"
				>
					Next
				</button>
			</div>

			<style>
				{`
                .nav-btn {
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid rgba(0,0,0,0.1);
                    background: white;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--color-text);
                    transition: all 0.2s;
                }
                .nav-btn:hover:not(:disabled) {
                    border-color: var(--color-primary);
                    color: var(--color-primary);
                    background: var(--color-bg);
                }
                .nav-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
            `}
			</style>
		</div>
	);
}

const DataSheet = Object.assign(Root, {
	TableData,
	PageNav,
});

export default DataSheet;
