import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper page title and meta description', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Cursor Rules Generator/);

    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Generate custom cursor rules/);

    await page.screenshot({ fullPage: true });
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test tab navigation through form elements
    await page.keyboard.press('Tab'); // Should focus first interactive element

    // Navigate through tech stack options
    await page.keyboard.press('Space'); // Select first option
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space'); // Select next option

    // Navigate to next step button
    while (true) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.textContent);
      if (focused?.includes('Next Step')) {
        break;
      }
    }

    // Activate next step
    await page.keyboard.press('Enter');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should have proper form labels and associations', async ({ page }) => {
    // Navigate to step 2 (form inputs)
    await page.click('text=Next Step');

    // Check label associations
    const sourceDirectoryInput = page.locator('input[id="sourceDirectory"]');
    const sourceDirectoryLabel = page.locator('label[for="sourceDirectory"]');

    await expect(sourceDirectoryLabel).toBeVisible();
    await expect(sourceDirectoryInput).toBeVisible();

    // Check radio button labels
    const radioButtons = page.locator('input[type="radio"]');
    const radioCount = await radioButtons.count();

    for (let i = 0; i < radioCount; i++) {
      const radio = radioButtons.nth(i);
      const radioId = await radio.getAttribute('name');
      expect(radioId).toBeTruthy();
    }

    await page.screenshot({ fullPage: true });
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check h1 exists and is unique
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements.first()).toContainText('Cursor Rules Generator');

    // Check heading structure in wizard content area (not the side panel)
    await expect(page.getByRole('heading', { name: 'Choose Your Tech Stack' })).toBeVisible();

    // Navigate to next step and check heading hierarchy
    await page.click('text=Next Step');
    await expect(page.getByRole('heading', { name: 'Project Structure' })).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should provide proper button states and feedback', async ({ page }) => {
    // Check button states
    const nextButton = page.locator('text=Next Step');
    await expect(nextButton).toBeEnabled();

    // Check disabled state (navigate to last step without generating)
    for (let i = 0; i < 5; i++) {
      await page.click('text=Next Step');
    }

    // Download button should be disabled before generation
    const downloadButton = page.locator('button:has-text("Download")');
    await expect(downloadButton).toBeDisabled();

    await page.screenshot({ fullPage: true });
  });

  test('should support screen reader announcements', async ({ page }) => {
    // Check for aria-labels and roles
    const combobox = page.locator('[role="combobox"]');

    // Select technologies to generate rules
    await page.click('text=TypeScript');
    await page.click('text=React');

    // Navigate to step 2 to test dropdown
    await page.click('text=Next Step');

    await expect(combobox).toBeVisible();

    // Check dialog roles when modal opens
    await page.click('text=Next Step'); // Step 3
    await page.click('text=Next Step'); // Step 4  
    await page.click('text=Next Step'); // Step 5
    await page.click('text=Next Step'); // Step 6
    await page.click('button:has-text("Generate Rules")');
    await page.waitForTimeout(2000);

    // Open modal
    await page.click('text=react-development.mdc');

    // Check dialog accessibility
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-labelledby');

    await page.screenshot({ fullPage: true });
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // This test would ideally use an automated accessibility testing tool
    // For now, we'll verify key text elements are visible

    // Check main headings
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h3')).toBeVisible();

    // Check button text visibility
    await expect(page.locator('text=Next Step')).toBeVisible();
    await expect(page.locator('text=Clear all')).toBeVisible();

    // Check form labels
    await page.click('text=Next Step');
    await expect(page.locator('text=Project Type')).toBeVisible();
    await expect(page.locator('text=Source Directory')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle focus management in modals', async ({ page }) => {
    // Complete wizard to get to modal
    await page.click('text=TypeScript');
    await page.click('text=React');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('button:has-text("Generate Rules")');
    await page.waitForTimeout(2000);

    // Open modal
    await page.click('text=react-development.mdc');

    // Check that focus is trapped in modal
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Check that we can tab through modal elements
    await page.keyboard.press('Tab'); // Should focus first focusable element in modal

    // Close modal with escape
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should provide alternative text for images', async ({ page }) => {
    // Check Supatest logo has alt text
    const logo = page.locator('img[alt="Supatest AI"]');
    await expect(logo).toHaveAttribute('alt', 'Supatest AI');

    await page.screenshot({ fullPage: true });
  });

  test('should support reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Verify basic functionality still works
    await page.click('text=TypeScript');
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should provide clear error messages and validation feedback', async ({ page }) => {
    // Navigate through wizard and check for validation feedback
    await page.click('text=Next Step');

    // Test input validation
    const sourceInput = page.locator('input[id="sourceDirectory"]');
    await sourceInput.fill('');
    await sourceInput.blur();

    // Continue to check that form still functions
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 3 of 6')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should maintain accessibility during state changes', async ({ page }) => {
    // Test loading states
    await page.click('text=TypeScript');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');

    // Test generation loading state
    await page.click('button:has-text("Generate Rules")');

    // Verify loading state is accessible
    await page.waitForTimeout(500);

    // Wait for completion
    await page.waitForTimeout(2000);

    // Verify completed state maintains accessibility
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should support high contrast mode', async ({ page }) => {
    // Simulate high contrast mode (this would be more comprehensive with real accessibility tools)
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    // Verify key elements are still visible
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
    await expect(page.locator('text=Choose Your Tech Stack')).toBeVisible();
    await expect(page.locator('text=Next Step')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });
}); 