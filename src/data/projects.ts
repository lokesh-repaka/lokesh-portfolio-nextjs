import { ProjectCategory, Project } from "@/types";

export const projectCategories: ProjectCategory[] = [
  {
    "id": "automation",
    "name": "ENTERPRISE AI & AUTOMATION"
  },
  {
    "id": "agents",
    "name": "AGENTIC AI & MULTI-AGENT SYSTEMS"
  },
  {
    "id": "rag",
    "name": "ENTERPRISE RAG & VECTOR PLATFORMS"
  }
];

export const projects: Project[] = [
  {
    "id": "enterprise_ap",
    "title": "Enterprise AP Invoice Automation Platform (ApexAP)",
    "category": "automation",
    "desc": "Autonomous, audit-grade Accounts Payable Automation Platform engineered for multinational enterprises across the US and Europe. Transforms high-volume finance operations by eliminating manual data entry, detecting reconciliation anomalies, and executing automated 3-way purchase order matching (Invoice vs PO vs Goods Receipt) in seconds. Achieved an enterprise-grade 90.00% Straight-Through Processing (STP) rate\u2014drastically cutting cycle times from days to seconds while enforcing strict statutory tax compliance and 7-year tamper-proof immutable audit storage.",
    "tags": [
      "FastAPI",
      "Python 3.11",
      "React 18",
      "Azure East US 2",
      "3-Way PO Matching",
      "WORM Storage",
      "Docker",
      "Vercel"
    ],
    "url": "https://github.com/lokesh-repaka/enterprise-ap-invoice-automation",
    "liveUrl": "https://enterprise-ap-invoice-automation.vercel.app",
    "theme": "amber"
  },
  {
    "id": "clouddesk_support",
    "title": "CloudDesk \u2014 Autonomous Support Resolution Platform",
    "category": "agents",
    "desc": "Enterprise-grade AI Support Copilot and Autonomous Resolution Platform built for 24/7 mission-critical cloud SaaS operations. Orchestrates a coordinated multi-agent team that diagnoses complex technical issues, retrieves accurate product documentation, and formulates verified resolutions to reduce ticket resolution times by over 65%. Features deterministic financial governance and human supervisor approval gates for high-risk operations like billing adjustments and service refunds\u2014ensuring autonomous speed with zero risk of unauthorized account mutations.",
    "tags": [
      "LangGraph",
      "FastAPI",
      "Next.js 15",
      "Hybrid RAG",
      "Human-in-the-Loop",
      "Qdrant",
      "Redis",
      "Docker"
    ],
    "url": "https://github.com/lokesh-repaka/CloudDesk",
    "liveUrl": "https://clouddesk-lokesh.vercel.app",
    "theme": "blue"
  },
  {
    "id": "apexmotion_risk",
    "title": "ApexMotion \u2014 Supplier Risk Intelligence Platform",
    "category": "agents",
    "desc": "Executive-tier Supply Chain Disruption Intelligence & Operational Governance Platform engineered for a Tier-1 electric vehicle manufacturer managing 4,500 global suppliers across 38 countries. Uncovers hidden vulnerabilities by mapping complex multi-tier supply networks (400,000+ relationships), predicting disruption impacts weeks before factory shortages occur. Features automated financial exposure forecasting, precise inventory days-of-cover intelligence, and cryptographic executive spend approval gates for emergency mitigation budgets exceeding $100,000.",
    "tags": [
      "LangGraph",
      "FastAPI",
      "React 18",
      "Amazon Neptune",
      "Apache Kafka",
      "AWS KMS ECDSA",
      "OpenSearch",
      "Docker"
    ],
    "url": "https://github.com/lokesh-repaka/apexmotion-supplier-risk-intelligence",
    "liveUrl": "https://apexmotion-supplier-risk.vercel.app",
    "theme": "green"
  },
  {
    "id": "rag_studio",
    "title": "RAG Studio & DocuMind AI \u2014 17-Stage Visual Pipeline Architecture & Multi-Agent Optimization Platform",
    "category": "rag",
    "desc": "Enterprise visual RAG engineering platform purpose-built to eliminate guesswork and months of manual boilerplate when designing production retrieval-augmented generation systems. Features an interactive 17-Stage Visual Designer (RAGForge) spanning Cloud Selection, Ingestion, Semantic Chunking, Embeddings, Vector Stores, HyDE Query Processing, Hybrid RRF Retrieval, Context Compression, Cross-Encoder Reranking, Generation, Routing, Memory, RAGAS Evaluation, Observability, NeMo Guardrails, HITL Governance, and 1-Click Code Generation (Terraform, Kubernetes, Docker, Python). Paired with an autonomous 6-specialist LangGraph optimization swarm (AutoRAG Architect) that empirically benchmarks pipeline permutations to drive hallucinations below 1.2%, plus a production reference enterprise documentation Q&A engine (DocuMind AI) delivering sub-second hybrid search.",
    "tags": [
      "17-Stage Designer",
      "Next.js 14",
      "FastAPI",
      "LangGraph",
      "Qdrant",
      "RAGAS",
      "Terraform",
      "Kubernetes"
    ],
    "url": "",
    "liveUrl": "https://rag-studio-web-three.vercel.app/designer",
    "theme": "purple"
  },
  {
    "id": "anomaly_engine",
    "title": "AnomalyEngine \u2014 Enterprise Multi-Tier Financial Fraud & Risk Detection Platform",
    "category": "automation",
    "desc": "High-throughput financial fraud and risk detection engine engineered for mission-critical banking ledgers and enterprise payment rails. Screens transactions in sub-15ms P99 latency across a 5-tier defense pipeline combining deterministic statutory compliance rules, dynamic vendor contract validations, statistical rolling baselines (Welford Z-scores), and unsupervised Isolation Forest machine learning. Automatically synthesizes explainable GenAI compliance dossiers for flagged incidents, accelerating regulatory audit triage while guaranteeing zero generative math on financial limits.\n\n\u26a0\ufe0f Deployment Note: In this live serverless cloud demonstration, the 842 MB Laya neural decision engine operates in high-speed simulated API mode to comply with serverless execution boundaries, while Tiers 1, 1b, 2, and 3 (Isolation Forest ML) and LLM explainability execute live in real time.",
    "tags": [
      "FastAPI",
      "Python 3.12",
      "React 18",
      "Scikit-Learn",
      "Isolation Forest",
      "Sub-15ms P99",
      "GenAI Audit",
      "Vercel"
    ],
    "url": "https://github.com/lokesh-repaka/anomaly-engine",
    "liveUrl": "https://anomaly-engine-two.vercel.app",
    "theme": "cyan"
  }
];
