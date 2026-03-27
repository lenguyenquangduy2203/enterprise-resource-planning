export const StrictSession = {
	httpOnly: true,
	secure: true,
	sameSite: "Strict",
	path: "/",
} as const;
export const Expired = {
	expires: new Date(0),
	maxAge: 0,
} as const;
