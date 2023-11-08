export function scrollToElement(element) {
  const scrollTo = element.offsetTop - 85;
  window.scrollTo({
    top: scrollTo,
    behavior: 'smooth',
  });
}

export function anchorToElement() {
  const triggerEls = document.querySelectorAll('[data-scroll-target]');

  if (triggerEls.length <= 0) {
    return;
  }

  triggerEls.forEach((trigger) => {
    const targetEl = document.querySelector(`[ data-scroll-item="${trigger.dataset.scrollTarget}"]`);
    trigger.addEventListener('click', () => {
      scrollToElement(targetEl);
    });
  });
}

export function handleScrollForHeader(headerEl) {
  if (!headerEl) {
    return;
  }

  function handleScroll() {
    if (window.pageYOffset > 0) {
      headerEl.classList.add('scroll');
    } else {
      headerEl.classList.remove('scroll');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

export function initBurgerMenu() {
  const menuEl = document.querySelector('.menu');
  if (!menuEl) {
    return;
  }

  const burgerIcon = document.querySelector('[data-btn="burger"]');
  const closeBtn = menuEl.querySelector('[data-btn="close"]');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const anchors = menuEl.querySelectorAll('[data-scroll-target]');

  const handleOpenMenu = () => {
    menuEl.classList.add('active');
    document.body.classList.add('frozen');
    document.body.append(overlay);
  };

  const handleCloseMenu = () => {
    menuEl.classList.remove('active');
    document.body.classList.remove('frozen');
    overlay.remove();
  };

  burgerIcon.addEventListener('click', () => {
    handleOpenMenu();
  });

  overlay.addEventListener('click', () => {
    handleCloseMenu();
  });

  closeBtn.addEventListener('click', () => {
    handleCloseMenu();
  });

  if (anchors.length > 0) {
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', () => {
        handleCloseMenu();
      });
    });
  }
}

export function initTabs() {
  const tabEls = document.querySelectorAll('[data-tab]');

  if (tabEls.length <= 0) {
    return;
  }

  tabEls.forEach((tab) => {
    const tabContents = document.querySelectorAll(`[data-tab-content="${tab.dataset.tab}"]`);

    tab.addEventListener('click', (e) => {
      tabEls.forEach((tabEL) => {
        tabEL.classList.remove('active');
      });
      tabContents.forEach((tabContent) => {
        tabContent.classList.remove('active');
      });

      e.target.classList.add('active');
      const tabContent = document.querySelector(`[data-tab-item="${e.target.dataset.tabTarget}"]`);
      tabContent.classList.add('active');
    });
  });

  const activeTab = Array.from(tabEls).find((tab) => tab.classList.contains('active'));
  const tabContent = document.querySelector(`[data-tab-item="${activeTab.dataset.tabTarget}"]`);
  tabContent.classList.add('active');
}

export function initCarFilters() {
  const filterTabsContainer = document.querySelector('.catalog__tabs');

  if (!filterTabsContainer) {
    return;
  }

  const filterTabEls = filterTabsContainer.querySelectorAll('.catalog__tab');
  const activeFilterTab = filterTabsContainer.querySelector('.catalog__tab.active');

  const resetFilters = () => {
    document.querySelectorAll('.catalog__item').forEach((i) => i.classList.add('active'));
  };

  filterTabEls.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      filterTabEls.forEach((tabEL) => {
        tabEL.classList.remove('active');
      });

      const currentFilter = e.target.dataset.carFilter;
      if (currentFilter === 'all-auto') {
        resetFilters();
      } else {
        document.querySelectorAll('.catalog__item').forEach((i) => i.classList.remove('active'));
        const filteredCarEls = document.querySelectorAll(`.catalog__item.${currentFilter}`);
        filteredCarEls.forEach((carEl) => {
          carEl.classList.add('active');
        });

        e.target.classList.add('active');
      }
    });
  });

  const currentFilter = activeFilterTab.dataset.carFilter;
  if (currentFilter === 'all-auto') {
    resetFilters();
  } else {
    document.querySelectorAll('.catalog__item').forEach((i) => i.classList.remove('active'));
    const filteredCarEls = document.querySelectorAll(`.catalog__item.${currentFilter}`);
    filteredCarEls.forEach((carEl) => {
      carEl.classList.add('active');
    });
  }
}
