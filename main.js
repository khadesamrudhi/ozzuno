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


///---------------------->sprial ring<---------------------------
// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-ring'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);

const colorsArray = [
  new THREE.Color("#08060d"), // dark
  new THREE.Color("#2b5bac"), // blue
  new THREE.Color("#929092"), // grey
  new THREE.Color("#3e673b")  // greenish
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

geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.MeshBasicMaterial({ vertexColors: true, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 5;

// Animation
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
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
        <p class="brief-text">Ozzuno Capital Services Pvt. Ltd. as a sovereign construct of market architecture and asymmetric capital deployment.</p>
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
            <p>Ozzuno Capital Services Pvt. Ltd. is not merely a financial intermediary; it is a Sovereign Construct of Market Architecture. Our existence is predicated on a singular, ruthless axiom: capital flows not to the deserving, but to the commanded.
              We operate at the bleeding edge of Indian capital markets, positioned at the convergence of regulatory rigidity, financial engineering, and market aggression. Our institutional philosophy is built upon Asymmetric Capital Deployment—the belief that true economic value is extracted only when one possesses informational, structural, and execution-based advantages over the counterparty
              We do not seek to participate in the economy; we seek to engineer its outcomes through forensic intellect and regulatory arbitrage. Ozzuno functions as the cerebral cortex of the corporate ecosystem, obliterating friction between ambition and capitalization.
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
        <p class="brief-text">A meritocratic oligarchy governing Ozzuno’s strategic vectors with absolute authority and uncompromising fiduciary discipline.</p>
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
            <p style="color:#9a96b5; font-size: 14px;">Ozzuno now functions as a full-stack financial fortress where consulting, capital markets, private equity, and risk architecture are fused into a single monolithic service grid. Every mandate is executed across this integrated stack, converting fragmented financial requirements into orchestrated, outcome-engineered capital strategies.</p>
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
            Ozzuno's presence is not defined by offices, but by strategic nodes—each calibrated for capital deployment, regulatory navigation, and information extraction. Domestic and offshore locations are wired into a single, integrated decision engine.
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
                <p class="role-desc">Ozzuno Capital acts as a strategic process architect. While we ensure rigorous compliance with SEBI norms, the ultimate subscription of the issue is subject to systemic market volatility. Valuation parameters are derived using IBBI-registered valuer standards; however, listing gains are not guaranteed. The issuer retains liability for all material disclosures made in the Draft Red Herring Prospectus (DRHP).</p>
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
                <p class="role-desc">As process advisors, we ensure that all disclosures in offer documents are validated for material accuracy through independent due diligence. However, Ozzuno Capital assumes no financial liability for the undersubscription of an issue. Any underwriting obligation is limited strictly to the specific terms of the Underwriting Agreement.</p>
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
  `
};
// Open modal on card click
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const contentKey = card.getAttribute("data-content");
    modalBody.innerHTML = cardContents[contentKey];
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  });
});

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

//--------------------->section 3<--------------------------------------- 

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.3 // Trigger when 30% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.slide-card');
        cards.forEach((card) => card.classList.add('reveal'));
      }
    });
  }, observerOptions);
  const section3 = document.querySelector('#section-3');
  if (section3) observer.observe(section3);
});
