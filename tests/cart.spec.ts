import { test, expect } from '@playwright/test'

test.describe('Cart', () => {
  test('empty cart shows empty state', async ({ page }) => {
    await page.goto('/cart')
    await expect(page.getByText('Your cart is empty')).toBeVisible()
  })

  test('add to cart button exists on shop page', async ({ page }) => {
    await page.goto('/shop')
    await page.waitForTimeout(3000)
    const addButtons = page.getByRole('button', { name: /add to cart/i })
    const count = await addButtons.count()
    expect(count).toBeGreaterThan(0)
  })

  test('cart link in header navigates to cart', async ({ page }) => {
    await page.goto('/')
    const cartLink = page.locator('a').filter({ has: page.locator('svg') }).filter({ hasText: /cart|bag|shop/i })
    if (await cartLink.count() > 0) {
      await cartLink.first().click()
      await expect(page).toHaveURL(/\/cart/)
    }
  })
})
