import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "../components/ui/sidebar";

export default function Home() {
  return (
    <div className="flex justify-center relative items-center w-full h-full border">
      <SidebarTrigger className="absolute top-0 left-0 " />

      <div className="text-4xl w-fit h-fit">Landing Page</div>

      {/* <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div> */}
    </div>
  );
}
