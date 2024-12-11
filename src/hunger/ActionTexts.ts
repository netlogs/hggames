// 定义状态影响类型
type EffectType = 'death' | 'injured' | 'normal';

interface ActionEffect {
  target?: EffectType;
  actor?: EffectType;
  others?: EffectType;
  winner?: EffectType;
}

interface ActionItem {
  text: string;
  effect: ActionEffect;
}

export const singlePersonActions = [
  'searches for firewood',
  'hunts for food',
  'hides in the bushes',
  'collects water',
  'sets up a shelter',
  'explores the area',
  'climbs a tree to rest',
  'treats their wounds',
  'searches for other tributes',
  'practices with their weapons'
];

export const twoPersonActions = {
  0: {
    overpowers: {
      text: ', killing him.',
      effect: { target: 'death' }
    },
    defeats: {
      text: ', leaving him injured.',
      effect: { target: 'injured' }
    },
    captures: {
      text: ' and ties him up.',
      effect: { target: 'injured' }
    },
    ambushes: {
      text: ' and steals his supplies.',
      effect: { target: 'normal' }
    }
  },
  1: {
    destroys: {
      text: "'s supplies while he is asleep.",
      effect: { target: 'normal' }
    },
    sabotages: {
      text: "'s shelter, leaving him exposed.",
      effect: { target: 'normal' }
    },
    poisons: {
      text: "'s food, making him sick.",
      effect: { target: 'injured' }
    },
    steals: {
      text: "'s weapon while he is distracted.",
      effect: { target: 'normal' }
    }
  }
};

export const multiPersonActions = {
  0: {
    share: {
      text: 'share everything they gathered before running.',
      effect: { others: 'normal' }
    },
    sing: {
      text: 'cheerfully sing songs together.',
      effect: { others: 'normal' }
    },
    raid: {
      text: "raid {target}'s camp while {pronoun} is hunting.",
      effect: { target: 'normal', others: 'normal' }
    },
    tell: {
      text: 'tell each other ghost stories to lighten the mood.',
      effect: { others: 'normal' }
    }
  },
  1: {
    fight: {
      text: 'get into a fight. {winner} triumphantly kills them all.',
      effect: { winner: 'normal', others: 'death' }
    },
    drown: {
      text: 'work together to drown {target}.',
      effect: { target: 'death', others: 'normal' }
    },
    fend: {
      text: 'fends {others} away from {possessive} fire.',
      effect: { target: 'normal', others: 'injured' }
    },
    discuss: {
      text: 'discuss the games and what might happen in the morning.',
      effect: { others: 'normal' }
    }
  }
};

