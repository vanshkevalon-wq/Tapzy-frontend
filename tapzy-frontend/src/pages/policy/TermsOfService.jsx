import PolicyLayout, { PolicySection, PolicyList, PolicyHighlight } from '../../components/common/PolicyLayout'

export default function TermsOfService() {
  return (
    <PolicyLayout
      icon="gavel"
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our website or purchasing our products."
      lastUpdated="January 2025"
    >
      <PolicySection>
        <p>
          By accessing or using the Tapzy website and purchasing our products, you agree to be bound
          by these Terms of Service. If you do not agree with any part of these terms, please do not
          use our services.
        </p>
        <PolicyHighlight
          icon="info"
          text="These terms apply to all visitors, users, and others who access or use our services."
        />
      </PolicySection>

      <PolicySection title="Use of Our Website">
        <p>By using this website, you agree that you will not:</p>
        <PolicyList items={[
          'Use the site for any unlawful purpose or in violation of any applicable laws.',
          'Attempt to gain unauthorized access to any part of the website or its related systems.',
          'Transmit any harmful, offensive, or disruptive content.',
          'Reproduce, duplicate, copy, or exploit any part of our service without prior written permission.',
          'Use automated tools to scrape or extract data from our website.',
        ]} />
      </PolicySection>

      <PolicySection title="Products and Orders">
        <PolicyList items={[
          'All products are subject to availability. We reserve the right to discontinue any product at any time.',
          'Product images are for illustrative purposes. Actual products may slightly vary.',
          'Prices are subject to change without prior notice.',
          'We reserve the right to refuse or cancel any order at our discretion.',
          'You are responsible for providing accurate order and shipping information.',
        ]} />
      </PolicySection>

      <PolicySection title="Intellectual Property">
        <p>
          All content on this website — including text, images, logos, product designs, and software —
          is the property of Tapzy and is protected by applicable intellectual property laws.
        </p>
        <PolicyList items={[
          'You may not use, copy, reproduce, or distribute our content without written permission.',
          'Our trademarks and brand features may not be used without prior written consent.',
          'User-submitted content remains your property, but you grant us a license to use it.',
        ]} />
      </PolicySection>

      <PolicySection title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Tapzy shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising out of your use of our
          services.
        </p>
        <PolicyList items={[
          'We are not responsible for any loss or damage resulting from unauthorized access to your account.',
          'We are not liable for any service interruptions or technical issues beyond our control.',
          'Our maximum liability to you shall not exceed the amount paid by you for the relevant order.',
        ]} />
      </PolicySection>

      <PolicySection title="Privacy">
        <p>
          Your use of our website is also governed by our Privacy Policy, which is incorporated into
          these Terms of Service by reference. Please review it to understand our practices regarding
          your personal data.
        </p>
      </PolicySection>

      <PolicySection title="Governing Law">
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of
          India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction
          of the courts in India.
        </p>
      </PolicySection>

      <PolicySection title="Changes to Terms">
        <p>
          We reserve the right to update or modify these Terms of Service at any time. Changes will
          be effective immediately upon posting to the website. Your continued use of the website
          after any changes constitutes your acceptance of the new terms.
        </p>
        <PolicyHighlight
          icon="notifications"
          text="We recommend reviewing these terms periodically. Significant changes will be communicated via email."
        />
      </PolicySection>

      <PolicySection title="Contact Us">
        <p>
          If you have any questions about these Terms of Service, please contact us at{' '}
          <span className="text-primary-500 font-medium">support@tapzy.com</span>.
        </p>
      </PolicySection>
    </PolicyLayout>
  )
}
