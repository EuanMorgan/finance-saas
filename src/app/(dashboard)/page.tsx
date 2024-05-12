"use client";

import { UserButton } from "@clerk/nextjs";
import { useGetAccounts } from "~/features/accounts/api/use-get-accounts";
export default function Home() {
	const accountsQuery = useGetAccounts();

	return (
		<main>
			<p>Homepage</p>
			{JSON.stringify(accountsQuery.data?.[0].name, null, 2)}
			<UserButton afterSignOutUrl="/" />
		</main>
	);
}
