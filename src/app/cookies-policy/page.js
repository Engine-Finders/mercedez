import LegalPage from "@/components/shared/LegalPage";

export const metadata = {
  title: "Cookies Policy",
  description: "How Mercedes Engines UK uses cookies and similar technologies.",
};

export default function CookiesPolicyPage() {
  return (
    <LegalPage title="Cookies Policy" updated="22 October 2026">
      <p>
        This Cookies Policy explains how mercedesengines.uk uses cookies and similar technologies.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help the site work, remember
        preferences, and understand how pages are used.
      </p>

      <h2>Cookies we use</h2>
      <ul>
        <li>
          <strong>Essential cookies</strong> - required for basic site functions (for example theme preference)
        </li>
        <li>
          <strong>Analytics cookies</strong> - help us understand traffic and improve content
        </li>
        <li>
          <strong>Functional cookies</strong> - remember choices such as display settings
        </li>
      </ul>

      <h2>Managing cookies</h2>
      <p>
        You can control cookies through your browser settings. Blocking some cookies may affect how parts of the site
        work.
      </p>

      <h2>More information</h2>
      <p>
        For how we handle personal data more broadly, see our Privacy Policy.
      </p>
    </LegalPage>
  );
}
