type Option = "start" | "end";

export function ISODateToISODateTime(
	isoDate: string | undefined,
	timeExtensionOption: Option,
): string | undefined {
	if (!isoDate) {
		return undefined;
	}

	if (timeExtensionOption === "start") {
		const localDate = new Date(isoDate + "T00:00:00");
		return localDate.toISOString();
	} else {
		const localDate = new Date(isoDate + "T23:59:59");
		return localDate.toISOString();
	}
}
