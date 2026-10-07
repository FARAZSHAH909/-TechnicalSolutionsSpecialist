/**
 * Faraz Shah Portfolio - Specialized Technical Delivery & Simulation Consulting
 * High-performance, clean Vanilla JavaScript
 */

const CONFIG = {
  name: "Faraz Shah",
  title: "Technical Solutions Specialist",
  whatsappNumber: "923183052533",
  displayPhone: "+92 318 3052533",
  email: "farazshah9095@gmail.com",
  linkedin: "https://www.linkedin.com/in/faraz-shah-4168ab441/",
};

// Practical Case Snapshots Data for Interactive Modal
const CASES_DATA = {
  inventory: {
    title: "Full-Stack Inventory & Ordering Engine",
    category: "Programming & Applications",
    stack: ["Java", "React Native", "Node.js", "Express", "MySQL / PostgreSQL", "Postman", "JWT"],
    turnaround: "Turnaround: 24–48 Hours",
    brief: "User role authentication, inventory management, dynamic transaction logic, and Postman API documentation.",
    deliverables: [
      "Modular, commented source code following clean separation of concerns.",
      "Database schema migration script with relational keys and indexes.",
      "Complete Postman API test suite validating all endpoints and edge cases.",
      "2-Minute recorded video walkthrough demonstrating login, inventory deduction, and error validation."
    ],
    technicalHighlights: [
      "Stateless role-based authorization ensuring isolation between managers and regular users.",
      "Atomic transactional locking preventing negative stock inventory states under concurrent requests.",
      "Comprehensive README documentation with one-command dependency installation."
    ]
  },
  analog_filter: {
    title: "Analog Filter & Operational Amplifier Simulation",
    category: "Engineering & Simulations",
    stack: ["NI Multisim", "Proteus", "Analog Circuit Design", "Virtual Oscilloscope"],
    turnaround: "Turnaround: 24 Hours",
    brief: "Sensor signal conditioning circuit with virtual oscilloscope waveform captures and frequency response analysis.",
    deliverables: [
      "Fully functional `.ms14` (Multisim) and `.pdsprj` (Proteus) circuit schematic files.",
      "High-resolution virtual oscilloscope waveform captures showing pre/post filtering.",
      "Frequency response Bode magnitude & phase plots verifying bandwidth and cutoff.",
      "Word/PDF execution and theoretical component calculation report."
    ],
    technicalHighlights: [
      "Multi-pole active Sallen-Key low-pass filter design tuned for minimal passband ripple.",
      "Precision op-amp amplification stage with calculated gain resistor tolerances.",
      "Transient analysis verifying phase margin and input signal clipping threshold."
    ]
  },
  network_topology: {
    title: "Enterprise Multi-Subnet Network Topology",
    category: "Systems & Networking",
    stack: ["Cisco Packet Tracer", "VLANs", "Inter-VLAN Routing", "NAT/DHCP", "ACLs"],
    turnaround: "Turnaround: 24 Hours",
    brief: "Segmented VLAN network design with edge firewall routing, DHCP configuration, and ping test validation.",
    deliverables: [
      "Configured Cisco Packet Tracer `.pkt` file with labeled subnets and clean topology layout.",
      "Exported CLI startup configurations for all routers, Layer-3 core switches, and access switches.",
      "VLSM IP addressing matrix table with CIDR masks and gateway assignments.",
      "Zero-packet-loss ICMP verification screenshots confirming inter-VLAN access control."
    ],
    technicalHighlights: [
      "Strict VLAN isolation for Management, Departmental Staff, and Server DMZ subnets.",
      "Router-on-a-Stick inter-VLAN routing secured with Extended Access Control Lists.",
      "Automated multi-pool DHCP distribution configured directly on the edge gateway."
    ]
  },
  suspension_modeling: {
    title: "Vehicle Ride Comfort & Dynamic Suspension Modeling",
    category: "Engineering & Simulations",
    stack: ["MATLAB", "Simulink", "Mathematical Modeling", "State-Space Analysis", "ODE45"],
    turnaround: "Turnaround: 24–48 Hours",
    brief: "Differential equation modeling comparing variable spring stiffness against dampening coefficients for ride displacement plots.",
    deliverables: [
      "Runnable `.slx` Simulink model with parameter-isolated subsystems.",
      "Automated MATLAB `.m` parameter sweep and plot generation script.",
      "Side-by-side comparative displacement, acceleration, and transmissibility response graphs.",
      "Technical mathematical derivation notes formatted to marking rubric criteria."
    ],
    technicalHighlights: [
      "Formulation and numerical integration of 2-DOF quarter-car equations of motion.",
      "Evaluation of road bump step-excitation and harmonic stochastic vibrations.",
      "Parameter optimization identifying trade-offs between road handling and passenger comfort."
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Setup Dynamic Links (WhatsApp, Email, LinkedIn)
  setupGlobalLinks();

  // 3. Mobile Navigation Toggle
  setupMobileNav();

  // 4. Case Snapshot Modal
  setupCaseModal();

  // 5. Copy to Clipboard Utility
  setupCopyButtons();
});

// Setup Global Links
function setupGlobalLinks() {
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello Faraz, I have a technical brief / rubric I'd like you to review for a 15-minute doability check.")}`;
  
  document.querySelectorAll("[data-action='whatsapp']").forEach(btn => {
    btn.setAttribute("href", waUrl);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });

  document.querySelectorAll("[data-action='email']").forEach(link => {
    link.setAttribute("href", `mailto:${CONFIG.email}`);
  });

  document.querySelectorAll("[data-action='linkedin']").forEach(link => {
    link.setAttribute("href", CONFIG.linkedin);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

// Mobile Navigation Drawer
function setupMobileNav() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      closeMenu();
    }
  });
}

