//Data for testing

module.exports = {
	ships: {
		galleon: {
			name: "Galleon",
			life: 1000,
			price: 1200,
			speed: 4.5,
			cargo: 1200,
			slug: "galleon"
		},
		caravel: {
			name: "Caravel",
			life: 30,
			price: 10,
			speed: 8,
			cargo: 100,
			slug: "caravel"
		}
	},
	products: {
		bread: {
			name: "Bread",
			price: 50,
		},
		redmeat: {
			name: "Red meat",
			price: 50.2,
		},
		stone: {
			name: "Stone",
			price: 10.2
		},
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
			id: "arthur",
			money: 101,
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE0NTc2OTQwMTcsImV4cCI6MTQ4OTIzMDAxNywiYXVkIjoiIiwic3ViIjoiIiwiaWQiOiJhcnRodXIiLCJuYW1lIjoiQXJ0aHVyIn0.4RQId_u4ggnjJCwwTmpqz11qfvFRNmBz8cCWZeQaJHc"
		},
		ford: {
			id: "ford",
			money: 12000,
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE0NTc1NDI1NjgsImV4cCI6NjMxNzI4MzM4OCwiYXVkIjoiIiwic3ViIjoiIiwiaWQiOiJmb3JkIiwibmFtZSI6IkZvcmQifQ.djMHKgjQ5zpxmCqZqJdH2wArs7mNcuq7KpKD_lX8Z8I"
		}
	}
};