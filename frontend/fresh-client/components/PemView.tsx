export type Props = {
	username: string;
	roles: Array<string>;
	permissions: Array<string>;
};

export default function PemView(
	{ username, roles, permissions }: Readonly<Props>,
) {
	return (
		<div>
			<h2>User: {username}</h2>

			<h3>Roles</h3>
			<ul>
				{roles.map((r) => <li key={r}>{r}</li>)}
			</ul>

			<h3>Permissions</h3>
			<ul>
				{permissions.map((p) => <li key={p}>{p}</li>)}
			</ul>
		</div>
	);
}
