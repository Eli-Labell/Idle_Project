const TICK_ROLLOVER = 1000000 // Number of ticks before it rolls back to 0
var gameState = {
	toiletPaper: 0,
	tick: 0,
	incomeUpgrades: {
		socialDistancing: {
			quantity: 1,
			cost: 10,
			income: 1,
			friendlyName: "Social Distancing"
		},
		mask: {
			quantity: 0,
			cost: 50,
			income: 5,
			friendlyName: "Mask"
		},
		handSanitizer: {
			quantity: 0,
			cost: 500,
			income: 10,
			friendlyName: "Hand Sanitizer"
		},
		education: {
			quantity: 0,
			cost: 500,
			income: 10,
			friendlyName: "Education"
		},
		handWashing: {
			quantity: 0,
			cost: 500,
			income: 10,
			friendlyName: "Hand Washing"
		},
		wipes: {
			quantity: 0,
			cost: 500,
			income: 10,
			friendlyName: "Wipes"
		},
		vaccine: {
			quantity: 0,
			cost: 500,
			income: 10,
			friendlyName: "Vaccine"
		},
		testing: {
			quantity: 0,
			cost: 500,
			income: 10,
			friendlyName: "Testing"
		}
	}
}

function tick() {
	for (let key of Object.keys(gameState.incomeUpgrades)) {
		gameState.toiletPaper += gameState.incomeUpgrades[key].quantity * gameState.incomeUpgrades[key].income;
	}
	gameState.tick++
	if (gameState.tick % 10 == 0) {
		// gameState.incomeUpgrades.handSanitizer.quantity++;
	}
	showGameState();
	console.log("tick");
	if (gameState.tick == TICK_ROLLOVER) {
		gameState.tick = 0;
	}
}

// Template for every buyable element in the inventory
function buyableTemplate(key, buyable) {
	return `<img class="buy pic" src="../img/sprites/${key}.png"/>
			<ul class="buyable-stats">
				<li>${buyable.friendlyName}</li>
				<li>Cost: ${buyable.cost}</li>
				<li>Quanity Owned: ${buyable.quantity}</li>
			</ul>`
}

function showGameState() {
	document.getElementById('score').innerText = `${gameState.toiletPaper}`
}

function populateInventory() {
	let inventory = document.getElementById("inventory")
	inventory.innerHTML = ""


	for (let key of Object.keys(gameState.incomeUpgrades)) {
		let buyable = document.createElement("div")
		buyable.classList.add("buyable")
		buyable.id = key
		buyable.innerHTML = buyableTemplate(key, gameState.incomeUpgrades[key])
		buyable.addEventListener("click", function () {
			if (gameState.toiletPaper < gameState.incomeUpgrades[key].cost) {
				console.log("false")
				showGameState()
				return false
			}
			gameState.toiletPaper -= gameState.incomeUpgrades[key].cost;
			gameState.incomeUpgrades[key].quantity++
			console.log("true")
			showGameState()
			updateInventory()
			return true;
		})
		inventory.appendChild(buyable)
	}
}

function updateInventory() {
	let inventory = document.getElementById("inventory")
	inventory.childNodes.forEach((element) => {
		let key = element.id
		console.log(`key: ${key}`)
		element.innerHTML = buyableTemplate(key, gameState.incomeUpgrades[key])
	})
}


document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('ball').addEventListener("click", function () {
		gameState.toiletPaper += 10
	});
	populateInventory()
	setInterval(tick, 200);
}, false);
