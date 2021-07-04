import cardsData from '../data/cards-data';
import State from './state';

export default function gameProcess(): void {
  const SECOND = 1000;
  const state = State.getInstance();
  const CORRECT_SIGNAL_SRC = 'audio/correct.mp3';
  const WRONG_SIGNAL_SRC = 'audio/error.mp3';

  function playAudio(source: string): void {
    const audio = new Audio();
    audio.src = source;
    audio.autoplay = true;
  }

  function gameResult() {
    const wrongAnswers = state.getWrongAnswers();
    const whatResult = wrongAnswers === 0 ? 'Good' : 'Bad';
    const smile = wrongAnswers === 0 ? 'green-smile' : 'red-smile';

    setTimeout(() => {
      if (whatResult === 'Good') {
        playAudio('Success');
      } else {
        playAudio('Failure');
      }
    }, 2000);

    document.body.insertAdjacentHTML(
      'beforeend',
      `
    <div class="white-back">
      <div class="result-container">
        <div class="result-title">${whatResult} job!</div>
        <div class="results">
        Mistakes: ${wrongAnswers}
        </div>
        <img class="smile" src="images/${smile}.svg">
      </div>
    </div>
    `
    );

    setTimeout(() => {
      window.location.hash = '';
      document.dispatchEvent(new Event('restart'));
    }, SECOND * 5);
  }

  document.addEventListener('gameStatusChange', () => {
    const gameStatus = state.getGameStatus();
    if (gameStatus) {
      const hash = window.location.hash.slice(1).toLowerCase();
      const category = cardsData.find((el) => {
        return el.category.toLowerCase() === hash;
      });
      const words = category?.words
        .map((el) => el.word)
        .sort(() => Math.random() - 0.5);
      state.setCurrentWords(words ?? []);
      playAudio(
        `https://wooordhunt.ru/data/sound/sow/us/${state.getCurrentWord()}.mp3`
      );
    }
  });

  document.addEventListener('answer', (event) => {
    if ((<CustomEvent>event).detail.answer) {
      state.incWordCounter();
      playAudio(CORRECT_SIGNAL_SRC);
      if (!state.isFinish()) {
        setTimeout(() => {
          playAudio(
            `https://wooordhunt.ru/data/sound/sow/us/${state.getCurrentWord()}.mp3`
          );
        }, SECOND);
      } else {
        gameResult();
      }
    } else {
      playAudio(WRONG_SIGNAL_SRC);
    }
  });
}
