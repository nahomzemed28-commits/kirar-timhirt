import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
    amount: 1900, // $19.00
    label: '$19 / month',
  },
  lifetime: {
    priceId: process.env.STRIPE_LIFETIME_PRICE_ID!,
    amount: 7900, // $79.00
    label: '$79 lifetime',
  },
}
