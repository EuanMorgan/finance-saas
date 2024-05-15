import type { z } from "zod";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "~/components/ui/sheet";
import { insertAccountSchema } from "~/db/schema";
import { AccountForm } from "~/features/accounts/components/account-form";
import { useCreateAccount } from "~/features/accounts/hooks/use-create-account";
import { useNewAccount } from "~/features/accounts/hooks/use-new-account";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const NewAccountSheet = () => {
	const { isOpen, onClose, onOpen } = useNewAccount();

	const mutation = useCreateAccount();

	const onSubmit = (values: FormValues) => {
		mutation.mutate(values, {
			onSuccess: () => {
				onClose();
			},
		});
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="space-y-4">
				<SheetHeader>
					<SheetTitle>New Account</SheetTitle>
					<SheetDescription>
						Create a new account to track your transactions
					</SheetDescription>
				</SheetHeader>
				<AccountForm
					onSubmit={onSubmit}
					disabled={mutation.isPending}
					defaultValues={{ name: "" }}
				/>
			</SheetContent>
		</Sheet>
	);
};
