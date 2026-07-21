import PolicyLayout, { PolicySection, PolicyList, PolicyHighlight } from '../../components/common/PolicyLayout'

export default function DataSecurityPolicy() {
  return (
    <PolicyLayout
      icon="lock"
      title="Data Security Policy"
      subtitle="We take the security of your personal data seriously. Here's how we protect it."
      lastUpdated="January 2025"
    >
      <PolicySection>
        <p>
          At Tapzy, safeguarding your personal data and maintaining the trust you place in us is our
          top priority. This Data Security Policy explains the measures we take to protect your
          information from unauthorized access, disclosure, or misuse.
        </p>
      </PolicySection>

      <PolicySection title="Data We Collect and Store">
        <p>
          We only collect data that is necessary to provide our services to you. This includes:
        </p>
        <PolicyList items={[
          'Personal identification information (name, email address, phone number)',
          'Billing and shipping address',
          'Payment information (processed securely — we do not store full card numbers)',
          'Device and usage data for site analytics',
          'Order history and preferences',
        ]} />
      </PolicySection>

      <PolicySection title="Security Measures">
        <p>We implement multiple layers of security to protect your data:</p>
        <PolicyList items={[
          'SSL/TLS Encryption: All data transmitted between your browser and our servers is encrypted using industry-standard SSL/TLS protocols.',
          'Secure Payment Processing: Payments are processed through PCI-DSS compliant payment gateways. We never store your full payment card details.',
          'Access Controls: Access to customer data is strictly limited to authorized personnel on a need-to-know basis.',
          'Regular Security Audits: We conduct periodic security assessments and vulnerability testing.',
          'Data Minimization: We only collect data that is essential to operate our services.',
        ]} />
      </PolicySection>

      <PolicySection title="Data Storage and Retention">
        <PolicyList items={[
          'Your data is stored on secure, encrypted servers.',
          'We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy.',
          'Order data is retained for up to 7 years for accounting and legal compliance purposes.',
          'You can request deletion of your personal data by contacting us at support@tapzy.com.',
        ]} />
        <PolicyHighlight
          icon="cloud"
          text="Our servers are hosted with reputable cloud providers that maintain robust physical and digital security measures."
        />
      </PolicySection>

      <PolicySection title="Third-Party Data Sharing">
        <p>
          We may share your data with trusted third parties only to the extent necessary to deliver
          our services:
        </p>
        <PolicyList items={[
          'Payment processors — to handle transactions securely',
          'Logistics and courier partners — to ship your orders',
          'Analytics services — to improve our website and user experience',
          'Legal authorities — when required by law',
        ]} />
        <p className="mt-3">
          We do not sell your personal data to third parties.
        </p>
      </PolicySection>

      <PolicySection title="Your Rights">
        <p>You have the following rights regarding your personal data:</p>
        <PolicyList items={[
          'Right to access — request a copy of your personal data',
          'Right to rectification — correct inaccurate or incomplete data',
          'Right to erasure — request deletion of your personal data',
          'Right to restrict processing — limit how we use your data',
          'Right to data portability — receive your data in a portable format',
          'Right to object — object to certain types of data processing',
        ]} />
        <p className="mt-3">
          To exercise any of these rights, contact us at{' '}
          <span className="text-primary-500 font-medium">support@tapzy.com</span>.
        </p>
      </PolicySection>

      <PolicySection title="Data Breach Response">
        <p>
          In the unlikely event of a data breach, we will:
        </p>
        <PolicyList items={[
          'Notify affected users within 72 hours of discovering the breach.',
          'Inform relevant regulatory authorities as required by law.',
          'Take immediate steps to contain the breach and prevent further damage.',
          'Provide clear guidance on what steps you should take to protect yourself.',
        ]} />
      </PolicySection>

      <PolicySection title="Contact Our Security Team">
        <p>
          If you have any concerns about data security or wish to report a security vulnerability,
          please contact us immediately at{' '}
          <span className="text-primary-500 font-medium">support@tapzy.com</span>.
          We take all reports seriously and will respond promptly.
        </p>
      </PolicySection>
    </PolicyLayout>
  )
}
