/** Points de contact « rester informé » : pop-up et bandeau (voir
 *  components/shared/ContactPopup.astro et ContactStrip.astro).
 *  Un seul endroit à modifier si le lien ou le service change. */
export const contact = {
  whatsappCommunityUrl: "https://chat.whatsapp.com/FkWw2ggL8oXFwAGEL0kCy3",
  popupDelayMs: 28000,
  popupScrollRatio: 0.7,
  dismissDays: 30,
} as const;
