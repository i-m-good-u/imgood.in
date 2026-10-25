export const identity = {
  name: 'GUDDU KUMAR',
  handle: 'guddu@bengaluru',
  tagline: "I build AI agents & distributed systems that don't go down.",
  location: 'Bengaluru, India',
  email: 'guddukumar032002@gmail.com',
  github: 'https://github.com/i-m-good-u',
  linkedin: 'https://linkedin.com/in/i-m-good-u',
  resumePath: '/Guddu_Kumar_Resume.pdf',
}

export const bootLines = [
  { text: 'IMGOOD BIOS v2.0.26 — Guddu Kumar', delay: 0 },
  { text: 'detecting hardware .......... [ OK ]  caffeine + mechanical keyboard', delay: 180 },
  { text: 'mounting /skills ............ [ OK ]  java 21 · python · sql', delay: 140 },
  { text: 'starting ai_agents.service .. [ OK ]  langgraph · bedrock · claude · gemini', delay: 160 },
  { text: 'starting kafka.service ...... [ OK ]  300K+ msgs/channel, zero sweat', delay: 150 },
  { text: 'loading side_quests ......... [ OK ]  bike.rides · iron.gym · blr.life', delay: 150 },
  { text: 'uptime guarantee ............ [ OK ]  systems that do not go down', delay: 170 },
  { text: '', delay: 120 },
  { text: 'boot complete. launching portfolio...', delay: 220 },
]

export const aboutLines = [
  '# about.md',
  '',
  'Backend engineer at Eloelo Group (Bengaluru), building AI media-generation',
  'and realtime social systems used by hundreds of thousands of people.',
  '',
  'Primary author of **Pilot** — a production LangGraph chat agent that plans',
  'and dispatches video, image & audio generation across 25+ models and',
  '6+ AI vendors. Shipped **Snappeats** solo — a meal-subscription platform',
  'live on Google Play, 5 microservices, ~780 tests, Terraform-defined AWS.',
  '',
  'I like my systems horizontally scalable, my debits idempotent,',
  'and my weekends on a motorcycle.',
]

export type Commit = {
  hash: string
  ref?: string
  title: string
  meta: string
  bullets: string[]
  tech: string[]
}

export const experience: Commit[] = [
  {
    hash: 'f4ab1e5',
    ref: 'HEAD -> main',
    title: 'feat(dolphin): ship Pilot — production LangGraph AI chat agent',
    meta: 'Eloelo Group · Software Engineer I · 2025 → now',
    bullets: [
      'Primary author from the first commit: plans & dispatches video/image/audio generation from chat across 25+ models and 6+ AI vendors',
      'plan → confirm → execute state machine with DB-as-state — crash-resilient, horizontally scalable, no in-memory checkpointer',
      'Auto Mode: tiered capability-aware model-selection engine with a hand-built Hinglish classifier at zero extra API cost',
      'Credit & billing flow: idempotent per-attempt debits, 5-attempt hard cap, refund on failure',
      'Infra hardening: vendor-offload cut worker memory 12GB → 4GB; central SSRF guard on all user-URL fetches',
    ],
    tech: ['Python', 'FastAPI', 'LangGraph', 'Java 21', 'Kafka', 'MongoDB', 'PostgreSQL'],
  },
  {
    hash: 'c0ffee1',
    title: 'perf(storytv): harden high-traffic OTT content-feed service',
    meta: 'Eloelo Group · StoryTv · 2024 → 2025',
    bullets: [
      'Primary author of core serving logic: async like/bookmark writes via SQS, Redis reader/writer split, request-timeout hardening',
      'Built the A/B experimentation backend as a standalone microservice — cohort- and version-gated rollouts across OTT apps',
    ],
    tech: ['Java 21', 'Spring Boot', 'Redis', 'PostgreSQL', 'AWS SQS', 'Kafka'],
  },
  {
    hash: 'beef300',
    title: 'feat(eloelo): realtime community server for 300K+ members/channel',
    meta: 'Eloelo Group · Eloelo app · Feb 2024 →',
    bullets: [
      'Discord-like community server over MQTT + Kafka driving 40% higher engagement; unread-store killed costly Mongo aggregations',
      'Queen & King Mode: live audio-room game on Redis Sorted Sets + Pub/Sub — avg session duration up 70%+',
    ],
    tech: ['Java', 'Spring Boot', 'MongoDB', 'Redis', 'Kafka', 'MQTT'],
  },
]

export type Project = {
  id: string
  cmd: string
  name: string
  blurb: string
  points: string[]
  tech: string[]
  link?: { label: string; href: string }
  accent: 'green' | 'amber' | 'cyan'
}

