import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// All pages are static, so no incremental cache (R2) is needed.
export default defineCloudflareConfig({});
