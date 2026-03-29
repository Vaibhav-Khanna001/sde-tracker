import { useState, useEffect } from "react";

const TOPICS = {
  JavaScript: {
    color: "#F7DF1E",
    textColor: "#000",
    icon: "JS",
    sections: {
      "Execution & Runtime": [
        "Event loop — call stack, Web APIs, callback queue, microtask queue",
        "V8 JIT compilation, hidden classes, inline caching",
        "setTimeout(fn,0) vs Promise.resolve() execution order",
      ],
      "Scope & Closures": [
        "Lexical scope, scope chain, closure traps in loops",
        "Closure interview patterns — counter factories, memoization",
        "Memory implications of closures & leak scenarios",
      ],
      "this Keyword": [
        "Implicit, explicit (call/apply/bind), new binding",
        "Arrow functions and why they don't have own this",
        "Common this traps in real code",
      ],
      "Prototypes & Inheritance": [
        "[[Prototype]] chain, Object.create(), __proto__ vs prototype",
        "class as syntactic sugar — what it compiles to",
        "instanceof internals",
      ],
      "Async Patterns": [
        "Promises from scratch — states, chaining, .then/.catch/.finally",
        "Promise.all vs allSettled vs race vs any",
        "async/await error handling patterns",
        "await inside forEach bug — know why and the fix",
      ],
      "Functional Patterns": [
        "Pure functions, immutability, side effects",
        "Implement map, filter, reduce from scratch",
        "Currying, partial application, function composition",
        "Implement debounce & throttle from scratch",
      ],
      "ES6+ Must-Knows": [
        "Destructuring, spread/rest, optional chaining, nullish coalescing",
        "Symbols, iterators, generators",
        "WeakMap/WeakSet & garbage collection implications",
        "Proxy & Reflect — what they enable",
      ],
    },
  },
  TypeScript: {
    color: "#3178C6",
    textColor: "#fff",
    icon: "TS",
    sections: {
      "Type System Depth": [
        "interface vs type — declaration merging, mapped types",
        "Generics — constrained generics, generic functions & interfaces",
        "All utility types: Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable, ReturnType, Parameters",
        "Conditional types: T extends U ? X : Y",
        "Mapped types: { [K in keyof T]: ... }",
        "Template literal types",
      ],
      "Type Narrowing": [
        "typeof, instanceof, in operator narrowing",
        "Discriminated unions — pattern and power",
        "User-defined type guards (value is Type)",
      ],
      "Advanced Patterns": [
        "unknown vs any — why unknown is safer",
        "never type — exhaustiveness checking in switch",
        "Declaration files (.d.ts) — what they are & when to write one",
      ],
    },
  },
  React: {
    color: "#61DAFB",
    textColor: "#000",
    icon: "⚛",
    sections: {
      "Rendering & Reconciliation": [
        "Virtual DOM diffing algorithm, why keys matter",
        "When React re-renders — state, props, context, parent changes",
        "React.memo, useMemo, useCallback — what each memoizes",
        "React 18 automatic batching change",
      ],
      "Hooks Deep Dive": [
        "useState — functional updater form (setState(prev => ...))",
        "useEffect — dependency rules, cleanup, stale closure trap",
        "useRef — DOM access + persisting values without re-renders",
        "useReducer — when better than useState",
        "useContext — performance implications",
        "useCallback — dependency trap & when it helps",
        "useMemo — expensive computation memoization",
        "Custom hooks — extract logic not JSX",
      ],
      "State Management": [
        "Lifting state, prop drilling, Context API solution",
        "Context API limitations for large apps",
        "Redux mental model — actions, reducers, store, selectors",
      ],
      Performance: [
        "Code splitting with React.lazy + Suspense",
        "Virtualization for long lists (react-window concept)",
        "Avoiding unnecessary re-renders — common patterns",
      ],
      Patterns: [
        "Compound components, render props, HOCs",
        "Controlled vs uncontrolled inputs",
        "Error boundaries — class-only limitation and why",
        "Portals — use case for modals",
      ],
      "React 18+": [
        "Concurrent features concept",
        "useTransition & useDeferredValue — what problems they solve",
      ],
    },
  },
  "Node.js": {
    color: "#339933",
    textColor: "#fff",
    icon: "⬡",
    sections: {
      "Event Loop (Node-Specific)": [
        "Node event loop phases: timers → pending → idle → poll → check → close",
        "process.nextTick vs setImmediate vs setTimeout execution order",
        "Why Node is non-blocking despite single-threaded — libuv thread pool",
      ],
      "Core Modules": [
        "fs — sync vs async vs streams, fs.promises",
        "path — cross-platform path handling",
        "events — EventEmitter pattern",
        "stream — Readable, Writable, Transform, Duplex, piping",
        "child_process — exec vs spawn",
        "cluster — using all CPU cores",
      ],
      "Module System": [
        "CommonJS (require/module.exports) internals — module caching",
        "ESM (import/export) — differences and interop challenges",
      ],
      "Error Handling": [
        "Sync: try/catch. Async: promise rejections, unhandledRejection",
        "Why crashing on unhandled errors is sometimes correct",
      ],
    },
  },
  Express: {
    color: "#000000",
    textColor: "#fff",
    icon: "Ex",
    sections: {
      "Middleware Internals": [
        "Middleware chain — (req, res, next) pattern, execution order",
        "Error-handling middleware — must have 4 args: (err, req, res, next)",
        "app.use() vs router.use()",
      ],
      "Real-World Patterns": [
        "JWT authentication middleware — protecting routes",
        "Request validation with Zod or Joi",
        "Rate limiting — express-rate-limit basics",
        "CORS — same-origin policy, proper configuration",
      ],
      Architecture: [
        "MVC pattern in Express",
        "Routes → Controllers → Services → Repository layer separation",
        "Why separation matters for testability",
      ],
      "API Design": [
        "REST status codes — 200, 201, 204, 400, 401, 403, 404, 409, 422, 500",
        "Idempotency — GET/PUT/DELETE vs POST",
        "Pagination — offset vs cursor-based",
      ],
    },
  },
  Docker: {
    color: "#2496ED",
    textColor: "#fff",
    icon: "🐳",
    sections: {
      "Core Concepts": [
        "Image vs container vs volume vs network — clear distinction",
        "How image layers work — why Dockerfile instruction order matters for cache",
      ],
      "Dockerfile Mastery": [
        "FROM, WORKDIR, COPY, RUN, ENV, EXPOSE",
        "CMD vs ENTRYPOINT — key difference",
        "Multi-stage builds — keeping production images small",
        ".dockerignore — what to exclude and why",
      ],
      "Docker Compose": [
        "services, volumes, networks, depends_on",
        "Environment variable management",
        "Running Node + MongoDB or Node + Postgres stack locally",
      ],
      Mindset: [
        "Containers as ephemeral — don't store data in containers",
        "Port mapping, named volumes, bind mounts — differences",
      ],
    },
  },
  DSA: {
    color: "#FF6B35",
    textColor: "#fff",
    icon: "∑",
    sections: {
      "Core Data Structures": [
        "Arrays & strings — manipulation patterns",
        "Hashmaps & sets — frequency counting, lookups",
        "Two pointers technique",
        "Sliding window technique",
      ],
      Algorithms: [
        "Recursion + backtracking basics",
        "BFS & DFS on trees and graphs",
        "Quicksort & mergesort internals + complexities",
        "30–40 LeetCode mediums — easy/medium focus",
      ],
    },
  },
  Databases: {
    color: "#CC2936",
    textColor: "#fff",
    icon: "DB",
    sections: {
      SQL: [
        "Joins — inner, left, right, full",
        "GROUP BY + HAVING, subqueries",
        "Window functions basics",
        "Indexing (B-tree), EXPLAIN query plan",
      ],
      "NoSQL / MongoDB": [
        "Document model, CRUD operations",
        "Aggregation pipeline",
        "When NoSQL over SQL decision",
      ],
      Transactions: [
        "ACID properties",
        "Atomicity in practice",
        "N+1 query problem — what it is and fix",
      ],
    },
  },
  "System Design": {
    color: "#7B2D8B",
    textColor: "#fff",
    icon: "⚙",
    sections: {
      "Core Concepts": [
        "Design a URL shortener",
        "Design a rate limiter",
        "Design an auth system",
      ],
      Infrastructure: [
        "Caching (Redis) — when and why",
        "CDN & load balancing concepts",
        "Horizontal vs vertical scaling",
        "Stateless vs stateful services",
      ],
      "API Design": ["REST vs GraphQL trade-offs"],
    },
  },
  "Auth & Security": {
    color: "#1A1A2E",
    textColor: "#fff",
    icon: "🔐",
    sections: {
      Authentication: [
        "JWT — structure (header.payload.signature), signing, verification",
        "Refresh token pattern",
        "Where to store tokens — httpOnly cookie vs localStorage security",
        "OAuth2 — authorization code flow",
        "bcrypt — why passwords are hashed + salted",
      ],
      "Security Attacks": [
        "XSS — what it is and mitigation",
        "CSRF — what it is and mitigation",
        "SQL injection — what it is and mitigation",
      ],
    },
  },
  "Git & Testing": {
    color: "#F05032",
    textColor: "#fff",
    icon: "⎇",
    sections: {
      Git: [
        "Rebase vs merge — when to use each",
        "Interactive rebase, cherry-pick, stash",
        "PR workflow, code review etiquette",
        "Conventional commits",
      ],
      Testing: [
        "Unit vs integration vs e2e testing",
        "Jest basics — describe, it, expect, mocking",
        "React Testing Library — test behavior not implementation",
      ],
    },
  },
};

