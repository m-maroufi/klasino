CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"total_amount" integer NOT NULL,
	"discount_amount" integer DEFAULT 0 NOT NULL,
	"final_amount" integer NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"items" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cart_items" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "carts" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "payment_logs" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "cart_items" CASCADE;--> statement-breakpoint
DROP TABLE "carts" CASCADE;--> statement-breakpoint
DROP TABLE "payment_logs" CASCADE;--> statement-breakpoint
--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "order_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "cart_id";