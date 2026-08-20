import test from "node:test";
import assert from "node:assert/strict";
import { createTelegramMessage } from "./contact.js";
import { findMockResults, normalizeStudentName } from "./mandate.js";

test("Telegram xabaridagi foydalanuvchi HTML qiymatlari tozalanadi", () => {
  const message = createTelegramMessage({ name: "<b>Ali</b>", phone: "+998901234567", course: "english", time: "morning" });
  assert.match(message, /&lt;b&gt;Ali&lt;\/b&gt;/);
  assert.doesNotMatch(message, /<b>Ali<\/b>/);
});

test("mock natijalari to‘liq ism-familiya bo‘yicha qaytariladi", () => {
  assert.equal(findMockResults("  ALI   VALIYEV ").length, 2);
  assert.equal(findMockResults("Ali Vali").length, 0);
  assert.equal(normalizeStudentName("O‘ktam  G‘aniyev"), "o'ktam g'aniyev");
});
