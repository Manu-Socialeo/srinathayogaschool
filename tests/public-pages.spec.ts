import { test, expect } from '@playwright/test'

test.describe('Public Pages', () => {
  const pages = [
    { path: '/', title: /Srinatha/ },
    { path: '/about', title: /About/ },
    { path: '/courses', title: /Courses/ },
    { path: '/teachers', title: /Teachers/ },
    { path: '/shop', title: /Shop/ },
    { path: '/contact', title: /Contact/ },
    { path: '/cart', title: /Cart/ },
    { path: '/search', title: /Search/ },
    { path: '/privacy', title: /Privacy/ },
    { path: '/terms', title: /Terms/ },
    { path: '/refund', title: /Refund/ },
  ]

  for (const { path, title } of pages) {
    test(`${path} loads successfully`, async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveTitle(title)
      await expect(page.locator('body')).toBeVisible()
    })
  }
})
