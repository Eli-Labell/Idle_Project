const TICK_ROLLOVER = 1000000 // Number of ticks before it rolls back to 0
var gameState = {
	toiletPaper: 0,
	tick: 0,
	incomeUpgrades: {
		socialDistancing: {
			quantity: 1,
			cost: 0,
			income: 1
		},
		handSanitizer: {
			quantity: 1,
			cost: 100,
			income: 10
		}
	}
}

function tick() {
	for (let key of Object.keys(gameState.incomeUpgrades)) {
		gameState.toiletPaper += gameState.incomeUpgrades[key].quantity * gameState.incomeUpgrades[key].income
	}
	gameState.tick++
	showGameState()
	console.log("tick")
}

function showGameState() {
	document.getElementById('gameCanvas').innerHTML= `<span><h3>Rolls of toilet paper:</h3><h2>${gameState.toiletPaper}</h2></span>`
}

document.addEventListener('DOMContentLoaded', function () {
	showGameState()
	setInterval(tick , 200);
}, false);
