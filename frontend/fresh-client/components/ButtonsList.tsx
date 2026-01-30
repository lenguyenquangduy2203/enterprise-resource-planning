import { ComponentChildren } from "preact";

type SlotProps = {
	children: ComponentChildren;
};

function Root({ children }: Readonly<SlotProps>) {
	return <nav class="flex flex-col gap-2">{children}</nav>;
}

function Header({ children }: Readonly<SlotProps>) {
	return (
		<header class="px-4 py-2 text-sm font-semibold text-base-content/70">
			{children}
		</header>
	);
}

type ItemProps = {
	children: ComponentChildren;
	active: boolean;
	onClick?: () => void;
};

function Item({
	children,
	active,
	onClick,
}: Readonly<ItemProps>) {
	return (
		<li>
			<button
				type="button"
				onClick={onClick}
				class="w-full text-left"
				disabled={active}
			>
				{children}
			</button>
		</li>
	);
}

function List({ children }: { children: ComponentChildren }) {
	return <ul class="menu px-2">{children}</ul>;
}

const ButtonsList = Object.assign(Root, {
	Header,
	List,
	Item,
});

export default ButtonsList;
