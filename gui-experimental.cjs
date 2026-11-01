// Claude Code inspired appearance for OpenCode Desktop.
//
// OpenCode paints its palette from a generated theme stylesheet that is injected
// after plugin styles, and it also sets the root background inline. Both are
// outranked here with `!important` on a higher specificity selector.
const { Plugin, Style } = require("@opencode/plugin/gui")

const css = String.raw`
/* ---------- Claude Code palette: warm charcoal + Claude orange ---------- */
html:root[data-color-scheme="dark"],
html:root[data-theme="dark"] {
  --v2-grey-50: #faf9f5 !important;
  --v2-grey-100: #f0eee6 !important;
  --v2-grey-200: #e3e0d6 !important;
  --v2-grey-300: #cfcabc !important;
  --v2-grey-400: #b3ada0 !important;
  --v2-grey-500: #948e81 !important;
  --v2-grey-600: #78726a !important;
  --v2-grey-700: #55524c !important;
  --v2-grey-800: #403e39 !important;
  --v2-grey-900: #35332f !important;
  --v2-grey-1000: #2b2926 !important;
  --v2-grey-1100: #262624 !important;
  --v2-grey-1200: #1f1e1d !important;

  --v2-blue-300: #f0b8a0 !important;
  --v2-blue-400: #e8a087 !important;
  --v2-blue-500: #d97757 !important;
  --v2-blue-600: #c2613f !important;
  --v2-blue-700: #a5522f !important;

  --background-base: #262624 !important;
  --background-bg-base: #262624 !important;

  --v2-background-bg-accent: #d97757 !important;
  --v2-text-text-accent: #e8a087 !important;
  --v2-text-text-accent-hover: #f0b8a0 !important;
  --v2-text-text-code-accent: #e8a087 !important;
  --v2-icon-icon-accent: #e8a087 !important;
  --v2-icon-icon-accent-hover: #f0b8a0 !important;
}

/* The app sets the root background inline, which outranks a plain rule. */
html[data-color-scheme="dark"] {
  background-color: #1f1e1d !important;
}

/* ---------- Squarer, terminal-like corners ---------- */
html {
  --radius-xs: 0px !important;
  --radius-sm: 3px !important;
  --radius-md: 5px !important;
  --radius-lg: 6px !important;
  --radius-xl: 8px !important;
}

/* ---------- Warm selection highlight ---------- */
::selection {
  background: rgba(217, 119, 87, 0.3) !important;
}
`

