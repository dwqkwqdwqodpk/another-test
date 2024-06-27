const cards = document.querySelector('.row__cards')
const titles = Array.from(cards.querySelectorAll('.card__title'))
const prices = Array.from(cards.querySelectorAll('.card__price'))
const oldPrices = Array.from(cards.querySelectorAll('.old__price'))
const cardPrice = Array.from(document.querySelectorAll('.card__info-price'))

async function getResponse() {
	try {
		let response = await fetch('https://t-pay.iqfit.app/subscribe/list-test')
		if (response.ok) {
			let data = await response.json()
			const filteredData = data.filter(
				item => !item.isPopular && item.isDiscount === false
			)
			const isDiscount = data.filter(item => item.isDiscount)
			for (let key in isDiscount) {
				cardPrice[key].innerHTML = isDiscount[key].price + '₽'
			}
			function changes() {
				const maxLength = Math.min(data.length, titles.length, prices.length)
				for (let i = 0; i < maxLength; i++) {
					titles[i].innerHTML = data[i].name
					prices[i].innerHTML = data[i].price + '₽'
				}
				for (let j = 0; j < 4; j++) {
					oldPrices[j].innerHTML = filteredData[j].price
				}
			}
			changes()
		} else {
			console.log('Ошибка HTTP: ' + response.status)
		}
	} catch (error) {
		console.error('Произошла ошибка:', error)
	}
}

getResponse()

let isModalOpen = false

let minutes = 10
const milliseconds = minutes * 60 * 4
const timerElement = document.querySelector('.timer')
const startTime = new Date().getTime() // Установка начального времени

function updateTimer() {
	const currentTime = new Date().getTime()
	const remainingTime = startTime + milliseconds - currentTime // Исправлено вычисление оставшегося времени

	if (remainingTime <= 30000 && remainingTime >= 0) {
		timerElement.style.color = '#fd4d35'
		timerElement.classList.toggle('animate')
	}

	if (remainingTime <= 0) {
		clearInterval(timerInterval)
		let star = document.querySelectorAll('.star')
		for (let i = 0; i < star.length; i++) {
			star[i].style.display = 'none'
		}
		for (let value in prices) {
			prices[value].style.display = 'none'
			oldPrices[value].style.fontWeight = 'bold'
			oldPrices[value].style.textDecoration = 'unset'
			oldPrices[value].style.color = '#000'
			oldPrices[value].style.fontSize =
				'clamp(2.75rem, 2.643rem + 0.54vw, 3.125rem)'
		}
		const modal = document.querySelector('.modal__wrap	')
		modal.classList.toggle('none')
		const close = document.querySelector('.close')
		close.addEventListener('click', function () {
			modal.classList.toggle('none')
		})
		return
	}

	minutes = Math.floor(remainingTime / (1000 * 60))
	const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)
	let formattedMinutes = minutes.toString().padStart(2, '0')
	let formattedSeconds = seconds.toString().padStart(2, '0')
	// Форматируем время
	let formattedTime = formattedMinutes + ':' + formattedSeconds

	// Вставляем время в элемент
	timerElement.innerHTML = formattedTime
}

timerInterval = setInterval(updateTimer, 1000)

if (window.matchMedia('(max-width: 1200px)').matches) {
	document.querySelector('.card__text-second ').innerHTML =
		'Всегда быть в форме ⭐️'
}
