"use client";

import { Share2 } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function ShareButton({
  title,
  url,
}: {
  title: string;
  url: string;
}) {

  const shareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      title + " " + url
    )}`;

    window.open(whatsappUrl, "_blank");
  };


  const shareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;

    window.open(facebookUrl, "_blank");
  };


  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: title,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };


  return (
    <div className="flex items-center gap-3">

      {/* Share Button
      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Share2 size={18} />
        Share
      </button> */}


      {/* WhatsApp */}
      <button
        onClick={shareWhatsApp}
        aria-label="Share on WhatsApp"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
      >
        <FaWhatsapp size={22} />
      </button>


      {/* Facebook */}
      <button
        onClick={shareFacebook}
        aria-label="Share on Facebook"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800"
      >
        <FaFacebookF size={18} />
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Share2 size={18} />
        Share
      </button>

    </div>
  );
}