/* ---------- Claude style project tree in the left sidebar ---------- */
const treeCss = String.raw`
[data-claude-tree-mounted] [data-titlebar-tab-list] {
  display: none !important;
}

[data-slot="vertical-tabs-scroll"][data-claude-tree-mounted] {
  overflow-x: hidden !important;
}

[data-claude-tree] {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 1px;
  padding: 2px 8px 0;
  min-height: 100%;
  font-size: 12.5px;
  color: var(--v2-text-text-muted);
  user-select: none;
}

[data-claude-tree] .ct-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 6px 5px;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--v2-text-text-faint);
}

[data-claude-tree] .ct-project {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

[data-claude-tree] .ct-proj-row {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 6px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: default;
  outline: none;
}

[data-claude-tree] .ct-proj-row:hover {
  background: rgba(255, 255, 255, 0.045);
  color: var(--v2-text-text-base);
}

[data-claude-tree] .ct-chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  flex: 0 0 12px;
  opacity: 0.65;
  transition: transform 120ms ease;
}

[data-claude-tree] .ct-chevron svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

[data-claude-tree] .ct-project[data-open="0"] .ct-chevron {
  transform: rotate(-90deg);
}

[data-claude-tree] .ct-proj-name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 530;
}

[data-claude-tree] .ct-count {
  flex: 0 0 auto;
  font-size: 10.5px;
  color: var(--v2-text-text-faint);
}

[data-claude-tree] .ct-new {
  display: none;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--v2-text-text-faint);
  cursor: default;
}

[data-claude-tree] .ct-proj-row:hover .ct-new {
  display: inline-flex;
}

[data-claude-tree] .ct-new:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--v2-text-text-base);
}

[data-claude-tree] .ct-new svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
}

[data-claude-tree] .ct-sessions {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding-left: 18px;
}

[data-claude-tree] .ct-project[data-open="0"] .ct-sessions {
  display: none;
}

[data-claude-tree] .ct-session {
  display: flex;
  align-items: center;
  height: 26px;
  padding: 0 8px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: default;
  outline: none;
}

[data-claude-tree] .ct-session:hover {
  background: rgba(255, 255, 255, 0.045);
  color: var(--v2-text-text-base);
}

[data-claude-tree] .ct-session[data-active="1"] {
  background: rgba(217, 119, 87, 0.14);
  color: var(--v2-text-text-accent);
}

[data-claude-tree] .ct-session-title {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-claude-tree] .ct-empty {
  padding: 3px 8px;
  font-size: 11.5px;
  color: var(--v2-text-text-faint);
}

/* ---------- Usage limits pinned to the bottom of the sidebar ---------- */
[data-claude-tree] .ct-usage {
  position: sticky;
  bottom: 0;
  z-index: 2;
  margin: auto -8px 0;
  padding: 9px 14px 11px;
  background: var(--v2-background-bg-deep, #1f1e1d);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.22);
  line-height: 1.3;
}

[data-claude-tree] .ct-usage-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 6px;
  padding-bottom: 5px;
}

[data-claude-tree] .ct-usage-right {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  min-width: 0;
}

[data-claude-tree] .ct-usage-title {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--v2-text-text-faint);
}

[data-claude-tree] .ct-usage-plan {
  font-size: 10px;
  color: var(--v2-text-text-faint);
  opacity: 0.8;
}

[data-claude-tree] .ct-usage-refresh {
  display: none;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  border-radius: 3px;
  background: transparent;
  color: var(--v2-text-text-faint);
  cursor: default;
}

[data-claude-tree] .ct-usage:hover .ct-usage-refresh {
  display: inline-flex;
}

[data-claude-tree] .ct-usage-refresh:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--v2-text-text-base);
}

[data-claude-tree] .ct-usage-refresh svg {
  width: 11px;
  height: 11px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

[data-claude-tree] .ct-meter {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px 0 3px;
}

[data-claude-tree] .ct-meter-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

[data-claude-tree] .ct-meter-label {
  flex: 0 0 auto;
  font-size: 11.5px;
  color: var(--v2-text-text-muted);
}

[data-claude-tree] .ct-meter-meta {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10.5px;
  color: var(--v2-text-text-faint);
  font-variant-numeric: tabular-nums;
}

[data-claude-tree] .ct-meter-left {
  color: var(--v2-text-text-base);
}

[data-claude-tree] .ct-meter-track {
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.09);
  overflow: hidden;
}

[data-claude-tree] .ct-meter-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--v2-blue-500);
  transition: width 300ms ease;
}

[data-claude-tree] .ct-meter[data-level="warn"] .ct-meter-fill {
  background: #d9a05b;
}

[data-claude-tree] .ct-meter[data-level="high"] .ct-meter-fill {
  background: #dd6656;
}

[data-claude-tree] .ct-meter[data-limited="1"] .ct-meter-label,
[data-claude-tree] .ct-meter[data-limited="1"] .ct-meter-meta {
  color: #dd6656;
}

[data-claude-tree] .ct-usage-note {
  padding: 2px 0 1px;
  font-size: 10.5px;
  color: var(--v2-text-text-faint);
}

[data-claude-tree] .ct-usage-retry {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--v2-text-text-accent);
  font: inherit;
  cursor: default;
}

[data-claude-tree] .ct-usage-retry:hover {
  text-decoration: underline;
}
`

const COLLAPSE_KEY = "claude-tree-collapsed-v2"

