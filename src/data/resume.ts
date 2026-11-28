import { ResumeData } from "@/types";

export const resumeData: ResumeData = {
  "skillsMatrix": [
    {
      "label": "Programming & Frameworks",
      "value": "Python, SQL, TensorFlow, PyTorch, LangChain, LlamaIndex, LangGraph Agents"
    },
    {
      "label": "Generative AI & LLMs",
      "value": "Enterprise RAG, Multi-Agent Systems, Agentic Workflows, Prompt Engineering, NeMo Guardrails"
    },
    {
      "label": "Cloud Platforms",
      "value": "AWS (Amazon SageMaker, Bedrock), Google Cloud (Vertex AI)"
    },
    {
      "label": "ML & NLP Libraries",
      "value": "Hugging Face, Scikit-Learn, Spacy, NLTK, OpenCV, NumPy, Pandas, Vector DBs (Qdrant, Chroma)"
    },
    {
      "label": "MLOps & Engineering",
      "value": "Docker, Git, CI/CD, FastAPI, Testing, Continuous Integration"
    }
  ],
  "experience": [
    {
      "id": "exp1",
      "title": "AI Engineer",
      "company": "Genpact, Hyderabad, India",
      "role": "Full-Time",
      "duration": "August 2023 \u2013 Present",
      "bullets": [
        "Finance Data Reconciliation System: Designed and implemented a Generative AI-powered finance-domain Statement of Account Reconciliation system to extract invoice data from PDFs and reconcile it with ERP data, identifying payment statuses and discrepancies, achieving a 70% reduction in manual processing time.",
        "AI-Powered Data Synthesizer: Developed a tool to generate synthetic data, addressing data scarcity and privacy concerns for ML use cases, reducing data collection costs by 40%. Led a team of four, delivering the solution within deadlines.",
        "Data Dashboard Query Assistant: Created a chatbot that streamlines access to sales and shipment data from Power BI dashboards, reducing manual data retrieval efforts by 50%.",
        "Customer Feedback Insights Generator: Implemented a solution that clusters and analyzes product feedback using generative AI, improving decision-making through detailed feedback themes.",
        "Enterprise Document Intelligence Platform: Developed an LLM-powered chat platform leveraging Gen AI for querying text and image documents, reducing manual R&D work by 40% and increasing query processing speed by 30%."
      ]
    },
    {
      "id": "exp2",
      "title": "Data Scientist Intern",
      "company": "Genpact, Hyderabad, India",
      "role": "Internship",
      "duration": "March 2023 \u2013 June 2023",
      "bullets": [
        "Developed an interactive tool using machine learning and deep learning to address diverse business challenges, including fraud detection, customer retention, recommendations, and supply chain optimization across sectors like manufacturing, finance, and supply chain.",
        "Designed a solution to identify credit defaulters and predict customer spending patterns based on transaction history. Analyzed customer segments by grouping them based on spending behavior and provided tailored business recommendations to enhance customer engagement and drive growth."
      ]
    }
  ],
  "projects": [
    {
      "id": "rp_nova",
      "title": "NovaEnterprise — Enterprise Knowledge & Decision Intelligence Platform",
      "bullets": [
        "Architected an enterprise decision intelligence platform orchestrating a 13-node LangGraph multi-agent supervisor with dynamic query routing across Vector RAG (Qdrant + BM25 RRF), Knowledge Graph (Neo4j/NetworkX), and Relational SQL (PostgreSQL/SQLite).",
        "Engineered bounded Corrective Retrieval Augmented Generation (CRAG) with automatic query reformulation and coverage gap evaluation, achieving <10s canonical multi-hop resolution latency.",
        "Enforced zero-trust guardrails including SQLGlot AST validation (blocking DDL/DML, comments, and unauthorized joins), XML prompt injection quarantine envelopes, and deterministic verification nodes guaranteeing 100% citation attestation."
      ]
    },
    {
      "id": "rp1",
      "title": "Enterprise AP Invoice Automation Platform (ApexAP)",
      "bullets": [
        "Architected an autonomous, audit-grade Accounts Payable invoice processing platform for multinational finance operations, achieving an enterprise pilot 90.00% Straight-Through Processing (STP) rate (surpassing the \u226565% target).",
        "Implemented automated 3-way PO matching (Invoice vs PO vs Goods Receipt) with deterministic tolerance checks, eliminating manual reconciliation overhead and invoice discrepancies.",
        "Enforced strict international tax compliance and 7-year immutable WORM audit archiving on cloud blob storage for legal financial accountability."
      ]
    },
    {
      "id": "rp2",
      "title": "CloudDesk \u2014 Autonomous Support Resolution Platform",
      "bullets": [
        "Engineered an enterprise-grade AI customer support resolution platform orchestrating specialized agent teams to diagnose cloud infrastructure issues and reduce resolution times by 65%.",
        "Designed deterministic policy guardrails and Human-in-the-Loop (HITL) approval gates for sensitive operational actions, preventing unauthorized refunds and billing mutations.",
        "Integrated hybrid semantic and keyword retrieval over enterprise knowledge bases, paired with complete distributed tracing and real-time SLA observability."
      ]
    },
    {
      "id": "rp3",
      "title": "ApexMotion \u2014 Supplier Risk Intelligence Platform",
      "bullets": [
        "Architected a real-time supply chain disruption intelligence platform for a Tier-1 EV manufacturer managing 4,500 global suppliers across 38 countries over 400,000 network relationships.",
        "Engineered an early-warning disruption engine calculating deterministic inventory Days of Cover (DoC) and multi-million dollar financial exposures weeks ahead of potential factory shortages.",
        "Implemented cryptographic Human-in-the-Loop (HITL) spend governance with digital signature verification and executive dual-authorization gates for emergency mitigation spend exceeding $100,000."
      ]
    },
    {
      "id": "rp4",
      "title": "RAG Studio & DocuMind AI \u2014 17-Stage Visual RAG Architecture & Multi-Agent Platform",
      "bullets": [
        "Purpose-built an enterprise visual RAG pipeline engineering platform featuring an interactive 17-stage design engine ('RAGForge') that guides architects from raw corpora to production across ingestion, semantic chunking, hybrid retrieval (Dense + BM25 RRF), cross-encoder reranking, NeMo guardrails, and HITL governance, with 1-click export to Terraform, Kubernetes, Docker, and Python.",
        "Eliminated manual RAG guesswork by engineering an autonomous 6-specialist LangGraph optimization swarm ('AutoRAG Architect') that empirically benchmarks pipeline permutations against RAGAS metrics (faithfulness, context precision, answer relevancy), reducing hallucination rates below 1.2%.",
        "Engineered real-time cloud cost and p95 latency trade-off estimation, collapsing enterprise RAG deployment lifecycles from 3 months to 2 days, and deployed the production reference Q&A engine (DocuMind AI) on GCP Cloud Run and Qdrant."
      ]
    },
    {
      "id": "rp5",
      "title": "AnomalyEngine \u2014 Enterprise Multi-Tier Financial Fraud & Risk Platform",
      "bullets": [
        "Architected an enterprise multi-tier transaction fraud and anomaly detection platform delivering sub-15ms P99 screening latency across high-throughput financial ledgers.",
        "Implemented a 5-tier hybrid defense pipeline combining deterministic AST business rules, vendor contract clause validations, statistical rolling Z-score baselines, and unsupervised Isolation Forest ML.",
        "Engineered autonomous GenAI compliance reporting synthesizing primary-source audit evidence citations and recommended remediation protocols for financial regulatory triage."
      ]
    }
  ],
  "certifications": [
    "Databricks Certified Generative AI Engineer Associate \u2013 Databricks",
    "Building Generative AI Applications Using Amazon Bedrock \u2013 Amazon Web Services",
    "Implementing Generative AI with Vertex AI \u2013 Google Cloud Platform",
    "Build and Deploy a Generative AI Solution Using RAG Framework \u2013 Google Cloud Platform"
  ],
  "education": [
    {
      "id": "edu1",
      "degree": "Bachelor of Science in Computer Science",
      "institution": "SRM University, Andhra Pradesh",
      "major": "Computer Science",
      "year": "August 2019 \u2013 June 2023"
    }
  ]
};