// Case Snapshot Modal Logic
function setupCaseModal() {
  const modal = document.getElementById("case-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const modalCloseFooter = document.getElementById("modal-close-footer-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalTurnaround = document.getElementById("modal-turnaround");
  const modalBrief = document.getElementById("modal-brief");
  const modalStack = document.getElementById("modal-stack");
  const modalDeliverables = document.getElementById("modal-deliverables");
  const modalHighlights = document.getElementById("modal-highlights");
  const modalInquire = document.getElementById("modal-inquire-btn");

  if (!modal) return;

  function openCase(caseId) {
    const data = CASES_DATA[caseId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalTurnaround.textContent = data.turnaround;
    modalBrief.textContent = data.brief;

    modalStack.innerHTML = data.stack.map(tech => 
      `<span class="px-2.5 py-1 text-xs font-mono font-medium rounded bg-slate-800 text-cyan-300 border border-slate-700">${tech}</span>`
    ).join("");

    modalDeliverables.innerHTML = data.deliverables.map(item => 
      `<li class="flex items-start text-xs sm:text-sm text-slate-300 gap-2.5">
        <svg class="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <span>${item}</span>
      </li>`
    ).join("");

    modalHighlights.innerHTML = data.technicalHighlights.map(item => 
      `<li class="flex items-start text-xs sm:text-sm text-slate-300 gap-2">
        <span class="text-cyan-400 mt-0.5 font-bold">✦</span>
        <span>${item}</span>
      </li>`
    ).join("");

    if (modalInquire) {
      const caseInquiries = {
        inventory: "Hi Faraz, I have a Programming/Backend task similar to Case 01.",
        analog_filter: "Hi Faraz, I have a Circuit/Simulation task similar to Case 02.",
        network_topology: "Hi Faraz, I have a Networking/PacketTracer task similar to Case 03.",
        suspension_modeling: "Hi Faraz, I have a MATLAB/Simulink task similar to Case 04."
      };
      const text = caseInquiries[caseId] || `Hi Faraz, I'm reaching out about a task similar to "${data.title}".`;
      modalInquire.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-case]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const caseId = btn.getAttribute("data-open-case");
      openCase(caseId);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modalCloseFooter) modalCloseFooter.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

// Copy to Clipboard Utility
function setupCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied: ${textToCopy}`);
      } catch (err) {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast(`Copied: ${textToCopy}`);
      }
    });
  });
}

// Toast Feedback Notification
function showToast(message) {
  let toast = document.getElementById("custom-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "custom-toast";
    toast.className = "fixed bottom-5 right-5 z-50 bg-slate-800 text-white border border-cyan-500/40 px-4 py-2.5 rounded-lg shadow-xl text-xs font-mono flex items-center gap-2 transform transition-all duration-200 translate-y-12 opacity-0";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span>${message}</span>`;
  setTimeout(() => {
    toast.classList.remove("translate-y-12", "opacity-0");
  }, 10);
  setTimeout(() => {
    toast.classList.add("translate-y-12", "opacity-0");
  }, 3000);
}
