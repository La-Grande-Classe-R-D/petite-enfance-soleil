export const CONTACT_MODAL_EVENT = "lgc:open-contact-modal";

export function openContactModal() {
  window.dispatchEvent(new Event(CONTACT_MODAL_EVENT));
}
