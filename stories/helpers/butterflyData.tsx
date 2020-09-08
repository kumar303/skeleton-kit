type DataSet = Record<string, string>;

export const data: DataSet[] = [
  // First set:
  {
    "Danaus plexipus": `
        Milkweed butterflies are the most common of this type of butterfly
        and is found in what's termed the Old and New World tropics. Two
        exceptions are the monarch butterfly (q.v.) and the queen butterfly.
        Both live in temperate regions.
    `,
    Heliconians: `
        This is mainly a tropical butterfly family and can be found in Old
        World and New World tropic regions.
    `,
    "Common skippers": `
        These small to medium butterflies are part of the Superfamily
        Hesperioidea and populate the world. However, they mostly congregate
        in the tropics. Out of 3,500 species, there are 275 in North
        America. Many of these are concentrated in Texas and Arizona.
    `,
  },
  // Second set:
  {
    "Snout butterflies": `
        These butterflies are found all over the world but there aren't
        many species within this family.
    `,
    "Gossamer-winged": `
        There are over 5,000 species of this small to medium sized
        butterfly. They have several names such as hairstreaks, coppers,
        harvesters, blues, and metal marks. Most prefer tropical habitats;
        however, 145 species can be found in the United States.
    `,
  },
  // Third set:
  {
    "Giant skippers": `
        This North American family of skipper butterflies is known for being
        strong-flying. They are typically considered a subfamily of
        Hesperiidae.
    `,
    "Brush-footed": `
        This butterfly family has around 6,000 species divided into 12
        subfamilies and 40 tribes and found throughout the world in most
        habitats.
    `,
    Swallowtails: `
        There are around 550 species with the majority being swallowtail.
        Most of these are found in tropical regions as well as other
        regionals around the world except Antarctica.
    `,
    Parnassians: `
        They are in the alpine or arctic group and found in America's Rocky
        Mountains and Alaska.
    `,
  },
];

export const names = data.reduce((all: string[], set: DataSet) => {
  // Flatten the keys of all sets into one array.
  return all.concat(Object.keys(set));
}, []);
