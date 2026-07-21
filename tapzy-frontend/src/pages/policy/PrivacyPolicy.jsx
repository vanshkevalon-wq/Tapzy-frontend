import PolicyLayout, { PolicySection, PolicyList, PolicyHighlight } from '../../components/common/PolicyLayout'

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      icon="shield"
      title="Privacy Policy"
      subtitle="We are committed to protecting your personal information and your right to privacy."
      lastUpdated="January 2025"
    >
      <PolicySection>
        <p>
          This Privacy Policy describes how Tapzy (the "Site" or "we") collects, uses, and discloses
          your Personal Information when you visit or make a purchase from the Site.
        </p>
      </PolicySection>

      <PolicySection title="Contact">
        <p>
          After reviewing this policy, if you have additional questions, want more information about our
          privacy practices, or would like to make a complaint, please contact us:
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <span className="flex items-center gap-2 text-plum/80">
            <span className="icon text-base text-primary-400">mail</span>
            support@tapzy.com
          </span>
          <span className="flex items-center gap-2 text-plum/80">
            <span className="icon text-base text-primary-400">location_on</span>
            Tapzy, India
          </span>
        </div>
      </PolicySection>

      <PolicySection title="Collecting Personal Information">
        <p>
          When you visit the Site, we collect certain information about your device, your interaction
          with the Site, and information necessary to process your purchases. We may also collect
          additional information if you contact us for customer support.
        </p>
        <p className="font-semibold text-plum mt-4">Device Information</p>
        <PolicyList items={[
          'Purpose: To load the Site accurately and perform analytics to optimize our Site.',
          'Source: Collected automatically when you access our Site using cookies, log files, and web beacons.',
          'Information collected: Browser version, IP address, time zone, cookie data, and site interaction patterns.',
        ]} />
        <p className="font-semibold text-plum mt-4">Order Information</p>
        <PolicyList items={[
          'Purpose: To provide products or services to you, process payments, arrange shipping, and send order confirmations.',
          'Source: Collected from you at checkout.',
          'Information collected: Name, billing and shipping address, payment information, email address, and phone number.',
        ]} />
        <p className="font-semibold text-plum mt-4">Customer Support Information</p>
        <PolicyList items={[
          'Purpose: To provide customer support and resolve queries.',
          'Source: Collected from you when you contact us.',
        ]} />
      </PolicySection>

      <PolicySection title="Sharing Personal Information">
        <p>
          We share your Personal Information with service providers to help us provide our services
          and fulfill our contracts with you. For example:
        </p>
        <PolicyList items={[
          'Payment processors and shipping partners to complete your orders.',
          'We may share your Personal Information to comply with applicable laws and regulations.',
          'To respond to lawful requests from authorities or to otherwise protect our rights.',
        ]} />
      </PolicySection>

      <PolicySection title="Behavioural Advertising">
        <p>
          We may use your Personal Information to provide you with targeted advertisements or marketing
          communications we believe may be of interest to you. You can opt out of targeted advertising
          through your browser settings or by contacting us.
        </p>
        <PolicyHighlight
          icon="info"
          text="You can opt out of some advertising services by visiting the Digital Advertising Alliance's opt-out portal at optout.aboutads.info."
        />
      </PolicySection>

      <PolicySection title="Using Personal Information">
        <p>We use your personal information to provide our services to you, which includes:</p>
        <PolicyList items={[
          'Offering products for sale and processing your orders',
          'Processing payments securely',
          'Shipping and fulfillment of your order',
          'Keeping you up to date on new products, services, and offers',
          'Providing customer support',
        ]} />
      </PolicySection>

      <PolicySection title="Your Rights">
        <p>
          You have the right to access the Personal Information we hold about you, to port it to a
          new service, and to ask that your Personal Information be corrected, updated, or erased.
        </p>
        <PolicyList items={[
          'Right to access your personal data',
          'Right to correct inaccurate data',
          'Right to request deletion of your data',
          'Right to data portability',
          'Right to object to processing',
        ]} />
        <p className="mt-3">
          To exercise these rights, please contact us at support@tapzy.com.
        </p>
      </PolicySection>

      <PolicySection title="Cookies">
        <p>
          A cookie is a small amount of information downloaded to your computer or device when you
          visit our Site. We use functional, performance, and analytics cookies to optimize your
          experience on our Site.
        </p>
        <PolicyHighlight
          icon="cookie"
          text="Most browsers automatically accept cookies. You can control cookies through your browser's settings. Please note that removing cookies may impact your user experience."
        />
      </PolicySection>

      <PolicySection title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes to our practices
          or for other operational, legal, or regulatory reasons. We will notify you of any significant
          changes via email or a prominent notice on our website.
        </p>
      </PolicySection>
    </PolicyLayout>
  )
}
