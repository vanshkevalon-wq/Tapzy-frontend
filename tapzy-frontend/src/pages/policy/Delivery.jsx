import PolicyLayout, { PolicySection, PolicyTable, PolicyHighlight } from '../../components/common/PolicyLayout'

export default function Delivery() {
  return (
    <PolicyLayout
      icon="local_shipping"
      title="Delivery"
      subtitle="Fast, reliable shipping to get your Tapzy cards to you as quickly as possible."
      lastUpdated="January 2025"
    >
      <PolicySection>
        <p>
          Tapzy products are all customizable, printable, and digital. The customization and production
          process takes 1-2 business days to complete.
        </p>
        <p>
          The total shipping time from the day your orders are placed can range between 4 to 5 business days.
          Standard shipping times apply once your order has been shipped.
        </p>
        <p>
          You can always visit your order summary page by clicking the link in your confirmation email
          for more information on the status of your order.
        </p>
      </PolicySection>

      <PolicySection title="Delivery Times by Location">
        <PolicyTable
          headers={['City', 'Delivery Time']}
          rows={[
            ['Delhi NCR', 'Next day Delivery*'],
            ['Mumbai, Bangalore, Ahmedabad', '2 Days via Express Courier'],
            ['Other States', '2-3 Days via Express Courier']
          ]}
        />
        <PolicyHighlight
          icon="schedule"
          text="*Next day delivery is subject to order placement before 2 PM on weekdays and availability in your region."
        />
      </PolicySection>

      <PolicySection title="Tracking Your Order">
        <p>
          Once your order has been shipped, you will receive a tracking number via email.
          You can use this number to track your shipment in real-time.
        </p>
        <p>
          If you have any questions about your delivery, please reach out to our support team.
        </p>
      </PolicySection>
    </PolicyLayout>
  )
}
