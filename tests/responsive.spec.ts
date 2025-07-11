import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'mobile-large', width: 414, height: 896 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'tablet-landscape', width: 1024, height: 768 },
    { name: 'desktop', width: 1280, height: 720 },
    { name: 'desktop-large', width: 1920, height: 1080 }
  ];

  for (const viewport of viewports) {
    test(`should display correctly on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      // Verify header is visible and properly laid out
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Supatest AI', exact: true })).toBeVisible();

      // Verify main content is visible
      await expect(page.locator('text=Project Setup')).toBeVisible();
      await expect(page.locator('text=Step 1 of 6')).toBeVisible();

      // Verify tech stack selection is properly laid out
      await expect(page.locator('text=Choose Your Tech Stack')).toBeVisible();
      await expect(page.locator('text=Modern Full-Stack')).toBeVisible();

      // Verify generated rules panel is visible
      await expect(page.locator('text=Generated Rules')).toBeVisible();

      // Take screenshot
      await page.screenshot({ fullPage: true });
    });
  }

  test('should handle mobile navigation correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Test tech stack selection on mobile
    await page.click('text=TypeScript');
    await page.click('text=React');

    // Verify selections work
    await expect(page.getByRole('checkbox', { name: 'TypeScript', exact: true })).toBeChecked();

    // Navigate to next step
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle tablet layout correctly', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Verify layout elements are properly arranged
    await expect(page.locator('header')).toBeVisible();

    // Test preset selection
    await page.click('text=Modern Full-Stack');

    // Verify multi-column layout if applicable
    await expect(page.locator('text=Languages & Runtimes')).toBeVisible();
    await expect(page.locator('text=Frontend Frameworks')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should maintain functionality across viewport changes', async ({ page }) => {
    // Start with desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Select some technologies
    await page.click('text=TypeScript');
    await page.click('text=React');

    // Change to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Verify selections are maintained
    await expect(page.getByRole('checkbox', { name: 'TypeScript', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'React', exact: true })).toBeChecked();

    // Change to tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    // Verify functionality still works
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle modal display on different screen sizes', async ({ page }) => {
    // Complete wizard flow to reach rules generation
    await page.goto('/');
    await page.click('text=TypeScript');
    await page.click('text=React');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('button:has-text("Generate Rules")');
    await page.waitForTimeout(2000);

    // Test modal on different screen sizes
    for (const viewport of viewports.slice(0, 4)) { // Test first 4 viewports
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      // Open modal
      await page.click('text=react-development.mdc');

      // Verify modal is properly displayed
      await expect(page.locator('[role="dialog"]')).toBeVisible();
      await expect(page.locator('text=Generated Rules Preview')).toBeVisible();

      // Take screenshot
      await page.screenshot({ fullPage: true });

      // Close modal
      await page.press('body', 'Escape');
      await page.waitForTimeout(500);
    }
  });

  test('should handle text readability across screen sizes', async ({ page }) => {
    for (const viewport of [viewports[0], viewports[2], viewports[4]]) { // Mobile, tablet, desktop
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      // Check that important text is visible and readable
      await expect(page.locator('h1')).toBeVisible(); // Main heading
      await expect(page.locator('text=Choose Your Tech Stack')).toBeVisible();
      await expect(page.locator('text=Select technologies to generate optimized cursor rules')).toBeVisible();

      // Check button text is readable
      await expect(page.locator('text=Next Step')).toBeVisible();
      await expect(page.locator('text=Clear all')).toBeVisible();

      await page.screenshot({ fullPage: true });
    }
  });

  test('should handle form elements on touch devices', async ({ page }) => {
    // Simulate mobile touch device
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Test touch interactions
    await page.click('text=TypeScript');
    await page.click('text=React');
    await page.click('text=Next Step');

    // Test form elements on step 2
    await page.click('input[value="type-based"]');
    await expect(page.locator('input[value="type-based"]')).toBeChecked();

    // Test input field
    await page.fill('input[id="sourceDirectory"]', 'mobile-app/');
    await expect(page.locator('input[id="sourceDirectory"]')).toHaveValue('mobile-app/');

    await page.screenshot({ fullPage: true });
  });

  test('should maintain layout integrity during orientation changes', async ({ page }) => {
    // Start in portrait tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Select technologies
    await page.click('text=TypeScript');
    await page.click('text=React');

    // Take portrait screenshot
    await page.screenshot({ fullPage: true });

    // Switch to landscape
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(500);

    // Verify layout adapted
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'TypeScript', exact: true })).toBeChecked();

    // Take landscape screenshot
    await page.screenshot({ fullPage: true });
  });

  test('should handle long content lists on small screens', async ({ page }) => {
    // Set small mobile viewport
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');

    // Verify all technology categories are accessible
    await expect(page.locator('text=Languages & Runtimes')).toBeVisible();

    // Scroll to see more content
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(page.locator('text=Database & ORM')).toBeVisible();

    // Scroll more
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(page.locator('label', { hasText: 'Testing' })).toBeVisible();

    await page.screenshot({ fullPage: true });
  });
}); 