function setupProjectTree(ctx) {
  if (typeof document === "undefined") return

  /* Hot reloads of the GUI bundle must not leave a second tree behind. */
  const previousTimers = window.__claudeTreeTimers
  if (Array.isArray(previousTimers)) for (const id of previousTimers) clearInterval(id)
  window.__claudeTreeTimers = []
  for (const node of document.querySelectorAll("[data-claude-tree]")) node.remove()

  const strings = localeStrings(ctx)

  const store = {
    projects: [],
    sessions: [],
    collapsed: readCollapsed(),
    seeded: false,
    sig: "",
    server: "",
    busy: false,
    loaded: false,
  }

  const root = document.createElement("div")
  root.setAttribute("data-claude-tree", "")

  const usageRoot = document.createElement("div")
  usageRoot.setAttribute("data-claude-usage", "")
  usageRoot.className = "ct-usage"

  const usage = {
    busy: false,
    loaded: false,
    failed: false,
    attempts: 0,
    workspace: "",
    meters: [],
    fetchedAt: 0,
    announced: false,
  }

  let activeId = ""

  /* ---------- helpers ---------- */

  function readCollapsed() {
    try {
      const raw = localStorage.getItem(COLLAPSE_KEY)
      const parsed = raw ? JSON.parse(raw) : {}
      return parsed && typeof parsed === "object" ? parsed : {}
    } catch {
      return {}
    }
  }

  function saveCollapsed() {
    try {
      localStorage.setItem(COLLAPSE_KEY, JSON.stringify(store.collapsed))
    } catch {}
  }

  function el(tag, props, children) {
    const node = document.createElement(tag)
    for (const key in props) {
      const value = props[key]
      if (value === undefined || value === null) continue
      if (key === "class") node.className = value
      else if (key === "text") node.textContent = value
      else node.setAttribute(key, String(value))
    }
    for (const child of children || []) {
      if (child) node.appendChild(child)
    }
    return node
  }

  function serverKey() {
    if (store.server) return store.server
    try {
      const list = ctx.servers.list() || []
      const first = list[0]
      store.server = typeof first === "string" ? first : first?.id || "sidecar"
    } catch {
      store.server = "sidecar"
    }
    return store.server
  }

  function baseName(dir) {
    const parts = String(dir || "").split(/[\\/]+/).filter(Boolean)
    return parts.length ? parts[parts.length - 1] : dir || "—"
  }

  function byUpdated(a, b) {
    return (b.time?.updated || 0) - (a.time?.updated || 0)
  }

  function currentId() {
    try {
      return ctx.sessions.current()?.id || ""
    } catch {
      return ""
    }
  }

  function cssEscape(value) {
    try {
      return CSS.escape(value)
    } catch {
      return String(value).replace(/["\\]/g, "\\$&")
    }
  }

  function dateLocale() {
    try {
      const value = ctx.locale?.locale
      const tag = String((typeof value === "function" ? value() : value) || "")
      return /^ru/i.test(tag) ? "ru" : "en"
    } catch {
      return "en"
    }
  }

  /* ---------- data ---------- */

  async function allSessions() {
    const out = []
    let cursor
    for (let page = 0; page < 40; page++) {
      const args = { limit: 200 }
      if (cursor) args.cursor = cursor
      const res = await ctx.client.session.list(args)
      const data = res?.data ?? (Array.isArray(res) ? res : [])
      if (!data.length) break
      out.push(...data)
      cursor = res?.cursor?.next
      if (!cursor) break
    }
    const seen = new Set()
    return out.filter((session) => {
      if (!session || !session.id || seen.has(session.id)) return false
      seen.add(session.id)
      if (session.parentID) return false
      if (session.time && session.time.archived) return false
      return true
    })
  }

  async function refresh() {
    if (store.busy) return
    store.busy = true
    try {
      const [projectRes, sessions] = await Promise.all([
        ctx.client.project.list(),
        allSessions(),
      ])
      const projects = projectRes?.data ?? projectRes ?? []
      store.projects = Array.isArray(projects) ? projects : []
      store.sessions = sessions
      store.loaded = true
      render()
    } catch {
      /* keep the previous tree, the server may be reconnecting */
    } finally {
      store.busy = false
    }
  }

  function groups() {
    const map = new Map()
    for (const session of store.sessions) {
      const key = session.projectID || "dir:" + (session.location?.directory || "")
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(session)
    }

    const list = store.projects.map((project) => {
      const dir = project.canonical || project.worktree || ""
      return {
        id: project.id,
        dir,
        name: baseName(dir),
        active: project.time?.active || project.time?.updated || 0,
        sessions: (map.get(project.id) || []).sort(byUpdated),
      }
    })

    const known = new Set(list.map((item) => item.id))
    for (const [key, sessions] of map) {
      if (known.has(key)) continue
      const dir = sessions[0]?.location?.directory || key.replace(/^dir:/, "")
      list.push({
        id: key,
        dir,
        name: baseName(dir),
        active: sessions[0]?.time?.updated || 0,
        sessions: sessions.sort(byUpdated),
      })
    }

    list.sort((a, b) => {
      const at = a.sessions[0]?.time?.updated || a.active
      const bt = b.sessions[0]?.time?.updated || b.active
      return bt - at
    })
    return list
  }

  /* ---------- usage limits ---------- */

  function meterLevel(percent) {
    if (percent >= 90) return "high"
    if (percent >= 70) return "warn"
    return ""
  }

  function usageMeters(info) {
    const go = info?.go
    if (!go) return []
    const labels = {
      rolling: strings.rolling,
      weekly: strings.weekly,
      monthly: strings.monthly,
    }
    return ["rolling", "weekly", "monthly"].flatMap((key) => {
      const meter = go[key]
      if (!meter) return []
      const percent = Number(meter.percent)
      return [
        {
          key,
          label: labels[key],
          percent: Number.isFinite(percent) ? Math.max(0, Math.min(100, percent)) : 0,
          limited: Boolean(meter.limited),
          resetsAt: Number(meter.resetsAt) || 0,
        },
      ]
    })
  }

  function resetText(resetsAt) {
    if (!resetsAt) return ""
    const diff = resetsAt - Date.now()
    if (diff <= 0) return strings.now
    const minutes = Math.max(1, Math.round(diff / 60000))
    if (minutes < 60) return `${minutes} ${strings.minutes}`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
      const rest = minutes % 60
      return rest ? `${hours} ${strings.hours} ${rest} ${strings.minutes}` : `${hours} ${strings.hours}`
    }
    const days = Math.floor(hours / 24)
    if (days < 7) {
      const rest = hours % 24
      return rest ? `${days} ${strings.days} ${rest} ${strings.hours}` : `${days} ${strings.days}`
    }
    return new Date(resetsAt).toLocaleDateString(dateLocale(), {
      day: "numeric",
      month: "short",
    })
  }

  function resetTitle(resetsAt) {
    if (!resetsAt) return ""
    return new Date(resetsAt).toLocaleString(dateLocale(), {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  function usageHead(withRefresh) {
    const right = el("span", { class: "ct-usage-right" })
    right.appendChild(el("span", { class: "ct-usage-plan", text: strings.go }))
    if (withRefresh) {
      const refresh = el("button", {
        class: "ct-usage-refresh",
        type: "button",
        "data-usage-refresh": "",
        title: strings.refreshUsage,
      })
      refresh.innerHTML =
        '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 4.3A4.2 4.2 0 1 0 10.2 7"/><path d="M10 1.9v2.7H7.3"/></svg>'
      right.appendChild(refresh)
    }
    return el("div", { class: "ct-usage-head" }, [
      el("span", { class: "ct-usage-title", text: strings.limits }),
      right,
    ])
  }

  function renderUsage() {
    usageRoot.replaceChildren()
    usageRoot.style.display = ""

    if (!usage.loaded) {
      usageRoot.appendChild(usageHead(false))
      usageRoot.appendChild(el("div", { class: "ct-usage-note", text: strings.loading }))
      return
    }

    if (!usage.meters.length) {
      if (usage.failed) {
        usageRoot.appendChild(usageHead(true))
        const note = el("div", { class: "ct-usage-note" })
        note.appendChild(document.createTextNode(strings.usageError + " · "))
        const retry = el("button", {
          class: "ct-usage-retry",
          type: "button",
          "data-usage-retry": "",
        })
        retry.textContent = strings.retry
        note.appendChild(retry)
        usageRoot.appendChild(note)
        return
      }
      usageRoot.style.display = "none"
      return
    }

    usageRoot.appendChild(usageHead(true))

    if (!usage.announced) {
      usage.announced = true
      console.info(
        "[claude-theme] usage limits mounted: " +
          usage.meters.map((meter) => meter.key + " " + Math.round(meter.percent) + "%").join(", "),
      )
    }

    for (const meter of usage.meters) {
      const remaining = Math.max(0, Math.round(100 - meter.percent))
      const row = el("div", {
        class: "ct-meter",
        "data-level": meterLevel(meter.percent),
        "data-limited": meter.limited ? "1" : "0",
      })
      row.title = [
        strings.used.replace("{percent}", String(Math.round(meter.percent))),
        resetTitle(meter.resetsAt) ? strings.resetLong.replace("{time}", resetTitle(meter.resetsAt)) : "",
      ]
        .filter(Boolean)
        .join(" · ")

      const top = el("div", { class: "ct-meter-top" })
      top.appendChild(el("span", { class: "ct-meter-label", text: meter.label }))
      const meta = el("span", { class: "ct-meter-meta" })
      if (meter.limited) {
        meta.appendChild(el("span", { class: "ct-meter-left", text: strings.limited }))
        const reset = resetText(meter.resetsAt)
        if (reset) meta.appendChild(document.createTextNode(" · " + reset))
      } else {
        meta.appendChild(
          el("span", { class: "ct-meter-left", text: strings.left.replace("{percent}", String(remaining)) }),
        )
        const reset = resetText(meter.resetsAt)
        if (reset) {
          meta.appendChild(
            document.createTextNode(" · " + strings.resetShort + " " + reset),
          )
        }
      }
      top.appendChild(meta)
      row.appendChild(top)

      const track = el("div", { class: "ct-meter-track" })
      const fill = el("div", { class: "ct-meter-fill" })
      fill.style.width = Math.max(0, Math.min(100, meter.percent)) + "%"
      track.appendChild(fill)
      row.appendChild(track)
      usageRoot.appendChild(row)
    }
  }

  async function refreshUsage() {
    if (usage.busy) return
    usage.busy = true
    usage.attempts++
    try {
      const res = await ctx.client.experimental.usage.limits({})
      const info = res?.data ?? null
      usage.failed = false
      usage.loaded = true
      usage.workspace = info?.workspace?.name || ""
      usage.meters = usageMeters(info)
      usage.fetchedAt = Date.now()
    } catch {
      usage.failed = true
      usage.loaded = true
    } finally {
      usage.busy = false
      renderUsage()
      if (usage.failed && !usage.meters.length && usage.attempts < 4) {
        setTimeout(() => {
          if (!usage.busy && !usage.meters.length) refreshUsage()
        }, 5000)
      }
    }
  }

  usageRoot.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null
    if (!target) return
    if (!target.closest("[data-usage-refresh]") && !target.closest("[data-usage-retry]")) return
    event.preventDefault()
    usage.attempts = 0
    refreshUsage()
  })

  /* ---------- rendering ---------- */

  const chevron =
    '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.3 2.4 7.9 6l-3.6 3.6"/></svg>'
  const plus =
    '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2.2v7.6M2.2 6h7.6"/></svg>'

  function seedCollapse(items) {
    if (store.seeded) return
    store.seeded = true
    let stored = null
    try {
      stored = localStorage.getItem(COLLAPSE_KEY)
    } catch {}
    if (stored !== null) return
    const current = currentId()
    const active =
      items.find((item) => item.sessions.some((session) => session.id === current)) || items[0]
    for (const item of items) store.collapsed[item.id] = item.id !== active?.id
    saveCollapsed()
  }

  function render() {
    const items = groups()
    seedCollapse(items)

    const signature = JSON.stringify(
      items.map((item) => [item.id, item.name, item.sessions.map((s) => [s.id, s.title, s.time?.updated])]),
    )
    if (signature === store.sig) {
      syncActive()
      return
    }
    store.sig = signature

    const fragment = document.createDocumentFragment()
    fragment.appendChild(
      el("div", { class: "ct-head" }, [
        el("span", { text: strings.projects }),
        el("span", { class: "ct-count", text: String(items.length) }),
      ]),
    )

    if (!items.length) {
      fragment.appendChild(
        el("div", {
          class: "ct-empty",
          text: store.loaded ? strings.noProjects : strings.loading,
        }),
      )
    }

    const current = currentId()
    for (const item of items) {
      const open = store.collapsed[item.id] !== true
      const project = el("div", {
        class: "ct-project",
        "data-project": item.id,
        "data-open": open ? "1" : "0",
      })

      const row = el("div", { class: "ct-proj-row", title: item.dir, role: "button", tabindex: "0" })
      row.innerHTML = '<span class="ct-chevron">' + chevron + "</span>"
      row.appendChild(el("span", { class: "ct-proj-name", text: item.name }))
      row.appendChild(el("span", { class: "ct-count", text: String(item.sessions.length) }))

      const add = el("button", {
        class: "ct-new",
        type: "button",
        "data-new": item.id,
        title: strings.newSession,
      })
      add.innerHTML = plus
      row.appendChild(add)
      project.appendChild(row)

      const list = el("div", { class: "ct-sessions" })
      if (!item.sessions.length) {
        list.appendChild(el("div", { class: "ct-empty", text: strings.noSessions }))
      }
      for (const session of item.sessions) {
        const button = el("button", {
          class: "ct-session",
          type: "button",
          "data-session": session.id,
          "data-active": session.id === current ? "1" : "0",
          title: session.title || "",
        })
        button.appendChild(
          el("span", { class: "ct-session-title", text: session.title || strings.untitled }),
        )
        list.appendChild(button)
      }
      project.appendChild(list)
      fragment.appendChild(project)
    }

    root.replaceChildren(fragment)
    root.appendChild(usageRoot)
    syncActive()
  }

  function syncActive() {
    const current = currentId()
    for (const node of root.querySelectorAll("[data-session]")) {
      node.setAttribute("data-active", node.getAttribute("data-session") === current ? "1" : "0")
    }
    if (!current || current === activeId) return
    activeId = current
    const node = root.querySelector('[data-session="' + cssEscape(current) + '"]')
    if (node && node.getBoundingClientRect().height > 0) {
      node.scrollIntoView({ block: "nearest" })
    }
  }

  /* ---------- actions ---------- */

  function openSession(id) {
    if (!id) return
    try {
      ctx.tabs.open({ server: serverKey(), id }, { focus: true })
    } catch {
      try {
        ctx.tabs.open({ server: serverKey(), id })
      } catch {}
    }
  }

  function newSession(projectId) {
    const item = groups().find((entry) => entry.id === projectId)
    if (!item || !item.dir) return
    try {
      ctx.layout.draft({ server: serverKey(), directory: item.dir })
    } catch {}
  }

  function toggle(projectId) {
    const collapsed = store.collapsed[projectId] !== true
    if (collapsed) store.collapsed[projectId] = true
    else delete store.collapsed[projectId]
    saveCollapsed()
    const node = root.querySelector('[data-project="' + cssEscape(projectId) + '"]')
    if (node) node.setAttribute("data-open", collapsed ? "0" : "1")
  }

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null
    if (!target) return

    const add = target.closest("[data-new]")
    if (add) {
      event.preventDefault()
      event.stopPropagation()
      newSession(add.getAttribute("data-new"))
      return
    }

    const session = target.closest("[data-session]")
    if (session) {
      event.preventDefault()
      openSession(session.getAttribute("data-session"))
      return
    }

    const project = target.closest("[data-project]")
    if (project) {
      event.preventDefault()
      toggle(project.getAttribute("data-project"))
    }
  })

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return
    const target = event.target instanceof Element ? event.target : null
    if (!target || target.closest(".ct-new")) return
    const row = target.closest(".ct-proj-row")
    if (!row) return
    event.preventDefault()
    const project = row.closest("[data-project]")
    if (project) toggle(project.getAttribute("data-project"))
  })

  /* ---------- mounting ---------- */

  let announced = false

  function mount() {
    const scroll = document.querySelector('[data-slot="vertical-tabs-scroll"]')
    if (!scroll) return
    if (!root.isConnected || root.parentElement !== scroll) {
      const old = scroll.querySelector(":scope > [data-claude-tree]")
      if (old && old !== root) old.remove()
      const list = scroll.querySelector(":scope > [data-titlebar-tab-list]")
      scroll.insertBefore(root, list || scroll.firstChild)
    }
    if (usageRoot.parentElement !== root) root.appendChild(usageRoot)
    if (!scroll.hasAttribute("data-claude-tree-mounted")) {
      scroll.setAttribute("data-claude-tree-mounted", "")
    }
    const style = getComputedStyle(scroll)
    const vertical =
      (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0)
    const height = Math.max(0, scroll.clientHeight - vertical)
    if (height > 0 && root.style.minHeight !== height + "px") {
      root.style.minHeight = height + "px"
    }
    if (!announced && store.loaded) {
      announced = true
      console.info("[claude-theme] project tree mounted")
    }
  }

  let refreshTimer
  let mountTimer
  let usageTimer

  const start = () => {
    mount()
    renderUsage()
    refresh()
    refreshUsage()
    mountTimer = setInterval(mount, 1200)
    refreshTimer = setInterval(() => {
      if (!document.hidden) refresh()
    }, 8000)
    usageTimer = setInterval(() => {
      if (!document.hidden) refreshUsage()
    }, 60000)
    window.__claudeTreeTimers.push(mountTimer, refreshTimer, usageTimer, setInterval(syncActive, 700))

    if (window.__claudeUsageVisibility) {
      document.removeEventListener("visibilitychange", window.__claudeUsageVisibility)
    }
    window.__claudeUsageVisibility = () => {
      if (!root.isConnected || document.hidden) return
      if (Date.now() - usage.fetchedAt > 15000) refreshUsage()
    }
    document.addEventListener("visibilitychange", window.__claudeUsageVisibility)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true })
  } else {
    start()
  }
}

