async function sha256(str) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

const codeData = [
  {
    hash: "5d87b102fd51b231749c3ec94304f3f640d1bf03394aff8f4fecfc20630e8c5f",
    clue: "Vmlja3kgaXMgcGFydG5lciBlbiBrYW4gc3ByZWtlbiBpbiBwaXZvdCB0YWJsZSBtZXRhZm9yZW4uIFplIHdvcmR0IHZlcmRhY2h0IHZhbndlZ2UgaGVienVjaHQ6IHplIHdlcmt0IHBhcyBuZXQgYmlqIEJETyBtYWFyIHdpbHQgZ3JhYWcgQ0VPIHdvcmRlbi4=",
  },
  {
    hash: "4c665037d2861ea4d0b37bb1c4a926c602881a805999f48eac9204a1a7ffea6f",
    clue: "RGUgcGVyc29vbiBkaWUgd3JhYWsgd2lsdCBuZW1lbiBnZXppZW4gZGllZ2VuZSBnZXBha3QgaXMgdm9vciBleGFtZW5mcmF1ZGUsIGlzIHN1cGVyIGdlZGV0YWlsbGVlcmQsIGVuIGRyYWFndCBhbHRpamQgZWVuIGdpZ2FudGlzY2ggY2xpcGJvYXJkIGVuIGdla2xldXJkZSBwZW5uZW4gYmlqIHppY2gu",
  },
  {
    hash: "885505f43a7dec03072e10f38ce04ab30effb2f6f108b9b4a50914fa1c541a9c",
    clue: "RGUgSnIuIE1hbmFnZXIgSVQgYXVkaXQgaXMgamFsb2VycywgaWVtYW5kIGFuZGVycyBrcmVlZyBlcmtlbm5pbmcgdm9vciB6aWpuL2hhYXIgd2Vyay4=",
  },
  {
    hash: "6e3795d10034cf477297258179e5d2181911f90617ab6235b2fb1288c4f99fe7",
    clue: "Vm9vciBGZWxpY2l0eSBlbiBWaWNreSBnZWxkdCBkYXQgZGUgZWVuIFNlbmlvciBNYW5hZ2VyIElUIGF1ZGl0IGlzIGVuIGRlIGFuZGVyIGhlYnp1Y2h0IGhlZWZ0IG9tIENFTyB0ZSB3b3JkZW4u",
  },
  {
    hash: "aa5ab35a9174c2062b7f7697b33fafe5ce404cf5fecf6bfbbf0dc96ba0d90046",
    clue: "RGVnZW5lIGRpZSB2YWFrIHplZ3QgIkhhdmUgeW91IHRyaWVkIHR1cm5pbmcgaXQgb2ZmIGFuZCBvbiBhZ2Fpbj8iLCBpcyBuaWV0IGVlbiBKdW5pb3IgSVQgYXVkaXRvci4=",
  },
  {
    hash: "8946085efee34d2908e89136546252a43d72f30baaceab9e33a800ce189323ce",
    clue: "Q2FybGEgZGUgSVQgYXVkaXRvciwgaG91ZHQgaWVkZXJlZW4gYWx0aWpkIHZhbiBoZXQgd2VyayBtZXQgZ2lmcyBlbiBtZW1lcy4=",
  },
  {
    hash: "6adcafe68072f41637ec472cf33c98679bac39d81a3fbe71cef8864a4cf7378d",
    clue: "RGUgU2VuaW9yIE1hbmFnZXIgSVQgYXVkaXQsIEpyLiBNYW5hZ2VyIElUIEF1ZGl0IGVuIElUIGF1ZGl0b3IgemlqbiBHaW5hLCBkZWdlbmUgZGllIGFsdGlqZCBnZWtsZXVyZGUgcGVubmVuIGJpaiB6aWNoIGhlZWZ0IGVuIGRlZ2VuZSBkaWUgYWxzIG1vdGllZiBsdWloZWlkIGhlZWZ0IGFhbmdlemllbiBoaWovemlqIGRhY2h0IGRhdCBBSSBhbGxlcyB6b3Ugb3Bsb3NzZW4gZW4gTmV0c2tvcGUgbmlldCBhYW4gaGVlZnQgc3RhYW4u",
  },
  {
    hash: "ed8a7d43527f13b44c0796cf98a9df0974df258e1f82a82e28f2e3c0a2f5a526",
    clue: "RmVsaWNpdHkgaXMgZ2VwYWt0IG9wIGV4YW1lbmZyYXVkZSBlbiB3aWx0IHdyYWFrIG5lbWVuLg==",
  },
  {
    hash: "faadb00a0b7903793599ada710253e8b63115eb5a6d25fd2971e2837acd3cc06",
    clue: "IkZvciBHb2Qgc28gbG92ZWQgdGhlIHdvcmxkIHRoYXQgaGUgZ2F2ZSBoaXMgb25lIGFuZCBvbmx5IFNvbiwgdGhhdCB3aG9ldmVyIGJlbGlldmVzIGluIGhpbSBzaGFsbCBub3QgcGVyaXNoIGJ1dCBoYXZlIGV0ZXJuYWwgbGlmZS4iIChGZWVsIGZyZWUgdG8gR29vZ2xlKQ==",
  },
];

function decodeBase64(str) {
  try {
    return atob(str);
  } catch {
    return "[Error decoding clue]";
  }
}

async function checkCode(idx) {
  const input = document.getElementById("code" + idx).value.trim();
  const errorDiv = document.getElementById("error" + idx);
  const clueDiv = document.getElementById("clue" + idx);
  errorDiv.textContent = "";
  clueDiv.style.display = "none";
  clueDiv.textContent = "";
  if (!codeData[idx - 1]) {
    errorDiv.style.display = "block";
    errorDiv.textContent =
      "No code configured for this clue (no data available).";
    return;
  }
  if (!input) {
    errorDiv.textContent = "Please enter a code.";
    return;
  }
  const hash = await sha256(input);
  if (hash === codeData[idx - 1].hash) {
    let clueHtml = "";
    if (codeData[idx - 1].clue) {
      clueHtml += `<div>${decodeBase64(codeData[idx - 1].clue)}</div>`;
    }
    if (codeData[idx - 1].filename) {
      try {
        const response = await fetch(codeData[idx - 1].filename);
        if (!response.ok) throw new Error("Failed to load clue file.");
        const imgBase64 = await response.text();
        clueHtml += `<img src="data:image/png;base64,${imgBase64.trim()}" style="max-width:100%; margin-top:1em;">`;
      } catch (e) {
        errorDiv.textContent = "Error loading clue image.";
      }
    }
    if (clueHtml) {
      clueDiv.innerHTML = clueHtml;
      clueDiv.style.display = "block";
      errorDiv.style.display = "none";
    }
  } else {
    errorDiv.style.display = "block";
    errorDiv.textContent = "Incorrect code. Try again!";
    clueDiv.style.display = "none";
  }
}
