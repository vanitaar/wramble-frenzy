// Define an array of topics, each with its own word list and hints
// words all in lowercase
export const topics = [
    {
      topicName: 'In the sky and beyond',
      wordsAndHints: {
        aeroplane: 'mode of transportation',
        satellite: 'orbiting object for survelleince/communication',
        eagle: 'flying animal with sharp eyesight',
        clouds: 'found floating in the sky, sometimes dark',
        asteroids: 'rocky objects smaller than planets',
        rocket: 'space vehicle',
        vulture: 'scavenger that flies',
        astronaut: 'gets paid to work in space',
        constellation: 'group of stars',
        lightning: 'electrical discharge in the atmosphere'

      }
    },
    {
      topicName: 'Sink, swim or float',
      wordsAndHints: {
        titanic: 'famous ship that sank, more than a century ago, after hitting an iceberg',
        submarine: 'watercraft designed to operate underwater',
        corals: 'these form reefs',
        glacier: 'large mass of ice',
        cruise: 'ship used for pleasure or vacation',
        yacht: 'luxurious sailing vessel',
        dolphin: 'marine mammal',
        shipwreck: 'remains of a sunken ship',
        lifeboat: 'for emegencies',
        driftwood: 'floating wooden debris/logs'
      }
    },

    {
      topicName: "What's that smell?",
      wordsAndHints: {
        popcorn: 'usually enjoyed while watching movies',
        candle: 'provides illumination and a pleasant scent for ambience',
        vinegar: 'used in cooking or cleaning, has a sharp and acidic smell',
        cologne: 'typically applied on body/clothes',
        coffee: 'beverage made from beans',
        chocolate: 'an indulgent treat, comes in a variety: e.g. milk/dark',
        leather: 'material used in luxury goods',
        flowers: 'the bloom of plants',
        durian: 'known as the king of fruits, has a spiky outer layer',
        barbecue: 'cooking method that imparts a smoky and savory aroma to foods'
      }
    }

    // Add more topics+words+hints as needed
  ];
  

  // // Randomly select a topic from the array
  // const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  
  // // Get an array of words from the selected topic
  // const wordsArray = Object.keys(randomTopic.wordsAndHints);
  
  // // Randomly select a word from the selected topic
  // const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  
  // // Get the hint for the selected word
  // const randomHint = randomTopic.wordsAndHints[randomWord];
  
  // // Display the selected topic, word, and hint
  // console.log('Topic:', randomTopic.topicName);
  // console.log('Word:', randomWord);
  // console.log('Hint:', randomHint);
  