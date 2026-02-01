import { ComponentChildren } from "preact";

type SlotProps = {
	children: ComponentChildren;
};

function Aside({ children }: Readonly<SlotProps>) {
	return (
		<>
			{/* The "Brain" of the toggle - hidden checkbox */}
			<input type="checkbox" id="sidebar-toggle" class="peer hidden" />

			<aside class="
                w-80 shrink-0 overflow-hidden transition-all duration-300
                border-r border-(--color-bg-emphasis,rgba(0,0,0,0.1)) 
                bg-white flex flex-col
            ">
				<div class="p-4 flex justify-between items-center border-b border-gray-100">
					<span class="font-bold text-(--color-text) peer-checked:hidden">
						Dashboard
					</span>
					{/* The Toggle Button (Label) */}
					<label
						for="sidebar-toggle"
						class="cursor-pointer p-2 rounded-md hover:bg-(--color-bg) text-(--color-primary)"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
					</label>
				</div>
				<nav class="flex-1 overflow-y-auto">
					{children}
				</nav>
			</aside>
		</>
	);
}

function Section({ children }: Readonly<SlotProps>) {
	return (
		<section class="flex-1 min-w-0 bg-(--color-bg) flex flex-col">
			{/* Mobile Header - only visible when screen is small */}
			<header class="md:hidden flex items-center p-4 bg-white border-b">
				<label
					for="sidebar-toggle"
					class="p-2 text-(--color-primary)"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M3 12h18M3 6h18M3 18h18" />
					</svg>
					<span class="font-bold ml-2">ERP</span>
				</label>
			</header>
			<main class="p-6 h-full overflow-y-auto">
				{children}
			</main>
		</section>
	);
}

export default function LeftAside({ children }: Readonly<SlotProps>) {
	return (
		/* The scope (.hr or .inv) should be applied to a wrapper or the body */
		<div class="flex min-h-screen w-full text-(--color-text)">
			{children}
		</div>
	);
}

LeftAside.Aside = Aside;
LeftAside.Section = Section;
