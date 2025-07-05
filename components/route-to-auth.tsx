import { useRouter } from "next/navigation";
import { useSessionStore } from "../store/useSessionStore";
import { Divide } from "lucide-react";
export const RouteToAuth = () => {
  const router = useRouter();
  const { session } = useSessionStore();

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50">
      <div className="bg-grey-main h-2/11 w-5/6 flex flex-col items-center md:w-3/8 md:h-3/9 rounded-2xl shadow-lg p-6 mt-20">
        {session ? ( // todo fix functionality based on session
          <h2 className="text-xl font-semibold mb-4 text-center">
            Please wait...
          </h2>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Login to access this page
            </h2>
            <button
              onClick={() => router.push("/auth")}
              className="w-full bg-grey-primary text-white py-2 px-4 font-bold rounded-xl "
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
