
    const cards = document.querySelectorAll('.karta');
    const scoreSpan = document.getElementById('score');
    const MAX_SCORE = 6;

    let odwrocona = false;
    let lockBoard = false;
    let pierwsza, druga;
    let score = 0;

    function flipCard() {
        if (lockBoard) return;
        if (this === pierwsza) return;
        this.classList.add('flip');


        if (!odwrocona) {
            odwrocona = true;
            pierwsza = this;
            return;
        }

        druga = this;

        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = pierwsza.dataset.framework === druga.dataset.framework;
        isMatch ? disableCards() : unflipCards();

    }

    function disableCards() {
        pierwsza.removeEventListener('click', flipCard);
        druga.removeEventListener('click', flipCard);
        score = score + 1;
        scoreSpan.innerText = score;
        resetBoard();
        if (score === MAX_SCORE) {
            gameOver()
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            pierwsza.classList.remove('flip');
            druga.classList.remove('flip');
            resetBoard();
        }, 1000);
    }


    function resetBoard() {
        [odwrocona, lockBoard] = [false, false];
        [pierwsza, druga] = [null, null];

    }

    function gameOver() {
        const go = document.createElement('div')
        go.innerText = 'Wygrana! Przeładuj stronę, aby zagrać ponownie.'
        go.classList.add('gameover')
        document.body.appendChild(go)
    }
 


    (function shuffle() {
        cards.forEach(card => {
            let ramdomPos = Math.floor(Math.random() * 12);
            card.style.order = ramdomPos;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));



