/**
 * Google AdSense Configuration helper
 * Handles environment variable resolution and policy check validations.
 */

export const getAdSenseConfig = () => {
  // Vite env
  const viteClientId = (import.meta as any).env?.VITE_ADSENSE_CLIENT_ID;
  const viteSlotHome = (import.meta as any).env?.VITE_ADSENSE_SLOT_HOME;
  const viteSlotContent = (import.meta as any).env?.VITE_ADSENSE_SLOT_CONTENT;

  // Next.js compatibility fallback
  const nextClientId = (import.meta as any).env?.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const nextSlotHome = (import.meta as any).env?.NEXT_PUBLIC_ADSENSE_SLOT_HOME;
  const nextSlotContent = (import.meta as any).env?.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT;

  const clientId = viteClientId || nextClientId || 'ca-pub-XXXXXXXXXXXXXXXX';
  const slotHome = viteSlotHome || nextSlotHome || '1234567890';
  const slotContent = viteSlotContent || nextSlotContent || '9876543210';

  // Check whether it is a real publisher ID (starts with ca-pub- and has digits, not X)
  const isConfigured = Boolean(
    clientId &&
    clientId.startsWith('ca-pub-') &&
    !clientId.includes('XXXXXXXX') &&
    clientId.length > 10
  );

  return {
    clientId,
    slotHome,
    slotContent,
    isConfigured,
  };
};
