import { Fancybox } from '@fancyapps/ui';
import { Carousel } from '@fancyapps/ui';
import { Autoplay } from '@fancyapps/ui/dist/carousel/carousel.autoplay.umd.js';
import Inputmask from 'inputmask';

export default () => {
  Fancybox.bind('[data-fancybox]', {
    Toolbar: {
      display: {
        left: ['infobar'],
        middle: [],
        right: ['close'],
      },
    },
  });

  const flashFara = () => {
    const faraEl = document.getElementById('fara');

    if (!faraEl) {
      return;
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        faraEl.classList.add('scrolled');
      } else {
        faraEl.classList.remove('scrolled');
      }
    });
  };
  flashFara();

  function initPromoCarousel() {
    const containers = document.querySelectorAll('[data-carousel="auto-gallery"]');
    if (containers.length <= 0) {
      return;
    }

    const options = {
      transition: 'fade',
      Autoplay: {
        timeout: 4000,
        hoverPause: true,
        autoStart: true,
        showProgress: true,
      },
      /*     Thumbs: {
            type: 'classic',
          }, */
      adaptiveHeight: true,
      Navigation: true,
      //Dots: false,
    };

    containers.forEach((container) => {
      new Carousel(container, options, { Autoplay /* Thumbs */ });
    });
  }
  initPromoCarousel();

  const showMoreFeatures = () => {
    const btn = document.querySelector('.auto-card__more');

    if (!btn) {
      return;
    }

    const hiddenFeatures = document.querySelector('[data-hidden-features]');

    const toggleFeatures = (featuresList) => {
      var isHidden = featuresList.style.maxHeight;
      featuresList.style.maxHeight = isHidden ? null : featuresList.scrollHeight + 'px';
    };

    btn.addEventListener('click', () => {
      const isHidden = btn.dataset.hidden;

      if (isHidden === 'true') {
        btn.setAttribute('data-hidden', 'false');
        btn.classList.add('active');
        btn.querySelector('[data-btn-text]').innerHTML = 'Скрыть';

        toggleFeatures(hiddenFeatures);
      } else {
        btn.setAttribute('data-hidden', 'true');
        btn.classList.remove('active');
        btn.querySelector('[data-btn-text]').innerHTML = 'Подробнее';

        toggleFeatures(hiddenFeatures);
      }
    });
  };
  showMoreFeatures();

  const setPhoneMask = () => {
    const inputs = document.querySelectorAll('input[name="phone"]');

    if (inputs.length <= 0) {
      return;
    }

    inputs.forEach((input) => {
      const inputMask = new Inputmask({
        mask: '+7 (999) 999-99-99',
        definitions: {
          a: {
            validator: '[A-Za-z]',
            cardinality: 1,
          },
        },
        onBeforePaste: function (pastedValue, opts) {
          // Удаляем все пробелы из вставляемого значения
          return pastedValue.replace(/\s/g, '');
        },
        onBeforeMask: function (initialValue, opts) {
          // Преобразуем значение, заменяя пробелы на пустые символы
          return initialValue.replace(/\s/g, '');
        },
        onUnMask: function (maskedValue, unmaskedValue, opts) {
          // Удаляем пустые символы из раскрытого значения
          return maskedValue.replace(/[^0-9a-zA-Z]/g, '');
        },
      });

      inputMask.mask(input);
    });
  };
  setPhoneMask();

  const showMoreBtn = () => {
    document.addEventListener('DOMContentLoaded', function () {
      const limit = 6;
      const nextOpen = (wrapper, button) => {
        const boxs = wrapper.querySelectorAll('.catalog__item'),
          len = boxs.length - 2,
          endBox = wrapper.querySelector('.nextstop'),
          index = [...boxs].indexOf(endBox) + limit;
        if (endBox) endBox.classList.remove('nextstop');
        if (index < len) boxs[index].classList.add('nextstop');
        else button.remove();
      };
      document.querySelectorAll('.catalog__items').forEach((wrapper) => {
        const button = wrapper.nextElementSibling;
        button.addEventListener('click', nextOpen.bind(null, wrapper, button));
        nextOpen(wrapper, button);
      });
    });
  };
  showMoreBtn();
};
