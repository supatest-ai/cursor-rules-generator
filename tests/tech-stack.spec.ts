import { test, expect } from '@playwright/test';

test.describe('Tech Stack Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Cursor Rules Generator/);
  });

  test('should display all tech stack presets', async ({ page }) => {
    // Verify all presets are visible
    await expect(page.locator('text=Modern Full-Stack')).toBeVisible();
    await expect(page.locator('text=MERN Stack')).toBeVisible();
    await expect(page.locator('text=Vue.js Ecosystem')).toBeVisible();
    await expect(page.locator('text=Enterprise Monorepo')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ fullPage: true });
  });

  test('should select Modern Full-Stack preset correctly', async ({ page }) => {
    await page.click('text=Modern Full-Stack');
    await page.waitForTimeout(500);
    
    // Verify expected technologies are selected using exact matching to avoid React/React Query conflicts
    await expect(page.getByRole('checkbox', { name: 'TypeScript', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'React', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Next.js', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Tailwind CSS', exact: true })).toBeChecked();
    
    await page.screenshot({ fullPage: true });
  });

  test('should select MERN Stack preset correctly', async ({ page }) => {
    await page.click('text=MERN Stack');
    await page.waitForTimeout(500);
    
    // Verify MERN technologies are selected
    await expect(page.getByRole('checkbox', { name: 'JavaScript', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'React', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Express.js', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'MongoDB', exact: true })).toBeChecked();
    
    await page.screenshot({ fullPage: true });
  });

  test('should select Vue.js Ecosystem preset correctly', async ({ page }) => {
    await page.click('text=Vue.js Ecosystem');
    await page.waitForTimeout(500);
    
    // Verify Vue technologies are selected - using exact match to avoid Vite/Vitest conflicts
    await expect(page.getByRole('checkbox', { name: 'TypeScript', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Vue.js', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Vite', exact: true })).toBeChecked();
    
    await page.screenshot({ fullPage: true });
  });

  test('should clear all selections when Clear all is clicked', async ({ page }) => {
    // First select a preset
    await page.click('text=Modern Full-Stack');
    await page.waitForTimeout(500);
    
    // Then clear all
    await page.click('text=Clear all');
    await page.waitForTimeout(500);
    
    // Verify specific technologies are unchecked (except default ones)
    await expect(page.getByRole('checkbox', { name: 'React', exact: true })).not.toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Next.js', exact: true })).not.toBeChecked();
    
    await page.screenshot({ fullPage: true });
  });

  test('should allow individual technology selection', async ({ page }) => {
    // Clear all first
    await page.click('text=Clear all');
    await page.waitForTimeout(500);
    
    // Select individual technologies using exact match
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.getByRole('checkbox', { name: 'React', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Jest', exact: true }).click();
    await page.getByRole('checkbox', { name: 'ESLint', exact: true }).click();
    
    // Verify selections
    await expect(page.getByRole('checkbox', { name: 'TypeScript', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'React', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Jest', exact: true })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'ESLint', exact: true })).toBeChecked();
    
    await page.screenshot({ fullPage: true });
  });

  test('should display technology categories correctly', async ({ page }) => {
    // Verify all categories are present using more specific selectors
    await expect(page.locator('text=Languages & Runtimes').first()).toBeVisible();
    await expect(page.locator('text=Package Managers').first()).toBeVisible();
    await expect(page.locator('text=Frontend Frameworks').first()).toBeVisible();
    await expect(page.locator('text=Backend Frameworks').first()).toBeVisible();
    await expect(page.locator('text=Styling & UI').first()).toBeVisible();
    await expect(page.locator('text=Database & ORM').first()).toBeVisible();
    // Use a more specific selector for Testing category to avoid conflict
    await expect(page.locator('.space-y-6').locator('text=Testing').first()).toBeVisible();
    await expect(page.locator('text=Code Quality').first()).toBeVisible();
    
    await page.screenshot({ fullPage: true });
  });

  test('should proceed to next step with selections', async ({ page }) => {
    // Select some technologies with exact matching
    await page.getByRole('checkbox', { name: 'TypeScript', exact: true }).click();
    await page.getByRole('checkbox', { name: 'React', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Tailwind CSS', exact: true }).click();
    
    // Click next step
    await page.click('text=Next Step');
    
    // Verify we're on step 2
    await expect(page.locator('text=Project Structure')).toBeVisible();
    await expect(page.locator('text=Step 2 of 6')).toBeVisible();
    
    await page.screenshot({ fullPage: true });
  });
}); 