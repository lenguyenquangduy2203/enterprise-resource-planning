import { ComponentChildren } from "preact";

type SlotProps = {
	children: ComponentChildren;
};

type NavItemProps = {
	children: ComponentChildren;
	active?: boolean;
	onClick?: () => void;
};

/**
 * Individual Tab Item
 */
function NavItem({ children, active, onClick }: Readonly<NavItemProps>) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={active}
			class={`
                relative h-full px-6 flex items-center justify-center text-sm font-medium transition-all
                ${
				active
					? "text-(--color-primary)"
					: "text-(--color-secondary) hover:text-(--color-primary) hover:bg-(--color-primary)/5"
			}
            `}
		>
			{children}
			{/* The Active Indicator Line */}
			{active && (
				<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-(--color-primary) shadow-[0_-2px_10px_var(--color-primary)]" />
			)}
		</button>
	);
}

function Nav({ children }: Readonly<SlotProps>) {
	return (
		<nav class="sticky top-0 z-40 h-14 border-b border-[rgba(0,0,0,0.05)] bg-white/80 backdrop-blur-md px-4">
			<div class="flex h-full items-center justify-start overflow-x-auto no-scrollbar">
				{children}
			</div>
		</nav>
	);
}

function Section({ children }: Readonly<SlotProps>) {
	return (
		<section class="flex-1 min-h-0 min-w-0 bg-(--color-bg)">
			<div class="p-8 max-w-7xl mx-auto">
				{children}
			</div>
		</section>
	);
}

export default function TopNav({ children }: Readonly<SlotProps>) {
	return (
		<div class="flex min-h-screen w-full flex-col">
			{children}
		</div>
	);
}

// Attach sub-components
TopNav.Nav = Nav;
TopNav.NavItem = NavItem; // Added this sub-component
TopNav.Section = Section;
