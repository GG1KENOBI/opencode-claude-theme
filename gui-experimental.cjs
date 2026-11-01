// Claude Code inspired appearance for OpenCode Desktop.
//
// OpenCode paints its palette from a generated theme stylesheet that is injected
// after plugin styles, and it also sets the root background inline. Both are
// outranked here with `!important` on a higher specificity selector.
const { Plugin, Style, TitlebarItem } = require("@opencode/plugin/gui")
const { createSignal } = require("solid-js")

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

[data-claude-tree] .ct-head-end {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

[data-claude-tree] .ct-head-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

[data-claude-tree] .ct-head-btn:hover {
  background: var(--v2-background-bg-base);
  color: var(--v2-text-text-base);
}

[data-claude-tree] .ct-head-btn svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.15s ease;
}

[data-claude-tree] .ct-head-btn[data-open="1"] svg {
  transform: rotate(180deg);
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
}

[data-claude-tree] .ct-proj-row:focus-visible,
[data-claude-tree] .ct-session:focus-visible {
  outline: 1px solid var(--v2-icon-icon-accent);
  outline-offset: -1px;
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
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-claude-tree] .ct-session-model {
  flex: 0 1 auto;
  min-width: 0;
  max-width: 96px;
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10px;
  color: var(--v2-text-text-faint);
}

[data-claude-tree] .ct-session-dot {
  display: none;
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  margin-left: 8px;
  border-radius: 50%;
  background: var(--v2-text-text-accent);
  animation: ct-pulse 1.2s ease-in-out infinite;
}

[data-claude-tree] .ct-session[data-running="1"] .ct-session-dot {
  display: inline-block;
}

[data-claude-tree] .ct-session[data-unread="1"] .ct-session-dot {
  display: inline-block;
  animation: none;
  background: var(--v2-text-text-base);
}

[data-claude-tree] .ct-session[data-unread="1"] .ct-session-title {
  font-weight: 600;
  color: var(--v2-text-text-base);
}

@keyframes ct-pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-claude-tree] .ct-session-dot {
    animation: none;
  }
}

[data-claude-tree] .ct-empty {
  padding: 3px 8px;
  font-size: 11.5px;
  color: var(--v2-text-text-faint);
}

/* ---------- Titlebar pills (cost, usage) sit side by side in the sidebar footer ---------- */
[data-slot="vertical-tabs-footer"] {
  flex-direction: row !important;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

/* ---------- Usage panel: a table opened from the usage pill ---------- */
[data-claude-usage-panel] {
  position: fixed;
  top: auto !important;
  height: auto !important;
  max-height: calc(100vh - 16px);
  overflow-y: auto;
  z-index: 1000;
  box-sizing: border-box;
  width: 280px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: var(--v2-background-bg-deep, #1f1e1d);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  color: var(--v2-text-text-base);
  font-size: 12px;
  line-height: 1.3;
}

[data-claude-usage-panel][hidden] {
  display: none;
}

[data-claude-usage-panel] .ct-usage-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding-bottom: 8px;
}

[data-claude-usage-panel] .ct-usage-title {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--v2-text-text-faint);
}

[data-claude-usage-panel] .ct-usage-right {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

[data-claude-usage-panel] .ct-usage-plan {
  font-size: 10px;
  color: var(--v2-text-text-faint);
}

[data-claude-usage-panel] .ct-usage-refresh {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--v2-text-text-faint);
  cursor: default;
}

[data-claude-usage-panel] .ct-usage-refresh:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--v2-text-text-base);
}

