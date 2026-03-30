import fs from "node:fs/promises";
import path from "node:path";

import { test } from "@playwright/test";

const variants = [
  "Version A · Editorial",
  "Version B · Studio",
  "Version C · Command",
  "Version D · Hybrid",
] as const;

test.describe("homepage variant screenshots", () => {
  test("capture all homepage variants", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Arda Edil" }).waitFor({ state: "visible" });

    await fs.mkdir(path.join(process.cwd(), "artifacts", "screenshots"), { recursive: true });

    for (const variant of variants) {
      await page.getByRole("button", { name: variant }).click();
      await page.getByRole("heading", { name: variant }).waitFor({ state: "visible" });
      await page.waitForTimeout(250);

      const suffix = variant.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const filePath = path.join(
        process.cwd(),
        "artifacts",
        "screenshots",
        `${testInfo.project.name}-${suffix}.png`
      );

      await page.screenshot({ path: filePath, fullPage: true, animations: "disabled" });
      testInfo.attachments.push({ name: filePath, path: filePath, contentType: "image/png" });
    }
  });
});
