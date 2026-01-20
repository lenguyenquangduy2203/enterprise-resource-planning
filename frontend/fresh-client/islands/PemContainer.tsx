import { useEffect } from "preact/hooks";
import PemView from "../components/PemView.tsx";
import {
	permissionError,
	permissionLoading,
	permissionState,
} from "../signals/auth.ts";
import { fetchPermissions } from "../services/permission.ts";

export default function PemContainer() {
	useEffect(() => {
		// fetch once per app load
		if (!permissionState.value && !permissionLoading.value) {
			fetchPermissions();
		}
	}, []);

	if (permissionLoading.value) {
		return <div>Loading permissions...</div>;
	}

	if (permissionError.value) {
		return <div>{permissionError.value}</div>;
	}

	if (!permissionState.value) {
		return null;
	}

	return (
		<PemView
			username={permissionState.value.username}
			roles={permissionState.value.roles}
			permissions={permissionState.value.permissions}
		/>
	);
}
