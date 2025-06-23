import { UserButton, UserProfile } from "@clerk/nextjs"

export default function DashboardPage() {
  return (
    <div>
        <UserProfile/>
        <UserButton/>
      <div>Dashboard</div>
    </div>
  );
}
