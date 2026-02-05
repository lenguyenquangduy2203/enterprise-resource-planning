import { ComponentChildren } from "preact";

type SlotProps = {
	children: ComponentChildren;
};

function Aside({ children }: Readonly<SlotProps>) {
	return (
		<>
			{/* Checked = Sidebar is CLOSED/COLLAPSED */}
			<input type="checkbox" id="sidebar-toggle" class="peer hidden" />

			<aside class="
                /* 1. Base Layout & Animation */
                shrink-0 transition-all duration-300 ease-in-out
                border-r border-(--color-bg-emphasis,rgba(0,0,0,0.1)) 
                bg-white flex flex-col overflow-hidden
                
                /* 2. Desktop Behavior: Stays in the document flow (no overlay) */
                w-80 peer-checked:md:w-20 relative z-20
                
                /* 3. Mobile Behavior: Becomes a drawer */ inset-y-0 left-0 -translate-x-full md:translate-x-0 
                peer-checked:translate-x-0 md:peer-checked:translate-x-0
                max-md:z-50
            ">
				{/* COLLAPSED HEADER (Desktop Only) */}
				<header class="hidden peer-checked:md:flex items-center justify-center h-16 shrink-0 border-b border-gray-100">
					<label
						for="sidebar-toggle"
						class="p-2 text-(--color-primary) cursor-pointer hover:bg-(--color-bg) rounded-md"
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
							<path d="M4 6h16M4 12h16M4 18h16" />
						</svg>
						{(() => null)()}
					</label>
				</header>

				{/* EXPANDED HEADER */}
				<div class="flex peer-checked:md:hidden p-4 justify-between items-center border-b border-gray-100 h-16 shrink-0">
					<span class="font-bold text-(--color-text) truncate">
						Dashboard
					</span>
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
						>
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
						{(() => null)()}
					</label>
				</div>

				{/* 4. The Sidebar Content: Explicitly hide when checked on desktop */}
				<nav class="flex-1 overflow-y-auto peer-checked:hidden">
					{children}
				</nav>
			</aside>

			{/* 5. Mobile-ONLY Overlay: Prevents interaction ONLY on small screens */}
			<label
				for="sidebar-toggle"
				class="fixed inset-0 bg-black/20 z-40 md:hidden hidden peer-checked:max-md:block"
			>
				{(() => null)()}
			</label>
		</>
	);
}

function Section({ children }: Readonly<SlotProps>) {
	return (
		<section class="flex-1 min-w-0 bg-(--color-bg) flex flex-col h-screen overflow-hidden">
			<header class="md:hidden flex items-center p-4 bg-white border-b shrink-0">
				<label
					for="sidebar-toggle"
					class="p-2 text-(--color-primary) cursor-pointer"
				>
					{(() => null)()}
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
				</label>
				<span class="font-bold ml-2 text-(--color-text)">
					ERP Dashboard
				</span>
			</header>
			<main class="flex-1 overflow-y-auto p-6">
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
