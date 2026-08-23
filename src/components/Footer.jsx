export default function Footer() {
  return (
    <footer className="w-full pt-4 pb-2 text-xs text-gray-500 font-medium">
      {/* Horizontal Divider Line for Footer */}
      <hr className="border-gray-200 mb-6" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <p>© Copyright 2026. All rights Reserved.</p>

        {/* Center: Made by credit */}
        <p>
          Inspired by{' '}
          <a
            href="#"
            className="text-gray-900 font-semibold underline underline-offset-2 hover:text-black transition-colors"
          >
            Kombo Website
          </a>{' '}
          &{' '}
          <a
            href="#"
            className="text-gray-900 font-semibold underline underline-offset-2 hover:text-black transition-colors"
          >
            Bryl Lim
          </a>
        </p>

        {/* Right: Policy Links */}
        <div className="flex items-center gap-4">
          <a
            href="#privacy"
            className="hover:text-gray-900 underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#cookie"
            className="hover:text-gray-900 underline underline-offset-2 transition-colors"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}