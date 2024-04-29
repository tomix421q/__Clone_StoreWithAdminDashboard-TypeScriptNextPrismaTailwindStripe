const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'usd',
  style: 'currency',
  minimumFractionDigits: 0,
})

export function formatCurrenncy(amount: number) {
  return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}
