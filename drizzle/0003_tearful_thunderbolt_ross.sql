CREATE TABLE "discounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"discount_amount" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "discounts_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;