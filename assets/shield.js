/* nyxg7 Shield — human verification gate (client-side) */
(function () {
  var KEY = "nx-h", DAYS = 7, R = document.documentElement;
  // ===== Discord login settings =====
  var DISCORD_CLIENT_ID = "1575578461001482485";                       // paste your Discord app's Client ID here
  var REDIRECT = "https://vexfnofficial.github.io/coming-soon/";
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) REDIRECT = location.origin + location.pathname;
  var DKEY = "nx-d";
  var human = false, dUser = null;
  try { var v = JSON.parse(localStorage.getItem(KEY) || "null"); human = !!(v && Date.now() - v.t < DAYS * 864e5); } catch (e) {}
  try { var d = JSON.parse(localStorage.getItem(DKEY) || "null"); if (d && d.exp > Date.now()) dUser = d; } catch (e) {}
  var qs = new URLSearchParams(location.search), returning = DISCORD_CLIENT_ID && (qs.has("code") || qs.has("error")) && sessionStorage.getItem("nx-pkce");
  var needDiscord = !!DISCORD_CLIENT_ID && !dUser;
  window.nxDiscord = { user: dUser, signOut: function () { try { localStorage.removeItem(DKEY); } catch (e) {} location.reload(); } };
  if (human && !needDiscord) return;
  R.classList.add("gate");

  var css = "html.gate body{overflow:hidden}" +
    "html.gate body>*:not(#shield):not(.glow):not(#fx):not(#sfx){filter:blur(14px);pointer-events:none;user-select:none}" +
    "#shield{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:20px;background:rgba(8,9,14,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:opacity .5s}" +
    "#shield.out{opacity:0;pointer-events:none}" +
    ".sh-card{width:min(400px,100%);padding:28px 26px 20px;border:1px solid rgba(255,255,255,.1);border-radius:24px;background:#10131c;box-shadow:0 40px 100px rgba(0,0,0,.6);color:#f4f6fa;font:15px/1.55 Inter,system-ui,sans-serif;animation:shin .45s ease}" +
    "@keyframes shin{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}" +
    ".sh-top{display:flex;align-items:center;gap:12px;margin-bottom:16px}" +
    ".sh-top img{width:40px;height:40px}" +
    ".sh-top b{display:block;font:700 19px 'Space Grotesk',Inter,sans-serif;letter-spacing:-.01em}" +
    ".sh-top small{color:#98a2b3;font-size:13px}" +
    ".sh-box{display:flex;align-items:center;gap:14px;padding:16px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:rgba(255,255,255,.03)}" +
    ".sh-cb{position:relative;display:grid;place-items:center;width:30px;height:30px;flex:none;border:2px solid #667085;border-radius:9px;background:#0a0c12;cursor:pointer;transition:border-color .2s,background .2s}" +
    ".sh-cb:hover{border-color:#7c8cff}.sh-cb:focus-visible{outline:2px solid #25f4ee;outline-offset:3px}" +
    ".sh-cb[disabled]{cursor:default}" +
    ".sh-cb .sp{display:none;width:20px;height:20px;border-radius:50%;border:2.5px solid rgba(124,140,255,.25);border-top-color:#7c8cff;animation:shsp .7s linear infinite}" +
    "@keyframes shsp{to{transform:rotate(360deg)}}" +
    ".sh-cb .tk{display:none;width:12px;height:7px;margin-top:-3px;border-left:3px solid #fff;border-bottom:3px solid #fff;transform:rotate(-45deg)}" +
    ".sh-box.busy .sh-cb{border-color:transparent;background:none}.sh-box.busy .sp{display:block}" +
    ".sh-box.ok .sh-cb{border-color:#3ddc84;background:#3ddc84}.sh-box.ok .tk{display:block}" +
    ".sh-lbl{flex:1;font-weight:600}.sh-lbl small{display:block;color:#98a2b3;font-weight:500;font-size:12.5px}" +
    ".sh-brand{display:flex;flex-direction:column;align-items:flex-end;font:700 11px 'Space Grotesk',Inter,sans-serif;letter-spacing:.08em;color:#98a2b3;text-transform:uppercase}" +
    ".sh-brand svg{width:20px;height:20px;margin-bottom:2px;fill:none;stroke:url(#shg);stroke-width:2}" +
    ".sh-ch{display:none;margin-top:14px}.sh-ch.on{display:block;animation:shin .35s ease}" +
    ".sh-ch p{font-size:13.5px;color:#98a2b3;margin-bottom:10px}.sh-ch p b{color:#f4f6fa}" +
    ".sh-pz{position:relative;width:100%;aspect-ratio:2/1;border-radius:14px;overflow:hidden;background:#0a0c12;border:1px solid rgba(255,255,255,.08)}" +
    ".sh-pz canvas{position:absolute;top:0;left:0;width:100%;height:100%}" +
    
    ".sh-sl{position:relative;height:48px;margin-top:12px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);touch-action:none;user-select:none}" +
    ".sh-sl .fl{position:absolute;inset:0 auto 0 0;width:0;border-radius:14px;background:linear-gradient(90deg,rgba(124,140,255,.25),rgba(37,244,238,.2))}" +
    ".sh-sl .hint{position:absolute;inset:0;display:grid;place-items:center;font-size:13px;color:#667085;pointer-events:none}" +
    ".sh-sl .hd{position:absolute;top:3px;left:3px;display:grid;place-items:center;width:52px;height:40px;border:0;border-radius:11px;background:linear-gradient(135deg,#7c8cff,#5a67e8);color:#fff;cursor:grab;box-shadow:0 6px 16px rgba(90,103,232,.4)}" +
    ".sh-sl .hd:active{cursor:grabbing}.sh-sl .hd:focus-visible{outline:2px solid #25f4ee;outline-offset:2px}" +
    ".sh-sl .hd svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}" +
    ".sh-sl.bad{animation:shk .4s}.sh-sl.bad .hd{background:#fe2c55}" +
    "@keyframes shk{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}" +
    ".sh-row{display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:12px;color:#667085}" +
    ".sh-row button{border:0;background:none;color:#98a2b3;font:600 12px Inter,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:5px}" +
    ".sh-row button:hover{color:#f4f6fa}" +
    ".sh-msg{min-height:20px;margin-top:10px;font-size:13px;color:#98a2b3;text-align:center}" +
    ".sh-msg.err{color:#ff7a8e}.sh-msg.good{color:#3ddc84}" +
    ".sh-foot{display:flex;justify-content:space-between;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.07);font-size:11.5px;color:#667085}" +
    ".sh-note{display:flex;gap:12px;padding:14px 16px;border:1px solid rgba(255,190,80,.35);border-radius:14px;background:rgba(255,190,80,.07);font-size:13.5px;line-height:1.55;color:#f4e6c8}" +
    ".sh-note svg{width:20px;height:20px;flex:none;margin-top:1px;fill:none;stroke:#ffbe50;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}" +
    ".sh-note b{display:block;color:#ffcf7a;font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:3px}" +
    ".sh-dc{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;margin-top:16px;padding:14px 18px;border:0;border-radius:14px;background:#5865f2;color:#fff;font:600 15px Inter,sans-serif;cursor:pointer;transition:filter .2s,transform .15s}" +
    ".sh-dc:hover{filter:brightness(1.1)}.sh-dc:active{transform:scale(.98)}.sh-dc:focus-visible{outline:2px solid #25f4ee;outline-offset:3px}" +
    ".sh-dc svg{width:22px;height:22px;fill:#fff}.sh-dc[disabled]{opacity:.7;cursor:default}" +
    ".sh-skip{display:block;margin:10px auto 0;border:0;background:none;color:#667085;font:500 13px Inter,sans-serif;cursor:pointer;text-decoration:underline;text-underline-offset:3px}" +
    ".sh-skip:hover{color:#98a2b3}" +
    ".sh-perm{display:grid;gap:6px;margin-top:14px;font-size:12.5px;color:#98a2b3}" +
    ".sh-perm span{display:flex;align-items:center;gap:8px}.sh-perm i{width:6px;height:6px;border-radius:50%;background:#3ddc84}.sh-perm i.no{background:#fe2c55}" +
    ".sh-deny{text-align:center;padding:8px 0 4px}" +
    ".sh-deny .ic{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 14px;border-radius:18px;background:rgba(254,44,85,.12);color:#ff6b84}" +
    ".sh-deny .ic svg{width:28px;height:28px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}" +
    ".sh-deny h3{font:700 22px 'Space Grotesk',Inter,sans-serif}.sh-deny p{margin-top:6px;color:#98a2b3;font-size:14px}" +
    ".sh-wait{display:flex;flex-direction:column;align-items:center;gap:14px;padding:18px 0 6px;color:#98a2b3;font-size:14px}" +
    ".sh-wait .sp{width:34px;height:34px;border-radius:50%;border:3px solid rgba(88,101,242,.25);border-top-color:#5865f2;animation:shsp .7s linear infinite}" +
    ".sh-user{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid rgba(61,220,132,.3);border-radius:14px;background:rgba(61,220,132,.06)}" +
    ".sh-user img{width:40px;height:40px;border-radius:50%}.sh-user b{display:block}.sh-user small{color:#98a2b3}" +
    "@media(prefers-reduced-motion:reduce){#shield *{animation:none!important}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var t0 = performance.now(), moves = 0, touched = false, keyed = false;
  var onMove = function () { moves++; }; addEventListener("pointermove", onMove, {passive: true});
  addEventListener("touchstart", function () { touched = true; }, {passive: true, once: true});
  addEventListener("keydown", function (e) { if (e.isTrusted && e.key === "Tab") keyed = true; });

  function build() {
    var el = document.createElement("div"); el.id = "shield"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-labelledby", "sh-t");
    el.innerHTML =
      '<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="shg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c8cff"/><stop offset="1" stop-color="#25f4ee"/></linearGradient></defs></svg>' +
      '<div class="sh-card">' +
        '<div class="sh-top"><img src="favicon.svg" alt=""><div><b id="sh-t">Quick check</b><small>Confirm you\'re human to enter nyxg7.</small></div></div>' +
        '<div class="sh-box" id="sh-box">' +
          '<button class="sh-cb" id="sh-cb" type="button" role="checkbox" aria-checked="false" aria-label="I\'m human"><span class="sp"></span><span class="tk"></span></button>' +
          '<div class="sh-lbl" id="sh-lbl">I\'m human<small>Tap the box to continue</small></div>' +
          '<div class="sh-brand"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>Shield</div>' +
        '</div>' +
        '<div class="sh-ch" id="sh-ch">' +
          '<p><b>One more step.</b> Slide the piece into the gap.</p>' +
          '<div class="sh-pz" id="sh-pz"><canvas class="bg" width="600" height="300" aria-hidden="true"></canvas></div>' +
          '<div class="sh-sl" id="sh-sl"><div class="fl"></div><div class="hint">Drag to fit the piece</div>' +
            '<button class="hd" id="sh-hd" type="button" aria-label="Slider. Use arrow keys to move, Enter to check"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>' +
          '<div class="sh-row"><span id="sh-try"></span><button type="button" id="sh-new"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg>New puzzle</button></div>' +
        '</div>' +
        '<div class="sh-msg" id="sh-msg" aria-live="polite"></div>' +
        '<div class="sh-foot"><span>Protected by nyxg7 Shield</span><span>Nothing leaves your device</span></div>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  function init() {
    var el = build(), $ = function (id) { return document.getElementById(id); };
    var box = $("sh-box"), cb = $("sh-cb"), lbl = $("sh-lbl"), msg = $("sh-msg"), ch = $("sh-ch");
    var others = [].slice.call(document.body.children).filter(function (n) { return n !== el; });
    others.forEach(function (n) { n.setAttribute("inert", ""); n.setAttribute("aria-hidden", "true"); });
    setTimeout(function () { cb.focus({preventScroll: true}); }, 300);
    if (returning) { setTimeout(finish, 0); }
    else if (human && needDiscord) { setTimeout(discordStep, 0); }

    function pass() {
      box.classList.remove("busy"); box.classList.add("ok"); cb.setAttribute("aria-checked", "true"); cb.disabled = true;
      lbl.innerHTML = "Verified<small>Welcome in</small>"; ch.classList.remove("on");
      msg.className = "sh-msg good"; msg.textContent = "You're human. Nice.";
      try { localStorage.setItem(KEY, JSON.stringify({t: Date.now()})); } catch (e) {}
      human = true;
      setTimeout(function () { if (needDiscord) discordStep(); else enter(); }, 900);
    }
    function enter() {
      el.classList.add("out"); R.classList.remove("gate");
      others.forEach(function (n) { n.removeAttribute("inert"); n.removeAttribute("aria-hidden"); });
      setTimeout(function () { el.remove(); removeEventListener("pointermove", onMove); }, 550);
      try { document.dispatchEvent(new CustomEvent("nx:discord", {detail: window.nxDiscord.user})); } catch (e) {}
    }

    // ===== Step 3: Discord =====
    var DC_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.3 5.3A17 17 0 0 0 15 4l-.6 1.2a15.6 15.6 0 0 0-4.8 0L9 4a17 17 0 0 0-4.3 1.3C2 9.4 1.2 13.4 1.6 17.3A17.2 17.2 0 0 0 6.9 20l1.1-1.8c-.6-.2-1.2-.5-1.7-.8l.4-.3a12.3 12.3 0 0 0 10.6 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.8a17.1 17.1 0 0 0 5.3-2.7c.5-4.5-.8-8.5-3.1-12zM8.7 14.9c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1zm6.6 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1z"/></svg>';
    var card = el.querySelector(".sh-card"), head = '<div class="sh-top"><img src="favicon.svg" alt=""><div><b id="sh-t">TITLE</b><small>SUB</small></div></div>';
    var foot = '<div class="sh-foot"><span>Protected by nyxg7 Shield</span><span>Secure login via Discord</span></div>';
    function view(title, sub, body) { card.innerHTML = head.replace("TITLE", title).replace("SUB", sub) + body + foot; card.style.animation = "none"; void card.offsetWidth; card.style.animation = ""; }
    function discordStep() {
      view("Important notice", "One last step before you enter.",
        '<div class="sh-note"><svg viewBox="0 0 24 24"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/></svg><div><b>Important notice</b>You must connect your Discord account to use the AI messaging feature. Anyone who skips this step will be denied access to the website. Connecting Discord is required to continue. Thank you for your cooperation.</div></div>' +
        '<button class="sh-dc" type="button" id="sh-dc">' + DC_ICON + 'Connect Discord</button>' +
        '<div class="sh-perm"><span><i></i>Shares only your username and profile picture</span><span><i class="no"></i>Can\'t read your messages, servers or email</span><span><i class="no"></i>Can\'t post anything for you</span></div>' +
        '<button class="sh-skip" type="button" id="sh-skip">Skip</button>');
      $("sh-dc").addEventListener("click", connect); $("sh-skip").addEventListener("click", denied);
      setTimeout(function () { $("sh-dc").focus({preventScroll: true}); }, 200);
    }
    function denied(reason) {
      view("Access denied", "Discord connection required.",
        '<div class="sh-deny"><div class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg></div><h3>You can\'t enter yet</h3><p>' +
        (typeof reason === "string" ? reason : "Connecting Discord is required to continue. Connect your account to get access to the website.") + '</p></div>' +
        '<button class="sh-dc" type="button" id="sh-dc">' + DC_ICON + 'Connect Discord</button>');
      $("sh-dc").addEventListener("click", connect);
    }
    function b64u(buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
    function connect() {
      var b = $("sh-dc"); b.disabled = true; b.lastChild.textContent = "Opening Discord...";
      var rnd = new Uint8Array(32); crypto.getRandomValues(rnd); var verifier = b64u(rnd), st = new Uint8Array(16); crypto.getRandomValues(st); var state = b64u(st);
      crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)).then(function (h) {
        sessionStorage.setItem("nx-pkce", JSON.stringify({v: verifier, s: state}));
        location.href = "https://discord.com/oauth2/authorize?" + new URLSearchParams({response_type: "code", client_id: DISCORD_CLIENT_ID, scope: "identify", redirect_uri: REDIRECT, code_challenge: b64u(h), code_challenge_method: "S256", state: state, prompt: "none"}).toString();
      });
    }
    function finish() {
      var pk = {}; try { pk = JSON.parse(sessionStorage.getItem("nx-pkce") || "{}"); } catch (e) {}
      sessionStorage.removeItem("nx-pkce");
      var code = qs.get("code"), err = qs.get("error"), state = qs.get("state");
      history.replaceState(null, "", location.pathname + location.hash);
      if (err) return denied("You cancelled the Discord connection. Connecting Discord is required to continue.");
      if (!code || state !== pk.s) return denied("That login link didn't look right. Please connect again.");
      view("Connecting", "Talking to Discord...", '<div class="sh-wait"><div class="sp"></div>Linking your Discord account</div>');
      fetch("https://discord.com/api/oauth2/token", {method: "POST", headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({grant_type: "authorization_code", code: code, redirect_uri: REDIRECT, client_id: DISCORD_CLIENT_ID, code_verifier: pk.v}).toString()})
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (t) { return fetch("https://discord.com/api/users/@me", {headers: {Authorization: "Bearer " + t.access_token}}).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (u) { return {u: u, exp: t.expires_in}; }); })
      .then(function (o) {
        var u = o.u, av = u.avatar ? "https://cdn.discordapp.com/avatars/" + u.id + "/" + u.avatar + ".png?size=96" : "https://cdn.discordapp.com/embed/avatars/" + (Number(BigInt(u.id) >> 22n) % 6) + ".png";
        var me = {id: u.id, username: u.username, name: u.global_name || u.username, avatar: av, exp: Date.now() + Math.min(o.exp || 604800, 604800) * 1000};
        try { localStorage.setItem(DKEY, JSON.stringify(me)); } catch (e) {}
        window.nxDiscord.user = me; needDiscord = false;
        view("Connected", "You're all set.", '<div class="sh-user"><img alt="" src="' + me.avatar + '"><div><b></b><small>@' + me.username.replace(/[<>&"]/g, "") + '</small></div></div><div class="sh-msg good">Welcome in.</div>');
        card.querySelector(".sh-user b").textContent = me.name;
        setTimeout(enter, 1100);
      })
      .catch(function () { denied("Couldn't connect to Discord. Please try again."); });
    }

    // ---- Step 1: checkbox + behaviour signals ----
    cb.addEventListener("click", function (e) {
      if (cb.disabled) return;
      cb.disabled = true; box.classList.add("busy"); lbl.innerHTML = "Checking...<small>This takes a second</small>"; msg.textContent = "";
      var dt = performance.now() - t0;
      var risky = !e.isTrusted || navigator.webdriver === true || dt < 700 || (moves < 3 && !touched && !keyed && e.detail !== 0) ||
                  /HeadlessChrome|PhantomJS|bot|crawl|spider/i.test(navigator.userAgent);
      setTimeout(function () {
        if (!risky) return pass();
        box.classList.remove("busy"); lbl.innerHTML = "Almost there<small>Solve the quick puzzle below</small>";
        ch.classList.add("on"); puzzle();
      }, 900 + Math.random() * 500);
    });

    // ---- Step 2: slider puzzle ----
    var bg = $("sh-pz").querySelector(".bg"), base = document.createElement("canvas"), piece = document.createElement("canvas"), sl = $("sh-sl"), hd = $("sh-hd"), fl = sl.querySelector(".fl"), hint = sl.querySelector(".hint");
    var W = 600, H = 300, S = 84, target = 0, ty = 0, pos = 0, tries = 0, trail = [], dragging = false, sx = 0, kStart = 0, kSteps = 0;
    function shape(x, X, Y) {
      var s = S, r = 14, k = 16;
      x.beginPath(); x.moveTo(X + r, Y);
      x.lineTo(X + s / 2 - k, Y); x.arc(X + s / 2, Y, k, Math.PI, 0, false); x.lineTo(X + s - r, Y);
      x.quadraticCurveTo(X + s, Y, X + s, Y + r);
      x.lineTo(X + s, Y + s / 2 - k); x.arc(X + s, Y + s / 2, k, -Math.PI / 2, Math.PI / 2, false); x.lineTo(X + s, Y + s - r);
      x.quadraticCurveTo(X + s, Y + s, X + s - r, Y + s); x.lineTo(X + r, Y + s); x.quadraticCurveTo(X, Y + s, X, Y + s - r);
      x.lineTo(X, Y + r); x.quadraticCurveTo(X, Y, X + r, Y); x.closePath();
    }
    function scene(x) {
      var hue = Math.random() * 360, g = x.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "hsl(" + hue + ",60%,22%)"); g.addColorStop(1, "hsl(" + ((hue + 70) % 360) + ",70%,32%)");
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      for (var i = 0; i < 26; i++) {
        x.globalAlpha = .15 + Math.random() * .35; x.fillStyle = "hsl(" + ((hue + Math.random() * 140) % 360) + ",80%," + (45 + Math.random() * 25) + "%)";
        x.beginPath();
        if (Math.random() < .5) x.arc(Math.random() * W, Math.random() * H, 10 + Math.random() * 60, 0, 7);
        else { x.save(); x.translate(Math.random() * W, Math.random() * H); x.rotate(Math.random() * 3); x.rect(-30, -30, 30 + Math.random() * 60, 20 + Math.random() * 50); x.restore(); }
        x.fill();
      }
      x.globalAlpha = 1;
    }
    function puzzle() {
      base.width = piece.width = W; base.height = piece.height = H;
      var bx = base.getContext("2d"), p = piece.getContext("2d");
      var img = document.createElement("canvas"); img.width = W; img.height = H; var ix = img.getContext("2d"); scene(ix);
      target = 200 + Math.random() * (W - S - 240); ty = 40 + Math.random() * (H - S - 70);
      bx.drawImage(img, 0, 0);
      shape(bx, target, ty); bx.fillStyle = "rgba(0,0,0,.55)"; bx.fill(); bx.strokeStyle = "rgba(255,255,255,.7)"; bx.lineWidth = 2; bx.stroke();
      p.clearRect(0, 0, W, H); p.save(); shape(p, 0, ty); p.clip(); p.drawImage(img, -target, 0); p.restore();
      shape(p, 0, ty); p.strokeStyle = "rgba(255,255,255,.95)"; p.lineWidth = 2.5; p.stroke();
      set(0); trail = []; sl.classList.remove("bad"); hint.style.opacity = 1;
    }
    function draw() {
      var x = bg.getContext("2d"), px = pieceX();
      x.clearRect(0, 0, W, H); x.drawImage(base, 0, 0);
      x.save(); x.shadowColor = "rgba(0,0,0,.6)"; x.shadowBlur = 18; x.shadowOffsetY = 5; x.drawImage(piece, px, 0); x.restore();
    }
    function maxX() { return sl.clientWidth - hd.offsetWidth - 6; }
    function set(px) {
      pos = Math.max(0, Math.min(maxX(), px)); hd.style.transform = "translateX(" + pos + "px)"; fl.style.width = (pos + hd.offsetWidth / 2 + 3) + "px";
      draw();
      hint.style.opacity = pos > 8 ? 0 : 1;
    }
    function pieceX() { return 12 + pos / maxX() * (W - S - 24); }
    function humanPath(path, viaKeys) {
      if (viaKeys) return kSteps >= 4 && performance.now() - kStart > 500;
      if (path.length < 8) return false;
      var dur = path[path.length - 1].t - path[0].t; if (dur < 300 || dur > 30000) return false;
      var x0 = path[0].x, x1 = path[path.length - 1].x, span = Math.abs(x1 - x0) || 1, mid = [], ends = [], yMin = 1e9, yMax = -1e9;
      for (var i = 1; i < path.length; i++) {
        var dt = path[i].t - path[i - 1].t || 1, sp = Math.abs(path[i].x - path[i - 1].x) / dt, f = Math.abs(path[i].x - x0) / span;
        (f > .25 && f < .75 ? mid : ends).push(sp);
        yMin = Math.min(yMin, path[i].y); yMax = Math.max(yMax, path[i].y);
      }
      var avg = function (a) { return a.length ? a.reduce(function (s, c) { return s + c; }, 0) / a.length : 0; };
      var ease = avg(ends) > 0 && avg(mid) / avg(ends) > 1.3; // real hands speed up then slow down
      var drift = yMax - yMin >= 2;                          // and never move perfectly straight
      return ease && drift;
    }
    function check(viaKeys) {
      var ok = Math.abs(pieceX() - target) < 9 && humanPath(trail, viaKeys);
      tries++;
      if (ok) { msg.className = "sh-msg good"; msg.textContent = "Perfect fit."; box.classList.add("busy"); setTimeout(pass, 500); return; }
      sl.classList.add("bad"); msg.className = "sh-msg err";
      msg.textContent = Math.abs(pieceX() - target) < 9 ? "That looked a bit robotic. Try again, nice and natural." : "Not quite. Try again.";
      $("sh-try").textContent = "Attempt " + (tries + 1);
      setTimeout(function () { if (tries >= 3) { tries = 0; } puzzle(); }, 650);
    }
    hd.addEventListener("pointerdown", function (e) {
      if (!e.isTrusted) return; dragging = true; sx = e.clientX - pos; trail = [{x: e.clientX, y: e.clientY, t: performance.now()}];
      hd.setPointerCapture(e.pointerId); msg.textContent = ""; sl.classList.remove("bad");
    });
    hd.addEventListener("pointermove", function (e) { if (!dragging) return; set(e.clientX - sx); trail.push({x: e.clientX, y: e.clientY, t: performance.now()}); });
    var up = function (e) { if (!dragging) return; dragging = false; trail.push({x: e.clientX, y: e.clientY, t: performance.now()}); check(false); };
    hd.addEventListener("pointerup", up); hd.addEventListener("pointercancel", up);
    hd.addEventListener("keydown", function (e) {
      if (!e.isTrusted) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); if (!kSteps) kStart = performance.now(); kSteps++; set(pos + (e.key === "ArrowRight" ? 1 : -1) * (e.shiftKey ? 1 : 6)); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (kSteps) check(true); kSteps = 0; }
    });
    $("sh-new").addEventListener("click", function () { msg.textContent = ""; puzzle(); });
    addEventListener("resize", function () { if (ch.classList.contains("on")) set(0); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