function localeStrings(ctx) {
  let tag = ""
  try {
    const value = ctx.locale?.locale
    tag = String((typeof value === "function" ? value() : value) || "")
  } catch {}
  if (/^ru/i.test(tag)) {
    return {
      projects: "Проекты",
      noProjects: "Проекты не найдены",
      noSessions: "Нет сессий",
      untitled: "Без названия",
      loading: "Загрузка…",
      newSession: "Новая сессия в этом проекте",
      limits: "Лимиты",
      go: "OpenCode Go",
      rolling: "5 часов",
      weekly: "Неделя",
      monthly: "Месяц",
      left: "осталось {percent}%",
      used: "Использовано {percent}%",
      resetShort: "сброс",
      resetLong: "Сброс {time}",
      limited: "лимит исчерпан",
      refreshUsage: "Обновить лимиты",
      usageError: "Не удалось загрузить лимиты",
      retry: "Повторить",
      minutes: "мин",
      hours: "ч",
      days: "дн",
      now: "сейчас",
    }
  }
  return {
    projects: "Projects",
    noProjects: "No projects",
    noSessions: "No sessions",
    untitled: "Untitled",
    loading: "Loading…",
    newSession: "New session in this project",
    limits: "Limits",
    go: "OpenCode Go",
    rolling: "5 hours",
    weekly: "Week",
    monthly: "Month",
    left: "{percent}% left",
    used: "{percent}% used",
    resetShort: "resets",
    resetLong: "Resets {time}",
    limited: "limit reached",
    refreshUsage: "Refresh limits",
    usageError: "Could not load limits",
    retry: "Retry",
    minutes: "min",
    hours: "h",
    days: "d",
    now: "now",
  }
}

module.exports = Plugin.define({
  setup(ctx) {
    ctx.add(Style, css + treeCss)
    setupProjectTree(ctx)
  },
})

// rev 1793536595
