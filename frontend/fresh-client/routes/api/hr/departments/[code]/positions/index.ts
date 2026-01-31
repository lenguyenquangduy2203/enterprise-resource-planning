import { define } from "@/utils/mod.ts";

type PositionSelectOption = {
	code: string;
	name: string;
};

const DepartmentPositionsRecord: Record<string, PositionSelectOption[]> = {
	"IT": [{
		code: "ADMIN",
		name: "System Admin",
	}, {
		code: "EMP",
		name: "Employee",
	}],
	"HR": [{
		code: "HR_MGR",
		name: "HR Manager",
	}],
	"INV": [{
		code: "WH_MGR",
		name: "Warehouse Manager",
	}],
};

export const handler = define.handlers({
	GET: (ctx) => {
		const code = ctx.params["code"];
		const options = DepartmentPositionsRecord[code] ?? [];

		return new Response(JSON.stringify(options), { status: 200 });
	},
});
