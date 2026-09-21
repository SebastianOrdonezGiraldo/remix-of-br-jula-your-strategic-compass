import { createFileRoute } from "@tanstack/react-router";
import { type ComponentType, type SVGProps, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Compass,
  Handshake,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import {
  BENEFICIOS,
  CAPACIDADES,
  CHALLENGES,
  FORMAS_COLABORAR,
  empathyDefault,
  type Challenge,
  type ChallengeKey,
  type RouteStage,
} from "@/lib/brujula-data";
import { TransitionScreen } from "@/components/brujula/TransitionScreen";
import { RutaInicial } from "@/components/brujula/RutaInicial";
import emprendelabLogo from "@/assets/emprendelab.png.asset.json";
import humboldtLogo from "@/assets/humboldt-color.png.asset.json";

export const Route = createFileRoute("/")({
  component: BrujulaApp,
});

/* ---------- Component ---------- */

function BrujulaApp() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [freeText, setFreeText] = useState("");
  const [messages, setMessages] = useState<
    { role: "brujula" | "user"; text: string; typing?: boolean }[]
  >([]);
  const [step, setStep] = useState(0); // conversation step
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showTransition, setShowTransition] = useState(false);
  const [showRuta, setShowRuta] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  // Scroll into view when a conversation starts / advances
  useEffect(() => {
    if (challenge && conversationRef.current && !showRuta && !showTransition) {
      conversationRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [challenge, showRuta, showTransition]);

  useEffect(() => {
    if (showRuta) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [showRuta]);

  function startConversation(c: Challenge, userText?: string) {
    setChallenge(c);
    setStep(0);
    setShowRuta(false);
    setShowTransition(false);
    setUserAnswers(userText ? [userText] : []);
    const initial: typeof messages = [];
    if (userText) initial.push({ role: "user", text: userText });
    initial.push({ role: "brujula", text: c.empathy || empathyDefault });
    initial.push({ role: "brujula", text: c.questions[0] });
    setMessages(initial);
  }

  function detectChallenge(text: string): Challenge {
    const t = text.toLowerCase();
    const map: [string[], ChallengeKey][] = [
      [["vend", "venta", "client", "market", "marca", "comercial"], "ventas"],
      [["proceso", "tiempo", "eficien", "operac", "producti"], "productividad"],
      [["digital", "ia ", "inteligencia", "automat", "datos", "software"], "digital"],
      [["talento", "equipo", "líder", "lider", "cultura", "personas"], "talento"],
      [["finanz", "costo", "rentab", "flujo", "dinero"], "finanzas"],
      [["logíst", "logist", "entrega", "cadena", "distribuc"], "logistica"],
      [["calidad", "norma", "certific", "devoluc", "reclamo", "garantia", "queja"], "calidad"],
      [["sosten", "ambient", "esg", "verde"], "sostenibilidad"],
      [["innov", "nuevo producto", "prototip"], "innovacion"],
      [["estrateg", "planea", "rumbo", "visión", "vision"], "planeacion"],
      [["export", "internacional", "mercado extranjero"], "internacionalizacion"],
    ];
    for (const [kw, key] of map) {
      if (kw.some((k) => t.includes(k))) {
        return CHALLENGES.find((c) => c.key === key)!;
      }
    }
    return CHALLENGES.find((c) => c.key === "indefinido")!;
  }

  function handleFreeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!freeText.trim()) return;
    const c = detectChallenge(freeText);
    startConversation(c, freeText.trim());
    setFreeText("");
  }

  function answerCurrent(text: string) {
    if (!challenge) return;
    const nextStep = step + 1;
    const newMessages = [...messages, { role: "user" as const, text }];
    const newAnswers = [...userAnswers, text];
    setUserAnswers(newAnswers);
    // Ask up to 3 questions total (index 0,1,2)
    if (nextStep < Math.min(3, challenge.questions.length)) {
      newMessages.push({
        role: "brujula",
        text:
          nextStep === 1
            ? "Perfecto. Una más para afinar el contexto:"
            : "Gracias, con esto tenemos una imagen más clara:",
      });
      newMessages.push({ role: "brujula", text: challenge.questions[nextStep] });
      setMessages(newMessages);
      setStep(nextStep);
    } else {
      setMessages(newMessages);
      setStep(nextStep);
      // Transition ~3s → Ruta Inicial
      setShowTransition(true);
      setTimeout(() => {
        setShowTransition(false);
        setShowRuta(true);
      }, 3000);
    }
  }

  function resetConversation() {
    setChallenge(null);
    setMessages([]);
    setStep(0);
    setUserAnswers([]);
    setShowRuta(false);
    setShowTransition(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function revisitRuta() {
    // Volver al chat manteniendo el contexto
    setShowRuta(false);
    setShowTransition(false);
    setTimeout(() => {
      conversationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  // Vista "Ruta Inicial": documento independiente
  if (showRuta && challenge) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <TopBar />
        <RutaInicial challenge={challenge} userAnswers={userAnswers} onRevisit={revisitRuta} />
        <ConstruyamosSection />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showTransition && <TransitionScreen />}
      <TopBar />
      <Hero
        freeText={freeText}
        onFreeText={setFreeText}
        onSubmit={handleFreeSubmit}
        active={!!challenge}
      />

      {!challenge && (
        <>
          <ChallengesGrid onSelect={(c) => startConversation(c)} />
          <SecondaryCards />
        </>
      )}

      {challenge && (
        <section
          ref={conversationRef}
          className="border-t border-border bg-surface"
          aria-label="Conversación con Brújula"
        >
          <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
            <ConversationHeader challenge={challenge} onReset={resetConversation} />
            <ConversationThread messages={messages} />

            {step < Math.min(3, challenge.questions.length) && (
              <AnswerBar key={step} onAnswer={answerCurrent} placeholder="Escribe tu respuesta…" />
            )}
          </div>
        </section>
      )}

      <CapacidadesSection />
      <BeneficiosSection />
      <ConstruyamosSection />
      <Footer />
    </div>
  );
}

/* ---------- Sections ---------- */

function TopBar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#capacidades", label: "Capacidades" },
    { href: "#beneficios", label: "Beneficios" },
    { href: "#construyamos", label: "Construyamos juntos" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Compass className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight">Brújula</span>
            <span className="text-[10.5px] font-medium text-muted-foreground">
              Evoluciona con tus ideas
            </span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#construyamos"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
          >
            Contáctanos
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-lg border border-border"
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-5 py-3 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-foreground hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#construyamos"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-foreground px-3 py-3 text-center text-[15px] font-medium text-background"
            >
              Contáctanos
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({
  freeText,
  onFreeText,
  onSubmit,
  active,
}: {
  freeText: string;
  onFreeText: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  active: boolean;
}) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.45 0.17 258 / 0.08), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-5 pt-6 pb-10 sm:pt-8 sm:pb-14 text-center">
        <div className="fade-in-slow flex items-center justify-center gap-5 sm:gap-7 opacity-90">
          <img
            src={humboldtLogo.url}
            alt="Corporación Universitaria Empresarial Alexander von Humboldt"
            className="h-14 sm:h-20 w-auto object-contain"
          />
          <span aria-hidden className="h-10 sm:h-14 w-px bg-border" />
          <img
            src={emprendelabLogo.url}
            alt="EmprendeLab"
            className="h-11 sm:h-16 w-auto object-contain"
          />
        </div>

        <div className="fade-in-slow mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-primary/10">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Una experiencia para organizaciones
        </div>

        <h1 className="fade-up mt-6 text-[2.25rem] sm:text-5xl font-bold tracking-[-0.03em] leading-[1.08] text-foreground">
          Las mejores soluciones{" "}
          <span className="text-primary">empiezan entendiendo el desafío.</span>
        </h1>

        <form
          onSubmit={onSubmit}
          className="fade-up mt-8 mx-auto max-w-2xl"
          style={{ animationDelay: "80ms" }}
        >
          <label className="block text-left text-sm font-semibold text-foreground mb-2 px-1">
            ¿Qué desafío quieres resolver hoy?
          </label>
          <div className="group flex flex-col sm:flex-row gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft transition focus-within:border-primary/60 focus-within:shadow-elevated">
            <input
              value={freeText}
              onChange={(e) => onFreeText(e.target.value)}
              placeholder='Ejemplo: "Quiero reducir mis tiempos de entrega."'
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[15px] outline-none placeholder:text-muted-foreground/70"
            />
            <button
              type="submit"
              disabled={!freeText.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Encontrar mi ruta
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 px-1 text-left text-xs text-muted-foreground">
            {active
              ? "Brújula está escuchando debajo. Puedes cambiar de desafío cuando quieras."
              : "Escribe con tus propias palabras. También puedes elegir una tarjeta abajo."}
          </p>
        </form>
      </div>
    </section>
  );
}

function ChallengesGrid({ onSelect }: { onSelect: (c: Challenge) => void }) {
  return (
    <section aria-label="Categorías de desafíos" className="mx-auto max-w-6xl px-5 pb-14">
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CHALLENGES.map((c, i) => {
          const Icon = c.icon;
          return (
            <button
              key={c.key}
              onClick={() => onSelect(c)}
              className="card-hover fade-up group text-left rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-soft"
              style={{ animationDelay: `${i * 25}ms` }}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground line-clamp-2">
                    {c.hint}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SecondaryCards() {
  const cards = [
    {
      href: "#capacidades",
      icon: Compass,
      title: "Explorar capacidades",
      desc: "Conoce distintas formas en las que podemos apoyar el crecimiento de tu organización.",
      tags: ["Formación a la medida", "Consultoría", "Programas académicos", "Educación continua"],
    },
    {
      href: "#construyamos",
      icon: Handshake,
      title: "Construyamos juntos",
      desc: "Descubre oportunidades para desarrollar proyectos, prácticas empresariales, innovación aplicada y trabajo colaborativo con la universidad.",
      tags: FORMAS_COLABORAR.slice(0, 4),
    },
    {
      href: "#beneficios",
      icon: Sparkles,
      title: "Beneficios para aliados",
      desc: "Explora becas, descuentos y beneficios exclusivos para organizaciones aliadas.",
      tags: ["Becas", "Descuentos", "Convenios", "Comunidad"],
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <a
              key={c.title}
              href={c.href}
              className="card-hover fade-up group relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-soft"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{c.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11.5px] font-medium text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Conversation ---------- */

function ConversationHeader({ challenge, onReset }: { challenge: Challenge; onReset: () => void }) {
  const Icon = challenge.icon;
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Conversación · Brújula
          </p>
          <h2 className="truncate text-lg sm:text-xl font-bold tracking-tight">
            {challenge.title}
          </h2>
        </div>
      </div>
      <button
        onClick={onReset}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground hover:border-foreground/30"
      >
        <X className="h-3.5 w-3.5" />
        Cambiar
      </button>
    </div>
  );
}

function ConversationThread({
  messages,
}: {
  messages: { role: "brujula" | "user"; text: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((m, i) => (
        <Bubble key={i} role={m.role} text={m.text} delay={i * 40} />
      ))}
    </div>
  );
}

function Bubble({ role, text, delay }: { role: "brujula" | "user"; text: string; delay: number }) {
  if (role === "brujula") {
    return (
      <div className="fade-up flex items-start gap-3" style={{ animationDelay: `${delay}ms` }}>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Compass className="h-4 w-4" />
        </span>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-card border border-border px-4 py-3 text-[14.5px] leading-relaxed shadow-soft">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div
      className="fade-up flex items-start justify-end gap-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary text-primary-foreground px-4 py-3 text-[14.5px] leading-relaxed shadow-soft">
        {text}
      </div>
    </div>
  );
}

function AnswerBar({
  onAnswer,
  placeholder,
}: {
  onAnswer: (t: string) => void;
  placeholder: string;
}) {
  const [v, setV] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!v.trim()) return;
        onAnswer(v.trim());
        setV("");
      }}
      className="fade-up mt-6 flex gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft focus-within:border-primary/60"
    >
      <input
        autoFocus
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[15px] outline-none placeholder:text-muted-foreground/70"
      />
      <button
        type="submit"
        disabled={!v.trim()}
        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
        <span className="hidden sm:inline">Enviar</span>
      </button>
    </form>
  );
}

/* ---------- Recommended Route ---------- */

const TAG_STYLE: Record<RouteStage["tag"], string> = {
  Comprensión: "bg-primary-soft text-primary",
  Capacidad: "bg-[oklch(0.95_0.05_170)] text-[oklch(0.35_0.14_170)]",
  Proyecto: "bg-[oklch(0.95_0.05_60)] text-[oklch(0.4_0.15_60)]",
  Formación: "bg-[oklch(0.95_0.05_300)] text-[oklch(0.4_0.15_300)]",
  Beneficio: "bg-[oklch(0.95_0.05_25)] text-[oklch(0.45_0.16_25)]",
  Conexión: "bg-foreground text-background",
};

function RecommendedRoute({ challenge, onReset }: { challenge: Challenge; onReset: () => void }) {
  return (
    <div className="fade-up mt-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Tu ruta recomendada
          </p>
          <h3 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
            Un posible camino, construido a partir de lo que compartiste
          </h3>
        </div>
      </div>

      <ol className="relative border-l border-dashed border-border pl-6">
        {challenge.route.map((stage, i) => (
          <li
            key={i}
            className="fade-up relative mb-4 last:mb-0"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="absolute -left-[33px] top-4 grid h-6 w-6 place-items-center rounded-full border-2 border-background bg-primary text-[10px] font-bold text-primary-foreground">
              {i + 1}
            </span>
            <div className="card-hover rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-[15.5px] font-semibold tracking-tight">{stage.title}</h4>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${TAG_STYLE[stage.tag]}`}
                >
                  {stage.tag}
                </span>
              </div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {stage.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          href="#construyamos"
          className="group inline-flex items-center justify-between gap-3 rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-soft transition hover:brightness-110"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-foreground/15">
              <MessageCircle className="h-4.5 w-4.5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[13px] opacity-80">¿Conversamos?</span>
              <span className="text-[15.5px] font-semibold">Hablar con un consultor</span>
            </span>
          </span>
          <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-foreground shadow-soft transition hover:border-foreground/30"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted">
              <Compass className="h-4.5 w-4.5" />
            </span>
            <span className="flex flex-col leading-tight text-left">
              <span className="text-[13px] text-muted-foreground">¿Otro desafío?</span>
              <span className="text-[15.5px] font-semibold">Explorar de nuevo</span>
            </span>
          </span>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Static sections ---------- */

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-[-0.02em]">{title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function ExpandableCard({
  icon: Icon,
  title,
  desc,
  alternativas,
  isOpen,
  onToggle,
  index,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  title: string;
  desc: string;
  alternativas: string[];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={`card-hover fade-up rounded-2xl border border-border bg-card shadow-soft overflow-hidden transition-all duration-300 ${
        isOpen ? "ring-1 ring-primary/20" : ""
      }`}
      style={{ animationDelay: `${index * 25}ms` }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-5 flex items-start gap-3 group hover:bg-surface-elevated/50 transition-colors"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{desc}</p>
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 fade-in-slow">
          <div className="rounded-xl bg-surface-elevated/60 p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-2.5">
              Alternativas disponibles
            </p>
            <div className="flex flex-wrap gap-2">
              {alternativas.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center rounded-lg bg-card border border-border px-2.5 py-1.5 text-[12.5px] text-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CapacidadesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="capacidades" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-[-0.02em]">
          Capacidades
        </h2>
        <div className="mt-12 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CAPACIDADES.map((c, i) => (
            <ExpandableCard
              key={c.title}
              icon={c.icon}
              title={c.title}
              desc={c.desc}
              alternativas={c.alternativas}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BeneficiosSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="beneficios">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          eyebrow="Beneficios"
          title="Ventajas exclusivas para organizaciones aliadas"
          desc="Un espacio pensado para que puedas explorar beneficios reales, tanto para tu organización como para tus colaboradores."
        />
        <div className="mt-12 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFICIOS.map((b, i) => (
            <ExpandableCard
              key={b.title}
              icon={b.icon}
              title={b.title}
              desc={b.desc}
              alternativas={b.alternativas}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConstruyamosSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", organizacion: "", correo: "", mensaje: "" });
  return (
    <section
      id="construyamos"
      className="border-t border-border bg-primary text-primary-foreground"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/70">
              Construyamos juntos
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-[-0.02em]">
              Cuéntanos hacia dónde quieres ir. Camino no falta.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-primary-foreground/80">
              Podemos acompañarte con proyectos aplicados, prácticas empresariales, innovación,
              investigación y consultoría.
            </p>
            <ul className="mt-8 space-y-2.5">
              {FORMAS_COLABORAR.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[14.5px]">
                  <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-primary-foreground/90" />
                  <span className="text-primary-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-background p-6 sm:p-8 text-foreground shadow-elevated">
            {sent ? (
              <div className="fade-up flex flex-col items-center text-center py-6">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-xl font-bold">Gracias por escribirnos</h3>
                <p className="mt-2 text-[14.5px] text-muted-foreground max-w-sm">
                  Un consultor revisará tu mensaje y te contactará pronto. Mientras tanto, puedes
                  seguir explorando.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ nombre: "", organizacion: "", correo: "", mensaje: "" });
                  }}
                  className="mt-6 text-sm font-semibold text-primary hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-3"
              >
                <h3 className="text-lg font-bold">Iniciar una conversación</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Nombre"
                    value={form.nombre}
                    onChange={(v) => setForm({ ...form, nombre: v })}
                    required
                  />
                  <Field
                    label="Organización"
                    value={form.organizacion}
                    onChange={(v) => setForm({ ...form, organizacion: v })}
                    required
                  />
                </div>
                <Field
                  label="Correo"
                  type="email"
                  value={form.correo}
                  onChange={(v) => setForm({ ...form, correo: v })}
                  required
                />
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-foreground">
                    ¿En qué estás pensando?
                  </label>
                  <textarea
                    rows={4}
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    placeholder="Cuéntanos brevemente el contexto."
                    className="w-full resize-none rounded-xl border border-border bg-surface px-3.5 py-2.5 text-[14.5px] outline-none transition focus:border-primary/60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!form.nombre || !form.organizacion || !form.correo}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
                >
                  Enviar mensaje
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-[11.5px] text-muted-foreground">
                  Al enviar aceptas ser contactado por nuestro equipo. Nunca compartimos tus datos.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-[14.5px] outline-none transition focus:border-primary/60"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col items-center gap-8 text-center">
        <p className="text-[13px] leading-relaxed text-muted-foreground/80 max-w-3xl">
          Una iniciativa de la Corporación Universitaria Empresarial Alexander von Humboldt y
          EmprendeLab para conectar los desafíos de las organizaciones con el conocimiento de la
          universidad.
        </p>
        <div className="flex items-center justify-center gap-5 opacity-90">
          <div className="flex items-center justify-center rounded-lg bg-surface-elevated border px-3 h-16">
            <img
              src={humboldtLogo.url}
              alt="Corporación Universitaria Empresarial Alexander von Humboldt"
              className="h-12 w-auto object-contain"
            />
          </div>
          <span className="h-12 w-px bg-border" />
          <div className="flex items-center justify-center rounded-lg bg-surface-elevated border px-3 h-16">
            <img
              src={emprendelabLogo.url}
              alt="EmprendeLab"
              className="h-11 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
