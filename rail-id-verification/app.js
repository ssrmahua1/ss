/* ==========================================================================
   Indian Railways ID Verification Portal - Simplified JS Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- DATABASE ---
  const employeeDatabase = {
    "NZM-A-01": {
      id: "NZM-A-01",
      name: "Dileep Kumar",
      designation: "Manager",
      aadhar: "6875 3583 6048",
      phone: "+91 7654767189",
      validity: "1 June 26 - 31 Mar 27",
      station: "Hazrat Nizamuddin Station- Staff Parking (PnU)",
      photo: "assets/photos/NZM-A-01.jpg",
      originalCard: "assets/cards/NZM-A-01.jpg"
    },
    "NZM-A-02": {
      id: "NZM-A-02",
      name: "Ranjan Kumar",
      designation: "IN-Charge",
      aadhar: "8482 5883 2651",
      phone: "+91 9798026756",
      validity: "1 June 26 - 31 Mar 27",
      station: "Hazrat Nizamuddin Station - Staff Parking",
      photo: "assets/photos/NZM-A-02.jpg",
      originalCard: "assets/cards/NZM-A-02.jpg"
    },
    "NZM-B-02": {
      id: "NZM-B-02",
      name: "Afroz Khan",
      designation: "Care-Taker",
      aadhar: "4983 7850 1271",
      phone: "+91 8252760421",
      validity: "1 June 26 - 31 Mar 27",
      station: "Hazrat Nizamuddin Station - Staff Parking(PnU)",
      photo: "assets/photos/NZM-B-02.jpg",
      originalCard: "assets/cards/NZM-B-02.jpg"
    },
    "NZM-B-03": {
      id: "NZM-B-03",
      name: "Ajay Kumar Singhal",
      designation: "Care-Taker",
      aadhar: "7432 6920 9996",
      phone: "+91 7400762051",
      validity: "1 June 26 - 31 Mar 27",
      station: "Hazrat Nizamuddin Station - Staff Parking",
      photo: "assets/photos/NZM-B-03.jpg",
      originalCard: "assets/cards/NZM-B-03.jpg"
    },
    "NZM-B-04": {
      id: "NZM-B-04",
      name: "Suman Kumar Jha",
      designation: "Shopkeeper",
      aadhar: "8336 0029 2291",
      phone: "+91 8826879899",
      validity: "1 June 26 - 31 Mar 27",
      station: "Hazrat Nizamuddin Station- Staff Parking (PnU)",
      photo: "assets/photos/NZM-B-04.jpg",
      originalCard: "assets/cards/NZM-B-04.jpg"
    },
    "NZM-C-01": {
      id: "NZM-C-01",
      name: "Prakash Malik",
      designation: "Housekeeping Staff",
      aadhar: "9174 6401 4021",
      phone: "+91 7464014021",
      validity: "1 June 26 - 31 Oct 26",
      station: "Hazrat Nizamuddin Station - Staff Parking (PnU)",
      photo: "assets/photos/NZM-C-01.jpg",
      originalCard: "assets/cards/NZM-C-01.jpg"
    }
  };

  // --- DOM ELEMENTS ---
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const tagBtns = document.querySelectorAll('.tag-btn');
  const resultSection = document.getElementById('resultSection');
  
  // Status banner
  const statusBanner = document.getElementById('statusBanner');
  
  // Fields
  const employeePhoto = document.getElementById('employeePhoto');
  const employeeStatusBadge = document.getElementById('employeeStatusBadge');
  const cardStationBadge = document.getElementById('cardStationBadge');
  
  const valName = document.getElementById('valName');
  const valDesig = document.getElementById('valDesig');
  const valId = document.getElementById('valId');
  const valAadhar = document.getElementById('valAadhar');
  const valPhone = document.getElementById('valPhone');
  const valValidity = document.getElementById('valValidity');
  
  // Scanned image section
  const btnToggleCard = document.getElementById('btnToggleCard');
  const originalCardContainer = document.getElementById('originalCardContainer');
  const originalScanImg = document.getElementById('originalScanImg');
  const originalScanMeta = document.getElementById('originalScanMeta');
  
  // Print
  const btnPrint = document.getElementById('btnPrint');
  const rName = document.getElementById('rName');
  const rId = document.getElementById('rId');
  const rAadhar = document.getElementById('rAadhar');
  const rPhone = document.getElementById('rPhone');
  const rValidity = document.getElementById('rValidity');
  const rStation = document.getElementById('rStation');
  const rStatus = document.getElementById('rStatus');
  const rTime = document.getElementById('rTime');
  const rHash = document.getElementById('rHash');

  // --- INITIALIZATION ---
  setupEventListeners();

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = searchInput.value.trim();
      if (id) verifyEmployee(id);
    });

    tagBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        searchInput.value = btn.dataset.id;
        verifyEmployee(btn.dataset.id);
      });
    });

    // Toggle card image container
    btnToggleCard.addEventListener('click', () => {
      if (originalCardContainer.style.display === 'none') {
        originalCardContainer.style.display = 'block';
        btnToggleCard.textContent = 'Hide Original ID Card';
      } else {
        originalCardContainer.style.display = 'none';
        btnToggleCard.textContent = 'View Original ID Card';
      }
    });

    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // --- VERIFICATION LOGIC ---
  function verifyEmployee(id) {
    const cleanId = id.toUpperCase().trim();
    const match = employeeDatabase[cleanId];
    
    // Always reset original card view state to hidden on new search
    originalCardContainer.style.display = 'none';
    btnToggleCard.textContent = 'View Original ID Card';
    
    if (match) {
      // 1. Show Verified State
      statusBanner.className = 'status-banner status-verified';
      statusBanner.innerHTML = '<span class="status-icon">✓</span> <span class="status-text">VERIFIED STAFF MEMBER</span>';
      
      employeeStatusBadge.className = 'profile-badge-active status-active';
      employeeStatusBadge.textContent = 'ACTIVE STATUS';
      
      cardStationBadge.textContent = match.station;
      
      // Populate Table
      employeePhoto.src = match.photo;
      valName.textContent = match.name;
      valDesig.textContent = match.designation;
      valId.textContent = match.id;
      valAadhar.textContent = match.aadhar;
      valPhone.textContent = match.phone;
      valValidity.textContent = match.validity;
      
      // Populate Physical Image
      originalScanImg.src = match.originalCard;
      originalScanMeta.textContent = `Scanned File: ${match.originalCard.split('/').pop()} | Verified Copy`;
      btnToggleCard.style.display = 'inline-block';
      
      // Receipt data
      const now = new Date();
      rName.textContent = match.name;
      rId.textContent = match.id;
      rAadhar.textContent = match.aadhar;
      rPhone.textContent = match.phone;
      rValidity.textContent = match.validity;
      rStation.textContent = match.station;
      rStatus.textContent = "AUTHENTICATED / ACTIVE";
      rStatus.style.color = "green";
      rTime.textContent = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + " (IST)";
      rHash.textContent = generateHash(match.id);
      
      // Show result section
      resultSection.style.display = 'block';
      resultSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // 2. Show Rejected State
      statusBanner.className = 'status-banner status-denied';
      statusBanner.innerHTML = '<span class="status-icon">✗</span> <span class="status-text">SECURITY ALERT: RECORD NOT FOUND</span>';
      
      employeeStatusBadge.className = 'profile-badge-active status-inactive';
      employeeStatusBadge.textContent = 'UNAUTHORIZED';
      
      cardStationBadge.textContent = "Registry Center";
      
      // Empty Table
      employeePhoto.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='110' height='135' viewBox='0 0 110 135'><rect width='100%' height='100%' fill='%23fee2e2'/><text x='50%' y='50%' fill='%23ef4444' font-family='sans-serif' font-size='11' font-weight='bold' text-anchor='middle' dominant-baseline='middle'>NO PHOTO</text></svg>";
      valName.textContent = "UNKNOWN RECORD";
      valDesig.textContent = "Unregistered";
      valId.textContent = cleanId;
      valAadhar.textContent = "XXXX XXXX XXXX";
      valPhone.textContent = "N/A";
      valValidity.textContent = "N/A";
      
      // Receipt data
      const now = new Date();
      rName.textContent = "UNKNOWN";
      rId.textContent = cleanId;
      rAadhar.textContent = "XXXX XXXX XXXX";
      rPhone.textContent = "N/A";
      rValidity.textContent = "N/A";
      rStation.textContent = "N/A";
      rStatus.textContent = "NOT FOUND / REJECTED";
      rStatus.style.color = "red";
      rTime.textContent = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + " (IST)";
      rHash.textContent = generateHash(cleanId);
      
      // Hide physical card since no record exists
      originalScanImg.src = "";
      originalScanMeta.textContent = "";
      btnToggleCard.style.display = 'none';
      
      resultSection.style.display = 'block';
      resultSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- SECURITY & SCREENSHOT PROTECTION ---
  const protectionOverlay = document.getElementById('protectionOverlay');

  // Hides page details when browser tab loses focus (screenshot blocker)
  window.addEventListener('blur', () => {
    protectionOverlay.style.display = 'flex';
  });

  window.addEventListener('focus', () => {
    protectionOverlay.style.display = 'none';
  });

  // Prevent right clicks (Save image context menu)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Prevent dragging of any image
  document.addEventListener('dragstart', (e) => {
    if (e.target.nodeName === 'IMG') {
      e.preventDefault();
    }
  });

  // Keyboard shortcut blocking (DevTools, Print, Save)
  document.addEventListener('keydown', (e) => {
    // Disable F12
    if (e.key === 'F12') {
      e.preventDefault();
    }
    // Disable Ctrl+Shift+I / Cmd+Opt+I (Chrome DevTools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
    }
    // Disable Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
    }
    // Disable Ctrl+P / Cmd+P (Print Page)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'P' || e.key === 'p')) {
      e.preventDefault();
    }
  });


  function generateHash(id) {
    let hash = 7;
    const str = id + new Date().toDateString();
    for (let i = 0; i < str.length; i++) {
      hash = hash * 31 + str.charCodeAt(i);
    }
    return 'NR-' + Math.abs(hash).toString(16).toUpperCase();
  }
});
