let dummydata
export default dummydata = {
  bottles: [
    {
      id: 1,
      name: "Round-bottom flask",
      type: "Glassware",
      description: "The round bottoms on these types of flasks allow more uniform heating and/or boiling of liquid. Thus, round-bottom flasks are used in a variety of applications where the contents are heated or boiled",
      image: "static/images/bottles/round-bottom-flask.svg",
      energy: 0.7,
      preparationTime: 1
    },
    {
      id: 2,
      name: "Erlenmeyer flask",
      type: "Glassware",
      description: "Erlenmeyer flasks have wide bases, with sides that taper upward to a short vertical neck. They may be graduated, and often spots of ground glass or enamel are used where they can be labeled with a pencil",
      image: "static/images/bottles/erlenmeyer-flask.svg",
      energy: 50,
      preparationTime: 0.5
    },
    {
      id: 3,
      name: "Glass vial",
      type: "Glassware",
      description: "A simple vial, spatious yet easy to conceal. Found in virtually every laboratory, a vial can be tubular, or have a bottle-like shape with a neck. The volume defined by the neck is known as the headspace",
      image: "static/images/bottles/phial.svg",
      energy: 30,
      preparationTime: 0.1
    },
    {
      id: 4,
      name: "Iron cauldron",
      type: "Cauldron",
      description: "Large pot for cooking or boiling over an open fire with an arc-shaped hanger. Made out of iron - sturdy but susceptible to damage from some more vigorous and violent alchemical reactions.",
      image: "static/images/bottles/iron-cauldron.svg",
      energy: 120,
      preparationTime: 3
    },
    {
      id: 5,
      name: "Ceramic bowl",
      type: "Cauldron",
      description: "Large pot for cooking or boiling over an open fire or in a furnace. Comes with a thick ceramic lid. It's able to withstand long hours in intense heat requred to extract powerful essences",
      image: "static/images/bottles/ceramic-bowl.svg",
      energy: 110,
      preparationTime: 5
    }
  ],
  essences: [
    {
      id: 1,
      name: "Nigredo",
      description: "Nigredo, or blackness, means putrefaction or decomposition",
      image: "static/images/essences/nigredo.svg",
      primaryEssence: 'nigredo',
      primaryEssenceStrength: 80,
      secondaryEssenceA: 'albedo',
      secondaryEssenceAStrength: 26,
      secondaryEssenceB: 'rubedo',
      secondaryEssenceBStrength: 11,
    },
    {
      id: 2,
      name: "Albedo",
      description: "The dove often represens this stage of purity and whiteness",
      image: "static/images/essences/albedo.svg",
      primaryEssence: 'albedo',
      primaryEssenceStrength: 90,
      secondaryEssenceA: 'citrinitas',
      secondaryEssenceAStrength: 16,
      secondaryEssenceB: 'nigredo',
      secondaryEssenceBStrength: 16,
    },
    {
      id: 3,
      name: "Citrinitas",
      description: "Citrinitas dawns the solar light inherent in one's being",
      image: "static/images/essences/citrinitas.svg",
      primaryEssence: 'citrinitas',
      primaryEssenceStrength: 60,
      secondaryEssenceA: 'rubedo',
      secondaryEssenceAStrength: 30,
      secondaryEssenceB: 'albedo',
      secondaryEssenceBStrength: 25,
    },
    {
      id: 4,
      name: "Rubedo",
      description: "It yet remains to treat concerning the reddening!",
      image: "static/images/essences/rubedo.svg",
      primaryEssence: 'rubedo',
      primaryEssenceStrength: 65,
      secondaryEssenceA: 'nigredo',
      secondaryEssenceAStrength: 30,
      secondaryEssenceB: 'citrinitas',
      secondaryEssenceBStrength: 35,
    },
  ],
  ingredients: [
    {
      id: 1,
      name: "Saltpetre",
      description: "Alchemical source of nitrogen",
      image: "static/images/ingredients/saltpetre.jpg",
      effects: [
        {
          description: 'enchances color perception',
          activationEssence: 'albedo',
          activationTreshold: 70,
          positive: true,
          interactions: null
        },
        {
          description: 'makes the user\'s hair glow',
          activationEssence: 'citrinitas',
          activationTreshold: 70,
          positive: true,
          interactions: null
        },
        {
          description: 'induces severe back pain',
          activationEssence: 'nigredo',
          activationTreshold: 80,
          positive: false,
          interactions: 'removePositive'
        }
      ]
    },
    {
      id: 25,
      name: "Lead sugar",
      description: "Sweet but deadly",
      image: "static/images/ingredients/lead-sugar.jpg",
      effects: [
        {
          description: 'increases finger agility',
          activationEssence: 'albedo',
          activationTreshold: 60,
          positive: true,
          interactions: null
        },
        {
          description: 'makes the user drowsy',
          activationEssence: 'albedo',
          activationTreshold: 50,
          positive: false,
          interactions: null
        },
        {
          description: 'tangles the user\'s toes',
          activationEssence: 'nigredo',
          activationTreshold: 90,
          positive: false,
          interactions: 'removePositive'
        }
      ]
    },
    {
      id: 2,
      name: "Yellow toadstool",
      description: "Leucocoprinus",
      image: "static/images/ingredients/yellow-toadstool.jpg",
      effects: [
        {
          description: 'reduces hunger and appetite',
          activationEssence: 'citrinitas',
          activationTreshold: 55,
          positive: true,
          interactions: null
        },
        {
          description: 'causes nausea and migraines',
          activationEssence: 'rubedo',
          activationTreshold: 85,
          positive: false,
          interactions: 'removeNegative'
        }
      ]
    },
    {
      id: 3,
      name: "Mandragora",
      description: "Reuben's root",
      image: "static/images/ingredients/mandragora.jpg",
      effects:
      [
        {
          description: 'prevents concussions and paralysis',
          activationEssence: 'rubedo',
          activationTreshold: 85,
          positive: true,
          interactions: null
        },
        {
          description: 'the user\'s ear grow uncontrollably',
          activationEssence: 'nigredo',
          activationTreshold: 40,
          positive: false,
          interactions: 'removeNegative'
        },
        {
          description: 'makes the user deaf',
          activationEssence: 'citrinitas',
          activationTreshold: 90,
          positive: false,
          interactions: 'removePositive'
        }
      ]
    },
    {
      id: 15,
      name: "Belladonna",
      description: "Deadly nightshade",
      image: "static/images/ingredients/nightshade.jpg",
      effects:
      [
        {
          description: 'greatly enhances all senses',
          activationEssence: 'nigredo',
          activationTreshold: 85,
          positive: true,
          interactions: 'removeNegative'
        },
        {
          description: 'numbs the user\'s tongue',
          activationEssence: 'nigredo',
          activationTreshold: 30,
          positive: false,
          interactions: null
        },
        {
          description: 'shrinks the user\'s head',
          activationEssence: 'albedo',
          activationTreshold: 90,
          positive: false,
          interactions: 'removePositive'
        }
      ]
    },
    {
      id: 4,
      name: "Salvia divinorum",
      description: "Ska maría pastora",
      image: "static/images/ingredients/salvia-divinorum.jpg",
      effects: [
        {
          description: 'allows the user to see through time',
          activationEssence: 'citrinitas',
          activationTreshold: 90,
          positive: true,
          interactions: null
        },
        {
          description: 'relieves stomach pain',
          activationEssence: 'rubedo',
          activationTreshold: 50,
          positive: true,
          interactions: null
        },
        {
          description: 'induces nightmarish visions',
          activationEssence: 'albedo',
          activationTreshold: 70,
          positive: false,
          interactions: 'removePositive'
        }
      ]
    },
    {
      id: 5,
      name: "Sweet wormwood",
      description: "Artemisia annua",
      image: "static/images/ingredients/sweet-wormwood.jpg",
      effects: [
        {
          description: 'makes everything taste amazing',
          activationEssence: 'rubedo',
          activationTreshold: 50,
          positive: true,
          interactions: null
        },
        {
          description: 'allows the user to see in the dark',
          activationEssence: 'rubedo',
          activationTreshold: 90,
          positive: true,
          interactions: 'removeNegative'
        },
        {
          description: 'causes severe nosebleeds',
          activationEssence: 'nigredo',
          activationTreshold: 70,
          positive: false,
          interactions: null
        }
      ]
    },
    {
      id: 685,
      name: "Drake fangs",
      description: "Warm to the touch",
      image: "static/images/ingredients/drake-fangs.jpg",
      effects: [
        {
          description: 'heals burns',
          activationEssence: 'citrinitas',
          activationTreshold: 30,
          positive: true,
          interactions: null
        },
        {
          description: 'the user grows a strong scaly tail',
          activationEssence: 'rubedo',
          activationTreshold: 80,
          positive: true,
          interactions: null
        },
        {
          description: 'causes eyelid necrosis',
          activationEssence: 'albedo',
          activationTreshold: 50,
          positive: false,
          interactions: 'removeNegative'
        }
      ]
    },
    {
      id: 534,
      name: "Nautilus shell",
      description: "Coiled aragonit",
      image: "static/images/ingredients/nautilus-shell.jpg",
      effects: [
        {
          description: 'allows the user to breath underwater',
          activationEssence: 'albedo',
          activationTreshold: 60,
          positive: true,
          interactions: 'removeNegative'
        },
        {
          description: 'causes vertigo',
          activationEssence: 'nigredo',
          activationTreshold: 40,
          positive: false,
          interactions: null
        },
        {
          description: 'induces extreme facial hair growth',
          activationEssence: 'citrinitas',
          activationTreshold: 50,
          positive: false,
          interactions: null
        }
      ]
    },
    {
      id: 445,
      name: "Powdered pearl",
      description: "Glows in the dark",
      image: "static/images/ingredients/powdered-pearl.jpg",
      effects: [
        {
          description: 'greatly increases mental abilities',
          activationEssence: 'nigredo',
          activationTreshold: 90,
          positive: true,
          interactions: null
        },
        {
          description: 'stiffens the user\'s joints',
          activationEssence: 'albedo',
          activationTreshold: 60,
          positive: false,
          interactions: 'removePositive'
        }
      ]
    },
  ]
}
