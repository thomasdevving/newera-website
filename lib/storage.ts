/**
 * File storage adapter.
 *
 * Default: logs file metadata and discards the contents. Nothing is stored.
 *
 * TODO: connect real storage. Pick one implementation, set STORAGE_PROVIDER and
 * the matching credentials from .env.example, and return the stored location.
 *   - "s3":       AWS S3 or any S3-compatible bucket (@aws-sdk/client-s3)
 *   - "supabase": Supabase Storage (@supabase/supabase-js)
 *   - "azure":    Azure Blob Storage (@azure/storage-blob)
 * Note: Vercel functions accept request bodies up to 4.5 MB. For larger
 * uploads, switch the form to direct-to-storage uploads with presigned URLs.
 */

export type StoredFile = {
  name: string;
  size: number;
  type: string;
  /** Location in the storage provider, null when nothing was stored. */
  url: string | null;
};

export interface StorageAdapter {
  save(file: File, folder: string): Promise<StoredFile>;
}

const consoleStorage: StorageAdapter = {
  async save(file, folder) {
    console.info(`[storage] ${folder}/${file.name} (${file.size} bytes, ${file.type || "unknown"}) discarded`);
    return { name: file.name, size: file.size, type: file.type, url: null };
  },
};

export function getStorage(): StorageAdapter {
  switch (process.env.STORAGE_PROVIDER) {
    // case "s3": return s3Storage;
    // case "supabase": return supabaseStorage;
    // case "azure": return azureStorage;
    default:
      return consoleStorage;
  }
}
