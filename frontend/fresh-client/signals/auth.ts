import { signal } from "@preact/signals";
import { type Props as PermissionState } from "../components/PemView.tsx";

export const permissionState = signal<PermissionState | null>(null);
export const permissionLoading = signal(false);
export const permissionError = signal<string | null>(null);