// ── Types ──────────────────────────────────────────────────────────────────────
type TopicKey = keyof typeof TOPICS;
type TopicData = typeof TOPICS[TopicKey];
type CheckedState = Record<string, boolean>;
type Progress = { total: number; done: number; pct: number };

// ── Helpers ────────────────────────────────────────────────────────────────────
const getAllTopics = (): CheckedState => {
  const all: CheckedState = {};
  Object.entries(TOPICS).forEach(([subject, data]) => {
    Object.entries(data.sections).forEach(([section, items]) => {
      (items as string[]).forEach((_item, i) => {
        const key = `${subject}__${section}__${i}`;
        all[key] = false;
      });
    });
  });
  return all;
};

const STORAGE_KEY = "sde_tracker_v2";

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [checked, setChecked] = useState<CheckedState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : getAllTopics();
    } catch {
      return getAllTopics();
    }
  });
  const [activeSubject, setActiveSubject] = useState<TopicKey>("JavaScript");
  const [view, setView] = useState<"tracker" | "overview">("tracker");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {}
  }, [checked]);

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getSubjectProgress = (subject: TopicKey): Progress => {
    const data = TOPICS[subject];
    let total = 0, done = 0;
    Object.entries(data.sections).forEach(([section, items]) => {
      (items as string[]).forEach((_item, i) => {
        const key = `${subject}__${section}__${i}`;
        total++;
        if (checked[key]) done++;
      });
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const getTotalProgress = (): Progress => {
    let total = 0, done = 0;
    (Object.keys(TOPICS) as TopicKey[]).forEach((s) => {
      const p = getSubjectProgress(s);
      total += p.total;
      done += p.done;
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const getSectionProgress = (subject: TopicKey, section: string): { done: number; total: number } => {
    const items = TOPICS[subject].sections[section as keyof typeof TOPICS[typeof subject]["sections"]] as string[];
    let done = 0;
    items.forEach((_item, i) => {
      if (checked[`${subject}__${section}__${i}`]) done++;
    });
    return { done, total: items.length };
  };

  const total = getTotalProgress();
  const subj = TOPICS[activeSubject];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      fontFamily: "'Courier New', monospace",
      color: "#E8E8E8",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #222",
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#0D0D14",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>
            SDE Internship ₹1L+
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: "#fff" }}>
            Interview Prep Tracker
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase" }}>Overall</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
              {total.pct}<span style={{ fontSize: 14, color: "#555" }}>%</span>
            </div>
            <div style={{ fontSize: 11, color: "#555" }}>{total.done}/{total.total} topics</div>
          </div>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: `conic-gradient(#00FF88 ${total.pct * 3.6}deg, #1a1a2a ${total.pct * 3.6}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#0D0D14",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}>🎯</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 89px)" }}>
        {/* Sidebar */}
        <div style={{
          width: 220,
          borderRight: "1px solid #1a1a1a",
          overflowY: "auto",
          background: "#0A0A0F",
          flexShrink: 0,
        }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1a1a" }}>
            <div style={{ display: "flex", gap: 4 }}>
              {(["tracker", "overview"] as const).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  flex: 1,
                  padding: "6px 0",
                  border: "none",
                  borderRadius: 4,
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  background: view === v ? "#00FF88" : "#111",
                  color: view === v ? "#000" : "#555",
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 700,
                  transition: "all 0.2s",
                }}>{v}</button>
              ))}
            </div>
          </div>

          {(Object.keys(TOPICS) as TopicKey[]).map((subject) => {
            const p = getSubjectProgress(subject);
            const s = TOPICS[subject];
            const isActive = activeSubject === subject;
            return (
              <div
                key={subject}
                onClick={() => { setActiveSubject(subject); setView("tracker"); }}
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  borderLeft: isActive ? `3px solid ${s.color}` : "3px solid transparent",
                  background: isActive ? "#111" : "transparent",
                  transition: "all 0.15s",
                  borderBottom: "1px solid #111",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: s.color,
                    color: s.textColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 900,
                    letterSpacing: -0.5,
                    flexShrink: 0,
                  }}>{s.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? "#fff" : "#aaa", lineHeight: 1.2 }}>{subject}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 3, background: "#1a1a1a", borderRadius: 2 }}>
                    <div style={{
                      width: `${p.pct}%`,
                      height: "100%",
                      background: p.pct === 100 ? "#00FF88" : s.color,
                      borderRadius: 2,
                      transition: "width 0.3s ease",
                    }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#555", width: 28, textAlign: "right" }}>{p.pct}%</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          {view === "overview" ? (
            <OverviewGrid
              topics={TOPICS}
              getSubjectProgress={getSubjectProgress}
              setActiveSubject={setActiveSubject}
              setView={setView}
            />
          ) : (
            <SubjectView
              subject={activeSubject}
              data={subj}
              checked={checked}
              toggle={toggle}
              getSectionProgress={getSectionProgress}
              getSubjectProgress={getSubjectProgress}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── SubjectView ────────────────────────────────────────────────────────────────
interface SubjectViewProps {
  subject: TopicKey;
  data: TopicData;
  checked: CheckedState;
  toggle: (key: string) => void;
  getSectionProgress: (subject: TopicKey, section: string) => { done: number; total: number };
  getSubjectProgress: (subject: TopicKey) => Progress;
}

function SubjectView({ subject, data, checked, toggle, getSectionProgress, getSubjectProgress }: SubjectViewProps) {
  const p = getSubjectProgress(subject);
  return (
    <div>
      <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            background: data.color,
            color: data.textColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 900,
          }}>{data.icon}</div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 2 }}>{subject}</div>
            <div style={{ fontSize: 12, color: "#555" }}>{p.done} of {p.total} topics completed</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1,
            color: p.pct === 100 ? "#00FF88" : data.color,
          }}>{p.pct}<span style={{ fontSize: 18, color: "#333" }}>%</span></div>
        </div>
      </div>

      <div style={{ height: 6, background: "#1a1a1a", borderRadius: 3, marginBottom: 32 }}>
        <div style={{
          width: `${p.pct}%`,
          height: "100%",
          background: p.pct === 100 ? "#00FF88" : data.color,
          borderRadius: 3,
          transition: "width 0.4s ease",
        }} />
      </div>

      {Object.entries(data.sections).map(([section, items]) => {
        const sp = getSectionProgress(subject, section);
        return (
          <div key={section} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: data.color }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: "#ccc", letterSpacing: 0.5 }}>{section}</div>
              </div>
              <div style={{ fontSize: 11, color: "#444" }}>{sp.done}/{sp.total}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {(items as string[]).map((item: string, i: number) => {
                const key = `${subject}__${section}__${i}`;
                const isDone = checked[key];
                return (
                  <div
                    key={key}
                    onClick={() => toggle(key)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "10px 14px",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: isDone ? "#0d1f14" : "#0f0f16",
                      border: `1px solid ${isDone ? "#1a3d25" : "#1a1a22"}`,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { if (!isDone) (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a3a"; }}
                    onMouseLeave={e => { if (!isDone) (e.currentTarget as HTMLDivElement).style.borderColor = "#1a1a22"; }}
                  >
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      border: `2px solid ${isDone ? "#00FF88" : "#333"}`,
                      background: isDone ? "#00FF88" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                      transition: "all 0.15s",
                    }}>
                      {isDone && <div style={{ fontSize: 11, color: "#000", fontWeight: 900 }}>✓</div>}
                    </div>
                    <div style={{
                      fontSize: 13,
                      color: isDone ? "#4a7a5a" : "#bbb",
                      textDecoration: isDone ? "line-through" : "none",
                      lineHeight: 1.5,
                      transition: "all 0.15s",
                    }}>{item}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── OverviewGrid ───────────────────────────────────────────────────────────────
interface OverviewGridProps {
  topics: typeof TOPICS;
  getSubjectProgress: (subject: TopicKey) => Progress;
  setActiveSubject: (subject: TopicKey) => void;
  setView: (view: "tracker" | "overview") => void;
}

function OverviewGrid({ topics, getSubjectProgress, setActiveSubject, setView }: OverviewGridProps) {
  const allSubjects = Object.keys(topics) as TopicKey[];
  const totalTopics = allSubjects.reduce((acc, s) => acc + getSubjectProgress(s).total, 0);
  const doneTopic = allSubjects.reduce((acc, s) => acc + getSubjectProgress(s).done, 0);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Dashboard</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>All Subjects Overview</div>
        <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{doneTopic} of {totalTopics} total topics done</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {allSubjects.map((subject) => {
          const p = getSubjectProgress(subject);
          const s = topics[subject];
          return (
            <div
              key={subject}
              onClick={() => { setActiveSubject(subject); setView("tracker"); }}
              style={{
                padding: 20,
                borderRadius: 12,
                background: "#0f0f16",
                border: "1px solid #1a1a22",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = s.color;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#1a1a22";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: s.color,
                  color: s.textColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 900,
                }}>{s.icon}</div>
                <div style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: p.pct === 100 ? "#00FF88" : "#fff",
                }}>{p.pct}<span style={{ fontSize: 12, color: "#333" }}>%</span></div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#ddd", marginBottom: 10 }}>{subject}</div>
              <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2, marginBottom: 8 }}>
                <div style={{
                  width: `${p.pct}%`,
                  height: "100%",
                  background: p.pct === 100 ? "#00FF88" : s.color,
                  borderRadius: 2,
                  transition: "width 0.4s",
                }} />
              </div>
              <div style={{ fontSize: 11, color: "#444" }}>{p.done} / {p.total} topics</div>
              {p.pct === 100 && (
                <div style={{ marginTop: 10, fontSize: 10, color: "#00FF88", letterSpacing: 2, textTransform: "uppercase" }}>
                  ✓ Complete
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4 Week Plan */}
      <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 16 }}>4-Week Battle Plan</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { week: "Week 1", focus: "JavaScript deep dive", sub: "+ 10 LeetCode easy/medium", color: "#F7DF1E" },
            { week: "Week 2", focus: "React + TypeScript", sub: "+ 10 more LeetCode", color: "#61DAFB" },
            { week: "Week 3", focus: "Node + Express + Docker", sub: "+ Databases", color: "#339933" },
            { week: "Week 4", focus: "System Design + Security", sub: "+ Mock interviews", color: "#7B2D8B" },
          ].map(({ week, focus, sub, color }) => (
            <div key={week} style={{
              padding: 16,
              borderRadius: 10,
              background: "#0f0f16",
              borderTop: `3px solid ${color}`,
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#555", textTransform: "uppercase", marginBottom: 6 }}>{week}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ddd", marginBottom: 4 }}>{focus}</div>
              <div style={{ fontSize: 11, color: "#555" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}