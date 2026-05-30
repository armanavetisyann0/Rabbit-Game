const bulletCount = document.getElementById('bullet-Count')
const statusGame = document.getElementById('status-Game')
const bestScore = document.getElementById('best-Score')
const parenthButtons = document.getElementById('parenth-Buttons')
const block = [...document.querySelectorAll('button')]


const getRandomRabbitPosition = () => {
    let randomPos = Math.ceil(Math.random() * 100)
    return randomPos
}

const markMiss = (target) => {
    target.style.backgroundColor = 'red'

    setTimeout(() => {
        target.style.backgroundColor = 'white'
    }, 1000);
}

const markHit = (target) => {
    target.style = `
    background-color: green;
    transform: scale(1.1,1.1);
    `
}

const decreaseBullets = () => {
    bulletCount.innerText--
    bullet--
}

const moveRabbitAfterMiss = (pos) => {
    let random = Math.ceil(Math.random() * 10)
    if (random > 5) {
        pos++
    } else {
        pos--
    }
    return pos
}

const checkRabbitPosition = (possition) => {
    if (possition <= 1 || possition >= 100) {
        possition = 50
    }

    return possition
}

const changeStatus = (status) => {
    statusGame.innerText = status
}


const local = localStorage
let rabbitPossitions = getRandomRabbitPosition()
let bullet = Number(bulletCount.innerText)

if (!local.getItem('best-Game')) {
    local.setItem('best-Game', 0)
} else {
    bestScore.innerText = local.getItem('best-Game')
}



parenthButtons.addEventListener('click', event => {
    if (block.includes(event.target) && bullet > 0) {
        let selectedPosition = block.indexOf(event.target) + 1
        decreaseBullets()
        changeStatus('🟢 Hunting')

        if (selectedPosition === rabbitPossitions) {
            if (bullet > Number(local.getItem('best-Game'))) {
                local.setItem('best-Game', bullet)
            }
            markHit(event.target)
            changeStatus('🏆 You Win!')
            setTimeout(() => {
                location.reload()
            }, 1000);
        } else {
            rabbitPossitions = moveRabbitAfterMiss(rabbitPossitions)
            changeStatus('❌ Miss! 🐰 Rabbit Moved')
            markMiss(event.target)
            setTimeout(() => {
                changeStatus('🟢 Hunting')
            }, 400);
        }

        rabbitPossitions = checkRabbitPosition(rabbitPossitions)
    } else {
        changeStatus('💀 Game Over')
        setTimeout(() => {
            location.reload()
        }, 1500)
    }
})



