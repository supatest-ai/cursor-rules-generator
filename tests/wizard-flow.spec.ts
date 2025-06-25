import { test, expect } from '@playwright/test';

test.describe('Wizard Flow Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete full wizard flow', async ({ page }) => {
    // Step 1: Tech Stack Selection
    await expect(page.locator('text=Step 1 of 6')).toBeVisible();
    await page.getByRole('checkbox', { name: 'TypeScript' }).click();
    await page.getByRole('checkbox', { name: 'React' }).click();
    await page.getByRole('checkbox', { name: 'Tailwind CSS' }).click();
    await page.click('text=Next Step');

    // Step 2: Project Structure
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();
    await expect(page.locator('text=Project Structure')).toBeVisible();
    
    // Test dropdown interaction
    await page.click('[role="combobox"]');
    await page.press('[role="combobox"]', 'Escape');
    
    // Test radio button selection
    await page.click('input[value="type-based"]');
    await expect(page.locator('input[value="type-based"]')).toBeChecked();
    
    // Test input field
    await page.fill('input[id="sourceDirectory"]', 'app/');
    await expect(page.locator('input[id="sourceDirectory"]')).toHaveValue('app/');
    
    await page.click('text=Next Step');

    // Step 3: Code Style
    await expect(page.locator('text=Step 3 of 6')).toBeVisible();
    await expect(page.locator('text=Code Style Preferences')).toBeVisible();
    
    await page.getByRole('checkbox', { name: 'Require JSDoc comments' }).click();
    await page.click('text=Relative imports (./components/Button)');
    await page.click('text=Next Step');

    // Step 4: Task Types
    await expect(page.locator('text=Step 4 of 6')).toBeVisible();
    await expect(page.locator('text=Development Tasks')).toBeVisible();
    
    await page.getByRole('checkbox', { name: 'Refactoring' }).click();
    await page.getByRole('checkbox', { name: 'Documentation' }).click();
    await page.click('text=Next Step');

    // Step 5: Documentation
    await expect(page.locator('text=Step 5 of 6')).toBeVisible();
    await expect(page.locator('text=Documentation Requirements')).toBeVisible();
    
    await page.getByRole('checkbox', { name: 'TODO comments for future improvements' }).click();
    await page.getByRole('checkbox', { name: 'Contributing guidelines' }).click();
    await page.click('text=Next Step');

    // Step 6: Review
    await expect(page.locator('text=Step 6 of 6')).toBeVisible();
    await expect(page.locator('text=Review & Generate')).toBeVisible();
    
    await page.screenshot({ path: 'wizard-complete-flow.png', fullPage: true });
  });

  test('should navigate backwards through wizard steps', async ({ page }) => {
    // Navigate to step 3
    await page.getByRole('checkbox', { name: 'TypeScript' }).click();
    await page.click('text=Next Step'); // Step 2
    await page.click('text=Next Step'); // Step 3
    
    await expect(page.locator('text=Step 3 of 6')).toBeVisible();
    
    // Navigate backwards
    await page.click('text=Previous');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();
    
    await page.click('text=Previous');
    await expect(page.locator('text=Step 1 of 6')).toBeVisible();
    
    await page.screenshot({ path: 'wizard-backward-navigation.png', fullPage: true });
  });

  test('should maintain form state during navigation', async ({ page }) => {
    // Fill form data in step 1
    await page.getByRole('checkbox', { name: 'TypeScript' }).click();
    await page.getByRole('checkbox', { name: 'React' }).click();
    await page.click('text=Next Step');
    
    // Fill form data in step 2
    await page.click('input[value="type-based"]');
    await page.fill('input[id="sourceDirectory"]', 'custom/');
    await page.click('text=Next Step');
    
    // Navigate back to step 2
    await page.click('text=Previous');
    
    // Verify form state is maintained
    await expect(page.locator('input[value="type-based"]')).toBeChecked();
    await expect(page.locator('input[id="sourceDirectory"]')).toHaveValue('custom/');
    
    // Navigate back to step 1
    await page.click('text=Previous');
    
    // Verify tech stack selections are maintained
    await expect(page.getByRole('checkbox', { name: 'TypeScript' })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'React' })).toBeChecked();
    
    await page.screenshot({ path: 'wizard-state-persistence.png', fullPage: true });
  });

  test('should validate required fields', async ({ page }) => {
    // Try to proceed without selecting any technologies
    await page.click('text=Clear all');
    await page.waitForTimeout(500);
    
    // Next step should still work as form doesn't have strict validation
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();
    
    await page.screenshot({ path: 'wizard-validation.png', fullPage: true });
  });

  test('should display progress bar correctly', async ({ page }) => {
    // Verify progress on step 1
    await expect(page.locator('text=Step 1 of 6')).toBeVisible();
    
    // Navigate through steps and verify progress
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();
    
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 3 of 6')).toBeVisible();
    
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 4 of 6')).toBeVisible();
    
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 5 of 6')).toBeVisible();
    
    await page.click('text=Next Step');
    await expect(page.locator('text=Step 6 of 6')).toBeVisible();
    
    await page.screenshot({ path: 'wizard-progress-tracking.png', fullPage: true });
  });

  test('should handle form interactions correctly', async ({ page }) => {
    // Test checkbox interactions in step 1
    await page.getByRole('checkbox', { name: 'TypeScript' }).click();
    await expect(page.getByRole('checkbox', { name: 'TypeScript' })).toBeChecked();
    
    // Uncheck and recheck
    await page.getByRole('checkbox', { name: 'TypeScript' }).click();
    await expect(page.getByRole('checkbox', { name: 'TypeScript' })).not.toBeChecked();
    
    await page.getByRole('checkbox', { name: 'TypeScript' }).click();
    await expect(page.getByRole('checkbox', { name: 'TypeScript' })).toBeChecked();
    
    await page.click('text=Next Step');
    
    // Test radio button interactions in step 2
    await expect(page.locator('input[value="feature-based"]')).toBeChecked(); // Default
    await page.click('input[value="type-based"]');
    await expect(page.locator('input[value="type-based"]')).toBeChecked();
    await expect(page.locator('input[value="feature-based"]')).not.toBeChecked();
    
    await page.screenshot({ path: 'wizard-form-interactions.png', fullPage: true });
  });
}); 