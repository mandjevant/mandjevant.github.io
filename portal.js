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
    hash: "8bbc48b34f3da64cb2add18204246315dea639a36375ec2f38d01e930951e6e8",
    clue: "Vmlja3kgaXMgcGFydG5lciBlbiBrYW4gc3ByZWtlbiBpbiBwaXZvdCB0YWJsZSBtZXRhZm9yZW4uIFplIHdvcmR0IHZlcmRhY2h0IHZhbndlZ2UgaGVienVjaHQ6IHplIHdlcmt0IHBhcyBuZXQgYmlqIEJETyBtYWFyIHdpbHQgZ3JhYWcgQ0VPIHdvcmRlbi4=",
  },
  {
    hash: "842c325b856ef9587a836d3785c86f2cac47839a9e5b72453c100b7ec6060300",
    clue: "RGUgcGVyc29vbiBkaWUgd3JhYWsgd2lsdCBuZW1lbiBnZXppZW4gZGllZ2VuZSBnZXBha3QgaXMgdm9vciBleGFtZW5mcmF1ZGUsIGlzIHN1cGVyIGdlZGV0YWlsbGVlcmQsIGVuIGRyYWFndCBhbHRpamQgZWVuIGdpZ2FudGlzY2ggY2xpcGJvYXJkIGVuIGdla2xldXJkZSBwZW5uZW4gYmlqIHppY2gu",
  },
  {
    hash: "f897867445b39cc43050c7e6d47ee04853c5b08129153c215d05b16a327de5eb",
    clue: "RGUgSnIuIE1hbmFnZXIgSVQgYXVkaXQgaXMgamFsb2VycywgaWVtYW5kIGFuZGVycyBrcmVlZyBlcmtlbm5pbmcgdm9vciB6aWpuL2hhYXIgd2Vyay4=",
  },

  {
    hash: "494e205ed3db8421c865ad6222ad2d33c08ad882dbda8e0f7d34d4b21b6fd080",
    clue: "Vm9vciBGZWxpY2l0eSBlbiBWaWNreSBnZWxkdCBkYXQgZGUgZWVuIFNlbmlvciBNYW5hZ2VyIElUIGF1ZGl0IGlzIGVuIGRlIGFuZGVyIGhlYnp1Y2h0IGhlZWZ0IG9tIENFTyB0ZSB3b3JkZW4u",
  },
  {
    hash: "0a1e8706de4f2f3d2a488b8c8b96aa8956b47d7bdf911299fee9abb513c02f1b",
    clue: "RGVnZW5lIGRpZSB2YWFrIHplZ3QgIkhhdmUgeW91IHRyaWVkIHR1cm5pbmcgaXQgb2ZmIGFuZCBvbiBhZ2Fpbj8iLCBpcyBuaWV0IGVlbiBKdW5pb3IgSVQgYXVkaXRvci4=",
  },
  {
    hash: "8946085efee34d2908e89136546252a43d72f30baaceab9e33a800ce189323ce",
    clue: "Q2FybGEgZGUgSVQgYXVkaXRvciwgaG91ZHQgaWVkZXJlZW4gYWx0aWpkIHZhbiBoZXQgd2VyayBtZXQgZ2lmcyBlbiBtZW1lcy4=",
  },
  {
    hash: "c1217cec656a97e0d1bfd8d6d5c7970ced7185b2e45f02f55461ea36330736dd",
    clue: "RGUgU2VuaW9yIE1hbmFnZXIgSVQgYXVkaXQsIEpyLiBNYW5hZ2VyIElUIEF1ZGl0IGVuIElUIGF1ZGl0b3IgemlqbiBHaW5hLCBkZWdlbmUgZGllIGFsdGlqZCBnZWtsZXVyZGUgcGVubmVuIGJpaiB6aWNoIGhlZWZ0IGVuIGRlZ2VuZSBkaWUgYWxzIG1vdGllZiBsdWloZWlkIGhlZWZ0IGFhbmdlemllbiBoaWovemlqIGRhY2h0IGRhdCBBSSBhbGxlcyB6b3Ugb3Bsb3NzZW4gZW4gTmV0c2tvcGUgbmlldCBhYW4gaGVlZnQgc3RhYW4u",
  },
  {
    hash: "ed8a7d43527f13b44c0796cf98a9df0974df258e1f82a82e28f2e3c0a2f5a526",
    clue: "RmVsaWNpdHkgaXMgZ2VwYWt0IG9wIGV4YW1lbmZyYXVkZSBlbiB3aWx0IHdyYWFrIG5lbWVuLg==",
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
