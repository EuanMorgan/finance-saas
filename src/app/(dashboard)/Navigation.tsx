"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
const routes = [
	{
		href: "/",
		label: "Overview",
	},
	{
		href: "/transactions",
		label: "Transactions",
	},
	{
		href: "/accounts",
		label: "Accounts",
	},
	{
		href: "/categories",
		label: "Categories",
	},
	{
		href: "/settings",
		label: "Settings",
	},
];

const Navigation = () => {
	const pathname = usePathname();

	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();

	const isMobile = useMedia("(max-width: 1024px)", false);

	const onClick = (href: string) => {
		router.push(href);
		setIsOpen(false);
	};

	if (isMobile) {
		return (
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger>
					<Button
						variant={"outline"}
						size={"sm"}
						className="font-normal bg-white/10 hover:bg-white/20 hover:text-whte focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition border-none"
					>
						<Menu className="size-4" />
					</Button>
				</SheetTrigger>
				<SheetContent side={"left"} className="px-2">
					<nav className="flex flex-col gap-y-2 pt-6">
						{routes.map((route) => (
							<Button
								variant={route.href === pathname ? "secondary" : "ghost"}
								key={route.label}
								onClick={() => onClick(route.href)}
								className="w-full justify-start"
							>
								{route.label}
							</Button>
						))}
					</nav>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
			{routes.map((route) => (
				<NavigationItem
					key={route.label}
					href={route.href}
					label={route.label}
					isActive={pathname === route.href}
				/>
			))}
		</nav>
	);
};

const NavigationItem = ({
	href,
	label,
	isActive,
}: { href: string; label: string; isActive: boolean }) => {
	return (
		<Button
			asChild
			size={"sm"}
			variant={"outline"}
			className={cn(
				"w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
				isActive ? "bg-white/10 text-white" : "bg-transparent",
			)}
		>
			<Link href={href}>{label}</Link>
		</Button>
	);
};

export { Navigation };
