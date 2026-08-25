import { expect, test } from "@playwright/test";

test.describe("redesigned portfolio opening", () => {
  test("shows the founder story and preserved portfolio sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "I build software that makes AI systems more useful in the real world." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AgentSEO", exact: true }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "What I'm doing right now" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ask my portfolio anything." })).toBeVisible();
    await expect(page.locator("#experience")).toBeAttached();
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#skills")).toBeAttached();
    await expect(page.getByText("GLOBAL EXPERIENCE CONTROLLER")).toHaveCount(0);
  });

  test("opens and operates the command palette", async ({ page }, testInfo) => {
    await page.goto("/");
    if (testInfo.project.name.includes("mobile")) {
      await page.getByRole("button", { name: "Open search and navigation" }).click();
    } else {
      await page.keyboard.press(process.platform === "darwin" ? "Meta+K" : "Control+K");
    }

    const dialog = page.getByRole("dialog", { name: "Search and navigate" });
    await expect(dialog).toBeVisible();
    const search = page.getByPlaceholder("Search projects, skills, or navigate…");
    await expect(search).toBeFocused();
    await search.fill("machine learning");
    await expect(dialog.getByText("MarioMind", { exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("hero AI action scrolls to and focuses the prompt", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Ask my AI" }).click();
    await expect(page.locator("#portfolio-ai-input")).toBeFocused({ timeout: 2_000 });
  });
});
