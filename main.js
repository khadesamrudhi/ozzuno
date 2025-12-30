console.log("JS LOADED");

/* ---------- Clock ---------- */
const clock = document.querySelector(".clock-display");

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// initial render
updateClock();
setInterval(updateClock, 1000);


/// ====================== SMOOTH ORBIT RING ======================

/// ====================== SMOOTH ORBIT RING (FOOTER REVERSE) ======================

// ---------- SCENE ----------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// ---------- RENDERER ----------
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg-ring"),
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ---------- GEOMETRY ----------
const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);

// ---------- COLOR GRADIENT ----------
const colorsArray = [
  new THREE.Color("#c5a059"),
  new THREE.Color("#e8c9a0"),
  new THREE.Color("#d4af37"),
  new THREE.Color("#a68956")
];

const colors = [];
const count = geometry.attributes.position.count;

for (let i = 0; i < count; i++) {
  const t = i / count;
  let c;

  if (t < 0.33) {
    c = colorsArray[0].clone().lerp(colorsArray[1], t / 0.33);
  } else if (t < 0.66) {
    c = colorsArray[1].clone().lerp(colorsArray[2], (t - 0.33) / 0.33);
  } else {
    c = colorsArray[2].clone().lerp(colorsArray[3], (t - 0.66) / 0.34);
  }

  colors.push(c.r, c.g, c.b);
}

geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

