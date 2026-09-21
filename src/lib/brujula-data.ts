import type { ComponentType, SVGProps } from "react";
import {
  BadgeCheck,
  Bot,
  Cog,
  Globe2,
  GraduationCap,
  Handshake,
  Heart,
  Leaf,
  Lightbulb,
  LineChart,
  Package,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

export type ChallengeKey =
  | "ventas"
  | "productividad"
  | "digital"
  | "talento"
  | "finanzas"
  | "logistica"
  | "calidad"
  | "sostenibilidad"
  | "innovacion"
  | "planeacion"
  | "internacionalizacion"
  | "indefinido";

export interface Challenge {
  key: ChallengeKey;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  emoji: string;
  title: string;
  hint: string;
  empathy: string;
  questions: string[];
  route: RouteStage[];
}

export interface RouteStage {
  title: string;
  detail: string;
  tag: "Comprensión" | "Capacidad" | "Proyecto" | "Formación" | "Beneficio" | "Conexión";
}

export interface Capacidad {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  title: string;
  desc: string;
  alternativas: string[];
}

export interface Beneficio {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  title: string;
  desc: string;
  alternativas: string[];
}

export const empathyDefault =
  "Gracias por compartirlo. Muchas organizaciones enfrentan un desafío parecido, y casi siempre hay más de un camino para abordarlo.";

export const CHALLENGES: Challenge[] = [
  {
    key: "ventas",
    icon: TrendingUp,
    emoji: "📈",
    title: "Ventas y Marketing",
    hint: "Atraer más clientes o vender mejor lo que ya haces.",
    empathy:
      "Vender más no es solo un problema de esfuerzo. Normalmente hay que revisar al mismo tiempo la propuesta de valor, la segmentación, los canales y cómo tu equipo acompaña al cliente. Antes de proponer una ruta, quiero entender dónde está el mayor cuello en tu organización.",
    questions: [
      "¿Sientes que el reto está más en atraer clientes nuevos o en retener los que ya tienes?",
      "¿Tu equipo comercial ya tiene un proceso definido o cada quien vende a su manera?",
      "¿Qué tan claro tienes hoy quién es tu cliente ideal?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "Vender más no siempre es vender a todos.", tag: "Comprensión" },
      { title: "Fortalecer capacidades comerciales", detail: "Diagnóstico y modelo comercial.", tag: "Capacidad" },
      { title: "Explorar herramientas de marketing", detail: "Marca, contenido y canales digitales.", tag: "Capacidad" },
      { title: "Proyecto aplicado con estudiantes", detail: "Investigación de mercado o estrategia de canal.", tag: "Proyecto" },
      { title: "Capacitación especializada", detail: "Formación a la medida para tu equipo.", tag: "Formación" },
      { title: "Beneficios disponibles", detail: "Becas y descuentos para tu organización.", tag: "Beneficio" },
      { title: "Construyamos juntos", detail: "Un consultor te acompaña en el siguiente paso.", tag: "Conexión" },
    ],
  },
  {
    key: "productividad",
    icon: Cog,
    emoji: "⚙",
    title: "Productividad y Procesos",
    hint: "Hacer lo mismo con menos esfuerzo o en menos tiempo.",
    empathy:
      "Hacer más con lo mismo suele esconderse en detalles del día a día: procesos que se detienen, información que no fluye, tareas repetidas que podrían estandarizarse. El primer paso es identificar dónde se pierde realmente el tiempo o el dinero.",
    questions: [
      "¿En qué parte del proceso sientes que se pierde más tiempo o dinero?",
      "¿Ya han mapeado sus procesos actuales o partirían desde cero?",
      "¿El principal reto es de personas, herramientas o de método?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "Identificamos dónde se pierde valor.", tag: "Comprensión" },
      { title: "Optimización de procesos", detail: "Mapeo, cuellos de botella y rediseño.", tag: "Capacidad" },
      { title: "Automatización de tareas", detail: "Herramientas y flujos digitales.", tag: "Capacidad" },
      { title: "Proyecto aplicado", detail: "Un equipo interdisciplinario acompaña la mejora.", tag: "Proyecto" },
      { title: "Formación al equipo", detail: "Lean, gestión operativa, mejora continua.", tag: "Formación" },
      { title: "Construyamos juntos", detail: "Coordinamos la siguiente conversación.", tag: "Conexión" },
    ],
  },
  {
    key: "digital",
    icon: Bot,
    emoji: "🤖",
    title: "Transformación Digital e IA",
    hint: "Aprovechar datos, automatización e inteligencia artificial.",
    empathy:
      "Digitalizar no es reemplazar personas por software. El verdadero cambio está en cómo se toman decisiones: qué datos se usan, qué procesos se automatizan primero y qué habilidades necesita el equipo. Empecemos por el problema concreto que quieres resolver.",
    questions: [
      "¿Ya usan datos para tomar decisiones o aún dependen mucho de la intuición?",
      "¿Qué proceso les gustaría automatizar primero si pudieran?",
      "¿Han explorado casos de uso de inteligencia artificial en su industria?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "Digitalizar no es lo mismo que transformar.", tag: "Comprensión" },
      { title: "Diagnóstico de madurez digital", detail: "Punto de partida claro y realista.", tag: "Capacidad" },
      { title: "Casos de uso con IA", detail: "Priorización de oportunidades reales.", tag: "Capacidad" },
      { title: "Proyecto piloto", detail: "Un prototipo funcional con estudiantes y docentes.", tag: "Proyecto" },
      { title: "Formación en datos e IA", detail: "Programas para líderes y equipos técnicos.", tag: "Formación" },
      { title: "Construyamos juntos", detail: "Explora una alianza de innovación aplicada.", tag: "Conexión" },
    ],
  },
  {
    key: "talento",
    icon: Users,
    emoji: "👥",
    title: "Talento Humano y Liderazgo",
    hint: "Desarrollar personas, líderes y cultura.",
    empathy:
      "Los problemas de talento casi nunca son solo de una persona o un puesto. Suelen estar ligados a liderazgo, claridad de roles, cultura y a cómo se reconoce el aprendizaje. Quiero entender primero qué está forzando la salida o el desgaste.",
    questions: [
      "¿El reto está más en atraer talento, desarrollarlo o retenerlo?",
      "¿Sus líderes tienen espacios de formación hoy?",
      "¿Cómo describirías la cultura actual en una frase?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "El talento define el techo de la organización.", tag: "Comprensión" },
      { title: "Desarrollo de liderazgo", detail: "Programas para líderes actuales y futuros.", tag: "Capacidad" },
      { title: "Cultura y clima", detail: "Diagnóstico y planes de intervención.", tag: "Capacidad" },
      { title: "Formación a la medida", detail: "Rutas diseñadas para tu equipo.", tag: "Formación" },
      { title: "Beneficios para colaboradores", detail: "Educación continua y becas.", tag: "Beneficio" },
      { title: "Construyamos juntos", detail: "Diseñamos una ruta para tu gente.", tag: "Conexión" },
    ],
  },
  {
    key: "finanzas",
    icon: Wallet,
    emoji: "💰",
    title: "Finanzas",
    hint: "Rentabilidad, costos, decisiones financieras.",
    empathy:
      "Los números de una organización cuentan una historia, pero a veces la historia está en los indicadores que no se miden o en las decisiones que se toman sin información. Quiero entender si el reto es más de costos, ingresos, liquidez o de planeación.",
    questions: [
      "¿El reto está más en costos, ingresos o en cómo se toman decisiones financieras?",
      "¿Tienen indicadores financieros claros que revisen periódicamente?",
      "¿Están buscando crecer, sostenerse o reestructurarse?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "Detrás de los números hay decisiones.", tag: "Comprensión" },
      { title: "Análisis financiero", detail: "Estructura de costos y rentabilidad.", tag: "Capacidad" },
      { title: "Planeación financiera", detail: "Proyecciones y toma de decisiones.", tag: "Capacidad" },
      { title: "Proyecto aplicado", detail: "Un equipo acompaña un diagnóstico específico.", tag: "Proyecto" },
      { title: "Formación en finanzas", detail: "Programas para no financieros y líderes.", tag: "Formación" },
      { title: "Construyamos juntos", detail: "Definimos el mejor punto de partida.", tag: "Conexión" },
    ],
  },
  {
    key: "logistica",
    icon: Package,
    emoji: "📦",
    title: "Logística",
    hint: "Cadena de suministro, distribución, tiempos.",
    empathy:
      "La logística afecta tanto la experiencia del cliente como la rentabilidad. Los retrasos, los inventarios desbalanceados o los altos costos de transporte suelen venir de decisiones tomadas en etapas anteriores. Vamos a ver dónde empieza la cadena de demoras.",
    questions: [
      "¿El principal reto está en abastecimiento, operación interna o distribución?",
      "¿Miden tiempos y costos de forma sistemática?",
      "¿Han evaluado tecnología o rediseño de rutas?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "La logística conecta promesa y experiencia.", tag: "Comprensión" },
      { title: "Optimización de cadena", detail: "Análisis de flujos y costos.", tag: "Capacidad" },
      { title: "Planeación de operaciones", detail: "Modelos y herramientas.", tag: "Capacidad" },
      { title: "Proyecto aplicado", detail: "Estudiantes acompañan un caso real.", tag: "Proyecto" },
      { title: "Formación especializada", detail: "Supply chain y operaciones.", tag: "Formación" },
      { title: "Construyamos juntos", detail: "Un consultor te contacta.", tag: "Conexión" },
    ],
  },
  {
    key: "calidad",
    icon: ShieldCheck,
    emoji: "🛡",
    title: "Calidad",
    hint: "Estándares, mejora continua, certificaciones.",
    empathy:
      "Las devoluciones, los errores recurrentes o las quejas de cliente normalmente apuntan a varios factores a la vez: estandarización del proceso, control de calidad, capacitación del personal o incluso la comunicación con el cliente. Antes de construir una ruta, quiero entender un poco mejor qué está ocurriendo en tu organización.",
    questions: [
      "¿El problema se concentra en una etapa específica del proceso o aparece en varias partes?",
      "¿La calidad se gestiona hoy como un área o como una cultura?",
      "¿Han recibido retroalimentación repetida de clientes últimamente?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "La calidad es cultura antes que norma.", tag: "Comprensión" },
      { title: "Sistemas de gestión", detail: "Diseño e implementación.", tag: "Capacidad" },
      { title: "Mejora continua", detail: "Metodologías aplicadas al día a día.", tag: "Capacidad" },
      { title: "Formación en calidad", detail: "Auditores internos y líderes.", tag: "Formación" },
      { title: "Construyamos juntos", detail: "Definimos alcance y acompañamiento.", tag: "Conexión" },
    ],
  },
  {
    key: "sostenibilidad",
    icon: Leaf,
    emoji: "🌱",
    title: "Sostenibilidad",
    hint: "Gestión ambiental, ESG, impacto positivo.",
    empathy:
      "La sostenibilidad ya no es un tema aparte: afecta costos, riesgos, reputación y acceso a mercados. El reto suele estar en decidir por dónde empezar: cumplimiento, eficiencia, medición o cultura. Vamos a clarificar primero tu punto de partida.",
    questions: [
      "¿El reto está en cumplimiento, reputación o modelo de negocio?",
      "¿Ya reportan indicadores ambientales o sociales?",
      "¿Su cliente final valora estos temas hoy?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "Sostenibilidad genera valor, no solo reporte.", tag: "Comprensión" },
      { title: "Diagnóstico ESG", detail: "Punto de partida claro.", tag: "Capacidad" },
      { title: "Gestión ambiental", detail: "Herramientas y modelos.", tag: "Capacidad" },
      { title: "Proyecto aplicado", detail: "Un equipo interdisciplinario acompaña.", tag: "Proyecto" },
      { title: "Formación en sostenibilidad", detail: "Programas para líderes.", tag: "Formación" },
      { title: "Construyamos juntos", detail: "Diseñamos una hoja de ruta.", tag: "Conexión" },
    ],
  },
  {
    key: "innovacion",
    icon: Lightbulb,
    emoji: "🚀",
    title: "Innovación",
    hint: "Nuevos productos, modelos o formas de crecer.",
    empathy:
      "Innovar no siempre es inventar algo nuevo. Muchas veces el problema es cómo se detectan oportunidades, cómo se prueban ideas o cómo se escala lo que ya funciona. Quiero entender si el reto es más de ideas, de validación o de ejecución.",
    questions: [
      "¿Están buscando innovar en producto, en experiencia o en modelo de negocio?",
      "¿Cuentan con un espacio o proceso dedicado a la innovación?",
      "¿Qué tanto conocen a su cliente final hoy?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "Innovar es un músculo, no un evento.", tag: "Comprensión" },
      { title: "Diseño e investigación", detail: "Explorar necesidades reales.", tag: "Capacidad" },
      { title: "Prototipado y validación", detail: "Aprender antes de invertir.", tag: "Capacidad" },
      { title: "Proyecto aplicado", detail: "Un equipo diseña contigo.", tag: "Proyecto" },
      { title: "Formación en innovación", detail: "Design thinking, lean, agile.", tag: "Formación" },
      { title: "Construyamos juntos", detail: "Alianza de innovación aplicada.", tag: "Conexión" },
    ],
  },
  {
    key: "planeacion",
    icon: Target,
    emoji: "📊",
    title: "Planeación Estratégica",
    hint: "Definir hacia dónde ir y cómo llegar.",
    empathy:
      "Cuando una organización siente que no avanza con dirección, suele haber una mezcla de falta de claridad estratégica, prioridades conflictivas o dificultad para pasar del plan a la acción. Quiero entender primero qué parte se siente más débil.",
    questions: [
      "¿Tienen un plan estratégico vigente o necesitan construir uno?",
      "¿El reto está en definirlo o en ejecutarlo?",
      "¿Qué horizonte de tiempo están mirando?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "La estrategia es tomar decisiones difíciles.", tag: "Comprensión" },
      { title: "Diagnóstico estratégico", detail: "Dónde están hoy y dónde quieren estar.", tag: "Capacidad" },
      { title: "Planeación y ejecución", detail: "Del plan a la acción.", tag: "Capacidad" },
      { title: "Formación para líderes", detail: "Estrategia y liderazgo.", tag: "Formación" },
      { title: "Construyamos juntos", detail: "Un consultor te acompaña.", tag: "Conexión" },
    ],
  },
  {
    key: "internacionalizacion",
    icon: Globe2,
    emoji: "🌎",
    title: "Internacionalización",
    hint: "Expandirte a nuevos mercados y geografías.",
    empathy:
      "Entrar a un nuevo mercado es un reto de producto, canal, regulación y cultura al mismo tiempo. A veces el problema parece ser uno solo, pero rápidamente se descubren otros que deben resolverse primero. Empecemos por tu mercado objetivo y tu experiencia previa.",
    questions: [
      "¿Están explorando mercados específicos o aún evaluando alternativas?",
      "¿El reto está más en producto, canal o cumplimiento?",
      "¿Ya han tenido experiencias previas fuera del país?",
    ],
    route: [
      { title: "Comprendimos tu desafío", detail: "Cada mercado tiene sus reglas.", tag: "Comprensión" },
      { title: "Inteligencia de mercados", detail: "Investigación y priorización.", tag: "Capacidad" },
      { title: "Estrategia de entrada", detail: "Canales, alianzas y modelo.", tag: "Capacidad" },
      { title: "Proyecto aplicado", detail: "Estudiantes investigan un mercado meta.", tag: "Proyecto" },
      { title: "Formación en comercio internacional", detail: "Programas especializados.", tag: "Formación" },
      { title: "Construyamos juntos", detail: "Un consultor te contacta.", tag: "Conexión" },
    ],
  },
  {
    key: "indefinido",
    icon: Heart,
    emoji: "❤️",
    title: "No estoy seguro",
    hint: "Está bien no tenerlo claro todavía.",
    empathy:
      "Muchas conversaciones importantes empiezan sin un diagnóstico claro. Eso está bien. Lo que necesitamos es encontrar el punto de presión: algo que te inquieta, que se repite o que te está frenando. Vamos a explorarlo juntos.",
    questions: [
      "¿Qué te trajo hoy a explorar? ¿Algo que te está inquietando?",
      "¿Hay algún área de tu organización donde sientas más presión?",
      "¿Prefieres explorar por tu cuenta o que alguien te acompañe?",
    ],
    route: [
      { title: "Está bien no saberlo aún", detail: "Empezamos por escuchar.", tag: "Comprensión" },
      { title: "Explorar capacidades", detail: "Un panorama general para ubicarte.", tag: "Capacidad" },
      { title: "Conversación exploratoria", detail: "Sin compromiso, con un consultor.", tag: "Conexión" },
    ],
  },
];

export const CAPACIDADES: Capacidad[] = [
  {
    icon: Cog,
    title: "Optimización de procesos",
    desc: "Mapeo, mejora continua y eficiencia operacional.",
    alternativas: ["Diagnóstico de procesos", "Mapeo y rediseño", "Automatización de tareas", "Formación en Lean"],
  },
  {
    icon: TrendingUp,
    title: "Estrategia comercial",
    desc: "Modelo comercial, canales y experiencia de cliente.",
    alternativas: ["Diagnóstico comercial", "Diseño de modelo de ventas", "Estrategia de canales", "Capacitación en ventas"],
  },
  {
    icon: Sparkles,
    title: "Marketing Digital",
    desc: "Contenido, publicidad digital, métricas y redes sociales.",
    alternativas: ["Estrategia de contenidos", "Publicidad digital", "Analítica y métricas", "Presencia en redes sociales"],
  },
  {
    icon: Bot,
    title: "Transformación Digital e Inteligencia Artificial",
    desc: "Datos, automatización e inteligencia artificial aplicada.",
    alternativas: ["Diagnóstico de madurez digital", "Casos de uso de IA", "Automatización con datos", "Proyectos piloto"],
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    desc: "Diseño, prototipado y validación con usuarios reales.",
    alternativas: ["Design thinking", "Prototipado", "Validación de ideas", "Estrategia de innovación"],
  },
  {
    icon: Users,
    title: "Liderazgo",
    desc: "Desarrollo de líderes y equipos de alto desempeño.",
    alternativas: ["Programas de liderazgo", "Desarrollo de equipos", "Cultura organizacional", "Coaching ejecutivo"],
  },
  {
    icon: ShieldCheck,
    title: "Calidad",
    desc: "Sistemas de gestión y mejora continua.",
    alternativas: ["Sistemas de gestión de calidad", "Auditoría interna", "Mejora continua", "Certificaciones"],
  },
  {
    icon: Package,
    title: "Logística",
    desc: "Cadena de suministro, planeación y distribución.",
    alternativas: ["Optimización de cadena de suministro", "Planeación de rutas", "Gestión de inventarios", "Tecnología logística"],
  },
  {
    icon: Target,
    title: "Planeación Estratégica",
    desc: "Del diagnóstico a la ejecución con foco.",
    alternativas: ["Diagnóstico estratégico", "Construcción de plan", "Gestión de objetivos", "Acompañamiento en ejecución"],
  },
  {
    icon: Leaf,
    title: "Gestión Ambiental",
    desc: "ESG, medición de impacto y cumplimiento ambiental.",
    alternativas: ["Diagnóstico ESG", "Gestión ambiental", "Medición de impacto", "Reportes de sostenibilidad"],
  },
  {
    icon: GraduationCap,
    title: "Formación a la medida",
    desc: "Rutas de aprendizaje diseñadas para tu equipo.",
    alternativas: ["Diplomados corporativos", "Certificaciones", "Cursos cortos", "Programas de educación continua"],
  },
];

export const BENEFICIOS: Beneficio[] = [
  {
    icon: GraduationCap,
    title: "Becas empresariales",
    desc: "Apoyo para colaboradores en programas académicos.",
    alternativas: ["Becas para empleados", "Programas de talento", "Formación continua", "Desarrollo profesional"],
  },
  {
    icon: BadgeCheck,
    title: "Descuentos corporativos",
    desc: "Tarifas preferenciales en educación continua.",
    alternativas: ["Descuentos en diplomados", "Tarifas especiales", "Paquetes corporativos", "Beneficios por volumen"],
  },
  {
    icon: Handshake,
    title: "Convenios institucionales",
    desc: "Alianzas de largo plazo con beneficios mutuos.",
    alternativas: ["Convenios de cooperación", "Intercambio de conocimiento", "Proyectos conjuntos", "Networking institucional"],
  },
  {
    icon: Sparkles,
    title: "Beneficios para empleados",
    desc: "Bienestar, formación y comunidad.",
    alternativas: ["Programas de bienestar", "Actividades culturales", "Comunidad de aprendizaje", "Descuentos especiales"],
  },
  {
    icon: LineChart,
    title: "Educación continua",
    desc: "Programas cortos, diplomados y certificaciones.",
    alternativas: ["Cursos cortos", "Diplomados", "Certificaciones", "Seminarios especializados"],
  },
  {
    icon: Rocket,
    title: "Otros incentivos",
    desc: "Acceso a laboratorios, eventos y comunidad.",
    alternativas: ["Acceso a laboratorios", "Eventos exclusivos", "Comunidad de innovación", "Recursos académicos"],
  },
];

export const FORMAS_COLABORAR = [
  "Proyectos aplicados",
  "Prácticas empresariales",
  "Investigación conjunta",
  "Innovación aplicada",
  "Consultoría especializada",
  "Trabajos de grado con foco empresarial",
];

/* ---------- Ruta Inicial (cierre consultivo) ---------- */

export type RutaTipo =
  | "comercial"
  | "operacional"
  | "digital"
  | "organizacional"
  | "sostenibilidad";

export interface RutaInicialDef {
  tipo: RutaTipo;
  emoji: string;
  nombre: string;
  descripcionCorta: string;
  capacidades: { titulo: string; icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }> }[];
  reflexion: string;
  lectura: (userAnswers: string[], challengeTitle: string) => string[];
}

