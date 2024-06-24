// Устанавливаем время в минутах
const minutes = 10

// Конвертируем минуты в миллисекунды
const milliseconds = minutes * 60 * 1001

// Получаем элемент, в который будет вставлен таймер
const timerElement = document.querySelector('.timer')

// Функция для обновления таймера каждую секунду
function updateTimer() {
	const header = document.querySelector('.header__timer')
	// Получаем текущее время
	let currentTime = new Date().getTime()

	// Рассчитываем оставшееся время
	let remainingTime = milliseconds - (currentTime - startTime)

	if (remainingTime <= 0) {
		const prices = document.querySelectorAll('.card__price')
		const old = document.querySelectorAll('.old__price')
		const another = document.querySelector('.another')
		for (let i = 0; i < prices.length; i++) {
			prices[i].style.display = 'none'
		}
		for (let i = 0; i < old.length; i++) {
			old[i].style.textDecoration = 'unset'
			old[i].style.color = 'black'
			old[i].style.fontWeight = 'bold'
			old[i].style.fontSize = '40px'
		}
		timerElement.style.color = '#FD4D35'
		another.style.fontSize = '30px'
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



const modal = document.querySelector('.modal')
