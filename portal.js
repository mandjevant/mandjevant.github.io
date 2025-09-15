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
    hash: "0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c",
    clue: "Q2x1ZSAxOiBUaGlzIGlzIHRoZSBmaXJzdCBjbHVlIQ==",
  },
  {
    hash: "edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9",
    clue: "Q2x1ZSAyOiBZb3UgZm91bmQgdGhlIHNlY29uZCBjbHVlIQ==",
  },
  {
    hash: "318aee3fed8c9d040d35a7fc1fa776fb31303833aa2de885354ddf3d44d8fb69",
    clue: "Q2x1ZSAzOiBUaGlzIGlzIHRoZSBmaW5hbCBjbHVlIQ==",
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
    clueDiv.textContent = decodeBase64(codeData[idx - 1].clue);
    clueDiv.style.display = "block";
  } else {
    errorDiv.textContent = "Incorrect code. Try again!";
  }
}
