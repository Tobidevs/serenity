import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "../components/ui/sidebar";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 justify-center relative items-center w-full h-full border">
      <section className="w-40 h-10 border justify-center absolute top-0 right-0 flex gap-4">
        <SignInButton/>
        <SignUpButton />
      </section>
      <div className="text-4xl w-fit h-fit">Landing Page</div>
      <p className="text-[#505673]">Under Construction</p>
    </div>
  );
}
