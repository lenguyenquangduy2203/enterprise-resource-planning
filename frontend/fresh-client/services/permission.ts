import {
	permissionError,
	permissionLoading,
	permissionState,
} from "../signals/auth.ts";

export async function fetchPermissions() {
	permissionLoading.value = true;
	permissionError.value = null;

	try {
		const res = await fetch("/api/me/permissions");

		if (!res.ok) {
			throw new Error("Unauthorized");
		}

		const data = await res.json();
		permissionState.value = data;
	} catch (err) {
		console.error(err);
		permissionError.value = "Failed to load permissions";
	} finally {
		permissionLoading.value = false;
	}
}
