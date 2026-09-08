(async function(){
  const base = document.currentScript.src.replace(/[^/]+$/, "");
  const n = 5;
  const texts = [];
  for (let i = 0; i < n; i++) {
    const r = await fetch(base + "part" + i + ".js");
    if (!r.ok) throw new Error("Failed to load part" + i);
    texts.push(await r.text());
  }
  const blob = new Blob([texts.join("")], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  await import(url);
})().catch(function(e){ console.error(e); document.body.innerHTML = "<p style=\"padding:1rem;font-family:sans-serif\">Latausvirhe: " + e.message + "</p>"; });
