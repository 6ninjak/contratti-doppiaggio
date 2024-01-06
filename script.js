// script.js

function mostraSezione(idSezione) {
    // Nascondi tutte le sezioni
    const tutteLeSezioni = document.querySelectorAll('main section');
    tutteLeSezioni.forEach(sezione => {
        sezione.classList.add('hidden');
    });

    // Mostra solo la sezione selezionata
    const sezioneSelezionata = document.getElementById(idSezione);
    sezioneSelezionata.classList.remove('hidden');
}
