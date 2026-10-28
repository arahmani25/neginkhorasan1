export const DEFAULT_WHATSAPP_NUMBER = '+93781608702';

export function whatsappLink(number = DEFAULT_WHATSAPP_NUMBER, message = 'Hello Negin Khorasan! I would like to plan a journey in Afghanistan.') {
  const digits = String(number || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '');
  const phone = /^\d{7,15}$/.test(digits) ? digits : DEFAULT_WHATSAPP_NUMBER.slice(1);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function displayWhatsApp(number = DEFAULT_WHATSAPP_NUMBER) {
  const digits = String(number || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '');
  return digits === '93781608702' ? '+93 781 608 702' : `+${digits}`;
}
