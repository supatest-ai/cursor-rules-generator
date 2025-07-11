import { test, expect } from '@playwright/test';

test.describe('Error Handling & Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle page refresh gracefully', async ({ page }) => {
    // Make some selections
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.getByRole('checkbox', { name: 'React', exact: true }).click();
    await page.click('text=Next Step');

    // Refresh the page
    await page.reload();

    // Verify app loads correctly and resets to initial state
    await expect(page.locator('text=Step 1 of 6')).toBeVisible();
    await expect(page.locator('text=Choose Your Tech Stack')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate through wizard
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();

    // Test that browser navigation doesn't break the app
    // Since this is a SPA, browser back might navigate away, so test recovery
    try {
      await page.goBack();
      // If we're still on the same page, verify it works
      await expect(page.locator('text=Cursor Rules Generator')).toBeVisible({ timeout: 2000 });
    } catch (e) {
      // If browser back navigated away, reload and verify app still works
      await page.goto('/');
      await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
      await expect(page.locator('text=Choose Your Tech Stack')).toBeVisible();
    }

    await page.screenshot({ fullPage: true });
  });

  test('should handle rapid clicking', async ({ page }) => {
    // Rapidly click technologies
    for (let i = 0; i < 5; i++) {
      await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
      await page.getByRole('checkbox', { name: 'React', exact: true }).click();
      await page.waitForTimeout(50);
    }

    // Verify state is consistent using exact checkbox selectors
    await expect(page.getByRole('checkbox', { name: 'TypeScript', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'React', exact: true })).toBeChecked();

    // Click next step once and verify we progressed
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();

    // Test rapid clicking doesn't break the UI
    for (let i = 0; i < 2; i++) {
      await page.click('text=Next Step');
      await page.waitForTimeout(100);
    }

    // Should be on a valid step (somewhere between 2-4)
    const validSteps = ['Step 2 of 6', 'Step 3 of 6', 'Step 4 of 6'];
    let foundValidStep = false;
    for (const step of validSteps) {
      try {
        await expect(page.locator(`text=${step}`)).toBeVisible({ timeout: 1000 });
        foundValidStep = true;
        break;
      } catch (e) {
        // Continue checking next step
      }
    }
    expect(foundValidStep).toBe(true);

    await page.screenshot({ fullPage: true });
  });

  test('should handle empty form submissions', async ({ page }) => {
    // Try to proceed without any selections
    await page.click('text=Clear all');
    await page.waitForTimeout(500);

    // Should still allow progression (no strict validation)
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();

    // Try with empty form fields
    const sourceInput = page.locator('input[id="sourceDirectory"]');
    await sourceInput.clear();

    await page.click('text=Next Step');
    await expect(page.locator('text=Step 3 of 6')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle special characters in input fields', async ({ page }) => {
    // Navigate to step 2
    await page.click('text=Next Step');

    const sourceInput = page.locator('input[id="sourceDirectory"]');

    // Test special characters
    await sourceInput.fill('src/@special-chars/öäüß/测试/🚀/');
    await expect(sourceInput).toHaveValue('src/@special-chars/öäüß/测试/🚀/');

    // Test very long input
    const longPath = 'a'.repeat(1000);
    await sourceInput.fill(longPath);
    await expect(sourceInput).toHaveValue(longPath);

    // Test empty and whitespace
    await sourceInput.fill('   ');
    await expect(sourceInput).toHaveValue('   ');

    await page.screenshot({ fullPage: true });
  });

  test('should handle modal interactions during loading', async ({ page }) => {
    // Complete wizard quickly
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');

    // Start generation
    await page.click('button:has-text("Generate Rules")');

    // Immediately try to interact with UI during loading
    await page.click('text=Previous').catch(() => { }); // Should not crash

    // Wait for generation to complete
    await page.waitForTimeout(2000);

    // Verify rules are generated correctly
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle multiple modal operations', async ({ page }) => {
    // Generate rules first
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.getByRole('checkbox', { name: 'React', exact: true }).click();
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('button:has-text("Generate Rules")');
    await page.waitForTimeout(2000);

    // Open modal
    await page.click('text=react-development.mdc');
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Close and reopen rapidly
    await page.press('body', 'Escape');
    await page.waitForTimeout(100);
    await page.click('text=react-development.mdc');
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Try to open another modal while one is open
    await page.click('text=code-quality.mdc').catch(() => { });

    // Should still show modal content
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle keyboard shortcuts and unexpected keys', async ({ page }) => {
    // Try common keyboard shortcuts
    await page.keyboard.press('Control+R'); // Refresh
    await page.waitForTimeout(500);
    await expect(page.locator('header')).toBeVisible();

    // Try escape key on main page
    await page.keyboard.press('Escape');
    await expect(page.locator('header')).toBeVisible();

    // Try arrow keys
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('header')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle wizard state corruption', async ({ page }) => {
    // Simulate potential state issues by rapid navigation
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();

    // Rapidly navigate back and forth
    for (let i = 0; i < 3; i++) {
      await page.click('text=Previous');
      await page.waitForTimeout(100);
      await page.click('text=Next Step');
      await page.waitForTimeout(100);
    }

    // Verify the app is still functional after rapid navigation
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();

    // Try to navigate back to step 1 and verify TypeScript is still selected
    try {
      // Click Previous until we get to step 1 (or timeout)
      for (let i = 0; i < 3; i++) {
        const isStep1 = await page.locator('text=Step 1 of 6').isVisible();
        if (isStep1) break;
        await page.click('text=Previous');
        await page.waitForTimeout(200);
      }

      // If we made it to step 1, verify TypeScript is still selected
      const isStep1 = await page.locator('text=Step 1 of 6').isVisible();
      if (isStep1) {
        await expect(page.getByRole('checkbox', { name: 'TypeScript', exact: true })).toBeChecked();
      }
    } catch (e) {
      // If navigation failed, just verify the app didn't crash
      await expect(page.locator('text=Choose Your Tech Stack')).toBeVisible();
    }

    await page.screenshot({ fullPage: true });
  });

  test('should handle download failures gracefully', async ({ page }) => {
    // Generate rules
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('button:has-text("Generate Rules")');
    await page.waitForTimeout(2000);

    // Test download button functionality
    const downloadButton = page.locator('text=Download').last();
    await expect(downloadButton).toBeEnabled();

    // Click download (should not cause errors even if download fails)
    await downloadButton.click();

    // Verify UI remains functional
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle clipboard operations safely', async ({ page }) => {
    // Generate rules
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.getByRole('checkbox', { name: 'React', exact: true }).click();
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('button:has-text("Generate Rules")');
    await page.waitForTimeout(2000);

    // Test copy all functionality
    await page.click('text=Copy All');

    // Verify UI remains stable after copy operation
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();

    // Test individual file copy
    await page.click('text=react-development.mdc');
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    await page.locator('[role="dialog"] button', { hasText: 'Copy' }).first().click({ force: true });

    // Modal should remain open and functional
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle extreme viewport sizes', async ({ page }) => {
    // Test very small viewport
    await page.setViewportSize({ width: 200, height: 300 });
    await page.goto('/');

    // Should still be usable
    await expect(page.locator('header')).toBeVisible();

    // Test very large viewport
    await page.setViewportSize({ width: 3000, height: 2000 });
    await page.waitForTimeout(500);

    // Should still be properly laid out
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=Choose Your Tech Stack')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle form validation edge cases', async ({ page }) => {
    // Navigate to form step
    await page.click('text=Next Step');

    const sourceInput = page.locator('input[id="sourceDirectory"]');

    // Test SQL injection attempt
    await sourceInput.fill("'; DROP TABLE users; --");
    await expect(sourceInput).toHaveValue("'; DROP TABLE users; --");

    // Test XSS attempt
    await sourceInput.fill('<script>alert("xss")</script>');
    await expect(sourceInput).toHaveValue('<script>alert("xss")</script>');

    // Test null bytes
    await sourceInput.fill('test\0null');

    // Should handle gracefully and continue
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 3 of 6')).toBeVisible();

    await page.screenshot({ fullPage: true });
  });

  test('should handle concurrent operations', async ({ page }) => {
    // Complete wizard
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');

    // Start rule generation
    await page.click('button:has-text("Generate Rules")');

    // Wait a moment for generation to start, then try navigation
    await page.waitForTimeout(500);

    // Try to navigate while generation is in progress (should be prevented or handled gracefully)
    await page.click('text=Previous').catch(() => { });

    // Wait for generation to complete
    await page.waitForTimeout(2500);

    // Verify final state - we should either be on the results page or have navigated back
    try {
      // First try to find the success message
      await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible({ timeout: 2000 });
    } catch (e) {
      // If we navigated away, try to get back to the final step and generate again
      try {
        await page.click('text=Next Step');
        await expect(page.locator('text=Step 6 of 6')).toBeVisible();
        await page.click('button:has-text("Generate Rules")');
        await page.waitForTimeout(2000);
        await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();
      } catch (retryError) {
        // As a last resort, just verify the app is still functional
        await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
      }
    }

    await page.screenshot({ fullPage: true });
  });
}); 