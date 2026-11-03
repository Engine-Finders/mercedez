import LegalPage from "@/components/shared/LegalPage";

export const metadata = {
  title: "Privacy Policy",
  description: "How Mercedes Engines UK collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="22 October 2026">
      <p>
        This Privacy Policy explains how Mercedes Engines UK (&quot;we&quot;, &quot;us&quot;) handles personal information when you use
        mercedesengines.uk.
      </p>

      <h2>Information we collect</h2>
      <p>We may collect:</p>
      <ul>
        <li>Contact details you submit (such as name, email, phone number)</li>
        <li>Vehicle details you provide (registration, model, engine code, symptoms)</li>
        <li>Technical data such as IP address, browser type and pages visited</li>
        <li>Cookie and analytics data as described in our Cookies Policy</li>
      </ul>

      <h2>How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Respond to enquiries and quote requests</li>
        <li>Improve our guides, tools and website performance</li>
        <li>Communicate about services you requested</li>
        <li>Meet legal or regulatory obligations</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We may share relevant enquiry details with vetted specialists or service partners only where needed to fulfil your
        request. We do not sell personal data.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on applicable law, you may ask to access, correct or delete your personal data, or object to certain
        processing. Contact us to make a request.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, contact us via the Contact page on this website.
      </p>
    </LegalPage>
  );
}
