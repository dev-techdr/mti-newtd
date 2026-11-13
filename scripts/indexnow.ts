/**
 * Ping IndexNow after a publish. Requires the site to be live and the key file
 * https://medicaltourism.techdr.in/techdrindexnow2026key.txt to be deployed.
 *
 * Usage: INDEXNOW_URLS="https://medicaltourism.techdr.in/treatments" npx tsx scripts/indexnow.ts
 */
export {};

const key = "techdrindexnow2026key";
const host = "medicaltourism.techdr.in";
const urls = (process.env.INDEXNOW_URLS ?? "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

if (!urls.length) {
  console.log("Set INDEXNOW_URLS to a comma-separated list of published URLs. Nothing was sent.");
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls.slice(0, 10000) }),
});

console.log(`IndexNow ${response.status}`);
if (!response.ok) process.exit(1);
