const SUPABASE_API_URL = process.env.NEXT_PUBLIC_SUPABASE_API_URL;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

export async function rpc(fn, params = {}) {
  const hasParams = Object.keys(params).length > 0; // ← tambah ini

  const res = await fetch(`${SUPABASE_API_URL}/rpc/${fn}`, {
    method: "POST",
    headers,
    ...(hasParams && { body: JSON.stringify(params) }), // ← kirim body hanya jika ada params
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Terjadi kesalahan");
  return data;
}

export async function uploadFile(file, bucket) {
  if (!file?.size) return null;

  const ext = file.name.split(".").pop();
  const filename = `${crypto.randomUUID()}.${ext}`;

  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${bucket}/${filename}`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": file.type,
      },
      body: file,
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Upload gagal");
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filename}`;
}

export async function deleteFile(url, bucket) {
  if (!url) return;
  const path = url.split(`${bucket}/`).pop();

  await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
    method: "DELETE",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
}
