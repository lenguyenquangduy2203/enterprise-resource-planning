import { useSignal, useSignalEffect } from "@preact/signals";

type DepartmentSelectOption = {
	code: string;
	name: string;
};

type PositionSelectOption = {
	code: string;
	name: string;
};

export function useOrgData() {
	const departmentCode = useSignal("");
	const positionCode = useSignal("");
	const departments = useSignal<DepartmentSelectOption[]>([]);
	const positions = useSignal<PositionSelectOption[]>([]);

	const resetOrg = () => {
		departmentCode.value = "";
		positionCode.value = "";
	};

	// Load departments once on mount
	useSignalEffect(() => {
		fetch("/api/hr/departments/lookups")
			.then((res) => res.ok ? res.json() : [])
			.then((data) => departments.value = data);
	});

	// Load positions whenever departmentCode changes
	useSignalEffect(() => {
		const code = departmentCode.value;
		if (!code) {
			positions.value = [];
			positionCode.value = "";
			return;
		}

		fetch(`/api/hr/departments/${code}/positions/lookups`)
			.then((res) => res.ok ? res.json() : [])
			.then((data) => positions.value = data);
	});

	return { departmentCode, positionCode, departments, positions, resetOrg };
}
