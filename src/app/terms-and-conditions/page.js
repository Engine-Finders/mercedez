import LegalPage from "@/components/shared/LegalPage";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms of use for Mercedes Engines UK.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage title="Terms and Conditions" updated="22 October 2026">
      <p>
        By using mercedesengines.uk you agree to these Terms and Conditions. If you do not agree, please do not use the
        site.
      </p>

      <h2>About this site</h2>
      <p>
        Mercedes Engines UK provides independent editorial guides, tools and ownership information about Mercedes-Benz
        vehicles. Content is for general information only and is not a substitute for professional diagnosis or advice.
      </p>

      <h2>No affiliation</h2>
      <p>
        We are not affiliated with, endorsed by, or connected to Mercedes-Benz or its parent companies. All trademarks
        belong to their respective owners.
      </p>

      <h2>Accuracy</h2>
      <p>
        We aim to keep information accurate and up to date, but costs, reliability patterns and availability can change.
        Always verify important decisions with a qualified specialist.
      </p>

      <h2>Quotes and third parties</h2>
      <p>
        Where we connect you with specialists or partners, any work agreed is between you and that provider. We are not
        responsible for third-party services, pricing or outcomes.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for loss arising from reliance on site content or from
        use of the website.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after changes means you accept the
        updated terms.
      </p>
    </LegalPage>
  );
}
