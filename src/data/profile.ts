// Single source of truth for site content. Edit here; components read from this file.

export const profile = {
  name: 'Divik Bhaskar',
  location: 'Bengaluru, India',
  education: 'B.Tech Information Technology · VIT Vellore · 2024–2028',
  roles: ['Zero-Trust Cloud Architect', 'Backend Engineer', 'AI-Agent Systems Builder', 'Security Researcher'],
  tagline: "Most 'secure' systems trust the network. Mine doesn't trust anything.",
  summary:
    'I build the plumbing that decides whether a system holds up in production: how data is stored efficiently, retrieved fast, and protected without trusting the network. My work spans cloud security, backend optimization, AI agents and systems programming.',
  status: 'Open to backend / cloud engineering internships and roles — Bengaluru, hybrid or remote.',
  email: 'divikbhaskar@gmail.com',
  github: 'https://github.com/Hikunokyojin',
  linkedin: 'https://www.linkedin.com/in/divik-bhaskar',
}

export const strengths = [
  {
    title: 'Zero-Trust Cloud Architecture',
    body: 'Private endpoints, VNet isolation, managed identities and Key Vault — no public databases, no hardcoded secrets, no standing credentials.',
    icon: 'shield',
    skills: ['Azure Key Vault', 'VNet & Private Endpoints', 'Managed Identity', 'IAM / RBAC', 'JWT', 'DevSecOps', 'SonarQube', 'SCA scanning', 'AWS Lambda', 'EC2'],
  },
  {
    title: 'Backend & Data Optimization',
    body: 'API gateways, JWT middleware and data models designed for efficient storage and fast retrieval under real load.',
    icon: 'database',
    skills: ['ASP.NET Core', 'REST APIs', 'JWT', 'C#', 'Java', 'C++', 'SQL', 'MongoDB Atlas', 'Qdrant', 'SQLite', 'DBMS', 'Flask', 'Win32 APIs'],
  },
  {
    title: 'AI-Agent Systems',
    body: 'Multi-agent pipelines with LangGraph and AWS Bedrock — deterministic guards, bounded retries, observability and human approval gates.',
    icon: 'bot',
    skills: ['LangGraph', 'Multi-agent design', 'Prompt engineering', 'AWS Bedrock', 'AWS Lambda', 'Python', 'TypeScript', 'Qdrant'],
  },
] as const

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Java', 'C', 'C++', 'C#', 'SQL', 'TypeScript', 'Python'] },
  { group: 'Backend & Web', items: ['ASP.NET Core', 'React', 'Next.js', 'Flask', 'REST APIs', 'JWT'] },
  { group: 'Cloud', items: ['Azure Key Vault', 'VNet & Private Endpoints', 'Managed Identity', 'AWS Bedrock', 'AWS Lambda', 'EC2'] },
  { group: 'AI / ML', items: ['LangGraph', 'Multi-agent design', 'GNNs (PyG)', 'CodeBERT', 'Prompt engineering'] },
  { group: 'Security & DevOps', items: ['DevSecOps', 'SonarQube', 'SCA scanning', 'IAM / RBAC', 'CI/CD', 'Joern CPG'] },
  { group: 'Data & Systems', items: ['MongoDB Atlas', 'Qdrant', 'SQLite', 'Win32 APIs', 'DBMS', 'Computer Architecture'] },
]

export const experience = [
  {
    role: 'Summer Intern',
    org: 'Unisys',
    when: 'May – Jul 2026 · Bengaluru',
    points: [
      'Built LMBridge: connected an on-prem Win32 C++ app to Azure through a hardened ASP.NET Core API gateway',
      'Isolated the database with Private Endpoints + VNet Integration — zero public access',
      'Azure Key Vault + RBAC and managed identities; JWT issuance and validation middleware',
      'CI/CD with SonarQube static analysis and SCA dependency scanning',
    ],
  },
  { role: 'Senior Core', org: 'IEEE Computer Society – VIT', when: 'Jul 2025 – May 2026', points: [] },
  { role: 'Junior Core', org: 'CSI – VIT', when: 'Mar 2025 – Apr 2026', points: [] },
  {
    role: 'Event Director',
    org: "Valour '24, GEAR Foundation sports fest",
    when: '2024 · GEAR Innovative International School',
    points: [],
  },
]

export const education = [
  { school: 'Vellore Institute of Technology (VIT), Vellore', detail: 'B.Tech, Information Technology', when: '2024 – 2028' },
  { school: 'GEAR Innovative International School', detail: 'High School Diploma · Grades 1–12', when: '2012 – 2024' },
]