export const projects: Project[] = [
  {
    id: 'snappeats',
    cmd: 'open snappeats --store=google-play',
    name: 'SNAPPEATS',
    blurb: 'Meal-subscription & delivery platform. Architected, built and shipped solo. Live on Google Play.',
    points: [
      '5 Spring Boot services behind Spring Cloud Gateway — single JWT validation point for customer, rider & admin apps',
      'Wallet-backed daily-order pipeline: hold on order, capture on delivery, idempotent order generation',
      'Razorpay card/UPI with HMAC-verified webhooks; fail-closed Aadhaar eKYC gating automated 7-day rider payouts',
      'Geo-clustering auto-assignment balancing orders across riders',
      'Terraform-defined AWS (ECS Fargate, ALB, RDS, EventBridge) · GitHub Actions CI/CD · ~780 JUnit 5 + Mockito tests',
    ],
    tech: ['Java 21', 'Spring Boot 3.4', 'PostgreSQL', 'AWS ECS', 'Terraform', 'Razorpay'],
    link: { label: 'Google Play ↗', href: 'https://play.google.com/store/apps/details?id=com.snappeats' },
    accent: 'green',
  },
  {
    id: 'pilot',
    cmd: './pilot --mode=prod',
    name: 'PILOT',
    blurb: 'Production LangGraph AI chat agent. Talks to users, plans work, generates media.',
    points: [
      'Dispatches video, image & audio generation across 25+ models, 6+ AI vendors from a single chat interface',
      'Agent runs on Bedrock, Claude, Gemini and OpenAI with hybrid rule + LLM intent routing to cut cost',
      'DB-as-state design: survives crashes mid-plan, scales horizontally with zero sticky sessions',
    ],
    tech: ['LangGraph', 'Python', 'FastAPI', 'Bedrock', 'Claude', 'Kafka'],
    link: { label: 'Dolphin Studio ↗', href: 'https://www.trydolphin.ai/studio' },
    accent: 'cyan',
  },
  {
    id: 'community',
    cmd: 'kafka-consumer --topic=community',
    name: 'COMMUNITY SERVER',
    blurb: 'Discord-like realtime messaging for 300K+ members per channel.',
    points: [
      'MQTT + Kafka fan-out driving 40% higher engagement across the Eloelo live-social app',
      'Unread-messages store eliminated costly MongoDB aggregation pipelines on every open',
    ],
    tech: ['Java', 'MQTT', 'Kafka', 'MongoDB', 'Redis'],
    accent: 'amber',
  },
  {
    id: 'qk',
    cmd: 'redis-cli zrevrange leaderboard 0 9',
    name: 'QUEEN & KING MODE',
    blurb: 'Live audio-room game with timed competitions and realtime leaderboards.',
    points: [
      'Redis Sorted Sets + Pub/Sub + Kafka powering live rankings for thousands of concurrent rooms',
      'Average audio-room session duration up 70%+',
    ],
    tech: ['Redis', 'Kafka', 'Spring Boot', 'WebSockets'],
    accent: 'green',
  },
]

export type SkillGroup = { label: string; items: { name: string; level: number }[] }

export const skills: SkillGroup[] = [
  {
    label: 'languages',
    items: [
      { name: 'Java', level: 95 },
      { name: 'Python', level: 88 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    label: 'ai / llm',
    items: [
      { name: 'LangGraph', level: 92 },
      { name: 'Bedrock · Claude · Gemini · OpenAI', level: 90 },
      { name: 'Multi-LLM orchestration', level: 90 },
    ],
  },
  {
    label: 'backend',
    items: [
      { name: 'Spring Boot / Cloud Gateway', level: 95 },
      { name: 'FastAPI · Django', level: 84 },
      { name: 'Kafka · MQTT · SQS · WebSockets', level: 91 },
    ],
  },
  {
    label: 'data & cloud',
    items: [
      { name: 'PostgreSQL · MongoDB · Redis', level: 90 },
      { name: 'AWS (ECS · Lambda · RDS · S3)', level: 87 },
      { name: 'Terraform · Docker · GitHub Actions · OTel', level: 86 },
    ],
  },
]

export const life = [
  {
    file: 'bike.rides',
    title: 'Two wheels, open road',
    desc: 'Weekend motorcycle runs out of Bengaluru — Nandi at sunrise, coffee estates of Chikmagalur, the long way home. Throttle therapy after a week of distributed systems.',
    icon: '🏍',
  },
  {
    file: 'iron.gym',
    title: 'Gym freak',
    desc: 'Progressive overload isn’t just for Kafka partitions. Lifting daily — discipline compiles into everything else.',
    icon: '🏋',
  },
  {
    file: 'blr.home',
    title: 'Bengaluru',
    desc: 'Traffic, filter coffee, and the best tech energy in India. Building from the city that builds everything.',
    icon: '🌆',
  },
]

export const marqueeItems = [
  'JAVA', 'AI AGENTS', 'LANGGRAPH', 'KAFKA', 'SPRING BOOT', 'REDIS', 'TERRAFORM',
  'BIKE RIDES', 'IRON', 'BENGALURU', 'ZERO DOWNTIME', '300K+ REALTIME', 'SHIPS SOLO',
]
