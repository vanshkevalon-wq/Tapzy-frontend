import PolicyLayout, { PolicySection, PolicyTable, PolicyList, PolicyHighlight } from '../../components/common/PolicyLayout'

export default function ShippingPolicy() {
  return (
    <PolicyLayout
      icon="inventory_2"
      title="Shipping Policy"
      subtitle="Everything you need to know about how we ship your Tapzy NFC cards."
      lastUpdated="January 2025"
    >
      <PolicySection>
        <p>
          We are committed to delivering your Tapzy NFC cards as quickly and safely as possible.
          Please review our shipping policy below to understand our shipping procedures and timelines.
        </p>
      </PolicySection>

      <PolicySection title="Processing Time">
        <p>
          All Tapzy products are customizable and made to order. Once your order is confirmed:
        </p>
        <PolicyList items={[
          'Production and customization takes 1-2 business days.',
          'Orders placed before 2:00 PM on weekdays are processed the same day.',
          'Orders placed on weekends or public holidays are processed the next business day.',
        ]} />
      </PolicySection>

      <PolicySection title="Domestic Shipping Rates and Delivery Times">
        <PolicyTable
          headers={['City / Region', 'Shipping Method', 'Delivery Time']}
          rows={[
            ['Delhi NCR', 'Express Courier', 'Next Business Day*'],
            ['Mumbai, Bangalore, Ahmedabad', 'Express Courier', '2 Business Days'],
            ['Other Major Cities', 'Express Courier', '2–3 Business Days'],
            ['Remote Areas / Tier 3 Cities', 'Standard Courier', '4–5 Business Days'],
          ]}
        />
        <PolicyHighlight
          icon="info"
          text="*Next business day delivery is subject to order placement before 2 PM and courier availability in your pin code."
        />
      </PolicySection>

      <PolicySection title="Tracking Your Shipment">
        <p>
          Once your order is shipped, you'll receive a confirmation email with your tracking number.
          You can use this to monitor your shipment's real-time status on the courier's website.
        </p>
        <PolicyList items={[
          'Tracking emails are sent within 24 hours of dispatch.',
          'If you do not receive a tracking email, please check your spam folder.',
          'Contact us at support@tapzy.com if you still face issues.',
        ]} />
      </PolicySection>

      <PolicySection title="Damaged or Lost Shipments">
        <p>
          In the rare event that your order arrives damaged or gets lost in transit, please
          contact us within 24 hours of receiving your order (or the expected delivery date for lost shipments).
          Include your order number and photos of any damage so we can resolve the issue promptly.
        </p>
      </PolicySection>

      <PolicySection title="Incorrect Address">
        <p>
          Please double-check your shipping address before placing an order. Tapzy is not responsible
          for orders delivered to an incorrect address provided by the customer. If you notice an error
          in your shipping address, contact us immediately at support@tapzy.com — we can only make
          changes before the order is dispatched.
        </p>
      </PolicySection>
    </PolicyLayout>
  )
}
