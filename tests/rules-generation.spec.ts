import { test, expect } from '@playwright/test';

test.describe('Rules Generation & Preview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Complete wizard flow quickly to reach generation
    await page.click('text=TypeScript');
    await page.click('text=React');
    await page.click('text=Tailwind CSS');
    await page.click('text=Next Step');
    
    await page.click('input[value="type-based"]');
    await page.fill('input[id="sourceDirectory"]', 'app/');
    await page.click('text=Next Step');
    
    await page.click('text=Require JSDoc comments');
    await page.click('text=Next Step');
    
    await page.click('text=Refactoring');
    await page.click('text=Documentation');
    await page.click('text=Next Step');
    
    await page.click('text=TODO comments for future improvements');
    await page.click('text=Next Step');
  });

  test('should generate rules successfully', async ({ page }) => {
    // Verify we're on the review step
    await expect(page.locator('text=Step 6 of 6')).toBeVisible();
    await expect(page.locator('text=Review & Generate')).toBeVisible();
    
    // Click generate rules
    await page.click('text=Generate Rules');
    
    // Wait for generation to complete
    await page.waitForTimeout(2000);
    
    // Verify rules panel is populated
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();
    
    // Verify expected rule files are generated
    await expect(page.locator('text=react-development.mdc')).toBeVisible();
    await expect(page.locator('text=typescript-quality.mdc')).toBeVisible();
    await expect(page.locator('text=project-structure.mdc')).toBeVisible();
    await expect(page.locator('text=development-workflow.mdc')).toBeVisible();
    
    await page.screenshot({ path: 'rules-generated-successfully.png', fullPage: true });
  });

  test('should open rule preview modal', async ({ page }) => {
    // Generate rules first
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    
    // Click on a rule file to open preview
    await page.click('text=react-development.mdc');
    
    // Verify modal is open
    await expect(page.locator('text=Generated Rules Preview')).toBeVisible();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    // Verify content is displayed
    await expect(page.locator('pre')).toBeVisible();
    
    await page.screenshot({ path: 'rule-preview-modal-opened.png', fullPage: true });
  });

  test('should navigate between rule files in preview', async ({ page }) => {
    // Generate rules and open preview
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    await page.click('text=react-development.mdc');
    
    // Wait for modal to be fully loaded
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await page.waitForTimeout(500);
    
    // Click on different file in the sidebar
    await page.click('.w-1\\/3 button:has-text("typescript-quality.mdc")').catch(async () => {
      // Fallback selector if CSS escape doesn't work
      await page.locator('text=typescript-quality.mdc').first().click();
    });
    
    // Verify content changed
    await expect(page.locator('h5:has-text("typescript-quality.mdc")')).toBeVisible();
    
    await page.screenshot({ path: 'rule-preview-navigation.png', fullPage: true });
  });

  test('should copy rule content', async ({ page }) => {
    // Generate rules and open preview
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    await page.click('text=react-development.mdc');
    
    // Wait for modal to load
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    // Click copy button
    await page.click('button:has-text("Copy")');
    
    // Verify copy button state (might show "Copied" temporarily)
    await page.screenshot({ path: 'rule-copy-action.png', fullPage: true });
  });

  test('should download individual rule file', async ({ page }) => {
    // Generate rules and open preview
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    await page.click('text=react-development.mdc');
    
    // Wait for modal to load
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    // Set up download listener
    const downloadPromise = page.waitForEvent('download');
    
    // Click download button
    await page.click('button:has-text("Download")');
    
    // Wait for download
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('react-development.mdc');
    
    await page.screenshot({ path: 'rule-download-action.png', fullPage: true });
  });

  test('should close modal with escape key', async ({ page }) => {
    // Generate rules and open preview
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    await page.click('text=react-development.mdc');
    
    // Verify modal is open
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    // Press escape to close
    await page.press('body', 'Escape');
    
    // Verify modal is closed
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
    
    await page.screenshot({ path: 'modal-closed-with-escape.png', fullPage: true });
  });

  test('should copy all rules', async ({ page }) => {
    // Generate rules
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    
    // Click copy all button
    await page.click('text=Copy All');
    
    // Verify action completed (button might change text temporarily)
    await page.screenshot({ path: 'copy-all-rules.png', fullPage: true });
  });

  test('should download all rules as zip', async ({ page }) => {
    // Generate rules
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    
    // Set up download listener
    const downloadPromise = page.waitForEvent('download');
    
    // Click download button
    await page.click('text=Download');
    
    // Wait for download
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.zip');
    
    await page.screenshot({ path: 'download-all-rules.png', fullPage: true });
  });

  test('should display rule files in correct categories', async ({ page }) => {
    // Generate rules
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    
    // Verify static rules section
    await expect(page.locator('text=Static Rules')).toBeVisible();
    await expect(page.locator('text=cursor-rules.mdc')).toBeVisible();
    await expect(page.locator('text=self-improve.mdc')).toBeVisible();
    
    // Verify dynamic rules section
    await expect(page.locator('text=Generated Rules')).toBeVisible();
    await expect(page.locator('text=react-development.mdc')).toBeVisible();
    await expect(page.locator('text=typescript-quality.mdc')).toBeVisible();
    
    await page.screenshot({ path: 'rule-categories-display.png', fullPage: true });
  });

  test('should show loading state during generation', async ({ page }) => {
    // Click generate and immediately take screenshot
    await page.click('text=Generate Rules');
    
    // Capture loading state
    await page.screenshot({ path: 'rules-generation-loading.png', fullPage: true });
    
    // Wait for completion
    await page.waitForTimeout(2000);
    
    // Verify completed state
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();
  });

  test('should maintain rules after wizard navigation', async ({ page }) => {
    // Generate rules
    await page.click('text=Generate Rules');
    await page.waitForTimeout(2000);
    
    // Verify rules are generated
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();
    
    // Navigate back in wizard
    await page.click('text=Previous');
    await expect(page.locator('text=Step 5 of 6')).toBeVisible();
    
    // Navigate forward again
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 6 of 6')).toBeVisible();
    
    // Verify rules are still there
    await expect(page.locator('text=Your custom cursor rules are ready')).toBeVisible();
    
    await page.screenshot({ path: 'rules-persistence-after-navigation.png', fullPage: true });
  });
}); 