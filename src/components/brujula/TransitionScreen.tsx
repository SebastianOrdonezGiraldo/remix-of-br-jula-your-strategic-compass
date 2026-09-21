import { Compass } from "lucide-react";

export function TransitionScreen() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/95 backdrop-blur-md">
      <div className="fade-in-slow flex flex-col items-center text-center px-6 max-w-lg">
        <div className="relative">
          <span aria-hidden className="absolute inset-0 rounded-full bg-primary/15 blur-2xl" />
          <span className="relative grid h-20 w-20 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elevated">
            <Compass className="h-10 w-10 compass-spin" strokeWidth={2} />
          </span>
        </div>

        <h2 className="mt-8 text-2xl sm:text-3xl font-bold tracking-[-0.02em]">
          <span className="shimmer-text">Brújula está construyendo tu Ruta Inicial…</span>
        </h2>

        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Estamos organizando la información que compartiste para identificar una primera ruta de
          trabajo para tu organización.
        </p>

        <div className="mt-8 flex items-center gap-1.5" aria-hidden>
          <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
          <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
          <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
