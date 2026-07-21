import PolicyLayout, { PolicySection, PolicyNumberedList, PolicyList, PolicyHighlight } from '../../components/common/PolicyLayout'

export default function RefundPolicy() {
  return (
    <PolicyLayout
      icon="currency_rupee"
      title="Refund Policy"
      subtitle="We work hard to ensure your satisfaction. Here's everything you need to know about returns and refunds."
      lastUpdated="January 2025"
    >
      <PolicySection>
        <p>
          We always try very hard to provide complete satisfaction with your purchases and will go to
          any length to do so. However, if you are dissatisfied with an item purchased through the
          website, we accept returns and offer replacements subject to the terms and conditions
          outlined in this policy.
        </p>
        <PolicyHighlight
          icon="warning"
          text="Please note: We do not provide refunds for completed services. Returns not received by us will not be eligible for replacement. Shipping and insurance fees are also non-refundable."
        />
      </PolicySection>

      <PolicySection title="Acceptable Return Conditions">
        <p>If any of the following conditions are met, we will accept product returns for replacement:</p>
        <PolicyNumberedList items={[
          'The products you received differ significantly from the products you ordered.',
          'If a product is faulty, your order will be replaced or refunded. All claims for damaged items must be made with photo proof within 24 hours of receiving your order. It is critical that you open your order as soon as possible and notify us of any damage. No action will be taken if no claim is made within 24 hours of delivery.',
        ]} />
        <p className="mt-4">
          If your return is accepted, we'll send you a return shipping label as well as instructions
          on how and where to send your package. Items sent back without first requesting a return
          will not be accepted.
        </p>
        <p className="mt-2">
          You can always contact us for any return question at{' '}
          <span className="text-primary-500 font-medium">support@tapzy.com</span>.
        </p>
      </PolicySection>

      <PolicySection title="Damages and Issues">
        <p>
          Please inspect your order upon reception and contact us immediately if the item is
          defective, damaged, or if you receive the wrong item, so that we can evaluate the issue
          and make it right.
        </p>
      </PolicySection>

      <PolicySection title="Exceptions / Non-Returnable Items">
        <p>Certain types of items cannot be returned:</p>
        <PolicyList items={[
          'Custom products (special orders or personalized items)',
          'Perishable goods',
          'Personal care goods',
          'Hazardous materials, flammable liquids, or gases',
          'Sale items or gift cards',
        ]} />
      </PolicySection>

      <PolicySection title="Exchanges">
        <p>
          The fastest way to ensure you get what you want is to return the item you have, and once
          the return is accepted, make a separate purchase for the new item.
        </p>
      </PolicySection>

      <PolicySection title="European Union — 14 Day Cooling Off Period">
        <p>
          If merchandise is being shipped into the European Union, you have the right to cancel or
          return your order within 14 days for any reason and without justification. Your item must
          be in the same condition that you received it — unworn or unused, with tags, and in its
          original packaging. You'll also need the receipt or proof of purchase.
        </p>
      </PolicySection>

      <PolicySection title="Refunds">
        <p>
          We will notify you once we've received and inspected your return, and let you know if the
          refund was approved or not.
        </p>
        <p>
          If approved, you'll be automatically refunded on your original payment method within
          10 business days. Please allow additional time for your bank or credit card company to
          process and post the refund.
        </p>
        <PolicyHighlight
          icon="schedule"
          text="If more than 15 business days have passed since we approved your return and you haven't received your refund, please contact us at support@tapzy.com."
        />
      </PolicySection>
    </PolicyLayout>
  )
}
