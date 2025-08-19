import React from "react";

export const Footer = () => {
  return (
    <div className=" w-full bg-black relative">
      {/* Dark Noise Colored Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0),
        radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0),
        radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)
      `,
          backgroundSize: "20px 20px, 30px 30px, 25px 25px",
          backgroundPosition: "0 0, 10px 10px, 15px 5px",
        }}
      />
      {/* Your Content/Components */}
      <div className="container mx-auto px-4 py-10 relative z-10  min-h-[300px]">
        <div className=" relative z-10 py-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="footer-title md:col-span-2">
            <h2 className="text-white text-2xl font-bold">کلاسینو</h2>
            <p className="text-gray-400 mt-4">
              کلاسینو یک پلتفرم آموزشی آنلاین است که به شما امکان دسترسی به
              دوره‌های تخصصی در زمینه‌های مختلف را می‌دهد.
            </p>
          </div>
          <div className="footer-nav-link">
            <h2 className="text-white text-2xl font-bold"> لینک های مفید</h2>
            <ul className="flex flex-col space-y-2 mt-4">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  تماس با ما
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white">
                  حریم خصوصی
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-social ">
            <h2 className="text-white text-2xl font-bold">شبکه های اجتماعی</h2>
            <div className="flex space-y-4 mt-2 flex-col">
              {/* Add your social media icons here */}
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="footer-copyright mt-6  text-center text-emerald-500">
          <p>© 2025 کلاسینو. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </div>
  );
};
