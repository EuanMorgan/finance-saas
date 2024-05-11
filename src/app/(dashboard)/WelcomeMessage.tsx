import { currentUser } from "@clerk/nextjs/server";

const WelcomeMessage = async () => {
	const user = await currentUser();
	return (
		<div className="space-y-2 mb-4">
			<h2 className="text-2xl  lg:text-4xl text-white font-medium">
				Welcome back, {user?.fullName} 👋
			</h2>
			<p className="text-sm lg:text-base text-[#89b6fd]">
				This is your Financial Overview Report
			</p>
		</div>
	);
};

export { WelcomeMessage };
