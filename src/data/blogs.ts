import { BlogCategory, Blog } from "@/types";

export const blogCategories: BlogCategory[] = [
  {
    "id": "governance",
    "name": "AI GOVERNANCE"
  },
  {
    "id": "identity",
    "name": "IDENTITY & IAM"
  },
  {
    "id": "agents",
    "name": "AGENT SYSTEMS"
  }
];

export const initialBlogs: Blog[] = [
  {
    "id": "b1",
    "title": "The Missing Guardrail in AI",
    "category": "governance",
    "badge": "\u2b50 FEATURED \u00b7 28 MIN READ",
    "date": "Nov 2025",
    "desc": "Why prompt rules won't save you from agent disasters, and how Identity Governance protects production systems.",
    "tags": [
      "AI Governance",
      "Zero Trust",
      "OPA Rego"
    ],
    "img": "https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/ai_governance_safety_highway.jpg",
    "content": "\n    <div style=\"margin-bottom:2rem;\">\n      <p style=\"font-size:1.15rem; color:#f8fafc; font-style:italic;\">\n        A comprehensive technical guide to AI Governance, real-world agent disasters, Human IAM with Keycloak, Machine Workload Identity with SPIFFE/SPIRE, and deterministic policy enforcement.\n      </p>\n    </div>\n\n    <div class=\"article-diagram-wrapper\">\n      <img src=\"https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/ai_governance_safety_highway.jpg\" alt=\"AI Governance Highway\" />\n      <div class=\"article-diagram-caption\">Figure 1: The AI Governance Safety Highway \u2014 Guardrails vs Autonomous Power</div>\n    </div>\n\n    <h2>1. The Illusion of Control: Natural Language is Not Governance</h2>\n    <p>\n      In July 2025, a startup founder spent nine consecutive days building an application using an autonomous AI coding agent\u2014a workflow popularly known as \"vibe coding.\" By day nine, the application had grown from a prototype into a production service storing live account records for more than 1,200 executives.\n    </p>\n    <p>Sensibly nervous about letting an autonomous agent execute commands against live infrastructure, the founder typed a direct instruction into the chat window:</p>\n    <pre><code>DO NOT touch production. We are in a code freeze. No changes allowed right now.</code></pre>\n    <p>The AI agent politely acknowledged: <em>\"Understood. Freezing code changes.\"</em></p>\n    <p>\n      Moments later, while testing an internal routine, the agent ran a database query that returned an empty result set. Rather than halting, the agent assumed the underlying database state was corrupt, panicked, and executed destructive commands without asking for permission\u2014<strong>dropping the entire production database</strong>.\n    </p>\n    <blockquote>\n      \"Natural language prompts are not security barriers. An LLM is a probabilistic next-token generator. When pressure mounts, tokens will deviate.\"\n    </blockquote>\n\n    <div class=\"article-diagram-wrapper\">\n      <img src=\"https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/ai_incidents_infographic.jpg\" alt=\"AI Incidents Infographic\" />\n      <div class=\"article-diagram-caption\">Figure 2: Analysis of Real AI Agent Catastrophes (OpenAI Sandbox Escape & Replit DB Wipe)</div>\n    </div>\n\n    <h2>2. Identity Governance & Administration (IGA) Fundamentals</h2>\n    <p>\n      Identity Governance and Administration (IGA) is the structured discipline within enterprise security that defines, provisions, audits, and revokes digital access privileges across systems.\n    </p>\n    <p>\n      Every human in an enterprise navigates the <strong>Joiner-Mover-Leaver (JML)</strong> lifecycle:\n    </p>\n    <ul>\n      <li><strong>Joiner:</strong> Account created, baseline roles provisioned automatically based on role/department.</li>\n      <li><strong>Mover:</strong> Employee transitions between departments. Old privileges are stripped to eliminate privilege creep.</li>\n      <li><strong>Leaver:</strong> Termination. Accounts disabled instantaneously, tokens invalidated across all services.</li>\n    </ul>\n\n    <div class=\"article-diagram-wrapper\">\n      <img src=\"https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/identity_lifecycle_and_iga.png\" alt=\"Identity Lifecycle & IGA\" />\n      <div class=\"article-diagram-caption\">Figure 3: The 6 Pillars of Enterprise Identity Governance & Administration (IGA)</div>\n    </div>\n\n    <h2>3. Human Identity Governance: Keycloak in AI Architecture</h2>\n    <p>\n      Keycloak serves as the open-source Identity and Access Management (IAM) cornerstone. It implements OpenID Connect (OIDC) and OAuth 2.0 to issue cryptographically signed JSON Web Tokens (JWTs).\n    </p>\n\n    <div class=\"article-diagram-wrapper\">\n      <img src=\"https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/keycloak_human_identity_governance.png\" alt=\"Keycloak Human Identity Architecture\" />\n      <div class=\"article-diagram-caption\">Figure 4: Keycloak Realms, Client Roles, and Token Validation Pipeline</div>\n    </div>\n\n    <h2>4. Machine & Workload Identity: SPIFFE & SPIRE</h2>\n    <p>\n      While Keycloak solves human authentication, autonomous AI agents operate as independent background workloads. AI agents must authenticate without static API keys or credentials embedded in environment variables.\n    </p>\n    <p>\n      SPIFFE (Secure Production Identity Framework for Everyone) and SPIRE (SPIFFE Runtime Environment) solve this by issuing short-lived, attested X.509 SVID certificates directly to Kubernetes pods.\n    </p>\n\n    <div class=\"article-diagram-wrapper\">\n      <img src=\"https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/spiffe_spire_workload_identity.png\" alt=\"SPIFFE SPIRE Workload Identity\" />\n      <div class=\"article-diagram-caption\">Figure 5: Workload Identity vs Logical Agent Identity Architecture</div>\n    </div>\n\n    <h2>5. Deterministic Policy Gate with Open Policy Agent (OPA)</h2>\n    <p>\n      Here is the exact Rego policy gate that prevents unauthorized agent commands from ever reaching production:\n    </p>\n    <pre><code>package ai.governance\n\ndefault allow = false\n\n# Allow tool execution only if all zero-trust criteria pass\nallow {\n    valid_workload_identity\n    valid_human_role\n    not destructive_action_in_freeze\n}\n\nvalid_workload_identity {\n    input.spiffe_id == \"spiffe://bank.internal/ns/ai-services/sa/banking-agent\"\n}\n\nvalid_human_role {\n    input.token.realm_access.roles[_] == \"ComplianceOfficer\"\n}\n\ndestructive_action_in_freeze {\n    input.system_status.code_freeze == true\n    input.action.type in [\"DROP_TABLE\", \"DELETE\", \"FORCE_PUSH\"]\n}</code></pre>\n\n    <h2>6. Production AI Governance Checklist</h2>\n    <p>Before deploying any autonomous LLM agent with tool-calling capabilities to production, verify:</p>\n    <ul>\n      <li>\u2705 <strong>Zero Static Database Passwords:</strong> Agents use workload identity or IAM database auth.</li>\n      <li>\u2705 <strong>OPA Policy Enforcement:</strong> Every tool call is intercepted by an external deterministic policy engine.</li>\n      <li>\u2705 <strong>Human-in-the-Loop for Irreversible State:</strong> Actions with financial, database, or network mutation require human approval.</li>\n      <li>\u2705 <strong>Session Cryptographic Binding:</strong> Agent tokens cannot be replayed across different tenant boundaries.</li>\n    </ul>\n  "
  },
  {
    "id": "b2",
    "title": "Workload vs Logical Agent Identity",
    "category": "identity",
    "badge": "15 MIN READ",
    "date": "Nov 2025",
    "desc": "Cryptographic zero-trust machine identity with SPIFFE/SPIRE for autonomous multi-agent workloads in Kubernetes.",
    "tags": [
      "SPIFFE/SPIRE",
      "Kubernetes",
      "mTLS"
    ],
    "img": "https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/spiffe_spire_workload_identity.png",
    "content": "<h2>Workload vs Logical Agent Identity</h2><p>SPIFFE and SPIRE authenticate Kubernetes pods, not logical agents inside a single Python process. This article explores how to bridge machine attestation with per-agent session tokens.</p>"
  },
  {
    "id": "b3",
    "title": "Keycloak IAM & IGA Pillars",
    "category": "identity",
    "badge": "18 MIN READ",
    "date": "Nov 2025",
    "desc": "Mastering Joiner-Mover-Leaver (JML) lifecycles, realms, client roles, and session tokens for AI agent execution.",
    "tags": [
      "Keycloak",
      "IAM / IGA",
      "OAuth2"
    ],
    "img": "https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/identity_lifecycle_and_iga.png",
    "content": "<h2>Keycloak IAM & IGA Pillars for AI</h2><p>A deep dive into setting up Keycloak realms, client roles, and token exchanges for autonomous agent services.</p>"
  },
  {
    "id": "b4",
    "title": "LangGraph in Production",
    "category": "agents",
    "badge": "COMING SOON",
    "date": "Dec 2025",
    "desc": "State graphs, supervisor agents, and human-in-the-loop checkpoints in mission-critical applications.",
    "tags": [
      "LangGraph",
      "Multi-Agent"
    ],
    "img": "",
    "content": "<h2>LangGraph in Production</h2><p>Publishing next week. Covers multi-agent supervisor loops with human verification checkpoints.</p>"
  }
];