[data-claude-usage-panel] .ct-usage-refresh svg {
  width: 11px;
  height: 11px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

[data-claude-usage-panel] table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

[data-claude-usage-panel] th {
  padding: 4px 6px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-align: left;
  text-transform: uppercase;
  color: var(--v2-text-text-faint);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

[data-claude-usage-panel] th.ct-usage-num {
  text-align: right;
}

[data-claude-usage-panel] td {
  padding: 7px 6px;
  color: var(--v2-text-text-muted);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  white-space: nowrap;
}

[data-claude-usage-panel] tbody tr:last-child td {
  border-bottom: 0;
}

[data-claude-usage-panel] td.ct-usage-num {
  text-align: right;
  font-weight: 600;
  color: var(--v2-text-text-base);
}

[data-claude-usage-panel] tr[data-level="warn"] td.ct-usage-num {
  color: #d9a05b;
}

[data-claude-usage-panel] tr[data-level="high"] td.ct-usage-num {
  color: #dd6656;
}

[data-claude-usage-panel] tr[data-limited="1"] td {
  color: #dd6656;
}

[data-claude-usage-panel] .ct-usage-note {
  padding: 4px 0 2px;
  font-size: 11px;
  color: var(--v2-text-text-faint);
}

[data-claude-usage-panel] .ct-usage-retry {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--v2-text-text-accent);
  font: inherit;
  cursor: default;
}

[data-claude-usage-panel] .ct-usage-retry:hover {
  text-decoration: underline;
}

`

const COLLAPSE_KEY = "claude-tree-collapsed-v2"
const SORT_KEY = "claude-tree-sort"

function setupProjectTree(ctx) {
  if (typeof document === "undefined") return

  /* Hot reloads of the GUI bundle must not leave a second tree behind. */
  const previousTimers = window.__claudeTreeTimers
  if (Array.isArray(previousTimers)) for (const id of previousTimers) clearInterval(id)
  window.__claudeTreeTimers = []
  for (const node of document.querySelectorAll("[data-claude-tree], [data-claude-usage-panel]")) node.remove()

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
    running: new Set(),
    sort: readSort(),
  }

  const root = document.createElement("div")
  root.setAttribute("data-claude-tree", "")

  const panel = el("div", {
    "data-claude-usage-panel": "",
    hidden: "",
  })

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

  function readSort() {
    try {
      return localStorage.getItem(SORT_KEY) === "name" ? "name" : "activity"
    } catch {
      return "activity"
    }
  }

  function saveSort() {
    try {
      localStorage.setItem(SORT_KEY, store.sort)
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

  function isUnread(session, current) {
    if (!session || session.id === current || store.running.has(session.id)) return false
    const time = session.time
    if (time?.idle === undefined || time?.idle === null) return false
    return time.viewed === undefined || time.viewed === null || time.idle > time.viewed
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

  async function refreshRunning() {
    try {
      const res = await ctx.client.session.active()
      const map = res?.data ?? res ?? {}
      store.running = new Set(Object.keys(map).filter((id) => id.startsWith("ses")))
      syncActive()
    } catch {
      /* keep the last known state until the server answers again */
    }
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

    if (store.sort === "name") {
      const locale = dateLocale()
      list.sort((a, b) => a.name.localeCompare(b.name, locale, { sensitivity: "base", numeric: true }))
    } else {
      list.sort((a, b) => {
        const at = a.sessions[0]?.time?.updated || a.active
        const bt = b.sessions[0]?.time?.updated || b.active
        return bt - at
      })
    }
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

  function usageShortLabel(key) {
    return { rolling: strings.rollingShort, weekly: strings.weeklyShort, monthly: strings.monthlyShort }[key]
  }

  function usageItem() {
    if (!usage.loaded) return undefined
    const pressed = !panel.hidden
    if (!usage.meters.length) {
      if (!usage.failed) return undefined
      return {
        id: "claude-limits",
        label: strings.usageShort,
        title: strings.usageError,
        icon: "circle-exclamation",
        pressed,
        run: togglePanel,
      }
    }
    const worst = usage.meters.reduce((a, b) => (b.percent > a.percent ? b : a))
    const low = usage.meters.some((meter) => meter.percent >= 90 || meter.limited)
    return {
      id: "claude-limits",
      label: usageShortLabel(worst.key) + " " + Math.max(0, Math.round(100 - worst.percent)) + "%",
      title: strings.limits + " · " + strings.go,
      icon: low ? "circle-exclamation" : "status",
      pressed,
      run: togglePanel,
    }
  }

  function usageHead() {
    const right = el("span", { class: "ct-usage-right" })
    right.appendChild(el("span", { class: "ct-usage-plan", text: strings.go }))
    const refresh = el("button", {
      class: "ct-usage-refresh",
      type: "button",
      "data-usage-refresh": "",
      title: strings.refreshUsage,
    })
    refresh.innerHTML =
      '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 4.3A4.2 4.2 0 1 0 10.2 7"/><path d="M10 1.9v2.7H7.3"/></svg>'
    right.appendChild(refresh)
    return el("div", { class: "ct-usage-head" }, [
      el("span", { class: "ct-usage-title", text: strings.limits }),
      right,
    ])
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

  function usageTable() {
    const body = el("tbody", {})
    for (const meter of usage.meters) {
      const remaining = Math.max(0, Math.round(100 - meter.percent))
      const reset = resetText(meter.resetsAt)
      const resetCell = meter.limited ? [strings.limited, reset].filter(Boolean).join(" · ") : reset || "—"
      body.appendChild(
        el(
          "tr",
          {
            "data-level": meterLevel(meter.percent),
            "data-limited": meter.limited ? "1" : "0",
            title: resetTitle(meter.resetsAt),
          },
          [
            el("td", { text: meter.label }),
            el("td", { class: "ct-usage-num", text: remaining + "%" }),
            el("td", { text: resetCell }),
          ],
        ),
      )
    }
    return el("table", {}, [
      el("thead", {}, [
        el("tr", {}, [
          el("th", { text: strings.windowHeader }),
          el("th", { class: "ct-usage-num", text: strings.leftHeader }),
          el("th", { text: strings.resetHeader }),
        ]),
      ]),
      body,
    ])
  }

  function renderUsage() {
    if (!usage.loaded) {
      panel.replaceChildren(usageHead(), el("div", { class: "ct-usage-note", text: strings.loading }))
    } else if (!usage.meters.length) {
      if (!usage.failed) {
        closePanel()
      } else {
        const note = el("div", { class: "ct-usage-note" })
        note.appendChild(document.createTextNode(strings.usageError + " · "))
        const retry = el("button", { class: "ct-usage-retry", type: "button", "data-usage-retry": "" })
        retry.textContent = strings.retry
        note.appendChild(retry)
        panel.replaceChildren(usageHead(), note)
      }
    } else {
      panel.replaceChildren(usageHead(), usageTable())
    }
    publishPill()
  }

  function placePanel(anchor) {
    const rect = anchor ? anchor.getBoundingClientRect() : null
    const width = panel.offsetWidth || 280
    const left = rect ? Math.min(Math.max(8, rect.left), window.innerWidth - width - 8) : 12
    panel.style.left = left + "px"
    panel.style.bottom = (rect ? window.innerHeight - rect.top + 6 : 44) + "px"
  }

  function openPanel() {
    const active = document.activeElement
    panelAnchor = active instanceof HTMLButtonElement ? active : null
    panel.hidden = false
    placePanel(panelAnchor)
    publishPill()
  }

  function closePanel() {
    if (panel.hidden) return
    panel.hidden = true
    panelAnchor = null
    publishPill()
  }

  function togglePanel() {
    if (panel.hidden) openPanel()
    else closePanel()
  }

  let panelAnchor = null
  if (window.__claudeUsageDismiss) {
    document.removeEventListener("pointerdown", window.__claudeUsageDismiss, true)
    document.removeEventListener("keydown", window.__claudeUsageEscape, true)
  }
  window.__claudeUsageDismiss = (event) => {
    if (panel.hidden) return
    const target = event.target instanceof Element ? event.target : null
    if (target && (panel.contains(target) || (panelAnchor && panelAnchor.contains(target)))) return
    closePanel()
  }
  window.__claudeUsageEscape = (event) => {
    if (event.key === "Escape") closePanel()
  }
  document.addEventListener("pointerdown", window.__claudeUsageDismiss, true)
  document.addEventListener("keydown", window.__claudeUsageEscape, true)

  function retryUsage() {
    usage.attempts = 0
    refreshUsage()
  }

  function publishPill() {
    if (usage.meters.length && !usage.announced) {
      usage.announced = true
      console.info(
        "[claude-theme] usage limits mounted: " +
          usage.meters.map((meter) => meter.key + " " + Math.round(meter.percent) + "%").join(", "),
      )
    }
    setPill(usageItem())
  }

  const [pillItem, setPill] = createSignal(undefined)
  ctx.add(TitlebarItem, () => pillItem())

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

  panel.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null
    if (!target) return
    if (!target.closest("[data-usage-refresh]") && !target.closest("[data-usage-retry]")) return
    event.preventDefault()
    retryUsage()
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
      items.map((item) => [
        item.id,
        item.name,
        item.sessions.map((s) => [s.id, s.title, s.time?.updated, s.model?.id]),
      ]),
    )
    if (signature === store.sig) {
      syncActive()
      return
    }
    store.sig = signature

    const fragment = document.createDocumentFragment()
    const byName = store.sort === "name"
    const sortBtn = el("button", {
      class: "ct-head-btn",
      type: "button",
      "data-sort-toggle": "",
      title: byName ? strings.sortName : strings.sortActivity,
      "aria-label": byName ? strings.sortName : strings.sortActivity,
    })
    sortBtn.innerHTML = byName
      ? '<svg viewBox="0 0 12 12" aria-hidden="true"><text x="6" y="8.4" font-size="6" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">A-Z</text></svg>'
      : '<svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.3"/><path d="M6 3.7V6l1.6 1"/></svg>'

    const anyOpen = items.some((item) => store.collapsed[item.id] !== true)
    const toggleAll = el("button", {
      class: "ct-head-btn",
      type: "button",
      "data-toggle-all": "",
      "data-open": anyOpen ? "1" : "0",
      title: anyOpen ? strings.collapseAll : strings.expandAll,
      "aria-label": anyOpen ? strings.collapseAll : strings.expandAll,
    })
    toggleAll.innerHTML = chevron
    fragment.appendChild(
      el("div", { class: "ct-head" }, [
        el("span", { text: strings.projects }),
        el("span", { class: "ct-head-end" }, [
          sortBtn,
          el("span", { class: "ct-count", text: String(items.length) }),
          toggleAll,
        ]),
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
          "data-running": store.running.has(session.id) ? "1" : "0",
          "data-unread": isUnread(session, current) ? "1" : "0",
          title: session.title || "",
        })
        button.appendChild(
          el("span", { class: "ct-session-title", text: session.title || strings.untitled }),
        )
        button.appendChild(el("span", { class: "ct-session-dot" }))
        if (session.model?.id) {
          button.appendChild(
            el("span", {
              class: "ct-session-model",
              text: session.model.id,
              title: [session.model.providerID, session.model.id].filter(Boolean).join("/"),
            }),
          )
        }
        list.appendChild(button)
      }
      project.appendChild(list)
      fragment.appendChild(project)
    }

    root.replaceChildren(fragment)
    syncActive()
  }

  function syncActive() {
    const current = currentId()
    const byId = new Map(store.sessions.map((session) => [session.id, session]))
    for (const node of root.querySelectorAll("[data-session]")) {
      const id = node.getAttribute("data-session")
      const running = store.running.has(id)
      node.setAttribute("data-active", id === current ? "1" : "0")
      node.setAttribute("data-running", running ? "1" : "0")
      node.setAttribute("data-unread", isUnread(byId.get(id), current) ? "1" : "0")
      const dot = node.querySelector(".ct-session-dot")
      if (dot) dot.setAttribute("title", running ? strings.running : strings.unread)
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

  function toggleSort() {
    store.sort = store.sort === "name" ? "activity" : "name"
    saveSort()
    store.sig = ""
    render()
  }

  function toggleAll() {
    const nodes = root.querySelectorAll("[data-project]")
    const anyOpen = Array.from(nodes).some((node) => node.getAttribute("data-open") === "1")
    for (const node of nodes) {
      const id = node.getAttribute("data-project")
      if (anyOpen) store.collapsed[id] = true
      else delete store.collapsed[id]
      node.setAttribute("data-open", anyOpen ? "0" : "1")
    }
    saveCollapsed()
    const button = root.querySelector("[data-toggle-all]")
    if (button) {
      button.setAttribute("data-open", anyOpen ? "0" : "1")
      const label = anyOpen ? strings.expandAll : strings.collapseAll
      button.setAttribute("title", label)
      button.setAttribute("aria-label", label)
    }
  }

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null
    if (!target) return

    if (target.closest("[data-sort-toggle]")) {
      event.preventDefault()
      toggleSort()
      return
    }

    if (target.closest("[data-toggle-all]")) {
      event.preventDefault()
      toggleAll()
      return
    }

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

  function navItems() {
    return Array.from(root.querySelectorAll(".ct-proj-row, .ct-session")).filter(
      (node) => node.getClientRects().length > 0,
    )
  }

  root.addEventListener("keydown", (event) => {
    const source = event.target instanceof Element ? event.target : null
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const items = navItems()
      const index = items.indexOf(source?.closest(".ct-proj-row, .ct-session"))
      if (index === -1) return
      event.preventDefault()
      const step = event.key === "ArrowDown" ? 1 : -1
      items[Math.max(0, Math.min(items.length - 1, index + step))].focus()
      return
    }
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      const project = source?.closest("[data-project]")
      if (!project || !source.closest(".ct-proj-row")) return
      const open = project.getAttribute("data-open") === "1"
      if (open === (event.key === "ArrowRight")) return
      event.preventDefault()
      toggle(project.getAttribute("data-project"))
      return
    }
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
    document.body.appendChild(panel)
    mount()
    renderUsage()
    refresh()
    refreshUsage()
    refreshRunning()
    mountTimer = setInterval(mount, 1200)
    const runningTimer = setInterval(() => {
      if (!document.hidden) refreshRunning()
    }, 3000)
    window.__claudeTreeTimers.push(runningTimer)
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
      collapseAll: "Свернуть все проекты",
      expandAll: "Развернуть все проекты",
      running: "Агент работает",
      unread: "Новый ответ",
      sortActivity: "Сортировка: по активности",
      sortName: "Сортировка: по названию",
      rollingShort: "5ч",
      weeklyShort: "нед",
      monthlyShort: "мес",
      limits: "Лимиты",
      go: "OpenCode Go",
      rolling: "5 часов",
      weekly: "Неделя",
      monthly: "Месяц",
      left: "осталось {percent}%",
      resetShort: "сброс",
      limited: "лимит исчерпан",
      usageError: "Не удалось загрузить лимиты",
      usageShort: "лимиты: ошибка",
      refreshUsage: "Обновить лимиты",
      retry: "Повторить",
      windowHeader: "Окно",
      leftHeader: "Осталось",
      resetHeader: "Сброс",
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
    collapseAll: "Collapse all projects",
    expandAll: "Expand all projects",
    running: "Agent is running",
    unread: "New reply",
    sortActivity: "Sort: by activity",
    sortName: "Sort: by name",
    rollingShort: "5h",
    weeklyShort: "wk",
    monthlyShort: "mo",
    limits: "Limits",
    go: "OpenCode Go",
    rolling: "5 hours",
    weekly: "Week",
    monthly: "Month",
    left: "{percent}% left",
    resetShort: "resets",
    limited: "limit reached",
    usageError: "Could not load limits",
    usageShort: "limits: error",
    refreshUsage: "Refresh limits",
    retry: "Retry",
    windowHeader: "Window",
    leftHeader: "Left",
    resetHeader: "Resets",
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
