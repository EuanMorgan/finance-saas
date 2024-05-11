import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "~/app/(dashboard)/Navigation";
import { WelcomeMessage } from "~/app/(dashboard)/WelcomeMessage";

const Header = () => {
	return (
		<div className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
			<div className="max-w-screen-2xl mx-auto">
				<div className="w-full flex items-center justify-between mb-14">
					<div className="flex items-center lg:gap-x-16">
						<HeaderLogo />
						<Navigation />
					</div>
					<ClerkLoading>
						<Loader2 className="size-8 animate-spin text-slate-400" />
					</ClerkLoading>
					<ClerkLoaded>
						<UserButton afterSignOutUrl="/" />
					</ClerkLoaded>
				</div>
				<WelcomeMessage />
			</div>
		</div>
	);
};

const HeaderLogo = () => {
	return (
		<Link href="/">
			<div className="items-center hidden lg:flex">
				<Image src="/logo.svg" width={28} height={28} alt="logo" />
				<p className="font-semibold text-white text-2xl ml-2.5">Finance</p>
			</div>
		</Link>
	);
};

export { Header };
