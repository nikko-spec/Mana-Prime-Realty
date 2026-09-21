export const PHONE_DISPLAY = "+63 919 007 5001";
export const PHONE_E164 = "+639190075001";
export const EMAIL = "nikkomana@gmail.com";

export function getContactLinks(listingTitle) {
  const message = listingTitle
    ? `Hi, I'm interested in "${listingTitle}" from Mana Prime Realty.`
    : "Hi, I'd like to inquire about a property from Mana Prime Realty.";
  return {
    call: `tel:${PHONE_E164}`,
    whatsapp: `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent(message)}`,
    viber: `viber://chat?number=${encodeURIComponent(PHONE_E164)}`,
  };
}
