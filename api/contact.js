// Vercel serverless function — emails private-event inquiries via Resend.
// Set in Vercel → Project → Settings → Environment Variables:
//   RESEND_API_KEY  (from resend.com)
//   CONTACT_TO      (inbox that receives inquiries)
//   CONTACT_FROM    (optional; defaults to Resend's onboarding sender)

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO) return res.status(503).json({ error: "Email not configured" });

  let d = req.body || {};
  if (typeof d === "string") { try { d = JSON.parse(d); } catch { d = {}; } }
  if (d.company) return res.status(200).json({ ok: true }); // honeypot

  const required = ["name", "phone", "email", "message"];
  if (required.some((k) => !String(d[k] || "").trim()) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const rows = [
    ["Event type", d.type], ["Name", d.name], ["Phone", d.phone], ["Email", d.email],
    ["Preferred date", d.date], ["Guests", d.guests], ["Instagram", d.instagram]
  ].map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#666">${k}</td><td style="padding:6px 0"><b>${esc(v || "—")}</b></td></tr>`).join("");

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px">
    <h2 style="margin:0 0 12px">New event inquiry — The Social Club</h2>
    <table>${rows}</table>
    <p style="white-space:pre-wrap;border-top:1px solid #eee;padding-top:12px">${esc(d.message)}</p></div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM || "The Social Club Website <onboarding@resend.dev>",
        to: CONTACT_TO.split(",").map((s) => s.trim()),
        reply_to: d.email,
        subject: `Event inquiry: ${d.type || "General"} — ${d.name}`,
        html
      })
    });
    if (!r.ok) return res.status(502).json({ error: "Send failed" });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
};
