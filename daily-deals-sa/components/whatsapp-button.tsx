import Link from "next/link"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "27767716850"
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]/80"
      >
        <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
        <span className="font-semibold">Chat on WhatsApp</span>
      </Link>
    </div>
  )
}


