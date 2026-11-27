import { SkillCategory, Skill } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    "id": "agentic_ai",
    "name": "AGENTIC AI & MULTI-AGENT",
    "icon": "\ud83e\udd16"
  },
  {
    "id": "rag_search",
    "name": "ENTERPRISE RAG & VECTOR",
    "icon": "\ud83d\udd0d"
  },
  {
    "id": "fde_delivery",
    "name": "FORWARD DEPLOYED & CLIENT",
    "icon": "\ud83d\ude80"
  },
  {
    "id": "backend_api",
    "name": "BACKEND & DATA SYSTEMS",
    "icon": "\u2699\ufe0f"
  },
  {
    "id": "eval_safety",
    "name": "EVALS, SAFETY & GOVERNANCE",
    "icon": "\ud83d\udee1\ufe0f"
  },
  {
    "id": "cloud_llmops",
    "name": "CLOUD & LLMOPS",
    "icon": "\u2601\ufe0f"
  }
];

export const skills: Skill[] = [
  {
    "id": "skill_agents",
    "category": "agentic_ai",
    "title": "Agentic AI & Multi-Agent Orchestration",
    "icon": "\ud83e\udd16",
    "items": [
      "LangGraph",
      "Multi-Agent Supervisors",
      "Autonomous ReAct Loops",
      "Tool Calling & Schema Binding",
      "Human-in-the-Loop (HITL)",
      "Stateful Memory & Checkpointing",
      "Agent Sandboxes (E2B / Docker)",
      "Plan-and-Solve Architectures"
    ]
  },
  {
    "id": "skill_rag",
    "category": "rag_search",
    "title": "Enterprise RAG & Information Retrieval",
    "icon": "\ud83d\udd0d",
    "items": [
      "Hybrid Search (Dense + BM25)",
      "Vector DBs (Qdrant, Pinecone, Chroma)",
      "Cohere Cross-Encoder Re-ranking",
      "Context Compression & Filtering",
      "LlamaParse & PDF Extraction",
      "Query Routing & Semantic Chunking",
      "GraphRAG & Knowledge Graphs",
      "Multi-Tenant Vector Isolation"
    ]
  },
  {
    "id": "skill_fde",
    "category": "fde_delivery",
    "title": "Forward Deployed & Client Engineering",
    "icon": "\ud83d\ude80",
    "items": [
      "POC-to-Production Velocity",
      "Document Intelligence (Invoices / AP / AR)",
      "Enterprise API & ERP Integration",
      "Client Discovery & Technical Scoping",
      "Deterministic Fallback Strategies",
      "Latency & Token Cost Optimization",
      "Stakeholder Alignment & Demo Delivery",
      "On-Premise & VPC Deployments"
    ]
  },
  {
    "id": "skill_backend",
    "category": "backend_api",
    "title": "Production Backend & Data Engineering",
    "icon": "\u2699\ufe0f",
    "items": [
      "Python (AsyncIO, Pydantic v2)",
      "FastAPI & Streaming (SSE / WebSockets)",
      "PostgreSQL & SQLAlchemy ORM",
      "Redis (Distributed Caching & Queues)",
      "Celery Background Task Workers",
      "Docker & Container Orchestration",
      "RESTful Microservice Architecture",
      "Automated CI/CD Workflows"
    ]
  },
  {
    "id": "skill_eval",
    "category": "eval_safety",
    "title": "LLM Evaluation, Safety & Governance",
    "icon": "\ud83d\udee1\ufe0f",
    "items": [
      "Ragas & DeepEval Frameworks",
      "LLM-as-a-Judge Synthetic Evals",
      "NeMo Guardrails & Llama Guard",
      "Prompt Injection & Jailbreak Defense",
      "PII Redaction & Compliance (DLP)",
      "Open Policy Agent (OPA & Rego)",
      "Hallucination & Faithfulness Scoring",
      "Zero-Trust Workload Identity (SPIFFE)"
    ]
  },
  {
    "id": "skill_cloud",
    "category": "cloud_llmops",
    "title": "Cloud Infrastructure & LLMOps",
    "icon": "\u2601\ufe0f",
    "items": [
      "AWS Bedrock (Claude 3.5, Titan)",
      "Azure OpenAI Services",
      "LangSmith Tracing & Observability",
      "OpenTelemetry Instrumentation",
      "High-Throughput Serving (vLLM, Ollama)",
      "Rate Limiting & Token Budgeting",
      "GitHub Actions CI/CD Automation",
      "Cost Monitoring & SLI/SLO Alerting"
    ]
  }
];
