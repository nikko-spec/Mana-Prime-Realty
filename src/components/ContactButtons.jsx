import { getContactLinks } from "@/lib/contact";

const CHAT = "M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z";
const PHONE =
  "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z";

const icons = { call: PHONE, whatsapp: CHAT, viber: CHAT };

function Icon({ name }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}

const external = { target: "_blank", rel: "noopener noreferrer" };

// variant "inline": row of buttons within page content.
// variant "bar": fixed bottom bar, mobile only.
export default function ContactButtons({ listingTitle, variant = "inline" }) {
  const links = getContactLinks(listingTitle);

  if (variant === "bar") {
    const item =
      "flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium text-cream";
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-cream/15 bg-banyan pb-[env(safe-area-inset-bottom)] md:hidden">
        <a href={links.call} className={item}>
          <Icon name="call" /> Call
        </a>
        <a href={links.whatsapp} {...external} className={`${item} border-x border-cream/15`}>
          <Icon name="whatsapp" /> WhatsApp
        </a>
        <a href={links.viber} className={item}>
          <Icon name="viber" /> Viber
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a href={links.call} className="btn-primary">
        <Icon name="call" /> Call
      </a>
      <a href={links.whatsapp} {...external} className="btn-outline">
        <Icon name="whatsapp" /> WhatsApp
      </a>
      <a href={links.viber} className="btn-outline">
        <Icon name="viber" /> Viber
      </a>
    </div>
  );
}
