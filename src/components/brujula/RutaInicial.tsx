import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Download,
  Mail,
  Quote,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { FORMAS_CONSTRUIR, rutaForChallenge, type Challenge } from "@/lib/brujula-data";

interface Props {
  challenge: Challenge;
  userAnswers: string[];
  onRevisit: () => void;
}

interface Contacto {
  empresa: string;
  contacto: string;
  correo: string;
}

export function RutaInicial({ challenge, userAnswers, onRevisit }: Props) {
  const ruta = rutaForChallenge(challenge.key);
  const lectura = ruta.lectura(userAnswers, challenge.title);

  const [contactoOpen, setContactoOpen] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [contacto, setContacto] = useState<Contacto>({
    empresa: "",
    contacto: "",
    correo: "",
  });

  function handlePrint() {
    window.print();
  }

  async function handleGuardar(e: React.FormEvent) {
    e.preventDefault();
    if (!contacto.empresa.trim() || !contacto.contacto.trim() || !contacto.correo.trim()) return;
    setEnviando(true);
    setErrorEnvio(null);

    const payload = {
      empresa: contacto.empresa.trim(),
      nombre: contacto.contacto.trim(),
      correo: contacto.correo.trim(),
      cargo: "",
      telefono: "",
      ruta: ruta.nombre,
      desafio: challenge.title,
      interes: "",
    };

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxd35y4VJ2UhAzD2PXUbN0ihYb6IuldckDcT1oLv7CDF7smpF6fMQyqwrD6KshzriDT/exec",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json().catch(() => ({ ok: res.ok }));
      if (!data.ok) throw new Error("send_failed");

      try {
        const prev = JSON.parse(localStorage.getItem("brujula:leads") ?? "[]");
        prev.push({
          ...contacto,
          ruta: ruta.nombre,
          desafio: challenge.title,
          fecha: new Date().toISOString(),
          respuestas: userAnswers,
        });
        localStorage.setItem("brujula:leads", JSON.stringify(prev));
      } catch {
        /* noop */
      }

      setConfirmado(true);
      setTimeout(() => {
        setContactoOpen(false);
        setConfirmado(false);
      }, 3500);
    } catch {
      setErrorEnvio(
        "No pudimos enviar tu ruta en este momento. Intenta nuevamente en unos segundos.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="fade-in-slow bg-background">
      <article id="ruta-inicial-print" className="mx-auto max-w-4xl px-5 sm:px-10 py-14 sm:py-20">
        {/* Encabezado */}
        <header className="border-b border-border pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Documento consultivo · Brújula
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05]">
            Tu Ruta Inicial está lista
          </h1>
          <p className="mt-6 text-[15.5px] sm:text-[16.5px] leading-relaxed text-muted-foreground max-w-3xl">
            Gracias por compartir el desafío de tu organización. Con base en la información que nos
            proporcionaste construimos una primera ruta que puede servir como punto de partida para
            identificar oportunidades de mejora y posibles alternativas de trabajo conjunto.
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground/80 max-w-3xl italic">
            Esta ruta representa una orientación inicial y no reemplaza un diagnóstico detallado.
          </p>
        </header>

        {/* Nombre de la ruta */}
        <section className="mt-14 sm:mt-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Ruta asignada
          </p>
          <h2 className="mt-4 text-4xl sm:text-6xl font-bold tracking-[-0.03em] leading-[1.02] text-foreground">
            <span className="mr-3">{ruta.emoji}</span>
            <span className="text-primary">{ruta.nombre}</span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground max-w-2xl">
            {ruta.descripcionCorta}
          </p>
        </section>

        {/* Nuestra lectura inicial */}
        <section className="mt-16 sm:mt-24">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em]">
            Nuestra lectura inicial
          </h3>
          <p className="mt-3 text-[14.5px] text-muted-foreground max-w-2xl">
            Un resumen consultivo de lo que escuchamos en la conversación.
          </p>
          <ul className="mt-8 space-y-4">
            {lectura.map((idea, i) => (
              <li
                key={i}
                className="fade-up flex gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-soft"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary text-[12px] font-bold">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-foreground">{idea}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Capacidades */}
        <section className="mt-16 sm:mt-24">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em]">
            Capacidades que podrían acelerar esta ruta
          </h3>
          <p className="mt-3 text-[14.5px] text-muted-foreground max-w-2xl">
            Capacidades organizacionales que pueden aportar valor a este desafío.
          </p>
          <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2">
            {ruta.capacidades.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.titulo}
                  className="card-hover fade-up rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-soft"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-[16.5px] font-semibold tracking-tight">{cap.titulo}</h4>
                </div>
              );
            })}
          </div>
        </section>

        {/* ¿Qué podríamos construir juntos? */}
        <section className="mt-16 sm:mt-24">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em]">
            ¿Qué podríamos construir juntos?
          </h3>
          <p className="mt-3 text-[14.5px] text-muted-foreground max-w-2xl">
            Distintas formas en las que esta conversación podría tomar cuerpo.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FORMAS_CONSTRUIR.map((f, i) => (
              <div
                key={f.titulo}
                className="fade-up rounded-2xl border border-dashed border-border bg-surface p-5"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="text-[14.5px] font-semibold tracking-tight">{f.titulo}</h4>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reflexión final */}
        <section className="mt-16 sm:mt-24">
          <div className="relative rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12">
            <Quote className="h-8 w-8 opacity-40" />
            <p className="mt-4 text-xl sm:text-2xl font-semibold tracking-[-0.01em] leading-[1.4]">
              {ruta.reflexion}
            </p>
            <p className="mt-6 text-[13px] uppercase tracking-[0.2em] opacity-70">
              Reflexión final · {ruta.nombre}
            </p>
          </div>
        </section>

        {/* Próximo paso */}
        <section className="mt-16 sm:mt-24 no-print">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em]">
            ¿Hacia dónde podría avanzar esta ruta?
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
            Toda ruta puede seguir diferentes caminos. Si deseas profundizar este análisis,
            estaremos encantados de construir contigo el siguiente paso.
          </p>
          <a
            href="#construyamos"
            className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-foreground px-6 py-4 text-[15.5px] font-semibold text-background shadow-elevated transition hover:opacity-90"
          >
            <CalendarCheck className="h-5 w-5" />
            Agendar una conversación
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

        {/* Acciones secundarias */}
        <section className="mt-10 grid gap-3 sm:grid-cols-3 no-print">
          <button
            onClick={handlePrint}
            className="card-hover inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-[14.5px] font-semibold shadow-soft"
          >
            <Download className="h-4 w-4" />
            Descargar Ruta Inicial
          </button>
          <button
            onClick={() => setContactoOpen(true)}
            className="card-hover inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-[14.5px] font-semibold shadow-soft"
          >
            <Mail className="h-4 w-4" />
            Enviarme esta Ruta por correo
          </button>
          <button
            onClick={onRevisit}
            className="card-hover inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-[14.5px] font-semibold shadow-soft"
          >
            <RotateCcw className="h-4 w-4" />
            Volver a revisar mi Ruta
          </button>
        </section>
      </article>

      {/* Modal contacto */}
      {contactoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm no-print p-0 sm:p-6"
          onClick={() => !confirmado && setContactoOpen(false)}
        >
          <div
            className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl bg-background shadow-elevated overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {confirmado ? (
              <div className="p-8 sm:p-10 text-center fade-in-slow">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h4 className="mt-5 text-2xl font-bold tracking-tight">¡Ruta enviada!</h4>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                  Revisa tu correo. Muy pronto un asesor de EmprendeLab también revisará tu
                  diagnóstico para identificar cómo podemos acompañarte.
                </p>
                <button
                  onClick={() => {
                    setContactoOpen(false);
                    setConfirmado(false);
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
                >
                  Continuar
                </button>
              </div>
            ) : (
              <form onSubmit={handleGuardar} className="p-6 sm:p-8">
                <h4 className="text-xl font-bold tracking-tight">
                  Recibe esta Ruta Inicial en tu correo
                </h4>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  Si deseas conservar esta Ruta Inicial y recibirla en tu correo, compártenos estos
                  datos. También nos permitirán preparar una conversación mucho más útil si decides
                  continuar.
                </p>

                <div className="mt-5 grid gap-3">
                  <ContactField
                    label="Empresa"
                    value={contacto.empresa}
                    onChange={(v) => setContacto({ ...contacto, empresa: v })}
                  />
                  <ContactField
                    label="Nombre del contacto"
                    value={contacto.contacto}
                    onChange={(v) => setContacto({ ...contacto, contacto: v })}
                  />
                  <ContactField
                    label="Correo electrónico"
                    type="email"
                    value={contacto.correo}
                    onChange={(v) => setContacto({ ...contacto, correo: v })}
                  />
                </div>

                {errorEnvio && (
                  <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-[13px] text-destructive">
                    {errorEnvio}
                  </p>
                )}

                <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setContactoOpen(false)}
                    disabled={enviando}
                    className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={
                      enviando ||
                      !contacto.empresa.trim() ||
                      !contacto.contacto.trim() ||
                      !contacto.correo.trim()
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
                  >
                    {enviando ? "Enviando…" : "Enviarme la ruta"}
                    {!enviando && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ContactField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-[14.5px] outline-none transition focus:border-primary/60"
      />
    </label>
  );
}
