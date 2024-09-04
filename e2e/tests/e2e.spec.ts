import { test, expect } from '@playwright/test';

test('フロントエンドとバックエンドのE2Eテスト', async ({ page, request }) => {
  // フロントエンドのテスト
  await page.goto('http://localhost:3000'); // フロントエンドのURL

  await expect(page).toHaveTitle(/家計簿アプリ/);

  const locator = page.locator('text=家計の登録フォーム');
  await expect(locator).toBeVisible();

  // フォームの入力と送信をシミュレート
  await page.fill('label:has-text("日付:")', '2024-08-11');
  await page.fill('label:has-text("金額:")', '1000');
  await page.fill('label:has-text("種類:")', 'income');
  await page.fill('label:has-text("詳細:")', 'Test Income');
  await page.fill('label:has-text("ユーザID:")', '-1');
  await page.click('text=登録');

  // ダイアログのチェック
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('無効なユーザーIDです');
    await dialog.dismiss();
  });

  await page.click('text=登録');

  // バックエンドのテスト
  const response = await request.get(
    'http://localhost:4000/users/user-exists/-1',
  );
  const responseBody = await response.text(); // レスポンスの内容をログに出力
  console.log('Response status:', response.status());
  console.log('Response body:', responseBody);

  expect(response.status()).toBe(200); // 200ステータスコードを期待
  const data = await response.json();
  expect(data.exists).toBe(false); // `exists: false`を期待
});

//正常

test('フロントエンドとバックエンドの正常系E2Eテスト', async ({
  page,
  request,
}) => {
  // フロントエンドのテスト
  await page.goto('http://localhost:3000'); // フロントエンドのURL

  await expect(page).toHaveTitle(/家計簿アプリ/);

  const locator = page.locator('text=家計の登録フォーム');
  await expect(locator).toBeVisible();

  // フォームの入力と送信をシミュレート
  await page.fill('label:has-text("日付")', '2024-08-11');
  await page.fill('label:has-text("金額")', '1000');
  await page.fill('label:has-text("種類")', 'income');
  await page.fill('label:has-text("詳細")', 'Test Income');
  await page.fill('label:has-text("ユーザID")', '1'); // 存在するユーザーIDを使用
  await page.click('text=登録');

  // ダイアログのチェック
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('登録が成功しました');
    await dialog.dismiss();
  });

  await page.click('text=登録');

  // バックエンドのテスト
  const response = await request.get(
    'http://localhost:4000/users/user-exists/1', // 存在するユーザーIDを使用
  );
  const responseBody = await response.text(); // レスポンスの内容をログに出力
  console.log('Response status:', response.status());
  console.log('Response body:', responseBody);

  expect(response.status()).toBe(200); // 200ステータスコードを期待
  const data = await response.json();
  expect(data.exists).toBe(true); // `exists: true`を期待
});
