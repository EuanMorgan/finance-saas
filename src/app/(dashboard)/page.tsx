"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { useGetAccounts } from "~/features/accounts/api/use-get-accounts";
import { useNewAccount } from "~/features/accounts/hooks/use-new-account";
export default function Home() {
	const accountsQuery = useGetAccounts();
	const { onOpen } = useNewAccount();
	return (
		<main>
			<p>Homepage</p>
			<Button onClick={onOpen}>Add an account</Button>
			<UserButton afterSignOutUrl="/" />
		</main>
	);
}
