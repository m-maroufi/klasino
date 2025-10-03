export const runtime = "nodejs";
import db from "@/db";
import { account, session, users, verification } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

// You can pass options here: https://better-auth.dev/reference/server/api#betterauthoptions
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      // ⚡ حتما schema رو مستقیم پاس بده
      user: users,
      account,
      session,
      verification,
    },
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
        input: false, // don't allow user to set role
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin(), nextCookies()],
});
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
