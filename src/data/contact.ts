/** Points de contact « rester informé » : pop-up et bandeau (voir
 *  components/shared/ContactPopup.astro et ContactStrip.astro).
 *  Un seul endroit à modifier si le lien ou le service change. */
export const contact = {
  whatsappCommunityUrl: "https://chat.whatsapp.com/FkWw2ggL8oXFwAGEL0kCy3",
  // Même endpoint Formspree que le formulaire de /contact/ : les adresses
  // arrivent par mail, avec l'objet ci-dessous pour les distinguer.
  newsletterEndpoint: "https://formspree.io/f/mkjgrpgv",
  newsletterSubject: "Inscription newsletter",
  popupDelayMs: 17000,
  popupScrollRatio: 0.5,
  dismissDays: 30,
} as const;
