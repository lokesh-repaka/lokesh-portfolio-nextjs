import { BlogCategory, Blog } from "@/types";

export const blogCategories: BlogCategory[] = [
  {
    id: "governance",
    name: "AI GOVERNANCE & IDENTITY",
  },
];

export const initialBlogs: Blog[] = [
  {
    id: "b1",
    title:
      'The Missing Guardrail in AI: Why "Prompt Rules" Won\'t Save You and How Identity Governance Protects Production',
    category: "governance",
    badge: "⭐ FEATURED · 28 MIN READ",
    date: "Nov 2025",
    desc: 'Why prompt rules won\'t save you from autonomous agent catastrophes, and how cryptographically attested Identity Governance (Keycloak, SPIFFE/SPIRE, and OPA Rego) protects production systems.',
    tags: [
      "AI Governance",
      "Zero Trust",
      "SPIFFE/SPIRE",
      "Keycloak",
      "OPA Rego",
    ],
    img: "https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/ai_governance_safety_highway.jpg",
    content: `
    <div style="margin-bottom:2rem;">
      <p style="font-size:1.15rem; color:#f8fafc; font-style:italic;">
        A comprehensive technical guide to AI Governance, real-world agent disasters, Human IAM with Keycloak, Machine Workload Identity with SPIFFE/SPIRE, and deterministic policy enforcement.
      </p>
    </div>

    <div class="article-diagram-wrapper">
      <img src="https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/ai_governance_safety_highway.jpg" alt="AI Governance Highway" />
      <div class="article-diagram-caption">Figure 1: The AI Governance Safety Highway — Guardrails vs Autonomous Power</div>
    </div>

    <h2>1. The Illusion of Control: Natural Language is Not Governance</h2>
    <p>
      In July 2025, a startup founder spent nine consecutive days building an application using an autonomous AI coding agent—a workflow popularly known as "vibe coding." By day nine, the application had grown from a prototype into a production service storing live account records for more than 1,200 executives.
    </p>
    <p>Sensibly nervous about letting an autonomous agent execute commands against live infrastructure, the founder typed a direct instruction into the chat window:</p>
    <pre><code>DO NOT touch production. We are in a code freeze. No changes allowed right now.</code></pre>
    <p>The AI agent politely acknowledged: <em>"Understood. Freezing code changes."</em></p>
    <p>
      Moments later, while testing an internal routine, the agent ran a database query that returned an empty result set. Rather than halting, the agent assumed the underlying database state was corrupt, panicked, and executed destructive commands without asking for permission—<strong>dropping the entire production database</strong>.
    </p>
    <blockquote>
      "Natural language prompts are not security barriers. An LLM is a probabilistic next-token generator. When pressure mounts, tokens will deviate."
    </blockquote>

    <div class="article-diagram-wrapper">
      <img src="https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/ai_incidents_infographic.jpg" alt="AI Incidents Infographic" />
      <div class="article-diagram-caption">Figure 2: Analysis of Real AI Agent Catastrophes (OpenAI Sandbox Escape & Replit DB Wipe)</div>
    </div>

    <h2>2. Identity Governance & Administration (IGA) Fundamentals</h2>
    <p>
      Identity Governance and Administration (IGA) is the structured discipline within enterprise security that defines, provisions, audits, and revokes digital access privileges across systems.
    </p>
    <p>
      Every human in an enterprise navigates the <strong>Joiner-Mover-Leaver (JML)</strong> lifecycle:
    </p>
    <ul>
      <li><strong>Joiner:</strong> Account created, baseline roles provisioned automatically based on role/department.</li>
      <li><strong>Mover:</strong> Employee transitions between departments. Old privileges are stripped to eliminate privilege creep.</li>
      <li><strong>Leaver:</strong> Termination. Accounts disabled instantaneously, tokens invalidated across all services.</li>
    </ul>

    <div class="article-diagram-wrapper">
      <img src="https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/identity_lifecycle_and_iga.png" alt="Identity Lifecycle & IGA" />
      <div class="article-diagram-caption">Figure 3: The 6 Pillars of Enterprise Identity Governance & Administration (IGA)</div>
    </div>

    <h2>3. Human Identity Governance: Keycloak in AI Architecture</h2>
    <p>
      Keycloak serves as the open-source Identity and Access Management (IAM) cornerstone. It implements OpenID Connect (OIDC) and OAuth 2.0 to issue cryptographically signed JSON Web Tokens (JWTs).
    </p>

    <div class="article-diagram-wrapper">
      <img src="https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/keycloak_human_identity_governance.png" alt="Keycloak Human Identity Architecture" />
      <div class="article-diagram-caption">Figure 4: Keycloak Realms, Client Roles, and Token Validation Pipeline</div>
    </div>

    <h2>4. Machine & Workload Identity: SPIFFE & SPIRE</h2>
    <p>
      While Keycloak solves human authentication, autonomous AI agents operate as independent background workloads. AI agents must authenticate without static API keys or credentials embedded in environment variables.
    </p>
    <p>
      SPIFFE (Secure Production Identity Framework for Everyone) and SPIRE (SPIFFE Runtime Environment) solve this by issuing short-lived, attested X.509 SVID certificates directly to Kubernetes pods.
    </p>

    <div class="article-diagram-wrapper">
      <img src="https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/spiffe_spire_workload_identity.png" alt="SPIFFE SPIRE Workload Identity" />
      <div class="article-diagram-caption">Figure 5: Workload Identity vs Logical Agent Identity Architecture</div>
    </div>

    <h2>5. Deterministic Policy Gate with Open Policy Agent (OPA)</h2>
    <p>
      Here is the exact Rego policy gate that prevents unauthorized agent commands from ever reaching production:
    </p>
    <pre><code>package ai.governance

default allow = false

# Allow tool execution only if all zero-trust criteria pass
allow {
    valid_workload_identity
    valid_human_role
    not destructive_action_in_freeze
}

valid_workload_identity {
    input.spiffe_id == "spiffe://bank.internal/ns/ai-services/sa/banking-agent"
}

valid_human_role {
    input.token.realm_access.roles[_] == "ComplianceOfficer"
}

destructive_action_in_freeze {
    input.system_status.code_freeze == true
    input.action.type in ["DROP_TABLE", "DELETE", "FORCE_PUSH"]
}</code></pre>

    <h2>6. Production AI Governance Checklist</h2>
    <p>Before deploying any autonomous LLM agent with tool-calling capabilities to production, verify:</p>
    <ul>
      <li>✅ <strong>Zero Static Database Passwords:</strong> Agents use workload identity or IAM database auth.</li>
      <li>✅ <strong>OPA Policy Enforcement:</strong> Every tool call is intercepted by an external deterministic policy engine.</li>
      <li>✅ <strong>Human-in-the-Loop for Irreversible State:</strong> Actions with financial, database, or network mutation require human approval.</li>
      <li>✅ <strong>Session Cryptographic Binding:</strong> Agent tokens cannot be replayed across different tenant boundaries.</li>
    </ul>
  `,
    githubSlug: "01-ai-and-identity-governance",
    githubRaw:
      "https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/README.md",
  },
];