const lecturaBase = (verboSintesis: string) =>
  (userAnswers: string[], challengeTitle: string): string[] => {
    const [a1, a2, a3] = userAnswers;
    const ideas: string[] = [];
    ideas.push(
      `Identificamos que el desafío principal de tu organización se relaciona con ${challengeTitle.toLowerCase()}.`,
    );
    if (a1) ideas.push(`Compartiste algo importante: "${a1}". Esta descripción nos da un punto de partida claro para orientar la conversación.`);
    if (a2) ideas.push(`También mencionaste: "${a2}". Ese matiz cambia por completo la forma de abordar el reto y define dónde conviene ${verboSintesis} primero.`);
    if (a3) ideas.push(`Finalmente nos dijiste: "${a3}". Con esta información podemos priorizar sin asumir más de lo necesario.`);
    if (ideas.length < 4) {
      ideas.push(
        "Con lo compartido no pretendemos tener todas las respuestas, pero sí una hipótesis de trabajo suficientemente sólida para iniciar una conversación productiva.",
      );
    }
    return ideas.slice(0, 4);
  };

export const RUTAS_INICIALES: Record<RutaTipo, RutaInicialDef> = {
  comercial: {
    tipo: "comercial",
    emoji: "📈",
    nombre: "Ruta de Crecimiento Comercial",
    descripcionCorta: "Orientada a fortalecer cómo tu organización llega, conecta y crece con sus clientes.",
    capacidades: [
      { titulo: "Estrategia comercial", icon: TrendingUp },
      { titulo: "Marketing estratégico", icon: Sparkles },
      { titulo: "Analítica para la toma de decisiones", icon: LineChart },
      { titulo: "Formación para equipos comerciales", icon: GraduationCap },
      { titulo: "Innovación centrada en el cliente", icon: Lightbulb },
    ],
    reflexion:
      "Las organizaciones que crecen de manera sostenible no solo consiguen más clientes; también comprenden mejor a quienes ya confían en ellas.",
    lectura: lecturaBase("intervenir"),
  },
  operacional: {
    tipo: "operacional",
    emoji: "⚙️",
    nombre: "Ruta de Excelencia Operacional",
    descripcionCorta: "Enfocada en cómo el día a día de tu organización puede producir más valor con menos fricción.",
    capacidades: [
      { titulo: "Optimización de procesos", icon: Cog },
      { titulo: "Gestión de calidad", icon: ShieldCheck },
      { titulo: "Logística y cadena de valor", icon: Package },
      { titulo: "Analítica para la toma de decisiones", icon: LineChart },
      { titulo: "Formación para equipos operativos", icon: GraduationCap },
    ],
    reflexion:
      "La productividad rara vez mejora haciendo que las personas trabajen más. Generalmente mejora cuando los procesos funcionan mejor.",
    lectura: lecturaBase("mejorar"),
  },
  digital: {
    tipo: "digital",
    emoji: "🤖",
    nombre: "Ruta de Transformación Digital",
    descripcionCorta: "Pensada para usar datos, automatización e inteligencia artificial con un propósito claro.",
    capacidades: [
      { titulo: "Transformación digital", icon: Bot },
      { titulo: "Analítica y datos", icon: LineChart },
      { titulo: "Automatización de procesos", icon: Cog },
      { titulo: "Innovación aplicada", icon: Lightbulb },
      { titulo: "Formación para equipos", icon: GraduationCap },
    ],
    reflexion:
      "La transformación digital no empieza con la tecnología. Empieza identificando dónde una mejor forma de trabajar puede generar más valor.",
    lectura: lecturaBase("digitalizar"),
  },
  organizacional: {
    tipo: "organizacional",
    emoji: "👥",
    nombre: "Ruta de Fortalecimiento Organizacional",
    descripcionCorta: "Diseñada para alinear personas, liderazgo y estrategia en una misma dirección.",
    capacidades: [
      { titulo: "Desarrollo de liderazgo", icon: Users },
      { titulo: "Planeación estratégica", icon: Target },
      { titulo: "Cultura y gestión del cambio", icon: Heart },
      { titulo: "Formación a la medida", icon: GraduationCap },
      { titulo: "Analítica para la toma de decisiones", icon: LineChart },
    ],
    reflexion:
      "Los resultados sostenibles suelen construirse cuando las personas, los procesos y los objetivos avanzan en la misma dirección.",
    lectura: lecturaBase("acompañar"),
  },
  sostenibilidad: {
    tipo: "sostenibilidad",
    emoji: "🌱",
    nombre: "Ruta de Sostenibilidad e Innovación",
    descripcionCorta: "Para organizaciones que quieren generar valor cuidando el impacto y explorando nuevas oportunidades.",
    capacidades: [
      { titulo: "Gestión ambiental y ESG", icon: Leaf },
      { titulo: "Innovación aplicada", icon: Lightbulb },
      { titulo: "Planeación estratégica", icon: Target },
      { titulo: "Internacionalización", icon: Globe2 },
      { titulo: "Formación a la medida", icon: GraduationCap },
    ],
    reflexion:
      "Las organizaciones más resilientes son las que aprenden a crecer sin comprometer aquello de lo que dependen: personas, entorno y confianza.",
    lectura: lecturaBase("explorar"),
  },
};

export function rutaForChallenge(key: ChallengeKey): RutaInicialDef {
  const map: Record<ChallengeKey, RutaTipo> = {
    ventas: "comercial",
    productividad: "operacional",
    logistica: "operacional",
    calidad: "operacional",
    finanzas: "operacional",
    digital: "digital",
    talento: "organizacional",
    planeacion: "organizacional",
    indefinido: "organizacional",
    sostenibilidad: "sostenibilidad",
    innovacion: "sostenibilidad",
    internacionalizacion: "sostenibilidad",
  };
  return RUTAS_INICIALES[map[key]];
}

export const FORMAS_CONSTRUIR = [
  { titulo: "Consultoría especializada", desc: "Un acompañamiento cercano para abordar un reto puntual con criterio experto." },
  { titulo: "Formación a la medida", desc: "Rutas de aprendizaje diseñadas para tu equipo y tu contexto." },
  { titulo: "Retos de innovación", desc: "Un espacio para explorar preguntas complejas junto a estudiantes y docentes." },
  { titulo: "Prácticas empresariales", desc: "Talento en formación aportando ideas nuevas a proyectos reales." },
  { titulo: "Proyectos aplicados", desc: "Equipos interdisciplinarios trabajando contigo sobre casos concretos." },
];
