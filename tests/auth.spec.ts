import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText(/Yoga/)
    await expect(page).toHaveTitle(/Srinatha/)
  })

  test('login page loads', async ({ page }) => {
    await page.goto('/dashboard/login')
    await expect(page.locator('h1')).toContainText('Welcome Back')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('login page has magic link option', async ({ page }) => {
    await page.goto('/dashboard/login')
    await expect(page.getByText('Send Magic Link')).toBeVisible()
  })

  test('login page links to signup', async ({ page }) => {
    await page.goto('/dashboard/login')
    await expect(page.getByText('Sign up')).toBeVisible()
  })

  test('signup page loads', async ({ page }) => {
    await page.goto('/dashboard/signup')
    await expect(page.getByText('Create Your Account')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('forgot password page loads', async ({ page }) => {
    await page.goto('/dashboard/forgot-password')
    await expect(page.getByText('Reset Password')).toBeVisible()
  })

  test('protected dashboard redirects to login', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForURL(/\/dashboard\/login/)
    await expect(page.locator('h1')).toContainText('Welcome Back')
  })

  test('protected orders redirects to login', async ({ page }) => {
    await page.goto('/dashboard/orders')
    await page.waitForURL(/\/dashboard\/login/)
    await expect(page.locator('h1')).toContainText('Welcome Back')
  })

  test('invalid email shows error', async ({ page }) => {
    await page.goto('/dashboard/login')
    await page.fill('input[type="email"]', 'nonexistent@test.com')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    await expect(page.getByText(/invalid|error|failed/i)).toBeVisible()
  })
})
