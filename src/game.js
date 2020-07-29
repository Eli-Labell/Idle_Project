const TICK_ROLLOVER = 1000000 // Number of ticks before it rolls back to 0
let gameState
const gameStateVersion = "1.0"
function initGameState() {
	gameState = {
		version: gameStateVersion,
		toiletPaper: 0,
		tick: 0,
		incomeUpgrades: { //Stores data about all items that can be purchased. You can buy as many of an item as you want
			socialDistancing: {
				quantity: 1,
				cost: 100,
				income: 1,
				multiplier: 1,
				friendlyName: "Social Distancing"
			},
			mask: {
				quantity: 0,
				cost: 500,
				income: 5,
				multiplier: 1,
				friendlyName: "Mask"
			},
			handSanitizer: {
				quantity: 0,
				cost: 2000,
				income: 10,
				multiplier: 1,
				friendlyName: "Hand Sanitizer"
			},
			education: {
				quantity: 0,
				cost: 50000,
				income: 10,
				multiplier: 1,
				friendlyName: "Education"
			},
			handWashing: {
				quantity: 0,
				cost: 100000,
				income: 10,
				multiplier: 1,
				friendlyName: "Hand Washing"
			},
			wipes: {
				quantity: 0,
				cost: 1000000,
				income: 10,
				multiplier: 1,
				friendlyName: "Wipes"
			},
			vaccine: {
				quantity: 0,
				cost: 5000000,
				income: 10,
				multiplier: 1,
				friendlyName: "Vaccine"
			},
			testing: {
				quantity: 0,
				cost: 50000000,
				income: 10,
				multiplier: 1,
				friendlyName: "Testing"
			}
		},
		multiplierUpgrades: { // Stores data about all multiplier upgrades that can be purchased. You can buy each upgrade once
            socialDistancingUpgrade: {
                purchased: 0,
                cost: 1000,
                multiplier: 2,
                friendlyName: "Social Isolation"
            },
            maskUpgrade: {
                purchased: 0,
                cost: 50000,
                multiplier: 2,
                friendlyName: "N-95 Mask"
            },
            handSanitizerUpgrade: {
                purchased: 0,
                cost: 500000,
                multiplier: 3,
                friendlyName: "Hand Bleach"
            },
            educationUpgrade: {
                purchased: 0,
                cost: 1000000,
                multiplier: 4,
                friendlyName: "Master"
            },
            handWashingUpgrade: {
                purchased: 0,
                cost: 5000000,
                multiplier: 5,
                friendlyName: "Whole Arm Washing"
            },
            wipesUpgrade: {
                purchased: 0,
                cost: 50000000,
                multiplier: 10,
                friendlyName: "Disinfectant Towel"
            },
            vaccineUpgrade: {
                purchased: 0,
                cost: 10000000000,
                multiplier: 20,
                friendlyName: "Immunity"
            },
            testingUpgrade: {
                purchased: 0,
                cost: 5000000000000,
                multiplier: 100,
                friendlyName: "Testing"
            }
		}
	}
}

function setMultiplier(key, multiplier) {
	gameState.incomeUpgrades[key].multiplier = multiplier
}

function tick() {
	for (let key of Object.keys(gameState.incomeUpgrades)) {
        console.log(gameState.incomeUpgrades[key] ?.multiplier)
        if (gameState.multiplierUpgrades[key + "Upgrade"].purchased === 1) {
            gameState.toiletPaper += gameState.incomeUpgrades[key] ?.quantity * gameState.incomeUpgrades[key] ?.income * gameState.incomeUpgrades[key] ?.multiplier * gameState.multiplierUpgrades[key+"Upgrade"] ?.multiplier;
        } else {
            gameState.toiletPaper += gameState.incomeUpgrades[key] ?.quantity * gameState.incomeUpgrades[key] ?.income * gameState.incomeUpgrades[key] ?.multiplier;
        }
	}
	gameState.tick++
	if (gameState.tick % 10 == 0) {
		// gameState.incomeUpgrades.handSanitizer.quantity++;
	}
	showGameState();
	//console.log("tick");
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
				<li>Quantity Owned: ${buyable.quantity}</li>
			</ul>`
}

function upgradableTemplate(key, upgradable) {
    return `<img class="buy pic ${upgradable.purchased === 0 ? "grey" : ""}" src="../img/sprites/${key}.png"/>
			<ul class="buyable-stats">
				<li>${upgradable.friendlyName}</li>
				<li>Cost: ${upgradable.cost}</li>
				<li>Purchased: ${upgradable.purchased === 0 ? "False" : "True" }</li>
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

function populateItemShelf() {
    let shelf = document.getElementById("shelf")
    shelf.innerHTML = ""

    for (let key of Object.keys(gameState.multiplierUpgrades)) {
        let upgradable = document.createElement("div")
        upgradable.classList.add("buyable")
        upgradable.id = key
        upgradable.innerHTML = upgradableTemplate(key, gameState.multiplierUpgrades[key])

        upgradable.addEventListener("click", function () {
            if (gameState.toiletPaper < gameState.multiplierUpgrades[key].cost) {
                console.log("false")
                showGameState()
                return false
            }

            if (gameState.multiplierUpgrades[key].purchased != 0) {
                console.log("false")
                showGameState()
                return false
            }

            gameState.toiletPaper -= gameState.multiplierUpgrades[key].cost;
            gameState.multiplierUpgrades[key].purchased++
            console.log(true)
            showGameState()
            updateShelf()
            return true
        })

        shelf.appendChild(upgradable)
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

function updateShelf(id) {
    let shelf = document.getElementById("shelf")
    console.log(shelf)
    shelf.childNodes.forEach((element) => {
        let key = element.id
        console.log(key)
        element.innerHTML =  upgradableTemplate(key, gameState.multiplierUpgrades[key])
    })
}


document.addEventListener('DOMContentLoaded', function () {
	retrieveGameState()
	document.getElementById('ball').addEventListener("click", function () {
		gameState.toiletPaper += 10
	});
    populateInventory()
    populateItemShelf()
	setInterval(tick, 200);
}, false);

window.onbeforeunload = function () {
	storeGameState()
}

function storeGameState() {
	localStorage.setItem("gameState", JSON.stringify(gameState))
}

function retrieveGameState() {
	gameState = JSON.parse(localStorage.getItem("gameState"))
	if (gameState == null || gameState.version != gameStateVersion) {
		console.log("No gameState in local storage, initializing")
		initGameState()
	}
	console.log(gameState)
}