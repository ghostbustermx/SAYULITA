const JSON_HEADERS = { "Content-Type": "application/json" };

export const dynamic = "force-dynamic";

export async function POST(request) {
  const target = process.env.API_PROXY_URL;

  if (!target) {
    return new Response(
      JSON.stringify({ error: "API_PROXY_URL no esta definida en el servidor." }),
      { status: 500, headers: JSON_HEADERS }
    );
  }

  const formData = await request.formData();

  let upstream;

  try {
    upstream = await fetch(`${target.replace(/\/$/, "")}/api/send-lead.php`, {
      method: "POST",
      body: formData,
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "No se pudo contactar al servicio de correo." }),
      { status: 502, headers: JSON_HEADERS }
    );
  }

  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
}
