document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const cells = Array.from(grid.querySelectorAll('div'));
    const width = 10;
    let pacmanIndex = 11;

    // Clase del fantasma
    class Ghost {
        constructor(name, startIndex, className, speed = 500) {
            this.name = name;
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
            const directions = this.directions[Math.floor(Math.random() * this.directions.length)];
            const nextIndex = this.currentIndex + directions;

            if(
                !cells[nextIndex].classList.contains('wall') &&
                !cells[nextIndex].classList.contains('ghost')
            ) {
                this.erase();
                this.currentIndex = nextIndex;
                this.draw();
            } else {
                moveGhost(); // intenta moverse si choca
            }
            };

            this.timerId = setInterval(moveGhost, this.speed);
        }
    }

    // Crear fantasmas
    const Dante = new Ghost('Dante', 34, 'red', 600);
    const Zeus = new Ghost('Zeus', 36, 'white', 600);
    const ghosts = [Dante,Zeus];

    ghosts.forEach(ghost => {
        ghost.draw();
        ghost.move();
    });

    // pacman

    function drawPacman() {
        cells.forEach(cell => cell.classList.remove('pacman'));
        cells[pacmanIndex].classList.add('pacman');
    }
drawPacman();
    //movimiento del teclado
    document.addEventListener('keydown', (e) => {
        cells[pacmanIndex].classList.remove('pacman');

        switch (e.key) {
            case 'ArrowLeft' :
                if (pacmanIndex % width !== 0 && !cells[pacmanIndex - 1].classList.contains('wall')) {
                    pacmanIndex -=1;
                }
                break;
                case 'ArrowRight':
                    if(pacmanIndex % width >= 0 && !cells[pacmanIndex +1].classList.contains('wall')) {
                        pacmanIndex +=1;
                    }
                    break
                    case 'ArrowUp':
                        if(pacmanIndex - width >= 0 && !cells[pacmanIndex - width].classList.contains('wall')) {
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

    })
    
});

