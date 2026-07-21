import PolicyLayout, { PolicySection, PolicyList, PolicyNumberedList, PolicyHighlight } from '../../components/common/PolicyLayout'

export default function ReturnPolicy() {
  return (
    <PolicyLayout
      icon="replay"
      title="Return Policy"
      subtitle="We want you to love your Tapzy card. If something's not right, here's how we handle returns."
      lastUpdated="January 2025"
    >
      <PolicySection>
        <p>
          We stand behind the quality of every Tapzy NFC card. If you're not completely satisfied
          with your purchase, we're here to help. Please read this policy carefully to understand
          your options.
        </p>
        <PolicyHighlight
          icon="schedule"
          text="All return claims must be initiated within 24 hours of receiving your order. Items returned without prior approval will not be accepted."
        />
      </PolicySection>

      <PolicySection title="Eligible Return Conditions">
        <p>We accept returns under the following circumstances:</p>
        <PolicyNumberedList items={[
          'You received a product significantly different from what you ordered.',
          'The product arrived faulty or damaged — photo proof must be submitted within 24 hours of delivery.',
          'The wrong item was delivered.',
        ]} />
      </PolicySection>

      <PolicySection title="How to Initiate a Return">
        <PolicyList items={[
          'Contact us at support@tapzy.com within 24 hours of receiving your order.',
          'Include your order number, a description of the issue, and clear photos of the item.',
          'Wait for our team to review and approve your return request.',
          'Once approved, we\'ll send you a return shipping label and instructions.',
          'Pack the item securely and send it back as instructed.',
        ]} />
        <p className="mt-3">
          Items sent back without first requesting a return will not be accepted.
        </p>
      </PolicySection>

      <PolicySection title="Non-Returnable Items">
        <p>The following items are not eligible for return:</p>
        <PolicyList items={[
          'Customized or personalized NFC cards',
          'Opened or used digital products',
          'Items marked as final sale or gift cards',
          'Items returned after 7 days from delivery date',
        ]} />
      </PolicySection>

      <PolicySection title="Replacements vs. Refunds">
        <p>
          Our primary resolution is a replacement for eligible items. Refunds are issued only when
          a replacement is not possible or when explicitly approved by our support team.
        </p>
        <PolicyList items={[
          'Replacement orders are processed within 2 business days of approval.',
          'Refunds, if approved, are processed within 10 business days to your original payment method.',
          'Shipping and insurance fees are non-refundable.',
        ]} />
      </PolicySection>

      <PolicySection title="European Union Returns">
        <p>
          If merchandise is being shipped into the European Union, you have the right to cancel or
          return your order within 14 days for any reason and without justification. The item must
          be in its original, unused condition with all original packaging and proof of purchase.
        </p>
      </PolicySection>

      <PolicySection title="Contact for Returns">
        <p>
          For all return-related queries, reach out to our support team at{' '}
          <span className="text-primary-500 font-medium">support@tapzy.com</span>.
          We aim to respond within 1 business day.
        </p>
      </PolicySection>
    </PolicyLayout>
  )
}
