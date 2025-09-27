"use server";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
export type ResponseType = {
  statusCode: number;
  statusText: string | number | null;
  message?: string;
  user: object | null;
};
export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<ResponseType | void> {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        password,
        email,
        callbackURL: "/",
      },
    });
    return {
      statusCode: 201,
      statusText: "OK",
      message: "ثبت نام با موفقیت انجام شد",
      user: result.user,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        statusCode: error.statusCode,
        statusText: error.status, // or you can omit this line if not needed
        message: error.message,
        user: null,
      };
    }
    return {
      statusCode: 500,
      statusText: "ERROR",
      message: "خطای ناشناخته",
      user: null,
    };
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<ResponseType | void> {
  try {
    const result = await auth.api.signInEmail({
      body: {
        password,
        email,
        callbackURL: "/",
      },
    });

    return {
      statusCode: 201,
      statusText: "OK",
      message: "ورود با موفقیت انجام شد",
      user: result.user,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        statusCode: error.statusCode,
        statusText: error.status, // or you can omit this line if not needed
        message: error.message,
        user: null,
      };
    }
    return {
      statusCode: 500,
      statusText: "ERROR",
      message: "خطای ناشناخته",
      user: null,
    };
  }
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });
  console.log(result);

  return result;
}
