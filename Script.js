document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const cells = Array.from(grid.querySelectorAll('div'));
    const width = 10;
    let pacmanIndex = 11;
    let puntos = 0;

    // Crear marcador de puntos
    const scoreDisplay = document.createElement('div');
    scoreDisplay.style.margin = '10px 0';
    scoreDisplay.style.fontSize = '20px';
    scoreDisplay.textContent = `Puntos: ${puntos}`;
    document.body.insertBefore(scoreDisplay, grid);

    class Ghost {
        constructor(name, startIndex, className, speed = 500) {
            this.name = name;
            this.startIndex = startIndex; 
            this.currentIndex = startIndex;
            this.className = className;
            this.speed = speed;
            this.timerId = null;
            this.directions = [-1, 1, -width, width];
        }

        draw() {
            cells[this.currentIndex].classList.add('ghost', this.className);
        }

        erase() {
            cells[this.currentIndex].classList.remove('ghost', this.className);
        }

        move(){
            const moveGhost = () => {
                const direction = this.directions[Math.floor(Math.random() * this.directions.length)];
                const nextIndex = this.currentIndex + direction;

                if(
                    !cells[nextIndex].classList.contains('wall') &&
                    !cells[nextIndex].classList.contains('ghost')
                ) {
                    this.erase();
                    this.currentIndex = nextIndex;
                    this.draw();
                } else {
                    moveGhost();
                }
            };

            this.timerId = setInterval(moveGhost, this.speed);
        }

        stop() {
            clearInterval(this.timerId);
        }

        resetPosition() {
            this.erase();
            this.currentIndex = this.startIndex;
            this.draw();
            this.move();
        }
    }

    // Crear fantasmas
    const Dante = new Ghost('Dante', 34, 'red', 600);
    const Zeus = new Ghost('Zeus', 36, 'white', 600);
    const Poseidon = new Ghost('Poseidon',12 , 'blue', 600);
    const ghosts = [Dante, Zeus, Poseidon];

    ghosts.forEach(ghost => {
        ghost.draw();
        ghost.move();
    });

    function drawPacman() {
        cells.forEach(cell => cell.classList.remove('pacman'));
        cells[pacmanIndex].classList.add('pacman');
        const currentCell = cells[pacmanIndex];
        
         // Comer punto si hay
    if (currentCell.classList.contains('dot')) {
        currentCell.classList.remove('dot');
        puntos += 1;
        scoreDisplay.textContent = `Puntos: ${puntos}`;
    }

    currentCell.classList.add('pacman');
}

    
    drawPacman();

    // Detectar comer fantasmas luego reaparecer tras 3 segundos
    function checkPacmanEatsGhost() {
        ghosts.forEach((ghost) => {
            if (ghost.currentIndex === pacmanIndex) {
                ghost.erase();
                ghost.stop();
                puntos += 10;
                scoreDisplay.textContent = `Puntos: ${puntos}`;

                // Reaparece después de 3 segundos
                setTimeout(() => {
                    ghost.resetPosition();
                }, 3000);
            }
        });
    }

    // Movimiento de Pacman
    document.addEventListener('keydown', (e) => {
        cells[pacmanIndex].classList.remove('pacman');

        switch (e.key) {
            case 'ArrowLeft':
                if (pacmanIndex % width !== 0 && !cells[pacmanIndex - 1].classList.contains('wall')) {
                    pacmanIndex -= 1;
                }
                break;
            case 'ArrowRight':
                if (pacmanIndex % width < width - 1 && !cells[pacmanIndex + 1].classList.contains('wall')) {
                    pacmanIndex += 1;
                }
                break;
            case 'ArrowUp':
                if (pacmanIndex - width >= 0 && !cells[pacmanIndex - width].classList.contains('wall')) {
                    pacmanIndex -= width;
                }
                break;
            case 'ArrowDown':
                if (pacmanIndex + width < cells.length && !cells[pacmanIndex + width].classList.contains('wall')) {
                    pacmanIndex += width;
                }
                break;
        }

        drawPacman();
        checkPacmanEatsGhost();
    });
});