// ---------- MATERIAL ----------
const material = new THREE.MeshBasicMaterial({
  vertexColors: true,
  wireframe: true
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// ---------- SMOOTH STATE ----------
let currentX = 0;
let currentY = 0;

let targetX = 0;
let targetY = 0;

let rotationDirection = 1;

// ---------- SCROLL HANDLER ----------
function updateFromScroll() {
  const footer = document.querySelector("footer");

  // ---- CONTINUOUS SCROLL PROGRESS ----
  const scrollMax =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollProgress = scrollMax > 0
    ? window.scrollY / scrollMax
    : 0;

  // ---- CONTINUOUS ORBIT (NO PAUSE) ----
  const startAngle = Math.PI / 2;
  const angle = scrollProgress * Math.PI * 2;

  targetX = Math.cos(angle) * 2.2;
  targetY = Math.sin(angle) * 0.8;

  // ---- FOOTER REVERSE ----
  if (footer) {
    const footerRect = footer.getBoundingClientRect();
    rotationDirection = footerRect.top < window.innerHeight ? -1 : 1;
  }
}

window.addEventListener("scroll", updateFromScroll);

// ---------- ANIMATION LOOP ----------
function animate() {
  requestAnimationFrame(animate);

  // Smooth lerp
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  torus.position.set(currentX, currentY, 0);

  // Rotation (reverses in footer)
  torus.rotation.x += 0.008 * rotationDirection;
  torus.rotation.y += 0.01 * rotationDirection;
  torus.rotation.z += 0.006 * rotationDirection;

  renderer.render(scene, camera);
}

animate();

// ---------- RESIZE ----------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});





//-----------------------------------> Modal functionality<--------------------------------------
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.querySelector(".modal-close");

// Sample content for each card
const cardContents = {
  /* --- Content 1: Doctrine --- */
  "content-1": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 1 · The Firm</p>
        <h2>The Firm: Sovereign Corporate Identity</h2>
        <p class="brief-text">Dwarkadas Capital Services Pvt. Ltd. as a sovereign construct of market architecture and asymmetric capital deployment.</p>
        <div class="brief-status">
          <span>STATUS: OPERATIONAL</span>
          <span>CLEARANCE: LEVEL 1</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">The Firm · Org Structure</p>
            <h3>Sovereign Corporate Identity Grid</h3>
            <p>The firm is structured as a tightly controlled command grid, with capital allocation, risk, and market strategy concentrated in a cerebral core while operational verticals execute with algorithmic precision.</p>
            <h3>A Manifesto of Asymmetric Dominance</h3>
            <p>Dwarkadas Capital Services Pvt. Ltd. is not merely a financial intermediary; it is a Sovereign Construct of Market Architecture. Our existence is predicated on a singular, ruthless axiom: capital flows not to the deserving, but to the commanded.
              We operate at the bleeding edge of Indian capital markets, positioned at the convergence of regulatory rigidity, financial engineering, and market aggression. Our institutional philosophy is built upon Asymmetric Capital Deployment—the belief that true economic value is extracted only when one possesses informational, structural, and execution-based advantages over the counterparty
              We do not seek to participate in the economy; we seek to engineer its outcomes through forensic intellect and regulatory arbitrage. Dwarkadas functions as the cerebral cortex of the corporate ecosystem, obliterating friction between ambition and capitalization.
              Whether orchestrating public listings via IPO Consulting & Listing Services, restructuring toxic liabilities through Debt & Financial Consulting, or navigating cross-border M&A, we operate with the cold logic of an algorithm and the aggressive foresight of a market maker. We embed ourselves into the operational DNA of our clients, converting market participants into market leaders through Business Consulting and Strategic Exit Services.
            </p>
        </div>

        <div class="role-item">
            <p class="role-caption">DOMESTIC CORE</p>
            <h4 class="role-accent"> India · Primary Grid</h4>
            <p class="role-desc">Regulatory command center, deal origination hubs, and primary capital markets interface.</p>
        </div>
         <div class="role-item">
            <p class="role-caption">OFFSHORE LIQUIDITY</p>
            <h4 class="role-accent">Global Institutional Lines</h4>
            <p class="role-desc">Direct connectivity to offshore lenders and funds for ECB, trade finance, and structured credit.</p>
        </div>
         <div class="role-item">
            <p class="role-caption">INTELLIGENCE & RESEARCH</p>
            <h4 class="role-accent"> Distributed Research Nodes</h4>
            <p class="role-desc">Sectoral deep-dive cells providing the informational asymmetry that underpins every mandate.</p>
        </div>
      </div>
    </div>
  `,

  /* --- Content 2: Apex Council --- */
  "content-2": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 1 · Governance</p>
        <h2>The Apex Council · Board of Directors</h2>
        <p class="brief-text">A meritocratic oligarchy governing dwarkadas’s strategic vectors with absolute authority and uncompromising fiduciary discipline.</p>
        <div class="brief-status">
          <span>AUTHORITY: SUPREME</span>
          <span>QUORUM: ACTIVE</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">Governance Philosophy</p>
            <h3>Meritocratic Oligarchy · High-Velocity Decisions</h3>
            <p>
            The Board does not merely supervise; it dictates strategic vectors with surgical clarity. The hierarchy is intentionally rigid to preserve decision-making velocity, while control layers ensure that fiduciary and regulatory standards remain non-negotiable.
            <br>
               <ul class = "modal-level">
               <li>Concentrated authority with explicit accountability trails.</li>
               <li>Separation of vision (Chairman), aggression (Strategic Warfare), and constraint (CRO).</li>
               <li>Hard-coded alignment to risk-adjusted return thresholds across every mandate.</li>
               </ul>
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <h4 class="role-accent">Executive Chairman</h4>
                <p class="role-caption">CUSTODIAN OF SOVEREIGN VISION</p>
                <p class="role-desc">Final arbiter on all capital allocation decisions. Holds veto power over any mandate that does not meet the firm’s risk-adjusted return thresholds.</p>
            </div>
            <div class="role-item">
                <h4 class="role-accent">Director of Strategic Warfare</h4>
                <p class="role-caption">M&A & RESTRUCTURING</p>
                <p class="role-desc">Architect of inorganic growth, responsible for absorption of competitors, strategic exits, and balance-sheet warfare.</p>
            </div>
            <div class="role-item">
                <h4 class="role-accent">Chief Risk Officer (CRO)</h4>
                <p class="role-caption">SENTINEL OF THE BALANCE SHEET</p>
                <p class="role-desc">Empowered with autonomous authority to audit, stress-test, and halt any transaction that breaches ERM parameters.</p>
            </div>
        </div>
      </div>
    </div>
  `,

  /* --- Content 3: Chronology (Timeline) --- */
  "content-3": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 1 · Evolution</p>
        <h2>Chronology of Milestones · Evolution of Hegemony</h2>
        <p class="brief-text">A staged progression from regulatory inception to totalized hegemony across global markets.</p>
      </div>
      
      <div class="modal-operations">
        <div class="role-grid">
            <div class="role-item">
            <p class="role-caption">Epoch I</p>
                <h4 class="role-accent">The Inception Phase</h4>
                <p class="role-desc">Establishment of foundational regulatory licenses and construction of the initial proprietary trading desk. Acquisition of Merchant Banking capabilities and set-up of the Unlisted Securities framework.</p>
            </div>
            <div class="role-item">
            <p class="role-caption">EPOCH II </p>
                <h4 class="role-accent">The Consolidation Phase</h4>
                <p class="role-desc">Aggregation of first ₹1,000 Crores in Assets Under Advisory (AUA) and operationalization of the Debt Syndication node.</p>
            </div>
            <div class="role-item">
            <p class="role-caption">EPOCH III</p>
                <h4 class="role-accent">The Expansion Phase</h4>
                <p class="role-desc">Activation of the Global Liquidity Bridge with direct credit lines from offshore institutional lenders for ECB and Trade Finance.</p>
            </div>
        </div>

        <div class="modal-dark-block" style="background: rgba(184, 181, 255, 0.08); border-left: 4px solid #b8b5ff; margin-top: 40px;">
            <p class="modal-level">CURRENT EPOCH</p>
            <h3 style="color:#fff; font-size: 20px; margin: 10px 0;">Totalized Hegemony</h3>
            <p style="color:#9a96b5; font-size: 14px;">Dwarkadas now functions as a full-stack financial fortress where consulting, capital markets, private equity, and risk architecture are fused into a single monolithic service grid. Every mandate is executed across this integrated stack, converting fragmented financial requirements into orchestrated, outcome-engineered capital strategies.</p>
        </div>
      </div>
    </div>
  `,

  /* --- Content 4: Operating Grid (Nodes) --- */
  "content-4": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 1 · The Firm</p>
        <h2>Global Strategic Nodes</h2>
        <p class="brief-text">Map of domestic and international operations, structured as liquidity, intelligence, and execution nodes across jurisdictions.</p>
        <div class="brief-status">
          <span>TOPOLOGY: INTEGRATED</span>
          <span>NODES: ACTIVE</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">OPERATING GRID</p>
            <h3>Sovereign Operating Topology</h3>
            <p>
            dwarkadas's presence is not defined by offices, but by strategic nodes—each calibrated for capital deployment, regulatory navigation, and information extraction. Domestic and offshore locations are wired into a single, integrated decision engine.
            </p>
            <ul class="modal-list">
              <li>Domestic core for regulatory command and origination.</li>
              <li>Offshore nodes for liquidity, leverage, and structuring.</li>
              <li>Distributed research cells for informational asymmetry.</li>
            </ul>
        </div>

        <div class="modal-dark-block">
            <h3 style="color: #fff; font-size: 16px; margin-bottom: 15px;">NODE REGISTER · SNAPSHOT</h3>
            <table style="width: 100%; border-collapse: collapse; color: #9a96b5; font-size: 13px; text-align: left;">
                <thead>
                    <tr style="border-bottom: 1px solid rgba(184, 181, 255, 0.2); color: #fff;">
                        <th style="padding: 10px 5px;">Node Type</th>
                        <th style="padding: 10px 5px;">Jurisdiction</th>
                        <th style="padding: 10px 5px;">Primary Function</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                        <td style="padding: 12px 5px; color: #fff; font-weight: 600;">Domestic Core</td>
                        <td style="padding: 12px 5px;">India</td>
                        <td style="padding: 12px 5px;">Regulatory interface, origination, and execution.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                        <td style="padding: 12px 5px; color: #fff; font-weight: 600;">Offshore Liquidity</td>
                        <td style="padding: 12px 5px;">Select Global Centers</td>
                        <td style="padding: 12px 5px;">Credit lines, leverage, and structured products.</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 5px; color: #fff; font-weight: 600;">Intelligence Nodes</td>
                        <td style="padding: 12px 5px;">Distributed / Hybrid</td>
                        <td style="padding: 12px 5px;">Research, sector intelligence, and counterparty analysis.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="role-grid" style="margin-top: 30px;">
            <div class="role-item">
                <p class="role-caption">DOMESTIC CORE</p>
                <h4 class="role-accent">India · Primary Grid</h4>
                <p class="role-desc">Headquarters and principal regulatory interface. Houses deal origination desks, Merchant Banking unit, and core balance sheet command.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">OFFSHORE LIQUIDITY BRIDGE</p>
                <h4 class="role-accent">Global Institutional Lines</h4>
                <p class="role-desc">Connectivity to offshore lenders and funds powering ECB, trade finance, and structured credit mandates for Indian enterprises.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">INTELLIGENCE & RESEARCH NODES</p>
                <h4 class="role-accent">Sectoral Deep-Dive Cells</h4>
                <p class="role-desc">Distributed analyst clusters generating proprietary sector theses, credit views, and M&A screens that underpin capital deployment decisions.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  /* --- Content 5: IPO & Listing --- */
  "content-5": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 2 · Investment Banking</p>
        <h2>IPO Advisory & Capital Markets</h2>
        <p class="brief-text">Transforming private enterprises into public institutions of indefinite sovereign value. Engineering the "going public" lifecycle.</p>
        <div class="brief-status">
          <span>Source Service: IPO Consulting & Listing Services</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">Capital Markets Origination</p>
            <h3>IPO & Listing Services</h3>
            <p>We do not merely assist in the listing of securities; we architect the fundamental metamorphosis of a private enterprise into a public institution of indefinite sovereign value. Our IPO Consulting & Listing Services division operates as a monolithic entity dedicated to the rigorous orchestration of the "going public" lifecycle. This is not a simple administrative process; it is a high-stakes financial war requiring the deployment of forensic accounting, regulatory arbitrage, and strategic investor relations.Our primary mandate involves the granular assessment of IPO Readiness & Governance Architecture. We initiate a forensic-level audit of the issuer's organizational hierarchy, enforcing a draconian restructuring of internal controls to meet the exacting standards of SEBI and global exchanges. This involves complete Financial Remediation & Statutory Clean-up of historical accounts. We do not simply compile reports; we reconstruct financial narratives.
              We align historical financial statements with Ind AS/IFRS convergence standards, rigorously stress-testing valuations against market volatility, and preparing the Draft Red Herring Prospectus (DRHP) with a level of detail that withstands the most hostile regulatory scrutiny.
              Our scope of work encompasses absolute Risk Mitigation & Due Diligence protocols. We deploy a multi-layered compliance shield, identifying latent liabilities in legal, environmental, and operational domains before they can impact the issuer's valuation. We execute deep-dive due diligence to ensure that every material fact is substantiated, ensuring total adherence to the SEBI (Issue of Capital and Disclosure Requirements) Regulations.
              Simultaneously, our fiscal engineering team constructs sophisticated Taxation Structures. We analyze the implications of capital gains, corporate restructuring, and promoter holding dilution to optimize the fiscal efficiency of the post-listing entity, ensuring that wealth is preserved against the erosion of statutory levies.
              Our engagement is defined by End-to-End Project Orchestration. We assume fiduciary responsibility for the entire transaction lifecycle, managing the labyrinthine coordination between merchant bankers, legal counsels, registrars, and underwriters. We dictate the critical path timelines, ensuring that the rigorous demands of the roadshow and book-building process are met with military precision.
              Finally, our obligation extends beyond the listing bell through Post-IPO Compliance & Reporting. We act as custodians of continuing disclosure, managing the relentless stream of quarterly reporting, insider trading regulations, and corporate governance filings required to maintain the entity's standing in the public markets. In summary, we do not just list shares; we engineer the financial infrastructure necessary for a company to dominate the capital markets.
            </p>
        </div>

        <div class="role-grid">
        <div class="role-item">
        <p class="role-caption">
        Proprietary Execution Matrix
        </p>
                <h4 class="role-accent">The Public Markets Sovereignty Protocol™</h4>
                <p class="role-desc">Phase-wise grid from IPO readiness and governance diagnostics to listing day synchronization and post-listing compliance regime.</p>
            </div>
            <div class="role-item">
            <p class="role-caption">SUB PAGE</p>
                <h4 class="role-accent">Governance Diagnostic & Forensic Clean-up</h4>
                <p class="role-desc">Forensic audit of corporate structure, internal controls, and historical financials to meet SEBI and global exchange norms.</p>
            </div>
            <div class="role-item">
              <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Specialty Chemical Conglomerate</h4>
                <p class="role-desc">Mainboard IPO Origination & Lead Management
                  Issue Size: ₹ 1,250 Crores · Outcome: Oversubscribed 48x (QIB Tranche)
                  Automotive Component Manufacturer
                  Pre-IPO Governance & Financial Restructuring
                  Enterprise Value: ₹ 850 Crores · Outcome: DRHP Filed & Approved by SEBI
                  Fintech Platform (SaaS)
                  SME to Mainboard Migration Strategy
                  Market Cap: ₹ 420 Crores · Outcome: Successful Migration & Liquidity Event
                </p>
            </div>
            <div class="role-item">
              <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <h4 class="role-accent">Regulatory Mandate:</h4>
                <p class="role-desc">All advisory services are executed in strict conformity with the SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018, and the Companies Act, 2013.</p>
                <h4 class="role-accent">Fiduciary Disclaimer:</h4>
                <p class="role-desc">Dwarkadas Capital acts as a strategic process architect. While we ensure rigorous compliance with SEBI norms, the ultimate subscription of the issue is subject to systemic market volatility. Valuation parameters are derived using IBBI-registered valuer standards; however, listing gains are not guaranteed. The issuer retains liability for all material disclosures made in the Draft Red Herring Prospectus (DRHP).</p>
            </div>
        </div>
      </div>
    </div>
  `,

  /* --- Content 6: Merchant Banking --- */
  "content-6": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 2 · Investment Banking Division</p>
        <h2>Merchant Banking & Underwriting Operations</h2>
        <p class="brief-text">Capital markets underwriting, transaction management, and issuance architecture for sovereign-scale fundraising programs.</p>
        <div class="brief-status">
          <span>Source Service: Merchant Banking Services</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">2. MERCHANT BANKING, CAPITAL MARKETS UNDERWRITING & TRANSACTION MANAGEMENT</p>
            
            <p>
            We stand as the gatekeepers of the capital markets. Our Merchant Banking Services division is responsible for the orchestration of "big financial activities," operating at the intersection of regulatory compliance and massive capital mobilization. We are the architects of fundraising, mandated to assist corporations in Capital Syndication & Securities Issuance.
            Whether the requirement is for a seamless Initial Public Offering (IPO), a Qualified Institutions Placement (QIP), or a preferential private placement, we structure the issuance to align with the risk appetite of institutional investors and the strategic needs of the issuer.
            Our scope extends to the Management of Large-Scale Financial Transactions. We do not merely advise; we execute. We act as lead managers for buybacks, delisting offers, and open offers under the SEBI (SAST) Regulations. We facilitate raising money from investors or banks by structuring complex debt and equity instruments that provide liquidity while preserving promoter control.
            This involves relentless engagement with the regulatory framework. We are responsible for Regulatory Documentation & Prospectus Filing. We draft the Red Herring Prospectus, file due diligence certificates with SEBI, and ensure that every disclosure meets the stringent standards of the Securities Contracts (Regulation) Act.
            Furthermore, we provide the strategic interface for underwriting and syndicate management, coordinating with a consortium of bankers to guarantee the subscription of the issue. In essence, we provide the heavy artillery for corporate finance, helping companies raise sovereign-scale capital, issue securities with legal immunity, plan their public market debut, and manage the financial transactions that define their legacy.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
            <p class="role-caption">Proprietary Execution Matrix/p>
                <h4 class="role-accent">The Capital Governance Model™</h4>
                <p class="role-desc">A phase-based framework for fundraising, instrument selection, underwriting, and end-to-end issue management.</p>
            </div>
            <div class="role-item">
            <p class="role-caption">Sub-Page</p>
                <h4 class="role-accent">Prospectus Drafting & SEBI Filing</h4>
                <p class="role-desc">Offer document architecture, statutory disclosures, and filing workflow under SEBI and SCRA regimes.</p>
            </div>
          <div class="role-item">
            <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Public Sector Undertaking (PSU)</h4>
                <p class="role-desc">Open Offer Management (Takeover Code)
                    Offer Size: ₹ 750 Crores · Status: Fully Tendered & Subscribed
                </p>
                <h4 class="role-accent">Listed Infrastructure Developer</h4>
                <p class="role-desc">Rights Issue Lead Management
                  Capital Raise: ₹ 500 Crores · Status: Capital Deployed for Debt Reduction
                </p>
                <h4 class="role-accent">Commercial Bank</h4>
                <p class="role-desc">Qualified Institutions Placement (QIP)
                  Issue Size: ₹ 2,500 Crores · Status: Successfully Listed on NSE/BSE
                </p>
          </div>
          <div class="role-item">
            <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <h4 class="role-accent">Regulatory Mandate:</h4>
                <p class="role-desc">Services are rendered in adherence to the SEBI (Merchant Bankers) Regulations, 1992 and the Securities Contracts (Regulation) Act, 1956.
                </p>
                <h4 class="role-accent">Fiduciary Disclaimer:</h4>
                <p class="role-desc">As process advisors, we ensure that all disclosures in offer documents are validated for material accuracy through independent due diligence. However, Dwarkadas Capital assumes no financial liability for the undersubscription of an issue. Any underwriting obligation is limited strictly to the specific terms of the Underwriting Agreement.</p>
          </div>
        </div>
      </div>
    </div>
  `,

  /* --- Content 7: Debt & Liquidity --- */
  "content-7": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 2 · Investment Banking</p>
        <h2>Debt & Structured Finance</h2>
        <p class="brief-text">Debt syndication, capital restructuring, and liquidity engineering — turning the balance sheet into a weaponized funding platform.</p>
        <div class="brief-status">
          <span>FOCUS: LIQUIDITY</span>
          <span>GRID: GLOBAL CREDIT</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">3. DEBT SYNDICATION, CAPITAL RESTRUCTURING & LIQUIDITY ENGINEERING</p>
            <p>
            Capital is the lifeblood of the corporation, and its cost dictates survival. Our Debt & Financial Consulting Services division functions as a sovereign treasury department for hire, dedicated to the aggressive management of loans and funding. We do not ask banks for money; we engineer capital injections.
            Our mandate includes Strategic Debt Procurement & Interest Rate Arbitrage. We leverage institutional relationships to source new credit lines, bypassing standard retail rates to secure better interest rates that significantly reduce the weighted average cost of capital (WACC).
            For entities burdened by toxic leverage, we execute Distressed Debt Restructuring. We intervene to restructure old debt, negotiating with consortiums of lenders to elongate tenure, enforce moratoriums, or convert debt to equity, thereby reducing immediate pressure on cash flows and preventing insolvency.
            Our team assumes the role of the primary negotiator in Covenant & Term Sheet Negotiation. We scrutinize the fine print of facility agreements, aggressively negotiating loan terms to eliminate restrictive covenants that could strangle operational flexibility.
            We act as the bridge to liquidity, tasked with Lender & Investor Identification. We utilize our network to find suitable lenders or investors, matching the client's credit profile with the risk appetite of banks, NBFCs, or private credit funds.
            The foundation of this process is Financial Documentation Architecture. We prepare Detailed Project Reports (DPR), Credit Appraisal Memos (CAM), and financial models required to substantiate the loan application, ensuring that all financial documents are constructed to meet credit committee standards.
            In summary, we empower businesses to weaponize their balance sheet, securing funding, restructuring liabilities, and locking in superior terms through sheer financial force.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
            <p class="role-caption">Proprietary Execution Matrix</p>
                <h4 class="role-accent">The Liability Optimization Architecture™</h4>
                <p class="role-desc">A control system for credit profile enhancement, rate arbitrage, restructuring, and covenant engineering.</p>
            </div>
            <div class="role-item">
            <p class="role-caption">SUB - PAGE</p>
                <h4 class="role-accent">Distressed Debt Restructuring & OTS</h4>
                <p class="role-desc">Full-stack intervention for OTS, moratorium structuring, and turnaround of over-leveraged balance sheets.</p>
            </div>
            <div class="role-item">
            <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Sugar & Ethanol Corporation</h4>
                <p class="role-desc">Debt Restructuring (One Time Settlement) Debt Exposure: ₹ 1,400 Crores · Status: Restructured with 2-Year Moratorium</p>
                <h4 class="role-accent">Real Estate Developer (Tier-1)</h4>
                <p class="role-desc">Construction Finance Syndication Project Limits: ₹ 600 Crores · Status: Sanctioned & Disbursed</p>
                <h4 class="role-accent">Diamond Export House</h4>
                <p class="role-desc">Working Capital Limit Enhancement Credit Limits: ₹ 250 Crores · Status: Rate Reduced by 150 bps</p>
            </div>
        </div>
      </div>
    </div>

  `,
  "content-8": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 3 · Corporate Advisory Group</p>
        <h2>Mergers, Acquisitions & Inorganic Growth</h2>
        <p class="brief-text">Inorganic growth architecture and M&A syndication — conquest-led expansion through targeted acquisitions and mergers.</p>
        <div class="brief-status">
          <span>FOCUS: EXPANSION</span>
          <span>GRID: M&A SERVICES</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. INORGANIC GROWTH ARCHITECTURE, MERGERS & ACQUISITIONS (M&A) SYNDICATION</p>
            <p>
            In the Darwinian landscape of modern commerce, growth is often a function of conquest. Our M&A Services division acts as the war room for corporations seeking to annex competitors, consolidate market share, or vertically integrate through the acquisition of external entities. We do not facilitate introductions; we orchestrate the systemic absorption of corporate targets.
            <br><br>
            Our process begins with ruthless <strong>Target Identification & Strategic Fit Analysis</strong>. We scan the market for entities that offer synergistic alignment, dissecting their operational architecture to ensure they provide tangible growth opportunities and value accretion to the acquirer's balance sheet.
            <br><br>
            Once a target is locked, we initiate <strong>Forensic Financial & Operational Due Diligence (FDD)</strong>. We dissect financials, unearth toxic assets, undisclosed liabilities, and inflated valuations. Revenue models are stress-tested and compliance histories audited to quantify risk before a single rupee is committed.
            <br><br>
            This flows into <strong>Deal Structuring & Valuation Engineering</strong>. We design the transaction mechanics — stock swaps, cash buyouts, leveraged buyouts (LBOs) — to optimize tax implications and leverage. Pricing is dictated by empirical risk assessment, ensuring EPS accretion and balance sheet integrity.
            <br><br>
            Finally, we assume command of <strong>Transaction Execution & Closure</strong>. We manage legal, compliance, and negotiation steps end-to-end: term sheets, definitive agreements, and approvals from NCLT, CCI, and other regulators. We navigate cultural integration risk to prevent post-merger paralysis.
            <br><br>
            In summation, we empower companies to buy or merge with other entities by rigorously validating financials, enforcing favorable valuations, and managing the legal warfare required to close the deal.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">Proprietary Execution Matrix</p>
                <h4 class="role-accent">The Inorganic Conquest Cycle™</h4>
                <p class="role-desc">Phase-wise framework for defining inorganic strategy, screening targets, executing due diligence, structuring deals, and integrating post-merger operations.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">SUB-PAGE</p>
                <h4 class="role-accent">Target Screening & Hostile Defense</h4>
                <p class="role-desc">Strategic mapping of targets plus defense mechanisms against hostile or predatory acquisition attempts.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Cement & Infrastructure Major</h4>
                <p class="role-desc">Horizontal Competitor Acquisition. Transaction Size: ₹ 1,800 Crores · Status: NCLT Approved & Integrated</p>
                
                <h4 class="role-accent">Global Logistics Firm</h4>
                <p class="role-desc">Cross-Border Merger (Inbound). Valuation: $140 Million · Status: Definitive Agreements Signed</p>
                
                <h4 class="role-accent">Renewable Energy Producer</h4>
                <p class="role-desc">Asset Purchase Agreement (Solar Parks). Capacity: 600 MW Portfolio · Status: Asset Transfer Complete</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Mergers are executed in strict compliance with Sections 230-240 of the Companies Act, 2013. We rigorously monitor Competition Commission of India (CCI) combination thresholds.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> We enforce Chinese Wall protocols to prevent Insider Trading violations. Dwarkadas facilitates the transaction but does not bear liability for post-merger integration failures. The client remains responsible for statutory filings and stamp duty.</p>
            </div>
        </div>
      </div>
    </div>
  `,

  "content-9": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 3 · Corporate Advisory Group</p>
        <h2>Strategic Divestiture & Exit Architecture</h2>
        <p class="brief-text">Strategic divestitures, corporate carve-outs, and liquidity events executed with surgical precision to maximize exit value.</p>
        <div class="brief-status">
          <span>FOCUS: LIQUIDITY EVENTS</span>
          <span>GRID: STRATEGIC EXIT SERVICES</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">2. STRATEGIC DIVESTITURE, CORPORATE CARVE-OUTS & LIQUIDITY EVENTS</p>
            <p>
            When strategy demands severance of a corporate limb to preserve the whole, or liquidation of an asset to realize shareholder value, we execute exits with surgical precision. Our Strategic Exit Services division does not merely sell businesses; we engineer high-velocity divestitures and complex carve-outs designed to maximize exit multiples.
            <br><br>
            We begin with <strong>Determination of Intrinsic Enterprise Value</strong>. Beyond book value, we deploy DCF, precedent transactions, and comparable multiples to establish an irrefutable valuation floor that anchors aggressive negotiations.
            <br><br>
            Preparation is exhaustive: we build a fortified <strong>Information Memorandum & Virtual Data Room</strong>. Every financial statement, contract, and operational metric is sanitized and structured to withstand hostile due diligence from institutional buyers.
            <br><br>
            Simultaneously, we run <strong>Counterparty Identification & Target Screening</strong>. We hunt buyers — strategic acquirers, private equity sponsors, distressed asset funds — and create competitive auction dynamics that force premium pricing.
            <br><br>
            At the core lies <strong>Commercial Negotiation & Deal Structuring</strong>. We negotiate price, indemnities, escrow mechanisms, and closing conditions to ensure the best-selling price is not aspirational but contractual.
            <br><br>
            We manage legal, financial, and transactional compliance, including Share Purchase Agreements (SPA) and closing mechanics, to deliver clean, profitable exits without lingering legal wounds or undervalued assets.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">Proprietary Execution Matrix</p>
                <h4 class="role-accent">The Liquidity Realization Pathway™</h4>
                <p class="role-desc">Exit readiness, intrinsic valuation modeling, auction processes, and legal closure for divestitures and carve-outs.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">SUB-PAGE</p>
                <h4 class="role-accent">Intrinsic Valuation & Asset Scrubbing</h4>
                <p class="role-desc">Deep valuation work and documentation scrubbing for buyers' forensic due diligence.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Multi-Specialty Hospital Chain</h4>
                <p class="role-desc">100% Strategic Divestiture. Exit Valuation: ₹ 400 Crores · Status: Full Cash Exit to PE Buyer</p>
                
                <h4 class="role-accent">Enterprise SaaS Platform</h4>
                <p class="role-desc">Founder Stake Sale (Majority). Deal Value: $55 Million · Status: Acquired by NASDAQ Listed Tech Firm</p>
                
                <h4 class="role-accent">Auto-Ancillary Unit</h4>
                <p class="role-desc">Distressed Asset Liquidation. Debt Liability: ₹ 150 Crores · Status: Settled via Slump Sale</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Business valuations are performed in line with International Valuation Standards (IVS). Divestitures are subject to NCLT approvals where applicable.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> The IM is based on management representations. Dwarkadas acts as a sell-side advisor and does not guarantee closure at target valuation. All negotiations are subject to definitive agreements and successful due diligence.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-10": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 3 · Corporate Advisory Group</p>
        <h2>Strategic Corporate Transformation</h2>
        <p class="brief-text">Business engineering, digital transformation, and operational re-architecture for survival and dominance.</p>
        <div class="brief-status">
          <span>FOCUS: EFFICIENCY</span>
          <span>GRID: BUSINESS CONSULTING</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">4. STRATEGIC CORPORATE TRANSFORMATION & BUSINESS ENGINEERING</p>
            <p>
            In an era of hyper-competition, passive management is a precursor to obsolescence. Our Business Consulting Services division intervenes in the operational core of the enterprise to enforce efficiency, scalability, and strategic dominance.
            <br><br>
            We execute <strong>Macro-Strategic Realignment</strong>, dissecting market position, identifying existential threats and asymmetric opportunities, and architecting a roadmap that sets the directional velocity of the organization.
            <br><br>
            We drive <strong>Digital Transformation & AI Integration</strong>, replacing analog workflows with cybernetic operating models. Machine learning and predictive analytics are deployed to automate decisions and optimize resource allocation.
            <br><br>
            Through <strong>Performance Improvement Protocols</strong>, we conduct ruthless P&L analysis, implementing cost rationalization and revenue maximization strategies to widen EBITDA margins.
            <br><br>
            Our mandate includes <strong>Operational Process Re-engineering</strong> and <strong>Organizational Restructuring</strong>: eliminating bottlenecks, redrawing hierarchies, and building agile, shock-resistant organizations.
            <br><br>
            We deploy <strong>Change Management Architecture</strong> to ensure human capital adapts to new systems and protocols, and enforce <strong>Sustainability & ESG Compliance</strong> not for optics, but for regulatory and long-term survivability.
            <br><br>
            Finally, we prepare enterprises for <strong>M&A and Private Equity Support</strong>, ensuring they are structurally ready for capital injections or inorganic scale.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">PROPRIETARY EXECUTION MATRIX</p>
                <h4 class="role-accent">The Corporate Darwinism Framework™</h4>
                <p class="role-desc">Strategy, operations, digital, hierarchy, and ESG mapped into a single transformation stack.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">SUB-PAGE</p>
                <h4 class="role-accent">Operational Latency Diagnostic</h4>
                <p class="role-desc">Bottleneck and latency mapping across value chain and hierarchy.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Pan-India Logistics Fleet</h4>
                <p class="role-desc">Operational Process Re-engineering. Metric: ₹ 22 Crores/year cost rationalization - Status: Implemented & Audited</p>
                
                <h4 class="role-accent">Textile Manufacturing Group</h4>
                <p class="role-desc">Corporate Turnaround & Restructuring. Revenue Base: ₹ 600 Crores - Status: EBITDA restored to +18%</p>
                
                <h4 class="role-accent">FMCG Giant</h4>
                <p class="role-desc">Digital Transformation & AI Supply Chain Injection. Scope: Nationwide distribution grid - Status: Efficiency + 300%</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Advisory frameworks adhere to global corporate governance standards and sector-specific statutes.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> Projections assume ceteris paribus conditions. Outcomes depend on management execution; we do not indemnify against macro shocks or non-implementation.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-11": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 3 · Corporate Advisory Group</p>
        <h2>Deal Validation & Commercial Diligence</h2>
        <p class="brief-text">Transaction validation, commercial diligence, and deal structuring architecture — preventing balance sheet contagion from bad deals.</p>
        <div class="brief-status">
          <span>FOCUS: RISK MITIGATION</span>
          <span>GRID: DEAL CONSULTING</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">3. TRANSACTION VALIDATION, COMMERCIAL DILIGENCE & DEAL STRUCTURING</p>
            <p>
            In high-stakes transactions, a bad deal is not a simple error; it can neuroticize an entire balance sheet. Our Deal Consulting Services division acts as the ultimate fail-safe — a forensic checkpoint before signatures.
            <br><br>
            We run <strong>Commercial Viability & Profitability Stress-Tests</strong>, modeling synergies against harsh market realities to ensure strict alignment with strategic and profitability mandates.
            <br><br>
            Through <strong>Forensic Financial & Risk Review</strong>, we tear apart financials, hunting off-balance sheet liabilities, revenue inflation, and hidden covenants, translating them into quantified risk.
            <br><br>
            In parallel, <strong>Juridical & Compliance Due Diligence</strong> surfaces litigation exposure, regulatory non-compliance, and IP vulnerabilities, ensuring legal landmines are identified before closing.
            <br><br>
            We then re-engineer the deal through <strong>Transaction Structuring & Optimization</strong>, manipulating the mix of cash, equity, and earn-outs to shift risk away from the client and hard-code value protection.
            <br><br>
            Finally, <strong>Commercial Benefit Analysis</strong> tests whether projected benefits are real and mathematically defensible — turning deals into weapons of profitable growth, not sources of silent decay.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">PROPRIETARY EXECUTION MATRIX</p>
                <h4 class="role-accent">The Transaction Validation Firewall™</h4>
                <p class="role-desc">Layered checks on commercial logic, financial health, risk, and structure before signing.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">SUB-PAGE</p>
                <h4 class="role-accent">Commercial Viability Stress-Test</h4>
                <p class="role-desc">Deal-level profitability modeling and scenario analysis.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Luxury Hospitality Group</h4>
                <p class="role-desc">Buy-Side Commercial Due Diligence. Target Value: ₹ 350 Crores - Status: Deal Aborted (Toxic Liabilities Flagged)</p>
                <h4 class="role-accent">Steel Manufacturer</h4>
                <p class="role-desc">Joint Venture Structuring & Validation. JV Commitment: ₹ 6,000 Crores - Status: JV Executed</p>
                <h4 class="role-accent">Venture Capital Fund</h4>
                <p class="role-desc">Portfolio Valuation & Risk Review. AUM: ₹ 1,200 Crores - Status: Methodology Certified</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Fairness opinions and commercial diligence reports are prepared based on data available at the time of assessment.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> Advisory is limited to commercial, financial and risk structuring. Legal opinions are sourced from empaneled law firms. We do not warrant future performance; the client proceeds at their own risk based on the diligence findings.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-12": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 4 · Private Capital & Alternatives</p>
        <h2>Private Equity Syndication</h2>
        <p class="brief-text">Institutional private equity syndication & value engineering for high-growth enterprises.</p>
        <div class="brief-status">
          <span>FOCUS: GROWTH CAPITAL</span>
          <span>GRID: PRIVATE EQUITY</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. INSTITUTIONAL PRIVATE EQUITY SYNDICATION & VALUE ENGINEERING</p>
            <p>
            We facilitate the massive injection of transformative capital into high-growth enterprises. Our Private Equity Services division operates as the bridge between scalable corporations and the reservoirs of institutional wealth held by Private Equity (PE) firms. We do not merely find investors; we architect a fundamental shift in ownership structure to unlock the large amounts of money required for exponential scaling.
            <br><br>
            Our mandate begins with <strong>Strategic Equity Placement</strong>. We negotiate the sale of a significant ownership stake in the company, structuring the transaction to balance capital inflow with the preservation of promoter influence. Equity dilution is engineered so that it is mathematically justified by the projected acceleration in Enterprise Value (EV).
            <br><br>
            Once capital is deployed, we drive <strong>Operational Recalibration & Management Professionalization</strong>. PE investors demand governance and performance, not just growth. We restructure leadership hierarchies, implement rigorous KPI tracking, and enforce governance standards aligned with global institutional expectations.
            <br><br>
            The infused capital is then weaponized for <strong>Expansion & Restructuring</strong> — market penetration, capacity expansion, and strategic acquisitions that convert capital inflow into dominance.
            <br><br>
            Finally, we engineer the <strong>Liquidity Event & Exit Mechanism</strong>. Private equity is temporary; the objective is always a profitable exit. We prepare the company for secondary sales, strategic buyouts, or IPOs, managing investor relationships across the lifecycle so that stake sales deliver target IRRs.
            <br><br>
            In short, we weaponize institutional capital to force growth, restructure operations for efficiency, and engineer lucrative exits for all stakeholders.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">LEVEL 4 · SUB-PAGE 1-1</p>
                <h4 class="role-accent">The Institutional Equity Injection Mechanism™</h4>
                <p class="role-desc">Phase-wise mechanism for aligning thesis, modeling, negotiation, deployment, and exit with institutional PE investors.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">LEVEL 4 · SUB-PAGE 1-2</p>
                <h4 class="role-accent">Stake Dilution & Management Professionalization</h4>
                <p class="role-desc">Governance upgrades, KPI regimes, and ownership recalibration after institutional capital entry.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Consumer Electronics Brand</h4>
                <p class="role-desc">Series B Growth Capital Syndication. Capital Raise: $30 Million · Status: Closed with Tier-1 Global PE Fund</p>
                
                <h4 class="role-accent">Super-Specialty Hospital</h4>
                <p class="role-desc">Private Equity Buyout (Secondary Sale). Enterprise Value: ₹ 750 Crores · Status: Promoter Exit Facilitated</p>
                
                <h4 class="role-accent">Agri-Tech Enterprise</h4>
                <p class="role-desc">Strategic Investment & Structuring. Stake Dilution: 18% Equity · Status: Funded & Board Reconstituted</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Foreign investment is managed under the Foreign Exchange Management (Non-debt Instruments) Rules, 2019 and other applicable RBI/SEBI norms.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> Dwarkadas Capital facilitates the capital raising process but does not guarantee valuation or closure of a funding round. All investors are subject to AML and KYC checks. Shareholders' Agreements are binding; governance disputes post-investment fall outside our liability.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-13": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 4 · Private Capital & Alternatives</p>
        <h2>AIF Structuring & Advisory</h2>
        <p class="brief-text">Category I, II & III Alternative Investment Fund capital matching and regulatory structuring.</p>
        <div class="brief-status">
          <span>FOCUS: FUND ADVISORY</span>
          <span>GRID: AIF SERVICES</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">2. ALTERNATIVE INVESTMENT FUND (AIF) STRUCTURING & ADVISORY</p>
            <p>
            We navigate the exclusive and highly regulated domain of Alternative Investment Funds (AIFs), connecting corporations with non-traditional investors who operate outside the conventional banking system. Our AIF Advisory division mobilizes capital through Category I, II, and III AIF structures.
            <br><br>
            We begin with <strong>Capital Matching & Regulatory Alignment</strong>. We find the right AIF for the company by aligning the fund's investment thesis — venture capital, private credit, hedge — with the client's capital needs and risk profile.
            <br><br>
            Our core work lies in <strong>Transaction Structuring & Documentation Architecture</strong>. We manage drafting and vetting of investment documents — Private Placement Memorandum (PPM), Contribution Agreements, Subscription Deeds — and structure instruments (equity, debt, hybrid) to satisfy both issuer and fund requirements.
            <br><br>
            We then lead <strong>Commercial Negotiation & Compliance Management</strong> — valuation caps, liquidation preferences, information rights, anti-dilution, and downside protections are negotiated with an eye to long-term alignment.
            <br><br>
            Throughout, we ensure strict adherence to SEBI (AIF) Regulations, constructing deals that can endure regulatory scrutiny while unlocking access to sophisticated private capital.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">LEVEL 4 · SUB-PAGE 2-1</p>
                <h4 class="role-accent">The Alternative Capital Conduit™</h4>
                <p class="role-desc">A phase-wise conduit connecting corporate capital needs with AIFs under a strict regulatory shell.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">LEVEL 4 · SUB-PAGE 2-2</p>
                <h4 class="role-accent">Category I, II, III Fund Matching</h4>
                <p class="role-desc">Mapping use-cases and risk profiles to the right AIF categories and strategies.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Real Estate Yield Fund</h4>
                <p class="role-desc">Category II AIF Setup & Fundraising. Corpus: ₹ 600 Crores · Status: Green Shoe Option Exercised</p>
                
                <h4 class="role-accent">Venture Debt Fund</h4>
                <p class="role-desc">Deployment Strategy & Advisory. Deployment Size: ₹ 300 Crores · Status: Active Portfolio Construction</p>
                
                <h4 class="role-accent">Single Family Office</h4>
                <p class="role-desc">Structured Credit Investment. Ticket Size: ₹ 75 Crores · Status: Deployed via Cat II AIF Vehicle</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Advisory is governed by SEBI (Alternative Investment Funds) Regulations, 2012 and applicable circulars.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> Private placements target sophisticated investors (₹ 1 Cr+ minimum). The PPM is the definitive risk document. Returns are market-linked and principal may be at risk. Dwarkadas Capital acts as an arranger, not as the fund manager.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-14": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 5 · Global Markets & Treasury</p>
        <h2>Cross-Border Capital, ECB & Trade Finance</h2>
        <p class="brief-text">Cross-border capital markets access, ECB syndication, global invoice discounting and growth funding under a unified treasury protocol.</p>
        <div class="brief-status">
          <span>SOURCE: OVERSEAS INVESTMENTS</span>
          <span>GRID: TREASURY PROTOCOL</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. CROSS-BORDER CAPITAL MARKETS, ECB & GLOBAL LIQUIDITY PROTOCOLS</p>
            <p>
           We erase national borders to access superior liquidity and competitive cost of capital in global markets. Our Overseas Investments & Capital Services division specializes in navigating FEMA and international banking protocols to facilitate External Commercial Borrowings (ECB) for Indian corporates.

We enable companies to take loans from foreign lenders by exploiting interest rate arbitrage between domestic benchmarks and global curves (SOFR, LIBOR successors), securing debt at competitive rates. Our team manages end-to-end regulatory approvals and compliance — all paperwork, RBI filings, and approvals required to legitimize foreign debt inflows.

In parallel, we accelerate working capital velocity via Global Invoice Discounting & Factoring. We unblock cash trapped in supply chains by selling or discounting export invoices with global financiers, converting receivables into instant liquidity and ensuring operations are not strangled by cash flow delays.

For longer-term expansion, we execute International Growth Funding Syndication, connecting domestic enterprises with global investors for cross-border expansion mandates.

Across all these flows, we act as the central interface for lender liaison & cross-border legalities— negotiating facility agreements under international law, scrutinizing cross-border regulations, and ensuring funds are raised smoothly, safely, and compliantly.

In short, we open the floodgates of global finance, allowing companies to raise foreign loans, liquidate receivables instantly, and secure international growth capital without being entangled in regulatory wires.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">LEVEL 5 · SUB-PAGE 1-1</p>
                <h4 class="role-accent">The Cross-Border Liquidity Bridge™</h4>
                <p class="role-desc">Phase-wise matrix connecting ECB, invoice discounting and growth funding into a single cross-border liquidity rail.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">LEVEL 5 · SUB-PAGE 1-2</p>
                <h4 class="role-accent">ECB Syndication & Foreign Debt Architecture</h4>
                <p class="role-desc">Detailed architecture for sourcing, structuring and hedging external commercial borrowings.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Solar Power Producer (IPP)</h4>
                <p class="role-desc">External Commercial Borrowing (ECB). Debt Raise: $65 Million - Status: LRN Generated & Funds Repatriated.</p>
                
                <h4 class="role-accent">Textile Exporter</h4>
                <p class="role-desc">International Factoring Facility. Revolving Limit: $20 Million - Status: Active Liquidity Line.</p>
                
                <h4 class="role-accent">IT Services Firm</h4>
                <p class="role-desc">US Market Expansion Growth Funding. Capital Injection: $15 Million - Status: Funded by Global Strategic Investor.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Cross-border transactions are executed in strict compliance with FEMA, 1999 and RBI Master Directions on ECB and Trade Credit.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> Clients acknowledge inherent foreign exchange volatility risk. Hedging is mandated but Dwarkadas Capital is not liable for losses arising from currency movement or sovereign risk in the lender's jurisdiction.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-15": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 6 · Unlisted Securities & Grey Market</p>
        <h2>Unlisted Securities & Pre-IPO Arbitrage</h2>
        <p class="brief-text">Intermediation, liquidity and leverage solutions in unlisted, pre-IPO and grey-market equity for institutional power players.</p>
        <div class="brief-status">
          <span>SOURCE: UNLISTED & PRE-IPO SHARES SERVICES</span>
          <span>GRID: SHADOW BANKING SYSTEM</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. UNLISTED SECURITIES INTERMEDIATION & PRE-IPO EQUITY ARBITRAGE</p>
            <p>
              Operating within the opaque and illiquid corridors of the Over-the-Counter (OTC) markets, our Unlisted & Pre-IPO Services division provides sophisticated investors with privileged access to off-market equity before value is diluted by public discovery. We facilitate the acquisition and liquidation of high-alpha assets in an ecosystem typically restricted to institutional power players. This is not retail trading; this is the strategic accumulation of ownership in the shadow banking system.

Our Proprietary Trading Infrastructure serves as a liquidity engine for unlisted, pre-IPO, and ESOP (Employee Stock Ownership Plan) securities. We bridge the gap between fragmented sellers and institutional buyers, creating a secure, settlement-guaranteed environment for the transfer of ownership in companies that are on the cusp of exponential valuation shifts.

We provide Institutional Investment Guidance that transcends simple stock picking. Our analysts dissect cap tables, growth vectors, and sector dynamics of upcoming enterprises, identifying undervalued assets with private equity–grade rigor. Capital is allocated into entities with robust fundamentals that have yet to undergo the price discovery of a public exchange.

Beyond facilitation, we offer Transaction Financing & Leverage Solutions. Recognizing that high-value pre-IPO blocks require significant capital, we engineer funding mechanisms and loan structures that allow investors to leverage positions via debt-syndicated acquisition models — amplifying return on equity (ROE).

This is supported by a rigorous Valuation & Compliance Framework. In unlisted markets, price is subjective; we make it empirical. Independent valuation assessments using DCF and comparable company analysis validate pricing, while documentation is curated to legitimize off-market transfers in strict adherence with Section 56(2) of the Income Tax Act and other statutes governing fair market value.

Our Client Assistance & Deal Execution team manages transactions from term sheet to share certificate transfer. We navigate ROFR clauses, shareholder agreements and lock-in periods, acting as central counterparty to deliver settlement with zero operational friction.

In essence, we democratize access to the venture stage, allowing investors to trade in the exclusive domain of pre-public equity with the safety, valuation rigor and support typically reserved for sovereign wealth funds.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">LEVEL 6 · SUB-PAGE 1-1</p>
                <h4 class="role-accent">The Grey Market Liquidity Engine™</h4>
                <p class="role-desc">Execution matrix for safe, compliant and fully-settled trading of off-market unlisted and pre-IPO equity.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">LEVEL 6 · SUB-PAGE 1-2</p>
                <h4 class="role-accent">The Trading Desk (Live Quotes)</h4>
                <p class="role-desc">Quote discovery, two-way pricing and order execution protocols for unlisted and pre-IPO blocks.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">LEVEL 6 · SUB-PAGE 1-3</p>
                <h4 class="role-accent">Valuation & Compliance Checks</h4>
                <p class="role-desc">FMV determination, documentation and regulatory alignment for safe off-market share transfers.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Ed-Tech Leader</h4>
                <p class="role-desc">Employee Stock Option (ESOP) Liquidation Block. Value: ₹85 Crores - Status: 100% Placement.</p>
                
                <h4 class="role-accent">National Retail Chain</h4>
                <p class="role-desc">Strategic Pre-IPO Equity Acquisition. Deal Size: ₹150 Crores - Status: Executed at 15% Discount.</p>
                
                <h4 class="role-accent">Aerospace & Defence Startup</h4>
                <p class="role-desc">Series-C Secondary Exit. Volume: 2.5 Lakh Shares - Status: Cleared & Settled (T+1).</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Transactions are governed by Section 56(2)(x) of the Income Tax Act, 1961, for Fair Market Value (FMV) determination.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> Investments in unlisted securities are highly illiquid and lack a public price discovery mechanism. Pre-IPO shares may be subject to post-listing lock-ins.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-16": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 7 · Assurance, Tax & Risk</p>
        <h2>Forensic Assurance & Global Taxation</h2>
        <p class="brief-text">Fiscal compliance architecture, forensic assurance and global taxation strategy wrapped into a single integrity shield.</p>
        <div class="brief-status">
          <span>SOURCE SERVICE: ACCOUNTING & TAX SERVICES</span>
          <span>GRID: FISCAL INTEGRITY SHIELD</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. FISCAL COMPLIANCE ARCHITECTURE, FORENSIC ASSURANCE & GLOBAL TAXATION STRATEGY</p>
            <p>
              In an environment of draconian regulatory oversight and relentless statutory flux, financial management is not merely an administrative function; it is the first line of defense against corporate erosion. Our Accounting & Tax Services division operates as an impregnable fortress of fiscal integrity, ensuring that your enterprise’s books are not just balanced, but bulletproof. We do not simply “check” financial statements; we execute Statutory Audit & Forensic Assurance protocols that border on the inquisitorial.

Our auditors deploy rigorous stress-testing methodologies to dissect your financial assertions, validating the veracity of every ledger entry against the strictest interpretations of Ind AS and IFRS. We scrutinize internal controls to identify microscopic fractures in financial governance before they manifest as material misstatements or fraud risks.

Our approach to Strategic Tax Consulting is equally aggressive. Tax is treated not as a passive liability, but as a variable to be engineered. We construct complex, multi-jurisdictional tax architectures designed to legally minimize fiscal hemorrhage — optimizing effective tax rates through legitimate deduction strategies and transfer pricing mechanisms.

This extends to Business & Transaction Advisory for high-stakes capital events such as IPOs, mergers and acquisitions. We model the financial implications of every deal structure, ensuring tax consequences do not cannibalize commercial benefits.

We also offer a totalized Financial Outsourcing Solution. We assume command of your financial backend — accounts payable / receivable, payroll and statutory filings — so leadership can detach from compliance tedium while we maintain a relentless vigil over regulatory standing.

With Global and Domestic Support infrastructure, we service both Indian entities and international conglomerates, harmonizing GST mandates, cross-border reporting and multi-GAAP alignment. In summation, we provide a shield of absolute financial compliance — proper accounting, strategic tax planning, and the rigorous audit defense required to survive in a hostile regulatory climate.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">LEVEL 7 · SUB-PAGE 1-1</p>
                <h4 class="role-accent">The Fiscal Integrity Shield™</h4>
                <p class="role-desc">Execution matrix for forensic ledger scrutiny, internal control stress testing and strategic tax architecture.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">LEVEL 7 · SUB-PAGE 1-2</p>
                <h4 class="role-accent">Transfer Pricing & International Tax</h4>
                <p class="role-desc">Structures for BEPS-aligned transfer pricing, cross-border tax planning and multi-jurisdictional compliance.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Global MNC Subsidiary</h4>
                <p class="role-desc">Turnover Scrutinized: ₹3,200 Crores - Status: Zero Non-Compliance Observations.</p>
                
                <h4 class="role-accent">Infrastructure Developer</h4>
                <p class="role-desc">Asset Base: ₹1,500 Crores - Status: Fraud Risk Matrix Nullified.</p>
                
                <h4 class="role-accent">IT Services Exporter</h4>
                <p class="role-desc">Geography: India, USA, UAE, Singapore - Status: Ongoing Multi-Jurisdictional Retainer.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Engagements are aligned with Standards on Auditing (SAs) issued by ICAI and the Ind AS framework.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> Clients retain primary responsibility for the veracity of source documents; Dwarkadas Capital bears no liability for penalties arising from concealed facts.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-17": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">Level 7 · Assurance, Tax & Risk</p>
        <h2>Enterprise Risk Management (ERM)</h2>
        <p class="brief-text">Threat vector identification, mitigation and remediation across financial, legal, operational and cyber domains.</p>
        <div class="brief-status">
          <span>SOURCE SERVICE: RISK CONSULTING SERVICES</span>
          <span>GRID: RISK NEUTRALIZATION MATRIX</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. ENTERPRISE RISK MANAGEMENT (ERM) & THREAT VECTOR NEUTRALIZATION</p>
            <p>
              In a volatile global economy, ignorance is a liability. Our Risk Consulting Services division provides a panoramic surveillance system designed to <strong>find risks and avoid losses</strong> before they manifest as catastrophic failures. We audit the enterprise across four critical dimensions: 
              <br><br>
              <strong>Financial Risk Assessment</strong> (liquidity ratios and credit exposure), <strong>Legal & Regulatory Risk Audit</strong> (contractual breaches), <strong>Operational Risk Architecture</strong> (supply chain failure points), and <strong>Cybersecurity & InfoSec Protocols</strong> (digital perimeter defense). 
              <br><br>
              Our value proposition lies in Solution Deployment & Remediation—implementing internal controls and disaster recovery plans so risk management becomes a proactive strategic asset.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">LEVEL 7 · SUB-PAGE 2-1</p>
                <h4 class="role-accent">The Threat Neutralization Protocol™</h4>
                <p class="role-desc">Enterprise risk scanning, stress testing and remediation matrix for finance, legal and operations.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">LEVEL 7 · SUB-PAGE 2-2</p>
                <h4 class="role-accent">Cybersecurity & InfoSec Audits</h4>
                <p class="role-desc">CERT-In aligned cyber audits, penetration testing and InfoSec hardening for digital resilience.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Scheduled Co-operative Bank</h4>
                <p class="role-desc">Asset Liability: ₹12,000 Crores - Status: ISO 27001 Certification Achieved.</p>
                
                <h4 class="role-accent">Pharma Exporter (API)</h4>
                <p class="role-desc">Facility Scope: 3 Units - Status: USFDA/EMA Compliance Shield Implemented.</p>
                
                <h4 class="role-accent">Petrochemical Plant</h4>
                <p class="role-desc">Operational Hazard & Safety Assessment - Status: End-to-End Plant Ops Secured.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Frameworks aligned with COSO ERM, ISO 31000 and CERT-In guidelines for cybersecurity.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> We deploy mitigation protocols but do not act as an insurer. Black swan events cannot be fully eliminated; clients remain responsible for residual risk coverage.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-18": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 8 · THE INTELLIGENCE DIRECTORATE</p>
        <h2>Market Intelligence & Predictive Analytics</h2>
        <p class="brief-text">Empirical market intelligence, data analytics and strategic foresight for high-stakes corporate decisions.</p>
        <div class="brief-status">
          <span>SOURCE SERVICE: RESEARCH & ANALYSIS SERVICES</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. EMPIRICAL MARKET INTELLIGENCE, DATA ANALYTICS & STRATEGIC FORESIGHT</p>
            <p>
              In the modern economy, data is the only currency that matters. Without it, a corporation is blind, navigating a minefield of volatility. Our Research & Analysis Services division functions as your external intelligence agency, harvesting and synthesizing vast datasets to provide the empirical bedrock for high-stakes corporate decision-making. We do not guess; we measure.
              <br><br>
              Our <strong>Market Research & Segmentation</strong> protocols involve deep-dive forensic analysis of industry verticals—dissecting supply chain dynamics, competitive saturation and emerging macroeconomic vectors to pinpoint where opportunity actually resides.
              <br><br>
              We delve into the psychology of the market via <strong>Consumer Behavior Analysis</strong>. Using psychographic profiling and behavioral economics, we decode the neuro-linguistic triggers that drive purchasing decisions, allowing you to anticipate what the market prefers before the market itself is aware.
              <br><br>
              This is reinforced by <strong>Technology Research & Trend Forecasting</strong>. We monitor disruptive technology curves and industrial developments, ensuring your business model does not become collateral damage to an unseen innovation wave.
              <br><br>
              Raw data is distilled into <strong>Strategic Insights</strong>. We translate abstract numbers into battlefield-ready corporate strategy—guiding expansion, pricing, product and capital allocation with mathematical precision.
              <br><br>
              Through integrated <strong>Analytics Solutions</strong>, we embed business intelligence tooling into operational workflows so that governance becomes truly evidence-based. Every decision is validated by our algorithms.
              <br><br>
              In essence, we provide the data-based insights critical for survival—helping companies understand granular market realities, hidden customer desires and the inevitable trends that define the future.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">LEVEL 8 · SUB-PAGE 1-1</p>
                <h4 class="role-accent">The Empirical Intelligence Vector™</h4>
                <p class="role-desc">Matrix for data harvesting, analytics and strategic insight generation across markets and consumers.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">LEVEL 8 · SUB-PAGE 1-2</p>
                <h4 class="role-accent">Consumer Psychographics & Behavior</h4>
                <p class="role-desc">Psychographic segmentation and behavior modeling to decode the hidden triggers behind demand.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">THE RESEARCH VAULT</p>
                <h4 class="role-accent">Macro-Economic Outlooks</h4>
                <p class="role-desc">Top-down views on growth, inflation, rates and liquidity cycles.</p>
                
                <h4 class="role-accent">Sectoral Whitepapers</h4>
                <p class="role-desc">Deep-dive theses on industries, value pools and disruption vectors.</p>
                
                <h4 class="role-accent">Regulatory Gazettes</h4>
                <p class="role-desc">Curated regulatory updates with impact mapping for businesses.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Research reports are prepared in the spirit of SEBI (Research Analysts) Regulations, 2014.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> Intelligence outputs are intended for institutional strategic planning and do not constitute retail investment advice unless explicitly stated. Data integrity is maintained via ISO 27001 standards, but third-party sources may carry inherent inaccuracies.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-19": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 9 · PARTNER ECOSYSTEM & FRANCHISE</p>
        <h2>Financial Distribution & Franchise Grid</h2>
        <p class="brief-text">Syndicated financial distribution and franchise ecosystem infrastructure, built as a high-velocity B2B2C network.</p>
        <div class="brief-status">
          <span>SOURCE SERVICE: FINANCIAL PRODUCTS VIA FRANCHISE MODEL</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. SYNDICATED FINANCIAL DISTRIBUTION & FRANCHISE ECOSYSTEM INFRASTRUCTURE</p>
            <p>
              We have engineered a monolithic B2B2C distribution grid that allows our partners to weaponize their reach through a <strong>Financial Franchise Model</strong>. This is not a simple partnership; it is the deputization of entities into a high-velocity financial sales machinery. We grant franchisees access to an exhaustive, institutional-grade inventory of financial instruments, transforming them into localized financial powerhouses.
              <br><br>
              At the core of this ecosystem is our <strong>Credit Syndication & Liquidity Injection</strong> capability. Partners distribute a diverse spectrum of debt products — secured Home Loans, Loans Against Property (LAP), unsecured Business Loans and liquid Gold Loans. We provide the underwriting framework and banking relationships; the partner provides the distribution channel.
              <br><br>
              Simultaneously, we integrate a comprehensive <strong>Risk Transfer & Insurance Suite</strong>. Partners can underwrite client risks via Life and General Insurance products using our carrier networks.
              <br><br>
              This is complemented by our <strong>Broking & Investment Architecture</strong>, which opens the gateway to capital markets. Franchisees facilitate stock trading, manage Demat accounts and distribute mutual fund units, democratizing equity participation.
              <br><br>
              We elevate this further with <strong>Wealth Management Products</strong>, including sophisticated investment portfolios and research support once reserved for private banking.
              <br><br>
              The linchpin is our <strong>Unified Digital Marketplace</strong>. All products — loans, policies and investments — converge on a single algorithmic platform where every transaction can be accessed, processed and tracked. This digital infrastructure acts as the central nervous system of the franchise.
              <br><br>
              In short, we enable partners to offer a totalized suite of financial solutions under one dominant brand umbrella, creating a scalable, robust and relentlessly profitable capital distribution network.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">SUB-PAGE 9-1-1</p>
                <h4 class="role-accent">The B2B2C Distribution Grid™</h4>
                <p class="role-desc">Execution matrix for partner qualification, territory mapping, digital integration and payout governance.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">SUB-PAGE 9-1-2</p>
                <h4 class="role-accent">Partner Application Portal</h4>
                <p class="role-desc">Digital onboarding rail for prospective franchise partners — KYC, profiling and eligibility screening.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">REPRESENTATIVE MANDATES</p>
                <h4 class="role-accent">Master Franchise (Western Zone)</h4>
                <p class="role-desc">Secured Credit Disbursement Portfolio<br>AUM: ₹450 Crores - Status: Active (NPA < 0.5%)</p>
                
                <h4 class="role-accent">Corporate Insurance Partner</h4>
                <p class="role-desc">Risk Underwriting Volume – General & Life<br>GWP: ₹65 Crores - Status: Renewal Rate 92%</p>
                
                <h4 class="role-accent">Wealth Distribution Network</h4>
                <p class="role-desc">Mutual Fund & Equity SIP Book<br>Monthly Flow: ₹25 Crores / Month - Status: Scaling Aggressively</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STATUTORY ADHERENCE & RISK DISCLOSURE</p>
                <p class="role-desc"><strong>Regulatory Mandate:</strong> Solicitation of financial products is conducted through licenses under AMFI (Mutual Funds), IRDAI (Insurance) and RBI (Lending) held by partners and network institutions.</p>
                <p class="role-desc"><strong>Fiduciary Disclaimer:</strong> Franchise partners operate as independent entities under the Dwarkadas compliance umbrella. Credit decisions remain at the sole discretion of lenders. Investment products are subject to market risks; past performance is not indicative of future returns. Dwarkadas Capital acts as a distributor, not a risk underwriter.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-20": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 10 · ASSET MANAGEMENT & WEALTH</p>
        <h2>The Wealth Preservation Protocol</h2>
        <p class="brief-text">Intergenerational capital architecture and portfolio engineering for UHNWIs and family offices, built on preservation, structural alpha and fiduciary discipline.</p>
        <div class="brief-status">
          <span>10. ASSET MANAGEMENT & WEALTH · THE WEALTH PRESERVATION PROTOCOL</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. THE WEALTH PRESERVATION PROTOCOL</p>
            <p>
              We do not "manage money"; we construct Fortresses of Intergenerational Wealth. Our Asset Management division is separated from retail participation and restricted to a closed loop of Ultra-High-Net-Worth Individuals (UHNWIs) and Single Family Offices (SFOs) who demand more than market returns — they demand Capital Sovereignty.
              <br><br>
              Our primary mandate is the preservation of purchasing power against the erosive forces of inflation, taxation and currency debasement. In a regime where traditional "60/40" constructs are obsolete, we deploy Alpha Generation through Structural Arbitrage, rejecting passive "buy and hold" in favour of active, algorithmic capital rotation.
            </p>
            <br>
            <p class="modal-level">PORTFOLIO ENGINEERING STRATEGY</p>
            <p>Our investment philosophy is rigorously quantitative, using a multi-asset allocation framework diversified across non-correlated vectors:</p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">HIGH-CONVICTION EQUITY VECTOR</p>
                <h4 class="role-accent">Concentrated Portfolios</h4>
                <p class="role-desc">Targeting firms with monopolistic dominance and wide economic moats. We leverage the <strong>Research & Analysis Services</strong> stack to identify undervalued securities.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STRUCTURED YIELD ARCHITECTURE</p>
                <h4 class="role-accent">Fixed-Income Instruments</h4>
                <p class="role-desc">Access to private debt, securitized debt instruments (SDIs) and market-linked debentures (MLDs). Secured by collateral and delivered via our <strong>Financial Products via Franchise Model</strong>.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">ALTERNATIVE ASSET SILO</p>
                <h4 class="role-accent">Unlisted & Pre-IPO Shares</h4>
                <p class="role-desc">High-alpha domain with direct access to curated <strong>Alternative Investment Funds (AIFs)</strong> — venture, distressed assets and real estate yields.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">THE FIDUCIARY OBLIGATION</p>
                <p class="role-desc">We operate under a strict fiduciary standard. Every construct is stress-tested against the client's risk tolerance, liquidity horizon and succession architecture. We do not distribute third-party products for commissions; we curate solutions purely around long-term wealth preservation.</p>
                <p class="role-desc">Our Wealth Products desk provides continuous monitoring and rebalancing so portfolios stay aligned with evolving macro conditions. Through integrated <strong>Tax Consulting Services</strong>, gains are tax-optimized to prevent erosion.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">CLIENT ACCESS</p>
                <h4 class="role-accent">The Wealth Preservation Protocol: Client Experience</h4>
                <p class="role-desc">UHNWI and Family Office clients receive encrypted digital access to mandates, positions, risk analytics and multi-jurisdictional exposure maps via the [SECURE] UHNWI Portal.</p>
                <ul class="role-desc" style="margin-top: 10px; list-style-type: disc; padding-left: 20px;">
                  <li>Consolidated multi-asset and multi-currency reporting</li>
                  <li>Drawdown / distribution schedules and liquidity ladders</li>
                  <li>Risk dashboards and stress-test visualizations</li>
                  <li>Controlled multi-user access for family office teams</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-20": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 10 · ASSET MANAGEMENT & WEALTH</p>
        <h2>The Wealth Preservation Protocol</h2>
        <p class="brief-text">Intergenerational capital architecture and portfolio engineering for UHNWIs and family offices, built on preservation, structural alpha and fiduciary discipline.</p>
        <div class="brief-status">
          <span>10. ASSET MANAGEMENT & WEALTH · THE WEALTH PRESERVATION PROTOCOL</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">1. THE WEALTH PRESERVATION PROTOCOL</p>
            <p>
              We do not "manage money"; we construct Fortresses of Intergenerational Wealth. Our Asset Management division is separated from retail participation and restricted to a closed loop of Ultra-High-Net-Worth Individuals (UHNWIs) and Single Family Offices (SFOs) who demand more than market returns — they demand Capital Sovereignty.
              <br><br>
              Our primary mandate is the preservation of purchasing power against the erosive forces of inflation, taxation and currency debasement. In a regime where traditional "60/40" constructs are obsolete, we deploy Alpha Generation through Structural Arbitrage, rejecting passive "buy and hold" in favour of active, algorithmic capital rotation.
            </p>
            <br>
            <p class="modal-level">PORTFOLIO ENGINEERING STRATEGY</p>
            <p>Our investment philosophy is rigorously quantitative, using a multi-asset allocation framework diversified across non-correlated vectors:</p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">HIGH-CONVICTION EQUITY VECTOR</p>
                <h4 class="role-accent">Concentrated Portfolios</h4>
                <p class="role-desc">Targeting firms with monopolistic dominance and wide economic moats. We leverage the <strong>Research & Analysis Services</strong> stack to identify undervalued securities.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">STRUCTURED YIELD ARCHITECTURE</p>
                <h4 class="role-accent">Fixed-Income Instruments</h4>
                <p class="role-desc">Access to private debt, securitized debt instruments (SDIs) and market-linked debentures (MLDs). Secured by collateral and delivered via our <strong>Financial Products via Franchise Model</strong>.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">ALTERNATIVE ASSET SILO</p>
                <h4 class="role-accent">Unlisted & Pre-IPO Shares</h4>
                <p class="role-desc">High-alpha domain with direct access to curated <strong>Alternative Investment Funds (AIFs)</strong> — venture, distressed assets and real estate yields.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">THE FIDUCIARY OBLIGATION</p>
                <p class="role-desc">We operate under a strict fiduciary standard. Every construct is stress-tested against the client's risk tolerance, liquidity horizon and succession architecture. We do not distribute third-party products for commissions; we curate solutions purely around long-term wealth preservation.</p>
                <p class="role-desc">Our Wealth Products desk provides continuous monitoring and rebalancing so portfolios stay aligned with evolving macro conditions. Through integrated <strong>Tax Consulting Services</strong>, gains are tax-optimized to prevent erosion.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">CLIENT ACCESS</p>
                <h4 class="role-accent">The Wealth Preservation Protocol: Client Experience</h4>
                <p class="role-desc">UHNWI and Family Office clients receive encrypted digital access to mandates, positions, risk analytics and multi-jurisdictional exposure maps via the [SECURE] UHNWI Portal.</p>
                <ul class="role-desc" style="margin-top: 10px; list-style-type: disc; padding-left: 20px;">
                  <li>Consolidated multi-asset and multi-currency reporting</li>
                  <li>Drawdown / distribution schedules and liquidity ladders</li>
                  <li>Risk dashboards and stress-test visualizations</li>
                  <li>Controlled multi-user access for family office teams</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-21": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 11 · TECHNOLOGY & INNOVATION</p>
        <h2>The Digital Foundry</h2>
        <p class="brief-text">Dwarkadas Neural Core & algorithmic stack — proprietary infrastructure for millisecond capital markets execution.</p>
        <div class="brief-status">
          <span>11. TECHNOLOGY & INNOVATION · PROPRIETARY ALGORITHMIC INFRASTRUCTURE</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p>
              Dwarkadas Capital Services is, in essence, a technology company disguised as a financial institution. Our operations are powered by the <strong>Dwarkadas Neural Core</strong>, a proprietary algorithmic stack that processes market data with millisecond latency.
              <br><br>
              We have moved beyond legacy financial systems to a cloud-native microservices architecture. This infrastructure allows us to execute complex Merchant Banking mandates and IPO management tasks with automated precision — from order orchestration to compliance logging.
              <br><br>
              Predictive machine learning models ingest datasets harvested by our Research & Analysis wing, identifying liquidity fractals and pricing inefficiencies in grey and public markets before they become visible to conventional participants.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">Dwarkadas NEURAL CORE · STACK SNAPSHOT</p>
                <ul class="role-desc" style="list-style-type: disc; padding-left: 20px;">
                  <li>Cloud-native microservices with event-driven messaging for real-time market ingestion.</li>
                  <li>Low-latency pricing engines scanning order books and grey market quotes.</li>
                  <li>ML models for anomaly detection, liquidity mapping and spread optimization.</li>
                  <li>Integrated with Merchant Banking & IPO workflows for automated allocation, alerting and reporting.</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-22": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 11 · TECHNOLOGY & INNOVATION</p>
        <h2>Cyber-Sovereignty</h2>
        <p class="brief-text">Zero-trust architecture, blockchain settlement and AI-driven compliance — a military-grade cyber grid for financial data.</p>
        <div class="brief-status">
          <span>CYBER-SOVEREIGNTY & DATA FORTIFICATION</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p>
              In an era of digital warfare and state-sponsored espionage, our technology stack is designed for <strong>cyber-sovereignty</strong> — not just protection, but control over every byte of sensitive data.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item">
                <p class="role-caption">BLOCKCHAIN SETTLEMENT LAYER</p>
                <h4 class="role-accent">Immutable Ownership Rails</h4>
                <p class="role-desc">We pilot distributed ledger technology (DLT) for unlisted share transfers and Private Equity cap tables, ensuring tamper-proof, transparent ownership records and audit-ready settlement trails.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">ZERO-TRUST ARCHITECTURE</p>
                <h4 class="role-accent">Compartmentalized Access Control</h4>
                <p class="role-desc">The internal network operates on <strong>Zero-Trust</strong>. Access to sensitive data — M&A due diligence, exit valuations and risk models — is governed by biometric authentication and strict role-based access. No operator views the entire data lake.</p>
            </div>
            <div class="role-item">
                <p class="role-caption">AI-DRIVEN COMPLIANCE SENTINEL</p>
                <h4 class="role-accent">Real-Time Regulatory Guardian</h4>
                <p class="role-desc">Automated surveillance algorithms scan every transaction in real-time against SEBI regulations and Insider Trading norms, raising alerts, blocking suspicious flows and preserving unassailable corporate governance.</p>
            </div>
        </div>
      </div>
    </div>
  `,
  "content-23": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 11 · TECHNOLOGY & INNOVATION</p>
        <h2>Fintech Solutions</h2>
        <p class="brief-text">Digital lending and investment platforms built on a unified franchise marketplace — one rail for loans, insurance and capital markets access.</p>
        <div class="brief-status">
          <span>11. TECHNOLOGY & INNOVATION · DIGITAL MARKETPLACE ECOSYSTEM</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">FRANCHISE-SCALE FINTECH INFRASTRUCTURE</p>
            <p>
              Our Financial Products via Franchise Model is anchored by a monolithic <strong>Digital Marketplace</strong>. This platform aggregates APIs from multiple banks, NBFCs and insurance carriers into one cohesive operating layer.
              <br><br>
              Partners receive a unified dashboard for loan origination, insurance underwriting and investment processing. Every application, policy and order flows through the same orchestration engine, enabling true fintech-grade execution speed with institutional governance.
              <br><br>
              The outcome is a network of digitally armed franchisees who dispense financial products with the velocity of a startup, while retaining the advisory depth and risk discipline of a traditional merchant bank.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">PLATFORM FLOW · DIGITAL LENDING & INVESTMENTS</p>
                <div class="flow-step">
                  <h4 class="role-accent">1. API Aggregation Layer</h4>
                  <p class="role-desc">Banking, insurance, broking and fund platforms integrated via secure APIs with unified authentication and logging.</p>
                </div>
                <div class="flow-step">
                  <h4 class="role-accent">2. Partner Command Console</h4>
                  <p class="role-desc">Franchise partners access one interface to originate digital loans, issue policies and route investment orders.</p>
                </div>
                <div class="flow-step">
                  <h4 class="role-accent">3. Risk & Pricing Engine</h4>
                  <p class="role-desc">Dwarkadas Neural Core overlays eligibility checks, risk scores, product selection and pricing recommendations in real time.</p>
                </div>
                <div class="flow-step">
                  <h4 class="role-accent">4. Settlement, Audit & Governance</h4>
                  <p class="role-desc">Immutable logs, maker-checker flows and compliance workflows provide regulator-grade traceability for every transaction.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `

};
const policyContents = {
  "terms": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">GOVERNANCE · JURISDICTIONAL MANDATE</p>
        <h2>Terms of Engagement</h2>
        <p class="brief-text">Dictates the rules of engagement between the User and The Firm.</p>
        <div class="brief-status">
          <span>LEVEL: 01 · LEGAL BINDING · IT ACT 2000 COMPLIANT</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level"><b>PREAMBLE</b></p>
            <p>
              Access to the Dwarkadas Capital digital domain constitutes irrevocable acceptance of these Terms of Engagement. These terms are legally binding under the <strong>Information Technology Act, 2000</strong> and its amendments.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">CLAUSE ARCHITECTURE · LEGAL RESTRAINTS</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">01 — Section A: Limitation of Fiduciary Duty</h4>
                  <p class="role-desc">All content including tickers, valuation matrices, and whitepapers is informational only. Nothing on this platform constitutes a solicitation to buy or sell securities.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">02 — Section B: Force Majeure & Indemnification</h4>
                  <p class="role-desc">Users agree to indemnify and hold Dwarkadas harmless against damages arising from reliance on hosted data. The Firm is not liable for failures caused by acts of God or market-halting events.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">03 — Section C: Exclusive Jurisdiction</h4>
                  <p class="role-desc">All disputes shall fall under the exclusive jurisdiction of Courts in Mumbai, Maharashtra.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,
  "data": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 02 · DATA SOVEREIGNTY</p>
        <h2>Privacy Architecture</h2>
        <p class="brief-text">Transforming standard data protection into a robust security protocol for the sovereign financial domain.</p>
        <div class="brief-status">
          <span>ENCRYPTION: AES-256 · COMPLIANCE: DPDP ACT 2023</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">ARTICLE I — DATA DOMICILE & COMPLIANCE</p>
            <p>
              Dwarkadas Capital operates a sovereign data infrastructure compliant with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>. We do not "share" data; we quarantine it. All Client PII and SPDI is encrypted using AES-256 military-grade standards and domiciled exclusively within Tier-4 Data Centers in India.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">SECURITY PROTOCOLS · ARCHITECTURAL LAYERS</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">ARTICLE II: Forensic Data Collection</h4>
                  <p class="role-desc">User navigation constitutes consent to algorithmic metadata harvesting (IP triangulation, device fingerprinting) utilized solely for proprietary Risk Threat Modeling and KYC protocols.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">ARTICLE III: The "Zero-Leak" Guarantee</h4>
                  <p class="role-desc">We maintain a "Zero-Trust" internal architecture. Access is restricted via biometric authentication. Liability is disclaimed for breaches resulting from the User's failure to maintain their own cybersecurity perimeter.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,

  "risk": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 03 · CAPITAL VIGILANCE</p>
        <h2>Risk Disclosure</h2>
        <p class="brief-text">This is the "Scare Document." It ensures no one can sue you if they lose money. Read the structural risks carefully.</p>
        <div class="brief-status">
          <span>RISK: EXTREME · EXPOSURE: SYSTEMIC · ASSETS: UNLISTED</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">WARNING — SYSTEMIC VOLATILITY & CAPITAL EROSION</p>
            <p>
              Investments in Capital Markets and Alternative Investment Funds (AIFs) are subject to <strong>Systemic Market Risks</strong>. Engaging in these markets may result in the partial or <strong>total erosion of the Principal Capital</strong>.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">OPERATIONAL CLAUSES · LEGAL PARAMETERS</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">CLAUSE 1: Illiquidity of Unlisted Assets</h4>
                  <p class="role-desc">Unlisted/Pre-IPO securities lack a centralized discovery mechanism. Liquidity is theoretically non-existent until a formal Listing Event. The Firm provides no warranty regarding timeline or certainty.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">CLAUSE 2: No Guarantee of Returns</h4>
                  <p class="role-desc">Past performance and AUA trajectories are historical artifacts, not predictive indicators. The Firm explicitly disclaims any guarantee of fixed returns, capital protection, or dividend consistency.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">CLAUSE 3: Regulatory Flux</h4>
                  <p class="role-desc">Asset valuation may be materially impacted by retrospective taxation, SEBI regulation changes, or geopolitical instability. The User assumes full liability for macro-environmental variables.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,
  "aml": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 04 · FINANCIAL INTEGRITY</p>
        <h2>AML & CFT Charter</h2>
        <p class="brief-text">This charter implies the infrastructure holds police-like powers to freeze assets and enforce forensic financial transparency.</p>
        <div class="brief-status">
          <span>PROTOCOL: PMLA 2002 · AUTHORITY: FIU-IND · FATF COMPLIANT</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">STATUTORY MANDATE — PMLA ENFORCEMENT</p>
            <p>
              The Firm adheres strictly to the <strong>Prevention of Money Laundering Act (PMLA), 2002</strong> and guidelines issued by the <strong>Financial Intelligence Unit (FIU-IND)</strong>. We operate under a zero-tolerance mandate for illicit capital flow.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">ENFORCEMENT PROTOCOLS · FORENSIC VETTING</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">PROTOCOL 1: Source of Funds Verification</h4>
                  <p class="role-desc">The Firm reserves the right to demand forensic proof of the "Source of Funds". Failure to provide evidence results in the immediate freezing of the engagement and the filing of a Suspicious Transaction Report (STR).</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">PROTOCOL 2: Politically Exposed Persons (PEPs)</h4>
                  <p class="role-desc">Enhanced Due Diligence (EDD) is automatically triggered for PEPs or close associates. We reserve the right to decline mandates where the Ultimate Beneficial Owner (UBO) structure is opaque or domiciled in FATF Blacklist jurisdictions.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,

  "whistle": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 05 · ECOSYSTEM INTEGRITY</p>
        <h2>Compliance & Vigilance</h2>
        <p class="brief-text">Establishing forensic financial transparency and internal oversight protocols to ensure absolute structural security.</p>
        <div class="brief-status">
          <span>PROTOCOL: PMLA 2002 · CHANNEL: ENCRYPTED OMBUDSMAN</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">ARTICLE I — AML & CFT CHARTER</p>
            <p>
              The Firm adheres to the <strong>Prevention of Money Laundering Act (PMLA), 2002</strong> and <strong>FIU-IND</strong> guidelines. This framework implies police-like powers to freeze assets and mandates a zero-tolerance policy for illicit capital flow.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">ENFORCEMENT & WHISTLEBLOWER PROTOCOLS</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">PROTOCOL: Source of Funds & PEPs</h4>
                  <p class="role-desc">We reserve the right to demand forensic proof of funds; failure results in immediate asset freezing and STR filing. Enhanced Due Diligence (EDD) is mandatory for Politically Exposed Persons (PEPs).</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">PROTOCOL: Vigil Mechanism</h4>
                  <p class="role-desc">A secure, encrypted channel exists for reporting financial malfeasance or insider trading. Whistleblowers are granted "Protected Status" against retaliation.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">PROTOCOL: The Protected Disclosure Regime</h4>
                  <p class="role-desc">Disclosures must be submitted to the Chairman of the Audit Committee via the Ombudsman Portal. Frivolous complaints with malicious intent will invoke legal defamation proceedings.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,
  "privacy": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 05 · ECOSYSTEM SURVEILLANCE</p>
        <h2>Integrity & Monitoring</h2>
        <p class="brief-text">Deploying police-like powers to enforce financial transparency and persistent digital tracking protocols.</p>
        <div class="brief-status">
          <span>STATUS: ACTIVE MONITORING · PROTOCOL: PMLA & BEACON</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">ARTICLE I — AML & CFT ENFORCEMENT</p>
            <p>
              Adherence to the <strong>Prevention of Money Laundering Act (PMLA), 2002</strong> and <strong>FIU-IND</strong> guidelines is absolute. The Firm reserves the right to demand forensic proof of funds; failure results in the immediate freezing of the engagement and an <strong>STR filing</strong>.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">VIGILANCE & DIGITAL FORENSICS</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">Vigil Mechanism & Whistleblower Policy</h4>
                  <p class="role-desc">A secure channel for reporting financial malfeasance. Disclosures are submitted to the Audit Committee; frivolous complaints with malicious intent will trigger legal defamation proceedings.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">Digital Surveillance: Beacon Technology</h4>
                  <p class="role-desc">This domain utilizes persistent cookies and pixel tags to map the User’s cognitive journey. This is not optional. Session replay data is fed into a Neural Core for fraud prevention.</p>
                </div>

                <div class="flow-step">
                  <h4 class="role-accent">PEP & UBO Verification</h4>
                  <p class="role-desc">Enhanced Due Diligence (EDD) is automatically triggered for Politically Exposed Persons. Mandates are declined if the Ultimate Beneficial Owner (UBO) is opaque or resides in non-compliant jurisdictions.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,

  "liability": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 07 · TOTAL IMMUNITY</p>
        <h2>Surveillance & Shield</h2>
        <p class="brief-text">Establishing the final operational perimeter through forensic asset vetting and absolute liability exclusion.</p>
        <div class="brief-status">
          <span>MONITORING: PERSISTENT · LIABILITY: EXCLUDED · AUTHORITY: PMLA 2002</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">ARTICLE I — THE "AS-IS" SHIELD</p>
            <p>
              All intelligence, reports, and data are delivered on an <strong>"As-Is" and "As-Available" basis</strong>. The Firm expressly disclaims all warranties, including merchantability and fitness for a particular strategic purpose. Under no legal theory—tort, contract, or strict liability—shall the Firm be liable for any direct or consequential damages.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">ENFORCEMENT PROTOCOLS · DIGITAL FORENSICS</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">AML & CFT: Forensic Vetting</h4>
                  <p class="role-desc">Adherence to PMLA, 2002 is absolute. We reserve the right to demand forensic proof of "Source of Funds"; failure results in immediate asset freezing and the filing of a Suspicious Transaction Report (STR).</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">Vigil Mechanism: Protected Disclosure</h4>
                  <p class="role-desc">A secure, encrypted channel for reporting financial malfeasance. Whistleblowers gain "Protected Status," but frivolous complaints with malicious intent will trigger legal defamation proceedings.</p>
                </div>

                <div class="flow-step">
                  <h4 class="role-accent">Digital Surveillance: Beacon Tech</h4>
                  <p class="role-desc">This domain utilizes persistent cookies, pixel tags, and session replay to map the User’s cognitive journey. This is not optional. Data is analyzed for Service Optimization and Fraud Prevention.</p>
                </div>

                <div class="flow-step">
                  <h4 class="role-accent">PEP & UBO Protocols</h4>
                  <p class="role-desc">Enhanced Due Diligence (EDD) is automatic for Politically Exposed Persons (PEPs). Mandates are declined if the Ultimate Beneficial Owner (UBO) structure is opaque or on an FATF Blacklist.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,
  "ip": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 08 · INTELLECTUAL DOMINION</p>
        <h2>Sovereignty & Shield</h2>
        <p class="brief-text">Establishing absolute proprietary control over the Neural Core and enforcing total liability immunity.</p>
        <div class="brief-status">
          <span>IP: PROTECTED · MONITORING: PERSISTENT · LIABILITY: EXCLUDED</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">ARTICLE I — PROPRIETARY DOMINION</p>
            <p>
              All distinct content, including the <strong>Neural Core</strong> and <strong>Architecture of Dominion</strong>, constitutes Exclusive Intellectual Property. Unauthorized reproduction, data scraping, or framing will invoke immediate <strong>Injunctive Relief</strong> and claims for Punitive Damages.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">ENFORCEMENT PROTOCOLS · DIGITAL FORENSICS</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">The "As-Is" Shield</h4>
                  <p class="role-desc">All intelligence is delivered on an "As-Is" basis. Under no legal theory—tort or contract—shall the Firm be liable for direct or consequential damages, including lost profits or data erosion.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">Digital Rights Management (DRM)</h4>
                  <p class="role-desc">Active DRM protocols monitor the distribution of Research Reports. Every downloaded asset is embedded with a unique Forensic Watermark traceable to the User’s IP address.</p>
                </div>

                <div class="flow-step">
                  <h4 class="role-accent">Surveillance: Beacon Technology</h4>
                  <p class="role-desc">Persistent cookies and pixel tags map the User’s cognitive journey. Session replay data is fed into a Neural Core for fraud prevention. This surveillance is mandatory for infrastructure access.</p>
                </div>

                <div class="flow-step">
                  <h4 class="role-accent">Prohibition of Derivative Works</h4>
                  <p class="role-desc">Users are strictly prohibited from creating derivative intelligence based on proprietary matrices. Violations are prosecuted within the High Court of Judicature.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,

  "refund": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 09 · SYSTEMIC DOMINION</p>
        <h2>Protocols of Engagement</h2>
        <p class="brief-text">Establishing absolute proprietary sovereignty and capital retention mandates. This is the final layer of structural immunity.</p>
        <div class="brief-status">
          <span>IP: RESTRICTED ASSET · FEES: NON-REFUNDABLE · MONITORING: PERSISTENT</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">ARTICLE I — THE RETAINER PRINCIPLE</p>
            <p>
              All professional fees, including <strong>Engagement Retainers</strong> and <strong>Advisory Levies</strong>, are deemed Earned Upon Receipt. The infrastructure operates under a strict <strong>"No-Refund / No-Reversal"</strong> statute; funds are allocated immediately to the deployment of human and intellectual capital.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">PROPRIETARY SHIELDS · DIGITAL FORENSICS</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">Intellectual Property Sovereignty</h4>
                  <p class="role-desc">Distinct content including the Neural Core and Valuation Matrices constitute Exclusive Intellectual Property protected under the Copyright Act, 1957. Unauthorized "Data Scraping" or "Framing" will trigger immediate Injunctive Relief.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">Digital Surveillance: Beacon Tech</h4>
                  <p class="role-desc">The domain utilizes persistent cookies, pixel tags, and session replay to map the User’s cognitive journey. This surveillance is mandatory for Service Optimization and Fraud Prevention.</p>
                </div>

                <div class="flow-step">
                  <h4 class="role-accent">Liability Immunity: The "As-Is" Clause</h4>
                  <p class="role-desc">All intelligence is delivered on an "As-Is" basis. Under no legal theory—tort, contract, or strict liability—shall the Firm be liable for direct, incidental, or consequential damages, including lost profits.</p>
                </div>

                <div class="flow-step">
                  <h4 class="role-accent">Forensic DRM & Force Majeure</h4>
                  <p class="role-desc">Every downloaded asset is embedded with a unique Forensic Watermark traceable to the User's IP. No refunds are processed for service interruptions caused by sovereign policy shifts or systemic market halts.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,
  "ethics": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <p class="modal-level">LEVEL 12 · ETHICAL DOMINION</p>
        <h2>Human Dignity Manifesto</h2>
        <p class="brief-text">Enforcing a zero-tolerance perimeter against systemic labor violations and establishing forensic ethical audits across the ecosystem.</p>
        <div class="brief-status">
          <span>COMPLIANCE: UK MODERN SLAVERY ACT · AUDIT: MANDATORY · STATUS: ETHICAL SHIELD</span>
        </div>
      </div>
      
      <div class="modal-operations">
        <div class="modal-info-card">
            <p class="modal-level">DECLARATION — ZERO-TOLERANCE STANCE</p>
            <p>
              The Firm enforces a strict mandate against modern slavery, human trafficking, and forced labor within its supply chain and client ecosystem. We align all operational nodes with the <strong>UK Modern Slavery Act, 2015</strong> and relevant <strong>UN Human Rights Conventions</strong>.
            </p>
        </div>

        <div class="role-grid">
            <div class="role-item" style="grid-column: span 2;">
                <p class="role-caption">VETTING PROTOCOLS · ECOSYSTEM HYGIENE</p>
                
                <div class="flow-step">
                  <h4 class="role-accent">Mandatory Ethical Audits</h4>
                  <p class="role-desc">All vendors and downstream partners are subject to forensic ethical audits. We refuse to deploy capital or provide advisory services to any entity flagged for labor violations.</p>
                </div>
                
                <div class="flow-step">
                  <h4 class="role-accent">Unilateral Termination Power</h4>
                  <p class="role-desc">The Firm reserves the right to unilaterally terminate engagements without notice where a counterparty fails to demonstrate a clean human rights track record.</p>
                </div>

                <div class="flow-step">
                  <h4 class="role-accent">The "Arm's Length" Node</h4>
                  <p class="role-desc">Traversing outbound nodes to third-party regulatory bodies does not constitute a fiduciary alliance. Once you exit this secure domain, we disclaim all liability for external data hygiene or ethical failures.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,
  contact: `
    <div class="modal-split-container">

      <!-- LEFT PANEL -->
      <div class="modal-briefing">
        <p class="modal-level">MANDATE INTAKE</p>
        <h2>Contact with Dwarkadas</h2>
        <p class="brief-text">
          Strategic mandates only. All submissions are reviewed directly by the mandate desk.
        </p>
        <div class="brief-status">
          <span>NO SPAM · CONFIDENTIAL · DIRECT ROUTING</span>
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="modal-operations">
        <form class="contact-form">

          <label>Email <span>*</span></label>
          <input type="email" placeholder="you@company.com" required />

          <label>Organization</label>
          <input type="text" placeholder="Fund / Family Office / Company" />

          <label>Mandate Summary <span>*</span></label>
          <textarea
            placeholder="Short, clear brief on your requirement."
            required
          ></textarea>

          <p class="form-note">
            No spam. Your details route directly to the mandate desk.
          </p>

          <button type="submit" class="send-btn">
            Send Message
          </button>

        </form>
      </div>

    </div>
  `,
  "white-paper": `
    <div class="modal-split-container">
      <div class="modal-briefing">
        <div>
          <p class="modal-level">GATED INTELLIGENCE</p>
          <h2 style="font-size: 44px;">White Papers</h2>
          <p class="brief-text">Proprietary dossiers engineered to expose critical blind spots in conventional capital market thinking.</p>
        </div>
        <div class="brief-status">
          <span>LEVEL 3 · ACCESS RESTRICTED</span>
        </div>
      </div>

      <div class="modal-operations">
        <div class="whitepaper-nav">
          <a href="javascript:void(0)" class="nav-tab active" onclick="switchDivision('div1', this)">DIV I</a>
          <a href="javascript:void(0)" class="nav-tab" onclick="switchDivision('div2', this)">DIV II</a>
          <a href="javascript:void(0)" class="nav-tab" onclick="switchDivision('div3', this)">DIV III</a>
          <a href="javascript:void(0)" class="nav-tab" onclick="switchDivision('div4', this)">DIV IV</a>
          <a href="javascript:void(0)" class="nav-tab" onclick="switchDivision('div5', this)">DIV V</a>
          <a href="javascript:void(0)" class="nav-tab" onclick="switchDivision('div6', this)">DIV VI</a>
          <a href="javascript:void(0)" class="nav-tab" style="color: #fb9200ff;" onclick="switchDivision('div-form', this)">REQUEST ACCESS</a>
        </div>

        <div class="division-viewport">
          <div id="div1" class="division-pane active">
            <div class="division-header-alt">
              <h3>Division I · Capital Markets & IPO Engineering</h3>
              <p class="division-desc">Engineering sovereign-grade defenses for listings, valuations, and regulatory exposure.</p>
            </div>
            <div class="whitepaper-grid">
              <div class="whitepaper-card"><h4>WP-01: IPO Death Spiral</h4><p>Dissects why ~40% of modern listings collapse below issue price within T+90 days, linking anchor lock-in expiries to retail panic cycles. Introduces a proprietary Stabilization Framework for defending valuation during price discovery and exposes structural flaws in traditional book-building.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-02: Anchor Investor Fallacy</h4><p>A forensic critique of over-reliance on QIB anchors as a signal of issue health. Reveals how “friendly” anchor books can mask weak retail and HNI sentiment, outlines the Shadow Book strategy for pre-DRHP capital commitment, and decodes psychological triggers driving GMP and subscription optics.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-03: SME to Mainboard</h4><p>Quantifies the liquidity and valuation re-rating unlocked when migrating from SME platforms to the BSE/NSE Mainboard. Maps the compliance matrix to avoid SEBI surveillance triggers and flags accounting pitfalls that routinely lead to migration rejection.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-04: DRHP Defense</h4><p>A technical manual on drafting DRHPs that survive hostile SEBI observations. Catalogues the top regulatory delay triggers, shows how to pre-empt them through intelligent risk-factor drafting, and explains Strategic Disclosure that protects competitive intelligence while staying fully compliant.</p><span class="access-tag">REQUEST ACCESS</span></div>
            </div>
          </div>

          <div id="div2" class="division-pane">
            <div class="division-header-alt">
              <h3>Division II · Unlisted Securities & Private Capital</h3>
              <p class="division-desc">Exploiting pre-listing inefficiencies and illiquidity inside private balance sheets.</p>
            </div>
            <div class="whitepaper-grid">
              <div class="whitepaper-card"><h4>WP-05: Grey Market Alpha</h4><p>Exposes pricing inefficiencies between unlisted and listed comparables and unveils the Liquidity Fractal Model for timing pre-IPO re-ratings. Covers lock-in risk, synthetic hedging via derivatives and tax arbitrage under Section 112A. <br> <br>Designed for: Sophisticated investors and family offices hunting pre-IPO alpha.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-06: ESOP Liquidity Trap</h4><p>Guides CXOs on monetising ESOPs in unlisted unicorns before valuation down-rounds. Dissects perquisite tax on exercise vs. capital gains on exit, structures secondary liquidity without triggering change-of-control, and flags exit-rights traps in shareholder agreements.
<br><br>
Designed for: CXOs and senior employees with concentrated ESOP exposure.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-07: PE Deal Warfare</h4><p>Deconstructs PE term sheets to expose liquidation preferences, drag/tag constructs and anti-dilution mechanics that can silently erase promoter equity. Provides a counterplay for preserving board control even after ceding economic majority.
<br><br>
Designed for: Founders preparing to accept institutional growth capital.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-08: AIF Structuring</h4><p>Compares regulatory, tax and pass-through nuances across AIF categories, including priority distribution structures. Provides templates for FDI participation and blueprints for Family Offices to institutionalise direct investing via dedicated AIF vehicles.
<br><br>
Designed for: Fund managers and family offices engineering onshore vehicles.</p><span class="access-tag">REQUEST ACCESS</span></div>
            </div>
          </div>

          <div id="div3" class="division-pane">
            <div class="division-header-alt">
              <h3>Division III · Strategic Warfare (M&A & Exit)</h3>
              <p class="division-desc">Hostile defense, stressed acquisition, and surgical exits in an activist world.</p>
            </div>
            <div class="whitepaper-grid">
              <div class="whitepaper-card"><h4>WP-09: Inorganic Conquest</h4><p>Designs structural defenses against unsolicited takeovers within the Indian Takeover Code. Evaluates poison pills, white knight strategies and promoter-holding configurations that build an unassailable voting bloc without triggering open offers.
<br><br>
Designed for: Promoters of listed entities with vulnerable shareholding patterns.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-10: Distressed Arbitrage</h4><p>Operational playbook for acquiring distressed assets via the IBC. Maps haircut probabilities, CoC voting dynamics, hidden liabilities in Information Utilities and the design of pre-packaged resolutions that allow existing sponsors to retain functional control.
<br><br>
Designed for: Special-situations funds and corporate acquirers.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-11: Strategic Divestiture</h4><p>Explains how to surgically hive off a business unit through demergers or slump sales while preserving tax neutrality. Details ring-fencing of liabilities and Sum-of-the-Parts valuation to justify premium pricing of stand-alone divisions.
<br><br>
Designed for: Conglomerates rationalising portfolios and unlocking trapped value.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-12: The Earn-Out Trap</h4><p>Dissects why earn-out heavy deals end in disputes. Locks in definitions of Adjusted EBITDA, lays out governance rights required to actually achieve targets, and analyses tax deferral and risk mitigation for contingent consideration.
<br><br>
Designed for: Sellers entering M&A transactions with deferred consideration.</p><span class="access-tag">REQUEST ACCESS</span></div>
            </div>
          </div>

          <div id="div4" class="division-pane">
            <div class="division-header-alt">
              <h3>Division IV · Debt & Financial Engineering</h3>
              <p class="division-desc">Turning leverage, instruments, and structures into deliberate strategic weapons.</p>
            </div>
            <div class="whitepaper-grid">
              <div class="whitepaper-card"><h4>WP-13: Weaponized Leverage</h4><p>Reframes debt as a tax shield and acquisition engine. Details debt recycling to lower WACC, conversion of unrated operational borrowings into rated, securitised paper and navigation of CDR without slipping into NPA classification.
<br><br>
Designed for: CFOs of highly leveraged balance sheets.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-14: Cross-Border Capital</h4><p>Shows how to arbitrage INR vs. foreign currency debt while staying inside RBI all-in-cost ceilings. Covers hedging architectures, automatic vs approval routes by sector and end-use restrictions that can trigger penalties.
<br><br>
Designed for: Export-led and capex-heavy issuers seeking cheaper foreign capital.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-15: Invoice Discounting</h4><p>Breaks down factoring and reverse factoring, recourse vs non-recourse implications and TReDS-based access to institutional liquidity. Demonstrates off-balance-sheet structures that cosmetically improve current ratios prior to reporting.
<br><br>
Designed for: Manufacturers and working-capital stressed enterprises.</p></p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-16: Project Finance</h4><p>Explains SPV-driven risk isolation, lender waterfall mechanics, step-in rights and cure periods, plus credit enhancement devices for lifting project bond ratings in core infrastructure and energy.
<br><br>
Designed for: Developers in energy, roads, logistics and large-scale real assets.</p><span class="access-tag">REQUEST ACCESS</span></div>
            </div>
          </div>

          <div id="div5" class="division-pane">
            <div class="division-header-alt">
              <h3>Division V · Risk, Tax & Compliance</h3>
              <p class="division-desc">Fortifying margins, data, and disclosures against forensic-grade scrutiny.</p>
            </div>
            <div class="whitepaper-grid">
              <div class="whitepaper-card"><h4>WP-17: Transfer Pricing Shield</h4><p>Forensic guide to defending arm’s length pricing in inter-company transactions. Covers BEPS, documentation for management fee and royalty flows, and the architecture of Advance Pricing Agreements to lock in certainty for multi-year horizons.
<br><br>
Designed for: MNC subsidiaries and Indian corporates with global structures.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-18: Forensic Immunity</h4><p>Maps the red flags that trigger qualified opinions and forensic escalation. Aligns IFC frameworks with ERP realities, details balance sheet hardening and exposes “creative accounting” patterns easily caught by modern data tools.
<br><br>
Designed for: Audit Committees, CFOs and internal control heads.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-19: Cyber-Sovereignty</h4><p>Assesses cyber threats to financial institutions, builds a Zero-Trust architecture blueprint and lays out ransomware response choices. Interprets obligations under the Digital Personal Data Protection Act, 2023, and vendor risk management checklists.
<br><br>
Designed for: CIOs, CISOs and enterprise risk leaders.</p></p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-20: GST Litigation Defense</h4><p>Guides responses to scrutiny notices and demand orders under GST. Explains GSTR-2A/2B vs 3B mismatches, ITC reversal risk from non-compliant vendors and the strategy, timelines and pre-deposit rules for appeals.
<br><br>
Designed for: Tax Heads under aggressive departmental enforcement.</p><span class="access-tag">REQUEST ACCESS</span></div>
            </div>
          </div>

          <div id="div6" class="division-pane">
            <div class="division-header-alt">
              <h3>Division VI · Global & Macro Strategy</h3>
              <p class="division-desc">Positioning capital against currency, geopolitics, and climate-linked realignments.</p>
            </div>
            <div class="whitepaper-grid">
              <div class="whitepaper-card"><h4>WP-21: The Currency War</h4><p>Analyses macro drivers of USD/INR and quantifies the cost of running unhedged. Compares forwards, options and swaps for different cash-flow profiles and explains natural hedging through asset-liability alignment.
<br><br>
Designed for: Corporate treasurers with cross-border exposures.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-22: Sovereign Risk Radar</h4><p>Links global flashpoints to Indian supply chains, capital costs and FII flows. Explores China Plus One beneficiaries and builds scenario models around energy-price shocks and margin impact.
<br><br>
Designed for: Boards and strategy teams planning long-term capital allocation.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-23: The ODI Gateway</h4><p>Covers FEMA rules for overseas direct investment, automatic route limits and net-worth thresholds. Explains POEM risk that can reclassify foreign subsidiaries as Indian residents and compares holding company hubs like Singapore, UAE and Netherlands.
<br><br>
Designed for: Indian corporates acquiring or building global platforms.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-24: Carbon Credit Arbitrage</h4><p>Explains monetisation of ESG compliance via carbon credit generation and trade. Covers cap-and-trade design, validation rigor, greenwashing litigation risk and integrating ESG factors into cost of capital.
<br><br>
Designed for: Sustainability leaders and CFOs weaponising compliance into revenue.</p><span class="access-tag">REQUEST ACCESS</span></div>
              <div class="whitepaper-card"><h4>WP-25: 2030 India Thesis</h4><p>Projects the sectoral engines of India’s march to a $10T GDP. Balances demographic dividend with automation risk, highlights the infrastructure super-cycle and offers a decadal asset-allocation framework for riding the secular bull market.
<br><br>
Designed for: Institutional investors and family offices planning 2030+ deployment.</p></p><span class="access-tag">REQUEST ACCESS</span></div>
            </div>
          </div>

          <div id="div-form" class="division-pane">
            <div class="division-header-alt">
              <h3 style="color: #fb9200ff;">Secure Download Portal</h3>
              <p class="division-desc">Intelligence is restricted to verified corporate entities and accredited investors.</p>
            </div>
            <form class="contact-form" style="max-width: 100%; grid-template-columns: 1fr 1fr;  margin-top: 20px;">
              <div style="display: flex; flex-direction: column; gap: 15px;">
                <label>COMPANY NAME <span>*</span></label>
                <input type="text" placeholder="e.g. Dwarkadas Capital Services Pvt. Ltd." required />
                <label>WORK EMAIL <span>*</span></label>
                <input type="email" placeholder="name@corporate-domain.com" required />
              </div>
              <div style="display: flex; flex-direction: column; gap: 15px;">
                <label>DESIGNATION (C-SUITE ONLY)</label>
                <input type="text" placeholder="e.g. Group CFO, Managing Director" />
                <label>AUM / TURNOVER</label>
                <input type="text" placeholder="Select eligibility band" />
              </div>
              <div style="grid-column: span 2; display: flex; flex-direction: column; gap: 15px;">
                <label>AREA OF INTEREST / DIVISION</label>
                <textarea placeholder="e.g. Division I - Capital Markets; Division III - Strategic Warfare" style="min-height: 80px;"></textarea>
                <button type="submit" class="send-btn" style="width: 100%; background: linear-gradient(135deg, #d4af37, #e8c9a0);">INITIATE SECURE TRANSFER</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
};


// Open modal on card click
function openModal(type) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  if (cardContents[type]) {
    modalBody.innerHTML = cardContents[type];
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  } else if (policyContents[type]) {
    modalBody.innerHTML = policyContents[type];
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  } else {
    modalBody.innerHTML = "<h2>Content Under Review</h2><p>This policy is currently being updated for 2025 compliance.</p>";
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  }
}

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
});

