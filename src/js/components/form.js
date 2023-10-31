import routes from './routes.js';
import axios from 'axios/dist/axios.js';
import { Fancybox } from '@fancyapps/ui';

const createStatusNotyModal = (title, text) => {
  const modal = document.createElement('div');
  modal.className = 'modal';

  modal.innerHTML = `
    <div class="modal__inner modal__inner_narrow">
        <h2 class="title fz-35 tc-white">${title}</h2>
        <p class="fz-16 tc-white-dark mt-40">${text}</p>
    </div>
  `;

  new Fancybox([
    {
      src: modal,
      type: 'html',
    },
  ]);
};

export default () => {
  const requiredFields = ['phone'];
  const forms = document.querySelectorAll('form');

  if (forms.length <= 0) {
    return;
  }

  forms.forEach((form) => {
    const requiredInputs = Array.from(form.querySelectorAll('input')).filter((input) => {
      return requiredFields.includes(input.name);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValidForm = false;
      const emptyRequiredInputs = requiredInputs.filter((input) => input.value === '');

      const formData = new FormData(e.target);
      const formEntries = Object.fromEntries(formData);
      const { name, phone } = formEntries;
      const target = form.dataset.source;

      if (emptyRequiredInputs.length > 0) {
        isValidForm = false;
        emptyRequiredInputs.forEach((emptyInput) => {
          const emptyInputContainer = emptyInput.closest('.form__input-wrapper');
          const errorEl = emptyInputContainer.querySelector('.form__input-error');
          errorEl.classList.add('active');
        });
      } else {
        isValidForm = true;
        form.querySelectorAll('.form__input-error').forEach((errorEl) => errorEl.classList.remove('active'));
      }

      if (isValidForm) {
        try {
          const response = await axios.post(routes.formPath(), {
            name: name ?? '',
            phone,
            target,
          });

          const { message } = response.data;
          Fancybox.close();
          const { title, text } = message;
          createStatusNotyModal(title, text);
        } catch (err) {
          console.error(err);
          createStatusNotyModal('Ошибка', 'Что-то пошло не так, попробуйте еще раз.');
        }
      }
    });
  });
};
