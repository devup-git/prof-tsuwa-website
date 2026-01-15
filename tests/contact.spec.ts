
import { test, expect } from '@playwright/test';

test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright.');

    await page.click('button[type="submit"]');

    // Expect a success toast or message. Adjust selector based on actual UI.
    // Assuming 'sonner' toast or similar is used.
    await expect(page.getByText(/Message sent successfully/i)).toBeVisible({ timeout: 10000 });
});
