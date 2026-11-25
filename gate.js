/* gate.js — tela de senha antes de abrir o playbook.
   A senha não fica escrita no código: só o hash SHA-256 dela (window.USP_HASH, definido no index.html).
   Importante: é uma barreira simples no navegador, boa para evitar acesso casual; não substitui uma proteção
   no servidor (ex.: "Password Protection" da Vercel). */
(function () {
  "use strict";
  var root = document.documentElement, form = document.getElementById("gate-form"), pw = document.getElementById("gate-pw"), err = document.getElementById("gate-err");
  if (!form) return;

  /* SHA-256 em JS puro (funciona também fora de HTTPS) */
  function sha256(str) {
    var bytes = unescape(encodeURIComponent(str)), l = bytes.length, i, j;
    var K = [], H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    (function () { var p = 2, n = 0; while (n < 64) { var ok = true; for (var d = 2; d * d <= p; d++) if (p % d === 0) { ok = false; break; } if (ok) { K[n++] = (Math.pow(p, 1 / 3) * 4294967296) | 0; } p++; } })();
    var w = [];
    for (i = 0; i < l; i++) w[i >> 2] |= bytes.charCodeAt(i) << (24 - (i % 4) * 8);
    w[l >> 2] |= 0x80 << (24 - (l % 4) * 8);
    var nw = (((l + 8) >> 6) + 1) * 16; w[nw - 1] = l * 8;
    for (i = 0; i < nw; i++) w[i] = w[i] | 0;
    function rr(x, n) { return (x >>> n) | (x << (32 - n)); }
    for (var b = 0; b < nw; b += 16) {
      var W = w.slice(b, b + 16), a = H.slice();
      for (j = 16; j < 64; j++) {
        var s0 = rr(W[j - 15], 7) ^ rr(W[j - 15], 18) ^ (W[j - 15] >>> 3), s1 = rr(W[j - 2], 17) ^ rr(W[j - 2], 19) ^ (W[j - 2] >>> 10);
        W[j] = (W[j - 16] + s0 + W[j - 7] + s1) | 0;
      }
      for (j = 0; j < 64; j++) {
        var S1 = rr(a[4], 6) ^ rr(a[4], 11) ^ rr(a[4], 25), ch = (a[4] & a[5]) ^ (~a[4] & a[6]);
        var t1 = (a[7] + S1 + ch + K[j] + W[j]) | 0;
        var S0 = rr(a[0], 2) ^ rr(a[0], 13) ^ rr(a[0], 22), mj = (a[0] & a[1]) ^ (a[0] & a[2]) ^ (a[1] & a[2]);
        var t2 = (S0 + mj) | 0;
        a = [(t1 + t2) | 0, a[0], a[1], a[2], (a[3] + t1) | 0, a[4], a[5], a[6]];
      }
      for (j = 0; j < 8; j++) H[j] = (H[j] + a[j]) | 0;
    }
    return H.map(function (x) { return ("00000000" + (x >>> 0).toString(16)).slice(-8); }).join("");
  }

  function unlock() {
    try { sessionStorage.setItem("usp_ok", "1"); } catch (e) {}
    root.classList.remove("locked");
    window.dispatchEvent(new Event("usp-unlocked"));
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sha256(pw.value.trim()) === window.USP_HASH) { err.hidden = true; unlock(); }
    else { err.hidden = false; pw.value = ""; pw.focus(); form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake"); }
  });
  if (root.classList.contains("locked")) setTimeout(function () { pw.focus(); }, 60);
})();
