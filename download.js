const fs = require('fs');
const path = require('path');

// consulte os nomes com:
// const alolan = Array.prototype.slice.call(document.querySelectorAll(".infocard-list-pkmn-sm")[6].children)
//        .map((img) => img.children[0].children[1].alt.toLowerCase())
// em https://pokemondb.net/sprites
const alolan_forms = [
    "raichu-alolan",
    "rattata-alolan", "raticate-alolan",
    "marowak-alolan",
    "sandshrew-alolan", "sandslash-alolan",
    "vulpix-alolan", "ninetales-alolan",
    "diglett-alolan", "dugtrio-alolan",
    "meowth-alolan", "persian-alolan",
    "geodude-alolan", "graveler-alolan", "golem-alolan",
    "grimer-alolan", "muk-alolan",
    "exeggutor-alolan",
];

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
    "minior-meteor",
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
    "poipole", "naganadel",
    "stakataka",
    "blacephalon",
    "zeraora",
    "meltan", "melmetal",
];

// formas alternativas dos pokemon de Alola
alternatives = [
    "oricorio-pau", "oricorio-pom-pom", "oricorio-sensu",
    "lycanroc-dusk", "lycanroc-midnight",
    "wishiwashi-school",
    "silvally-bug", "silvally-dark", "silvally-dragon", "silvally-electric", "silvally-fairy", "silvally-fighting", "silvally-fire", "silvally-flying", "silvally-ghost", "silvally-grass", "silvally-ground", "silvally-ice", "silvally-poison", "silvally-psychic", "silvally-rock", "silvally-steel", "silvally-water",
    "minior-blue", "minior-green", "minior-indigo", "minior-orange", "minior-red", "minior-violet", "minior-yellow",
    "necrozma-dawn", "necrozma-dusk", "necrozma-ultra",
    "magearna-original",
];

// ícones do HOME
const icons = alolan_dex.map((pokemon) => `https://img.pokemondb.net/sprites/home/normal/${pokemon}.png`)
    .concat(alolan_forms.map((pokemon) => `https://img.pokemondb.net/sprites/home/normal/${pokemon}.png`));

// ícones do global link
alolan_dex.splice(alolan_dex.indexOf("meltan"), 1);
alolan_dex.splice(alolan_dex.indexOf("melmetal"), 1);
const vector = alolan_dex.map((pokemon) => `https://img.pokemondb.net/artwork/vector/${pokemon}.png`)
    .concat(alolan_forms.map((pokemon) => `https://img.pokemondb.net/artwork/vector/${pokemon}.png`));

shuffle = []
for (let i = 722; i <= 802; i++) {
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
        await baixarImagem(icons[i], i, icons_dir);
    }

    /*
    const box_dir = "sprites/box";
    fs.mkdirSync(box_dir, { recursive: true });
    for (let i in box) {
        await baixarImagem(box[i], i, box_dir);
    }

    const alt_dir = "sprites/alt";
    fs.mkdirSync(alt_dir, { recursive: true });
    for (let i in alts) {
        await baixarImagem(alts[i], i, alt_dir);
    }
    */

    const vector_dir = "sprites/vector";
    fs.mkdirSync(vector_dir, { recursive: true });
    for (let i in vector) {
        await baixarImagem(vector[i], i, vector_dir);
    }
    const shuffle_dir = "sprites/shuffle";
    fs.mkdirSync(shuffle_dir, { recursive: true });
    for (let i in shuffle) {
        await baixarImagem(shuffle[i], '', shuffle_dir);
    }
}

main();
