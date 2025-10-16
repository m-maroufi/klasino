import { signOut } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "@/lib/auth";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function UserMenu({ session }: { session: Session }) {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const result = await signOut();
      if (result) {
        router.push("/");
      }
    } catch (error) {}
  };
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger>
        <Button variant={"default"} asChild>
          <div>
            <User />
            {session.user.name}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="">
          <Link
            className="flex font-medium text-sm gap-3"
            href={
              session.user.role == "user"
                ? "/student"
                : session.user.role == "admin"
                ? "/admin"
                : "/instructor"
            }
          >
            <User className="h-4 w-4" />
            پنل کاربری
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-destructive" onClick={logoutHandler}>
          <LogOut className="h-4 w-4" /> خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
