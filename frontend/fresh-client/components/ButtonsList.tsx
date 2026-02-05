import { ComponentChildren } from "preact";

type SlotProps = {
	children: ComponentChildren;
};

function Root({ children }: Readonly<SlotProps>) {
	return <div class="flex flex-col w-full py-4">{children}</div>;
}

function Header({ children }: Readonly<SlotProps>) {
	return (
		<header class="px-6 py-2 mb-2 text-[11px] font-bold uppercase tracking-widest text-(--color-secondary) opacity-70">
			{children}
		</header>
	);
}

type ItemProps = {
	children: ComponentChildren;
	active: boolean;
	onClick?: () => void;
	icon?: string; // Added an optional icon prop for better ERP looks
};

function Item({
	children,
	active,
	onClick,
	icon,
}: Readonly<ItemProps>) {
	return (
		<li class="list-none px-3 mb-1">
			<button
				type="button"
				onClick={onClick}
				class={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${
					active
						? "bg-(--color-primary) text-white shadow-md shadow-(--color-primary)/20"
						: "text-(--color-text) hover:bg-(--color-primary)/10 hover:text-(--color-primary)"
				}
                `}
				disabled={active}
			>
				{icon && (
					<span
						class={`text-lg ${
							active ? "text-white" : "text-(--color-primary)"
						}`}
					>
						{icon}
					</span>
				)}
				<span class="truncate">{children}</span>
				{active && (
					<span class="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
				)}
			</button>
		</li>
	);
}

function List({ children }: Readonly<{ children: ComponentChildren }>) {
	return <ul class="flex flex-col m-0 p-0">{children}</ul>;
}

const ButtonsList = Object.assign(Root, {
	Header,
	List,
	Item,
});

export default ButtonsList;
