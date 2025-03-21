document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.getElementById("heroSection");
    const countriesList = document.getElementById("countriesList");
    const landmarksSection = document.getElementById("landmarksSection");
    const tourSection = document.getElementById("tourSection");
  
    // تحميل البيانات من JSON
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        displayCountries(data.countries);
      });
  
    // إظهار الصفحة المطلوبة وإخفاء الأخرى
    function showPage(current, next) {
      current.classList.add("hidden");
      next.classList.remove("hidden");
      next.classList.add("animated");
      setTimeout(() => next.classList.remove("animated"), 1000);
    }
  
    // بدء الجولة عند النقر على "ابدأ جولتك"
    document.getElementById("startTour").addEventListener("click", () => {
      showPage(heroSection, countriesList);
    });
  
    // العودة إلى الصفحة الرئيسية
    document.getElementById("backToHero").addEventListener("click", () => {
      showPage(countriesList, heroSection);
    });
  
    // العودة إلى قائمة الدول
    document.getElementById("backToCountries").addEventListener("click", () => {
      showPage(landmarksSection, countriesList);
    });
  
    // العودة إلى قائمة المعالم
    document.getElementById("backToLandmarks").addEventListener("click", () => {
      showPage(tourSection, landmarksSection);
    });
  
    // عرض قائمة الدول
    function displayCountries(countries) {
      const container = document.querySelector(".countries-container");
      container.innerHTML = "";
      countries.forEach((country) => {
        const card = `
          <div class="col-md-4 col-sm-6">
            <div class="country-card" data-country='${JSON.stringify(country)}'>
              <img src="${country.image}" alt="${country.name}">
              <h3>${country.name}</h3>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", card);
      });
  
      // إضافة الحدث عند النقر على دولة
      document.querySelectorAll(".country-card").forEach((card) => {
        card.addEventListener("click", () => {
          const country = JSON.parse(card.getAttribute("data-country"));
          showLandmarks(country);
        });
      });
    }
  
    // عرض معالم الدولة
    function showLandmarks(country) {
      document.getElementById("countryName").textContent = country.name;
  
      const container = document.querySelector(".landmarks-container");
      container.innerHTML = "";
      country.landmarks.forEach((landmark) => {
        const card = `
          <div class="col-md-4 col-sm-6">
            <div class="landmark-card" data-landmark='${JSON.stringify(landmark)}'>
              <img src="${landmark.image}" alt="${landmark.name}">
              <h3>${landmark.name}</h3>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", card);
      });
  
      // إضافة الحدث عند النقر على معلم
      document.querySelectorAll(".landmark-card").forEach((card) => {
        card.addEventListener("click", () => {
          const landmark = JSON.parse(card.getAttribute("data-landmark"));
          startVR(landmark);
        });
      });
  
      showPage(countriesList, landmarksSection);
    }
  
    // بدء الجولة 360
    function startVR(landmark) {
      document.getElementById("landmarkName").textContent = landmark.name;
  
      const vrViewer = document.getElementById("vrViewer");
      vrViewer.innerHTML = `
        <iframe src="${landmark.vrUrl}" width="100%" height="100%" frameborder="0"></iframe>
      `;
      document.getElementById("placeInfo").textContent = landmark.info;
  
      showPage(landmarksSection, tourSection);
    }
  });