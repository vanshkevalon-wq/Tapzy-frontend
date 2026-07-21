import PolicyLayout, { PolicySection, PolicyTable, PolicyList, PolicyHighlight } from '../../components/common/PolicyLayout'

export default function InternationalShipping() {
  return (
    <PolicyLayout
      icon="flight"
      title="International Shipping Policy"
      subtitle="Tapzy ships worldwide. Here's everything you need to know about international orders."
      lastUpdated="January 2025"
    >
      <PolicySection>
        <p>
          We are delighted to offer international shipping so that professionals around the world can
          experience the power of Tapzy NFC Business Cards. Please review the information below before
          placing an international order.
        </p>
      </PolicySection>

      <PolicySection title="International Shipping Rates & Delivery Times">
        <PolicyTable
          headers={['Region', 'Estimated Delivery Time', 'Shipping Method']}
          rows={[
            ['South Asia (SAARC)', '5–7 Business Days', 'Express International Courier'],
            ['Middle East', '7–10 Business Days', 'Express International Courier'],
            ['Southeast Asia', '7–12 Business Days', 'Standard / Express Courier'],
            ['Europe', '10–15 Business Days', 'Standard International'],
            ['North America', '10–15 Business Days', 'Standard International'],
            ['Australia & Oceania', '10–15 Business Days', 'Standard International'],
            ['Rest of World', '14–21 Business Days', 'Standard International'],
          ]}
        />
        <PolicyHighlight
          icon="schedule"
          text="Delivery times are estimates from dispatch date. Actual delivery may vary due to customs processing, holidays, and local courier delays."
        />
      </PolicySection>

      <PolicySection title="Customs, Duties, and Taxes">
        <p>
          International shipments may be subject to import duties, taxes, and customs fees levied
          by the destination country. These charges are the responsibility of the recipient.
        </p>
        <PolicyList items={[
          'We are not able to predict or control customs duties and taxes.',
          'Tapzy is not responsible for delays caused by customs clearance.',
          'Customs authorities may open and inspect packages in transit.',
          'Please check with your local customs office for more information on applicable fees.',
        ]} />
      </PolicySection>

      <PolicySection title="Restricted Countries">
        <p>
          We currently cannot ship to countries under international trade sanctions or where shipping
          restrictions apply. If your country is not available at checkout, unfortunately we are
          unable to fulfil your order at this time.
        </p>
      </PolicySection>

      <PolicySection title="International Order Tracking">
        <PolicyList items={[
          'A tracking number is provided once your order is dispatched.',
          'International tracking updates may be less frequent than domestic shipments.',
          'Please allow 24–48 hours for tracking information to update after dispatch.',
          'Contact us at support@tapzy.com if your tracking has not updated in more than 5 business days.',
        ]} />
      </PolicySection>

      <PolicySection title="Damaged or Lost International Orders">
        <p>
          If your international order arrives damaged or is lost in transit, please contact us
          within 48 hours of the expected delivery date. We'll work with the courier to investigate
          and resolve the issue as quickly as possible.
        </p>
        <PolicyHighlight
          icon="camera_alt"
          text="For damaged orders, please send photos of the package and its contents to support@tapzy.com so we can process your claim promptly."
        />
      </PolicySection>

      <PolicySection title="International Returns">
        <p>
          International return requests follow the same conditions outlined in our Return Policy.
          Please note that return shipping costs for international orders are the responsibility of
          the customer unless the item is faulty or incorrect. We recommend using a tracked shipping
          service for all returns.
        </p>
      </PolicySection>
    </PolicyLayout>
  )
}
