//Data for testing

module.exports = {
	ships: {
		galleon: {
			name: "Galleon",
			life: 1000,
			price: 1200,
			speed: 4.5,
			cargo: 1200
		},
		caravel: {
			name: "caravel",
			life: 30,
			price: 10,
			speed: 8,
			cargo: 100
		}
	},
	products: {
		bread: {
			name: "Bread",
			basePrice: 50
		},
		redmeat: {
			name: "Red meat",
			basePrice: 50.2
		},
		stone: {
			name: "Stone",
			basePrice: 10.2
		}
	},
	cities: {
		minasTirith: {
			name: "Minas Tirith",
			positionX: 10,
			positionY: 40
		},
		isengard: {
			name: "Isengard",
			positionX: -5,
			positionY: -259.5
		},
		rohan: {
			name: "Rohan",
			positionX: 0,
			positionY: 0
		}
	},
	userShips: {
		blackPearl: {
			name: "Black Pearl",
			model: "Galleon",
			life: 110,
			status: "docked",
			city: "Isengard"
		},
		whitePearl: {
			name: "White Pearl",
			model: "Caravel",
			life: 110,
			status: "docked",
			city: "Minas Tirith"
		}
	},
	users: {
		arthur: {
			id: 1,
			money: 101
		},
		ford: {
			id: 2,
			money: 12000
		}
	}
};