export const projects = [
  {
    name: 'SAGE',
    subtitle: 'Service-Agent Graph Ecosystem',
    period: 'Jul 2026 – present',
    role: 'Course project · VIT',
    highlight: '88.9% selection accuracy · 0% constraint violations',
    spec: {
      problem: 'Choosing the right cloud service for a requirement is slow and error-prone when done by hand across large service catalogs.',
      built: 'An AI marketplace on AWS where LangGraph agents (Intent → Broker → Negotiator → Reviewer → Explainer) find, select and explain a fit, with hybrid vector search, a rule-based prompt-injection guard and human approval gating.',
      result: 'A deterministic Negotiator beat an LLM-based one (88.9% vs 63.0% accuracy, 35% fewer LLM calls); a 27-case evaluation suite with a 6-condition ablation reached 0% constraint violations.',
    },
    tags: ['AWS Bedrock', 'AWS Lambda', 'LangGraph', 'TypeScript', 'Qdrant'],
    skills: ['TypeScript', 'AWS Bedrock', 'AWS Lambda', 'EC2', 'LangGraph', 'Multi-agent design', 'Prompt engineering', 'MongoDB Atlas', 'Qdrant', 'IAM / RBAC'],
  },
  {
    name: 'LMBridge',
    subtitle: 'Secure on-prem to Azure bridge',
    period: 'May – Jul 2026',
    role: 'Summer intern · Unisys',
    highlight: 'Zero hardcoded secrets · no public database access',
    spec: {
      problem: 'An on-prem Win32 C++ desktop application needed to reach Azure services without exposing credentials or the database.',
      built: 'A hardened ASP.NET Core API gateway with JWT issuance and validation, Azure Key Vault + RBAC, managed identities, and the database isolated behind Private Endpoints and VNet Integration.',
      result: 'No secrets in code, no public network path to the database, and CI/CD gated by SonarQube static analysis and SCA dependency scanning.',
    },
    tags: ['ASP.NET Core', 'C++', 'Azure Key Vault', 'JWT', 'DevSecOps'],
    skills: ['C++', 'C#', 'ASP.NET Core', 'REST APIs', 'JWT', 'Azure Key Vault', 'VNet & Private Endpoints', 'Managed Identity', 'DevSecOps', 'SonarQube', 'SCA scanning', 'IAM / RBAC', 'CI/CD'],
  },
  {
    name: 'Aegis',
    subtitle: 'Zero-day vulnerability detection',
    period: '2026',
    role: 'Research project',
    highlight: 'Pipeline built and tested · training in progress',
    spec: {
      problem: 'Treating source code as flat text misses vulnerabilities that only show up in how data and control flow across a function.',
      built: 'A Python pipeline that turns each C++/Java function into a Code Property Graph (AST + control flow + data flow via Joern), embeds nodes with CodeBERT and classifies them with a heterogeneous GNN.',
      result: 'Leak-free splitting on the BigVul dataset and a pytest suite covering every stage; model training and evaluation are under way.',
    },
    tags: ['Python', 'GNNs (PyG)', 'CodeBERT', 'Joern CPG'],
    skills: ['Python', 'Java', 'C++', 'GNNs (PyG)', 'CodeBERT', 'Joern CPG'],
  },
  {
    name: 'ThreadHaul-Daemon',
    subtitle: 'Adaptive CPU priority throttler',
    period: '2026',
    role: 'Team of 3',
    highlight: 'Native Windows service',
    spec: {
      problem: 'Batch workloads on a logistics dispatch server could starve critical processes of CPU time.',
      built: 'A C++ Windows service that samples CPU via Win32 APIs every second and runs a throttle → suspend → recover state machine with adaptive thresholds, a protection list and hot-reloaded JSON config.',
      result: 'Critical processes keep their CPU share while batch jobs are demoted or suspended and safely resumed, with every action audited to JSON Lines and the Windows Event Log.',
    },
    tags: ['C++', 'Win32 APIs', 'Windows Service', 'Systems'],
    skills: ['C++', 'Win32 APIs', 'Computer Architecture'],
  },
]

// Hosted apps: replace `url: null` with the live URL once an app is deployed.
export const apps: { name: string; body: string; url: string | null }[] = [
  { name: 'SAGE Marketplace', body: 'Ask for a cloud service in plain English; agents find, negotiate and explain the best fit.', url: null },
  { name: 'Coming soon', body: 'Another hosted application is on the way.', url: null },
  { name: 'Coming soon', body: 'Another hosted application is on the way.', url: null },
]