// Close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Find both .slide-card AND .card inside the section
        const cards = entry.target.querySelectorAll('.slide-card, .card');
        cards.forEach((card) => card.classList.add('reveal'));
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Corrected the selector string to include all section IDs properly
  const scrollSections = document.querySelectorAll('#section-3, #section-5, #section-7, #section-9, #section-11, #section-13,#section-14, #section-15, #section-16');
  scrollSections.forEach((section) => {
    if (section) observer.observe(section);
  });

  // Add click handlers for all cards with data-content attribute
  document.querySelectorAll('[data-content]').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      const contentId = card.getAttribute('data-content');
      openModal(contentId);
    });
  });
});

function bindWhitePaperAccordion() {
  document.querySelectorAll(".division-header").forEach(header => {
    header.onclick = () => {
      const division = header.parentElement;

      document.querySelectorAll(".division").forEach(d => {
        if (d !== division) d.classList.remove("active");
      });

      division.classList.toggle("active");
    };
  });
}


function switchDivision(divId, tabElement) {
  // Hide all panes
  document.querySelectorAll('.division-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  // Deactivate all tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Activate selected
  document.getElementById(divId).classList.add('active');
  tabElement.classList.add('active');

  // Scroll viewport to top
  document.querySelector('.division-viewport').scrollTop = 0;
}