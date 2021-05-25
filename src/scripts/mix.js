// HOW ITS MIXED, ep. 1103:
// The user choses a bottle - every bottle is characterized by 2 values:
// energy and preparation time.
// The user choses an essential base - every base has a primary,
// secondary and tertiary essence element.
// The power of primary essence depends on the bottle's energy, while the power
// of secondary&tertiary essence is determined by bottles preparation time.
// Then the user adds ingredients. Every ingredient has a set of effects.
// Every effect responds to a certain essence. An effect is activated when
// the power of the corresponding essence reaches a certain treshold.
// Additionally, upon activation, the most powerful effect (i.e. the one that is
// the hardest to activate) may remove a random positive or negative lesser
// effect.
// If the essence/energy/ingredients combo is too weak and no effects are
// activated, a generic, essence-specific effect is added instead. A potions
// can have 1-6 effects.
// Through trial and error the user may learn which ingredients result in which
// effects under which bottle & essence circumstances. Then they may minmax
// their potions by using proper combinations.

export default function (input) {

  const genericEffects = {
    nigredo: {
      description: 'the user reeks of mud',
      activationEssence: 'nigredo',
      activationTreshold: 0,
      positive: false,
      interactions: null
    },
    albedo: {
      description: 'causes white rash on user’s forehead',
      activationEssence: 'albedo',
      activationTreshold: 0,
      positive: false,
      interactions: null
    },
    citrinitas: {
      description: 'makes the user’s nose itchy',
      activationEssence: 'citrinitas',
      activationTreshold: 0,
      positive: false,
      interactions: null
    },
    rubedo: {
      description: 'numbs the user’s hands',
      activationEssence: 'rubedo',
      activationTreshold: 0,
      positive: false,
      interactions: null
    }
  }

  const randomFactors = [
    0.9 + 0.1 * Math.random(),
    0.8 + 0.2 * Math.random(),
    0.5 + 0.5 * Math.random(),
    0.3 + 0.7 * Math.random()
  ]

  // determine energies and essences
  let computedPrimaryEssenceStrength = input.energy * (randomFactors[0] * input.primaryEssenceStrength)
  let computedSecondaryEssence
  let computedSecondaryEssenceStrength
  if (input.preparationTime * randomFactors[2] > 3) {
    computedSecondaryEssence = input.secondaryEssenceA
    computedSecondaryEssenceStrength = input.secondaryEssenceAStrength * randomFactors[1]
  }
  else {
    computedSecondaryEssence = input.secondaryEssenceB
    computedSecondaryEssenceStrength = input.secondaryEssenceBStrength * randomFactors[2]
  }

  // determine effects
  let computedEffects = []
  // first mix - determine effects based on essences strengths
  for (let effect of input.effects) {
    if (
      (effect.activationEssence == input.primaryEssence && effect.activationTreshold <= computedPrimaryEssenceStrength) ||
      (effect.activationEssence == computedSecondaryEssence && effect.activationTreshold <= computedSecondaryEssenceStrength)
    ) {
      computedEffects.push(effect)
    }
  }
  // second mix - compute interactions of the most powerful effect
  // sort effects by power (i.e. activation treshold)
  computedEffects.sort((effectA, effectB) => {
    if (effectA.activationTreshold > effectB.activationTreshold) {
      return 1
    }
    if (effectA.activationTreshold < effectB.activationTreshold) {
      return -1
    }
    else {
      return 0
    }
  })
  // remove one random positive/negative lesser effect
  if (computedEffects.length > 0) {
    if (computedEffects[0].interactions != null) {
      let removableEffects
      if (computedEffects[0].interactions == 'removePositive') {
        let removableEffects = computedEffects.filter(e => e.positive && computedEffects.indexOf(e) > 0)
      }
      else if (computedEffects[0].interactions == 'removeNegative') {
        let removableEffects = computedEffects.filter(e => !e.positive && computedEffects.indexOf(e) > 0)
      }
      if (removableEffects) {
        let randomEffect = removableEffects[Math.floor(Math.random()*removableEffects.length)]
      }
    }
  }

  // if there are no effects left then consider adding the weakest effect from the input pool
  if (computedEffects.length == 0 && Math.random() > 0.6) {
    input.effects.sort((effectA, effectB) => {
      if (effectA.activationTreshold > effectB.activationTreshold) {
        return 1
      }
      if (effectA.activationTreshold < effectB.activationTreshold) {
        return -1
      }
      else {
        return 0
      }
    })
    computedEffects.push(input.effects[0])
    // consider adding essence-determined generic effect
    if (Math.random() > 0.4) {
      computedEffects.push(genericEffects[input.primaryEssence])
    }
  }
  // if there are still no effects left add essence-determined generic effect
  // console.log(input.primaryEssence);
  if (computedEffects.length == 0) {
    // console.log(genericEffects[input.primaryEssence]);
    computedEffects.push(genericEffects[input.primaryEssence])
  }
  // if there are more than 6 effects then leave only the 6 strongest
  if (computedEffects.length > 5) {
    // sort
    computedEffects.sort((effectA, effectB) => {
      if (effectA.activationTreshold > effectB.activationTreshold) {
        return 1
      }
      if (effectA.activationTreshold < effectB.activationTreshold) {
        return -1
      }
      else {
        return 0
      }
    })
    // leave only the first 6
    computedEffects = computedEffects.slice(0,6)
  }
  // save effects description for export
  let effects = []
  for (let computed of computedEffects) {
    effects.push(computed.description)
  }

  // generate description settings
  // preparation time and the number of initial effects determine consistency
  const consistencies = ['watery', 'runny', 'oily', 'thick', 'viscous']
  let consistencyId = 0
  if (input.effects.length > 8) {
    consistencyId += 3
  }
  else if (input.effects.length > 5) {
    consistencyId += 1
  }
  if (input.preparationTime > 1) {
    consistencyId += 1
  }
  else if (input.preparationTime > 2) {
    consistencyId += 2
  }
  consistencyId = Math.min(consistencyId, consistencies.length)
  let consistency = consistencies[consistencyId]
  // determine noun based on consistency
  const nouns = [
    'liquid', 'elixir', 'concoction', 'solution', 'extract',
    'goo', 'paste', 'sludge', 'slime'
  ]
  let noun
  if (consistencyId > 2) {
    noun = nouns[Math.floor(Math.random() * nouns.length)]
  }
  else {
    let liquidNouns = nouns.slice(0,4)
    noun = liquidNouns[Math.floor(Math.random() * liquidNouns.length)]
  }
  // primary essence and the quality of effects determine color
  const colors = {
    nigredo: ['black', 'muddy', 'iridescent'],
    albedo: ['sand-colored', 'milky', 'clear'],
    citrinitas: ['green', 'turquoise', 'gold'],
    rubedo: ['orange', 'maroon', 'pink']
  }
  let color
  let positiveEffectsCount = computedEffects.filter(effect => effect.positive == true).length
  let negativeEffectsCount = computedEffects.filter(effect => effect.positive == false).length
  if (positiveEffectsCount - negativeEffectsCount > 2) {
    color = colors[input.primaryEssence][2]
  }
  else if (positiveEffectsCount - negativeEffectsCount < 2) {
    color = colors[input.primaryEssence][0]
  }
  else {
    color = colors[input.primaryEssence][1]
  }
  // additional quality description depends on final effects combined strength compared to initial effects' strenght
  const qualities = ['bubbling', 'glowing', 'fuming', 'boiling']
  let quality = null
  let initialPowerFactor = input.effects.reduce((accumulator, effect) => accumulator + effect.activationTreshold, 0)
  let computedPowerFactor = computedEffects.reduce((accumulator, effect) => accumulator + effect.activationTreshold, 0)
  let powerFactorRatio = computedPowerFactor / initialPowerFactor
  if (powerFactorRatio > 0.1) {
    quality = qualities[Math.min(qualities.length, Math.floor(powerFactorRatio * qualities.length + Math.random() * 0.2))]
  }
  // deternime article
  let article = 'a'
  if (consistency.startsWith('a') ||
      consistency.startsWith('e') ||
      consistency.startsWith('i') ||
      consistency.startsWith('o') ||
      consistency.startsWith('u')) {
    article = 'an'
  }
  // combine the description
  let description = `${article} ${consistency} ${color}` + (quality ? ` ${quality}` : '') + ` ${noun}`

  return {description, effects}
}
