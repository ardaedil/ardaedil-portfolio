import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

test.describe('portfolio screenshots', () => {
  test('homepage', async ({ page }, testInfo) => {
    const outDir = path.join(process.cwd(), 'artifacts', 'screenshots');
    await ensureDir(outDir);

    await page.goto('/', { waitUntil: 'networkidle' });

    // Optional: wait for hero content to be visible if your page animates in
    // await page.getByRole('heading', { name: /arda|portfolio/i }).waitFor();

    const deviceSafeName = testInfo.project.name.replace(/[^a-z0-9-_]/gi, '_');

    await page.screenshot({
      path: path.join(outDir, `homepage-${deviceSafeName}.png`),
      fullPage: true,
    });
  });
});