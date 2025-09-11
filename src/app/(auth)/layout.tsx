import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-0 py-7 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top left,
          rgba(56, 193, 182, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Link href="/" className="-mb-6 z-10">
        <span className="sr-only">Klasino</span>
        <img
          className="h-35 w-auto opacity-75 hover:opacity-100 transition"
          src="/image/log0-nobg.png"
          alt="Klasino Logo"
          width={100}
          height={150}
        />
      </Link>
      <div className="relative z-20 w-full">{children}</div>
    </section>
  );
}
