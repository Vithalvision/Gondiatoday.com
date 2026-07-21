import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const today = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export function UtilityBar() {
  return (
    <div className="bg-brand text-white text-xs">
  <div className="max-w-wrap mx-auto px-4 h-9 flex items-center justify-between">

    {/* Left */}
    <div className="whitespace-nowrap">
      {today} | Gondia, Maharashtra, India
    </div>

    {/* Center */}
    <nav className="hidden lg:flex items-center gap-5">
      <a href="/gondia" className="hover:text-gray-200">
        Gondia
      </a>

      <a href="/maharashtra" className="hover:text-gray-200">
        Maharashtra
      </a>

      <a href="/india" className="hover:text-gray-200">
        India
      </a>

      <a href="/sports" className="hover:text-gray-200">
        Sports
      </a>

      <a href="/politics" className="hover:text-gray-200">
        Politics
      </a>

      <a href="/entertainment" className="hover:text-gray-200">
        Entertainment
      </a>

      <div className="relative group">
        <button className="hover:text-gray-200">
          More ▾
        </button>

        <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg min-w-[180px] z-50">
          <a href="/business" className="block px-4 py-2 hover:bg-gray-100">
            Business
          </a>

          <a href="/technology" className="block px-4 py-2 hover:bg-gray-100">
            Technology
          </a>

          <a href="/education" className="block px-4 py-2 hover:bg-gray-100">
            Education
          </a>
        </div>
      </div>
    </nav>

    {/* Right */}
    <div className="flex items-center gap-3">
      <a href="https://www.facebook.com/GondiaToday"><FaFacebookF size={14} /></a>
      <a href="https://twitter.com/GondiaToday"><FaXTwitter size={14} /></a>
      <a href="https://www.instagram.com/GondiaToday"><FaInstagram size={14} /></a>
      {/* <a href="https://www.youtube.com/GondiaToday"><FaYoutube size={14} /></a> */}
    </div>

  </div>
</div>
  );
}
