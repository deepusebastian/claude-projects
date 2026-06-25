import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-gray-900 mb-2">AI Blueprint</p>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              Your personalized AI tool pipeline builder. Stay ahead of the AI revolution.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
              Product
            </p>
            <ul className="space-y-2">
              {[
                { href: "/", label: "AI News" },
                { href: "/models", label: "Models Leaderboard" },
                { href: "/tools", label: "Tools Directory" },
                { href: "/builder", label: "Pipeline Builder" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
              Company
            </p>
            <ul className="space-y-2">
              {[
                { href: "/signup", label: "Get Started" },
                { href: "/login", label: "Log In" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
              Legal
            </p>
            <ul className="space-y-2">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 text-center text-[12px] text-gray-300">
          &copy; {new Date().getFullYear()} AI Blueprint. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
