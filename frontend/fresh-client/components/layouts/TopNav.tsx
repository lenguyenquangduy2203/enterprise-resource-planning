import { ComponentChildren } from "preact";

type SlotProps = {
	children: ComponentChildren;
};

function Nav({ children }: Readonly<SlotProps>) {
	return (
		<nav class="sticky top-0 z-40 h-14 border-b border-base-300 bg-base-100 px-4">
			<div class="flex h-full items-center justify-between gap-4">
				{children}
			</div>
		</nav>
	);
}

function Section({ children }: Readonly<SlotProps>) {
	return (
		<section class="flex-1 min-h-0 min-w-0 p-6">
			{children}
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

TopNav.Nav = Nav;
TopNav.Section = Section;
