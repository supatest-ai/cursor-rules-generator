import { test, expect } from '@playwright/test';

test.describe('Error Handling & Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle page refresh gracefully', async ({ page }) => {
    // Make some selections
    await page.click('text=TypeScript');
    await page.click('text=React');
    await page.click('text=Next Step');
    
    // Refresh the page
    await page.reload();
    
    // Verify app loads correctly and resets to initial state
    await expect(page.locator('text=Step 1 of 6')).toBeVisible();
    await expect(page.locator('text=Choose Your Tech Stack')).toBeVisible();
    
    await page.screenshot({ path: 'page-refresh-handling.png', fullPage: true });
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate through wizard
    await page.click('text=TypeScript');
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();
    
    // Use browser back button
    await page.goBack();
    
    // Should still be on the same page (single page app)
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
    
    // Try forward
    await page.goForward();
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
    
    await page.screenshot({ path: 'browser-navigation-handling.png', fullPage: true });
  });

  test('should handle rapid clicking', async ({ page }) => {
    // Rapidly click technologies
    for (let i = 0; i < 5; i++) {
      await page.click('text=TypeScript');
      await page.click('text=React');
      await page.waitForTimeout(50);
    }
    
    // Verify state is consistent
    await expect(page.locator('text=TypeScript').locator('..').locator('[data-state="checked"]')).toBeVisible();
    await expect(page.locator('text=React').locator('..').locator('[data-state="checked"]')).toBeVisible();
    
    // Rapidly click next step
    for (let i = 0; i < 3; i++) {
      await page.click('text=Next Step');
      await page.waitForTimeout(50);
    }
    
    // Should be on step 2 (not advanced multiple times)
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();
    
    await page.screenshot({ path: 'rapid-clicking-handling.png', fullPage: true });
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
    
    await page.screenshot({ path: 'empty-form-handling.png', fullPage: true });
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
    
    await page.screenshot({ path: 'special-characters-handling.png', fullPage: true });
  });

  test('should handle modal interactions during loading', async ({ page }) => {
    // Complete wizard quickly
    await page.click('text=TypeScript');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    
    // Start generation
    await page.click('text=Generate Rules');
    
    // Immediately try to interact with UI during loading
    await page.click('text=Previous').catch(() => {}); // Should not crash
    
    // Wait for generation to complete
    await page.waitForTimeout(2000);
    
    // Verify rules are generated correctly
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();
    
    await page.screenshot({ path: 'loading-state-interactions.png', fullPage: true });
  });

  test('should handle multiple modal operations', async ({ page }) => {
    // Generate rules first
    await page.click('text=TypeScript');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Generate Rules');
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
    await page.click('text=typescript-quality.mdc').catch(() => {});
    
    // Should still show modal content
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    await page.screenshot({ path: 'multiple-modal-operations.png', fullPage: true });
  });

  test('should handle keyboard shortcuts and unexpected keys', async ({ page }) => {
    // Try common keyboard shortcuts
    await page.keyboard.press('Control+R'); // Refresh
    await page.waitForTimeout(500);
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
    
    // Try escape key on main page
    await page.keyboard.press('Escape');
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
    
    // Try arrow keys
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
    
    await page.screenshot({ path: 'keyboard-shortcuts-handling.png', fullPage: true });
  });

  test('should handle wizard state corruption', async ({ page }) => {
    // Simulate potential state issues by rapid navigation
    await page.click('text=TypeScript');
    await page.click('text=Next Step');
    
    // Rapidly navigate back and forth
    for (let i = 0; i < 5; i++) {
      await page.click('text=Previous');
      await page.waitForTimeout(50);
      await page.click('text=Next Step');
      await page.waitForTimeout(50);
    }
    
    // Verify state is consistent
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();
    await expect(page.locator('text=TypeScript').locator('..').locator('[data-state="checked"]')).toBeVisible();
    
    await page.screenshot({ path: 'wizard-state-consistency.png', fullPage: true });
  });

  test('should handle download failures gracefully', async ({ page }) => {
    // Generate rules
    await page.click('text=TypeScript');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    
    // Test download button functionality
    const downloadButton = page.locator('text=Download').last();
    await expect(downloadButton).toBeEnabled();
    
    // Click download (should not cause errors even if download fails)
    await downloadButton.click();
    
    // Verify UI remains functional
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();
    
    await page.screenshot({ path: 'download-error-handling.png', fullPage: true });
  });

  test('should handle clipboard operations safely', async ({ page }) => {
    // Generate rules
    await page.click('text=TypeScript');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    
    // Test copy all functionality
    await page.click('text=Copy All');
    
    // Verify UI remains stable after copy operation
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();
    
    // Test individual file copy
    await page.click('text=react-development.mdc');
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    await page.click('button:has-text("Copy")');
    
    // Modal should remain open and functional
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    await page.screenshot({ path: 'clipboard-operations-handling.png', fullPage: true });
  });

  test('should handle extreme viewport sizes', async ({ page }) => {
    // Test very small viewport
    await page.setViewportSize({ width: 200, height: 300 });
    await page.goto('/');
    
    // Should still be usable
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
    
    // Test very large viewport
    await page.setViewportSize({ width: 3000, height: 2000 });
    await page.waitForTimeout(500);
    
    // Should still be properly laid out
    await expect(page.locator('text=Cursor Rules Generator')).toBeVisible();
    await expect(page.locator('text=Choose Your Tech Stack')).toBeVisible();
    
    await page.screenshot({ path: 'extreme-viewport-handling.png', fullPage: true });
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
    
    await page.screenshot({ path: 'form-validation-edge-cases.png', fullPage: true });
  });

  test('should handle concurrent operations', async ({ page }) => {
    // Complete wizard
    await page.click('text=TypeScript');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    await page.click('text=Next Step');
    
    // Start multiple operations simultaneously
    const generatePromise = page.click('text=Generate Rules');
    const navigationPromise = page.click('text=Previous').catch(() => {});
    
    // Wait for operations to complete
    await generatePromise;
    await navigationPromise;
    await page.waitForTimeout(2000);
    
    // Verify final state is correct
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();
    
    await page.screenshot({ path: 'concurrent-operations-handling.png', fullPage: true });
  });
}); 