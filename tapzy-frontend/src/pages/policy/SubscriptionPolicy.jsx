import PolicyLayout, { PolicySection, PolicyList, PolicyHighlight } from '../../components/common/PolicyLayout'

export default function SubscriptionPolicy() {
  return (
    <PolicyLayout
      icon="autorenew"
      title="Subscription Policy"
      subtitle="Everything you need to know about our subscription plans, pre-orders, and cancellations."
      lastUpdated="January 2025"
    >
      <PolicySection title="Cancellation Policy">
        <p>
          Some items in our store may be offered to you as a subscription, a pre-order, or try before
          you buy. This policy explains how you can change or cancel these kinds of purchases.
        </p>
      </PolicySection>

      <PolicySection title="Subscriptions">
        <p>
          When you purchase a subscription you'll receive repeat deliveries. These are based on the
          subscription duration and frequency that you select.
        </p>
        <PolicyList items={[
          'Your payment details will be stored securely and you\'ll be charged for each delivery, unless you choose to pay in advance.',
          'Some subscriptions may auto-renew at the end of their duration.',
          'If you don\'t want to renew, you can cancel your subscription at any time.',
          'To cancel or modify your subscription, use the link in your order confirmation email.',
          'You can manage your subscription from your order summary page.',
        ]} />
        <PolicyHighlight
          icon="info"
          text="See our Returns Policy for more details on returns and refunds related to subscription orders."
        />
      </PolicySection>

      <PolicySection title="Pre-Orders">
        <p>
          When you purchase a pre-order, you are buying an out-of-stock or soon-to-be-available
          product not yet in inventory.
        </p>
        <PolicyList items={[
          'We may collect no payment or a partial deposit at checkout.',
          'Your payment method will be stored securely and the full or remaining payment will be charged when the order is fulfilled.',
          'You can cancel a partially paid pre-order that has not yet been fulfilled.',
          'If the order has been fulfilled, it cannot be cancelled, but you can request a full or partial refund.',
        ]} />
      </PolicySection>

      <PolicySection title="Try Before You Buy">
        <p>
          When you purchase a "try before you buy" item, we authorize your payment method before
          fulfilling the order.
        </p>
        <PolicyList items={[
          'You will have a set amount of time to decide if you want to keep the item.',
          'Once the trial period has passed, if you have not returned the item, we will charge your payment method for the full amount.',
          'To return the item within the trial period, follow the instructions provided in your order email.',
        ]} />
      </PolicySection>

      <PolicySection title="How to Cancel">
        <p>
          You can cancel or modify your subscription at any time by:
        </p>
        <PolicyList items={[
          'Clicking the subscription management link in your order confirmation email.',
          'Logging into your account and navigating to the subscriptions section.',
          'Contacting our support team at support@tapzy.com.',
        ]} />
        <PolicyHighlight
          icon="schedule"
          text="Cancellation requests must be made at least 24 hours before your next scheduled billing date to avoid being charged for the upcoming cycle."
        />
      </PolicySection>
    </PolicyLayout>
  )
}
