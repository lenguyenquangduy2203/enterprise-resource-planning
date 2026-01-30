import { ComponentChildren } from "preact";

type SlotProps = {
	children: ComponentChildren;
};

function Aside({ children }: Readonly<SlotProps>) {
	return (
		<aside class="w-80 shrink-0 border-r border-base-300 bg-base-100">
			{children}
		</aside>
	);
}

function Section({ children }: Readonly<SlotProps>) {
	return (
		<section class="flex-1 min-w-0">
			{children}
		</section>
	);
}

export default function LeftAside({ children }: Readonly<SlotProps>) {
	return (
		<div class="flex min-h-screen w-full">
			{children}
		</div>
	);
}

LeftAside.Aside = Aside;
LeftAside.Section = Section;
