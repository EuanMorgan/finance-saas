import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { Trash } from "lucide-react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { insertAccountSchema } from "~/db/schema";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const AccountForm = ({
	onSubmit,
	defaultValues,
	disabled,
	id,
	onDelete,
}: {
	id?: string;
	defaultValues?: FormValues;
	onSubmit: (values: FormValues) => void;
	onDelete?: () => void;
	disabled?: boolean;
}) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const handleSubmit = (values: FormValues) => {
		onSubmit(values);
	};

	const handleDelete = () => {
		onDelete?.();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4 pt-4"
			>
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									disabled={disabled}
									placeholder="e.g. Cash, Bank, Credit Card"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button className="w-full" disabled={disabled} type="submit">
					{id ? "Save Changes" : "Create Account"}
				</Button>

				{!!id && (
					<Button
						className="w-full"
						disabled={disabled}
						onClick={handleDelete}
						type="button"
						variant={"outline"}
					>
						<Trash className="size-4 mr-2" />
						Delete Account
					</Button>
				)}
			</form>
		</Form>
	);
};