export const phaseSpecificActions = {
  'The Bloodbath': {
    singlePerson: [
      'grabs a backpack and runs',
      'runs away from the Cornucopia',
      'finds a bow inside the Cornucopia',
      'grabs as many supplies as possible',
      'steps off plate too early and explodes',
      'takes a handful of throwing knives',
      'retrieves a trident from inside the Cornucopia',
      'runs into the Cornucopia and hides',
      'falls while running away',
      'gathers as much food as possible'
    ],
    twoPerson: {
      0: {
        fights: {
          text: ' for a backpack. Kills him.',
          effect: { target: 'death', actor: 'normal' }
        },
        chases: {
          text: ' away from the Cornucopia.',
          effect: { target: 'normal', actor: 'normal' }
        },
        tackles: {
          text: ' and takes their supplies.',
          effect: { target: 'injured', actor: 'normal' }
        },
        throws: {
          text: ' a knife into his chest.',
          effect: { target: 'death', actor: 'normal' }
        }
      },
      1: {
        snaps: {
          text: "'s neck at the Cornucopia.",
          effect: { target: 'death', actor: 'normal' }
        },
        grabs: {
          text: "'s supplies and runs.",
          effect: { target: 'normal', actor: 'normal' }
        },
        helps: {
          text: ' gather supplies and they run together.',
          effect: { target: 'normal', actor: 'normal' }
        },
        fights: {
          text: ' over a supply bag and loses.',
          effect: { target: 'injured', actor: 'normal' }
        }
      }
    },
    multiPerson: {
      0: {
        form: {
          text: 'form an alliance to control the Cornucopia.',
          effect: { others: 'normal' }
        },
        fight: {
          text: 'get into a bloodbath at the Cornucopia. {winner} emerges victorious.',
          effect: { winner: 'normal', others: 'death' }
        },
        scatter: {
          text: 'grab what they can and scatter.',
          effect: { others: 'normal' }
        },
        team: {
          text: 'team up to grab supplies together.',
          effect: { others: 'normal' }
        }
      },
      1: {
        battle: {
          text: 'battle for control of the Cornucopia. {winner} survives.',
          effect: { winner: 'normal', others: 'death' }
        },
        gang: {
          text: 'gang up on {target} and kill {pronoun}.',
          effect: { target: 'death', others: 'normal' }
        },
        flee: {
          text: 'all flee the Cornucopia together.',
          effect: { others: 'normal' }
        },
        share: {
          text: 'agree to share the supplies and split up.',
          effect: { others: 'normal' }
        }
      }
    }
  },
  
  'Night': {
    singlePerson: [
      'sets up camp for the night',
      'stays awake to keep watch',
      'falls asleep in a tree',
      'tends to their wounds in hiding',
      'makes a fire to stay warm',
      'searches for other tributes in the dark',
      'camouflages themselves for safety',
      'tries to sleep but keeps hearing noises',
      'finds a cave to sleep in',
      'sets up traps around their camp'
    ],
    twoPerson: {
      0: {
        sneaks: {
          text: ' up on the sleeping tribute and kills them.',
          effect: { target: 'death', actor: 'normal' }
        },
        spots: {
          text: "'s fire and steals their supplies.",
          effect: { target: 'normal', actor: 'normal' }
        },
        ambushes: {
          text: ' in the darkness.',
          effect: { target: 'injured', actor: 'normal' }
        },
        strangles: {
          text: ' in their sleep.',
          effect: { target: 'death', actor: 'normal' }
        }
      },
      1: {
        stalks: {
          text: ' through the night but loses them.',
          effect: { target: 'normal', actor: 'normal' }
        },
        shares: {
          text: "'s campfire for warmth.",
          effect: { target: 'normal', actor: 'normal' }
        },
        attacks: {
          text: ' but misses in the darkness.',
          effect: { target: 'normal', actor: 'normal' }
        },
        discovers: {
          text: ' sleeping and silently moves away.',
          effect: { target: 'normal', actor: 'normal' }
        }
      }
    },
    multiPerson: {
      0: {
        guard: {
          text: 'take turns keeping watch during the night.',
          effect: { others: 'normal' }
        },
        huddle: {
          text: 'huddle together for warmth.',
          effect: { others: 'normal' }
        },
        track: {
          text: 'track down {target} in the night and attack.',
          effect: { target: 'death', others: 'normal' }
        },
        share: {
          text: 'share a camp for the night.',
          effect: { others: 'normal' }
        }
      },
      1: {
        betray: {
          text: 'turn on each other in the darkness. Only {winner} survives.',
          effect: { winner: 'normal', others: 'death' }
        },
        ambush: {
          text: 'ambush {target} while {pronoun} sleeps.',
          effect: { target: 'death', others: 'normal' }
        },
        flee: {
          text: 'run from a pack of wild animals.',
          effect: { others: 'injured' }
        },
        plan: {
          text: 'make plans for tomorrow.',
          effect: { others: 'normal' }
        }
      }
    }
  },

  'The Feast': {
    singlePerson: [
      'runs to the feast and grabs their bag',
      'stays away from the feast',
      'camps near the feast location',
      'watches the feast from afar',
      'sets up an ambush near the feast',
      'arrives too late to the feast',
      'sprints away with the largest bag',
      'triggers a trap near the feast table',
      'finds medical supplies in their feast bag',
      'discovers weapons in their feast bag'
    ],
    twoPerson: {
      0: {
        intercepts: {
          text: ' before they reach their feast bag.',
          effect: { target: 'death', actor: 'normal' }
        },
        fights: {
          text: ' for the same feast bag, winning fatally.',
          effect: { target: 'death', actor: 'normal' }
        },
        wounds: {
          text: ' while they grab their bag.',
          effect: { target: 'injured', actor: 'normal' }
        },
        chases: {
          text: ' away from the feast empty-handed.',
          effect: { target: 'normal', actor: 'normal' }
        }
      },
      1: {
        betrays: {
          text: ' at the feast after promising an alliance.',
          effect: { target: 'death', actor: 'normal' }
        },
        steals: {
          text: "'s feast bag and escapes.",
          effect: { target: 'normal', actor: 'normal' }
        },
        shares: {
          text: "'s supplies from the feast.",
          effect: { target: 'normal', actor: 'normal' }
        },
        distracts: {
          text: ' while others raid the feast.',
          effect: { target: 'normal', actor: 'normal' }
        }
      }
    },
    multiPerson: {
      0: {
        battle: {
          text: 'engage in a massive fight at the feast. {winner} takes everything.',
          effect: { winner: 'normal', others: 'death' }
        },
        divide: {
          text: 'agree to divide the feast supplies equally.',
          effect: { others: 'normal' }
        },
        ambush: {
          text: 'set up an ambush for {target} at the feast.',
          effect: { target: 'death', others: 'normal' }
        },
        flee: {
          text: 'grab what they can and flee from the bloodbath.',
          effect: { others: 'normal' }
        }
      },
      1: {
        fight: {
          text: 'fight over the feast supplies. {winner} emerges victorious.',
          effect: { winner: 'normal', others: 'death' }
        },
        alliance: {
          text: 'form a temporary alliance to control the feast.',
          effect: { others: 'normal' }
        },
        sacrifice: {
          text: 'sacrifice {target} to secure their supplies.',
          effect: { target: 'death', others: 'normal' }
        },
        share: {
          text: 'share the supplies and go their separate ways.',
          effect: { others: 'normal' }
        }
      }
    }
  },

  'Arena Event': {
    singlePerson: [
      'outruns the forest fire',
      'climbs a tree to escape the flood',
      'finds shelter from the acid rain',
      'gets caught in the earthquake',
      'survives the avalanche',
      'escapes the poisonous fog',
      'hides from the mutant wolves',
      'swims to escape the tsunami',
      'takes cover from the lightning storm',
      'navigates through the darkness'
    ],
    twoPerson: {
      0: {
        pushes: {
          text: ' into the disaster zone.',
          effect: { target: 'death', actor: 'normal' }
        },
        saves: {
          text: ' from the natural disaster.',
          effect: { target: 'normal', actor: 'normal' }
        },
        abandons: {
          text: ' to the approaching danger.',
          effect: { target: 'death', actor: 'normal' }
        },
        warns: {
          text: ' about the incoming threat.',
          effect: { target: 'normal', actor: 'normal' }
        }
      },
      1: {
        sacrifices: {
          text: ' to escape the danger.',
          effect: { target: 'death', actor: 'normal' }
        },
        helps: {
          text: ' survive the arena event.',
          effect: { target: 'normal', actor: 'normal' }
        },
        leaves: {
          text: ' trapped in the disaster.',
          effect: { target: 'death', actor: 'normal' }
        },
        guides: {
          text: ' to safety through the chaos.',
          effect: { target: 'normal', actor: 'normal' }
        }
      }
    },
    multiPerson: {
      0: {
        escape: {
          text: 'work together to escape the arena event.',
          effect: { others: 'normal' }
        },
        panic: {
          text: 'panic and scatter as the disaster strikes.',
          effect: { others: 'injured' }
        },
        protect: {
          text: 'protect each other from the danger.',
          effect: { others: 'normal' }
        },
        survive: {
          text: 'barely survive the catastrophic event.',
          effect: { others: 'injured' }
        }
      },
      1: {
        chaos: {
          text: 'get caught in the chaos. Only {winner} makes it out.',
          effect: { winner: 'normal', others: 'death' }
        },
        sacrifice: {
          text: 'sacrifice {target} to appease the gamemakers.',
          effect: { target: 'death', others: 'normal' }
        },
        fight: {
          text: 'fight over limited shelter. {winner} claims it.',
          effect: { winner: 'normal', others: 'death' }
        },
        cooperate: {
          text: 'work together to survive the arena event.',
          effect: { others: 'injured' }
        }
      }
    }
  }
};

