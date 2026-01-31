import { define } from "@/utils/mod.ts";

type DepartmentSelectOption = {
	code: string;
	name: string;
};

export const handler = define.handlers({
	GET: () => {
		const options = [
			{
				code: "IT",
				name: "Information Technology",
			},
			{
				code: "HR",
				name: "Human Resources",
			},
			{
				code: "INV",
				name: "Inventory",
			},
		] satisfies Array<DepartmentSelectOption>;

		return new Response(JSON.stringify(options), { status: 200 });
	},
});
