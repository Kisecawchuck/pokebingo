const fs = require('fs');
const path = require('path');

// consulte os nomes com:
// const alolan = Array.prototype.slice.call(document.querySelectorAll(".infocard-list-pkmn-sm")[6].children)
//        .map((img) => img.children[0].children[1].alt.toLowerCase())
// em https://pokemondb.net/sprites

const alolan_dex = [
    "rowlet", "dartrix", "decidueye",
    "litten", "torracat", "incineroar",
    "popplio", "brionne", "primarina",
    "pikipek", "trumbeak", "toucannon",
    "yungoos", "gumshoos",
    "grubbin", "charjabug", "vikavolt",
    "crabrawler", "crabominable",
    "oricorio-baile",
    "cutiefly", "ribombee",
    "rockruff", "lycanroc-midday",
    "wishiwashi-solo",
    "mareanie", "toxapex",
    "mudbray", "mudsdale",
    "dewpider", "araquanid",
    "fomantis", "lurantis",
    "morelull", "shiinotic",
    "salandit", "salazzle",
    "stufful", "bewear",
    "bounsweet", "steenee", "tsareena",
    "comfey",
    "oranguru", "passimian",
    "wimpod", "golisopod",
    "sandygast", "palossand",
    "pyukumuku",
    "type-null", "silvally-normal",
    "komala",
    "turtonator",
    "togedemaru",
    "mimikyu",
    "bruxish",
    "drampa",
    "dhelmise",
    "jangmo-o", "hakamo-o", "kommo-o",
    "tapu-koko",
    "tapu-lele",
    "tapu-bulu",
    "tapu-fini",
    "cosmog", "cosmoem", "solgaleo", "lunala",
    "nihilego",
    "buzzwole",
    "pheromosa",
    "xurkitree",
    "celesteela",
    "kartana",
    "guzzlord",
    "necrozma",
    "magearna",
    "marshadow",
];

// ícones do HOME
const icons = alolan_dex.map((pokemon) => `https://img.pokemondb.net/sprites/home/normal/${pokemon}.png`)

// ícones do global link
const vector = alolan_dex.map((pokemon) => `https://img.pokemondb.net/artwork/vector/${pokemon}.png`)

shuffle = []
for (let i = 722; i <= 802; i++) {
    // skipa o minior, não gostamos do minior
    if (i == 774) continue;

    shuffle.push(`https://www.pkparaiso.com/imagenes/shuffle/sprites/${i}.png`)
}

async function baixarImagem(url, i, dir) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: ${url}`);
    }

    const buffer = Buffer.from(await resposta.arrayBuffer());

    const nome = path.basename(new URL(url).pathname);

    fs.writeFileSync(
        path.join(dir, `${i}` + nome),
        buffer
    );

    console.log(`Baixado: ${nome}`);
}

async function main() {
    const icons_dir = "sprites/icons";
    fs.mkdirSync(icons_dir, { recursive: true });
    for (let i in icons) {
        await baixarImagem(icons[i], String(i).padStart(3, '0'), icons_dir);
    }

    const vector_dir = "sprites/vector";
    fs.mkdirSync(vector_dir, { recursive: true });
    for (let i in vector) {
        await baixarImagem(vector[i], String(i).padStart(3, '0'), vector_dir);
    }

    const shuffle_dir = "sprites/shuffle";
    fs.mkdirSync(shuffle_dir, { recursive: true });
    for (let i in shuffle) {
        await baixarImagem(shuffle[i], '', shuffle_dir);
    }
}

main();
