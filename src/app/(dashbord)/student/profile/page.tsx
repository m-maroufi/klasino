import { TitleSection } from "@/components/shared";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { MailCheck, User2Icon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }
  const user = session.user;
  return (
    <div>
      <TitleSection title="اطلاعات حساب کاربری" />
      <Card className="bg-white">
        <CardHeader>
          <Image
            src={user.image || "/placeholder.png"}
            alt="Profile Image"
            width={150}
            height={150}
            className="rounded-2xl block mx-auto"
          />
        </CardHeader>
        <CardContent>
          <div className="max-w-lg w-full min-h-16  mx-auto">
            <form action="">
              <FieldSet>
                <FieldLegend>اطلاعات حساب </FieldLegend>
                <FieldGroup
                  data-disabled
                  className="bg-gray-100 overflow-hidden rounded-full"
                >
                  <InputGroup className="px-3 border-2 border-gray-200">
                    <InputGroupInput
                      disabled
                      value={user.name}
                      placeholder="نام و نام خانوادگی"
                      className="font-bold"
                    />
                    <InputGroupAddon>
                      <User2Icon />
                    </InputGroupAddon>
                  </InputGroup>
                </FieldGroup>
                <FieldGroup
                  data-disabled
                  className="bg-gray-100 overflow-hidden rounded-full"
                >
                  <InputGroup className="px-3 border-2 border-gray-200">
                    <InputGroupInput
                      disabled
                      name="email"
                      value={user.email}
                      placeholder="ایمیل"
                      className="font-bold"
                    />
                    <InputGroupAddon>
                      <MailCheck />
                    </InputGroupAddon>
                  </InputGroup>
                </FieldGroup>
              </FieldSet>
            </form>
            <Separator className="my-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
