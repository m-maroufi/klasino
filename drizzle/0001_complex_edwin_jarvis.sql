CREATE TYPE "public"."course_status" AS ENUM('ongoing', 'completed', 'preorder');--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "status" "course_status" DEFAULT 'ongoing' NOT NULL;