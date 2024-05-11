import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main>
      <p>Authenticated</p>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
