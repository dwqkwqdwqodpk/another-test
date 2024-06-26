// Устанавливаем время в минутах
const minutes = 10

// Конвертируем минуты в миллисекунды
const milliseconds = minutes * 60 * 10

let isModalOpen = false
// Получаем элемент, в который будет вставлен таймер
const timerElement = document.querySelector('.timer')
const mediaQuery = window.matchMedia('(max-width: 700px)')
const cardText = document.querySelectorAll('.card__text')
const secondText = document.querySelector('.card__text-second')
if (mediaQuery.matches) {
	let element = document.querySelector('.card__text-second')
	let year = document.querySelector('.year')
	year.innerHTML = '1 год'
	element.innerHTML = 'Всегда быть в форме ⭐️'
}

// Функция для обновления таймера каждую секунду
function updateTimer() {
	// Получаем текущее время
	let currentTime = new Date().getTime()
	// Рассчитываем оставшееся время
	let remainingTime = milliseconds - (currentTime - startTime)
	//
	if (remainingTime <= 30000 && remainingTime >= 0) {
		timerElement.style.color = '#FD4D35'
		timerElement.classList.add('animate')
	}

	if (remainingTime <= 0) {
		const prices = document.querySelectorAll('.card__price')
		const old = document.querySelectorAll('.old__price')
		const another = document.querySelector('.another')
		const over = document.querySelector('.overlay')
		const stars = document.querySelectorAll('.star')
		for (let i = 0; i < prices.length; i++) {
			prices[i].style.display = 'none'
			stars[i].style.display = 'none'
			cardText[i].style.marginBotton = '0px'
		}
		for (let i = 0; i < old.length; i++) {
			old[i].style.textDecoration = 'unset'
			old[i].style.color = 'black'
			old[i].style.fontWeight = 'bold'
			old[i].style.fontSize = '40px'
		}
		another.style.fontSize = '30px'
		timerElement.classList.remove('animate')

		if (!isModalOpen) {
			const modal = document.querySelector('.modal__wrap')
			modal.classList.remove('none')
			isModalOpen = true
			const close = document.querySelector('.close')
			over.style.display = 'block'
			close.onclick = () => {
				modal.classList.toggle('none')
			}
		}

		return
	}

	// Рассчитываем минуты и секунды
	let minutes = Math.floor(remainingTime / (1000 * 60))
	let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

	// Форматируем время
	let formattedTime = '0' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds

	// Вставляем время в элемент
	timerElement.innerHTML = formattedTime
}

// Запускаем таймер
const startTime = new Date().getTime()
const timer = setInterval(updateTimer, 1000)
