window.addEventListener('DOMContentLoaded', () => {
  const btnListen = document.getElementById('btn-listen');
  const btnCopy = document.getElementById('btn-copy');
  const result = document.getElementById('result');
  const main = document.getElementsByTagName('main')[0];
  let listening = false;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition !== 'undefined') {
    const recognition = new SpeechRecognition();

    const stop = () => {
      main.classList.remove('speaking');
      recognition.stop();
      btnListen.textContent = 'Start listening';
    };

    const start = () => {
      main.classList.add('speaking');
      recognition.start();
      btnListen.textContent = 'Stop listening';
    };

    const onResult = event => {
      result.innerHTML = '';
      for (const res of event.results) {
        const text = document.createTextNode(res[0].transcript);
        const p = document.createElement('p');
        if (res.isFinal) {
          p.classList.add('final');
        }
        p.appendChild(text);
        result.appendChild(p);
        /* Get the text field */
        // console.log(p);

        // if (res.isFinal) {
        //   const copyText = document.querySelector('.final');
        //   /* Copy the text inside the text field */
        //   navigator.clipboard.writeText(copyText.textContent);

        //   /* Alert the copied text */
        //   console.log(`Copied the following text: ${copyText.textContent}`);
        // }

        /* Select the text field */
        //copyText.select();
        //copyText.setSelectionRange(0, 99999); /* For mobile devices */

        // navigator.clipboard.writeText(res[0].transcript);

        /* Alert the copied text */
        // console.log(`Copied the text ${res[0].transcript}`);
      }
    };
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.addEventListener('result', onResult);
    btnListen.addEventListener('click', event => {
      listening ? stop() : start();
      listening = !listening;
    });
    btnCopy.addEventListener('click', e => {
      const copyText = document.querySelectorAll('.final');
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText.textContent);

      /* Alert the copied text */
      console.log(`Copied the following text: ${copyText.textContent}`);
    });
  } else {
    btnListen.remove();
    const message = document.getElementById('message');
    message.removeAttribute('hidden');
    message.setAttribute('aria-hidden', 'false');
  }
});
