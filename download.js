const fs = require('fs');
const path = require('path');

// consulte os nomes com:
// const alola = Array.prototype.slice.call(document.querySelectorAll(".infocard-list-pkmn-sm")[6].children)
//        .map((img) => img.children[0].children[1].alt.toLowerCase())
// em https://pokemondb.net/sprites
const alola_forms = [
    "raichu-alola",
    "rattata-alola", "raticate-alola",
    "marowak-alola",
    "sandshrew-alola", "sandslash-alola",
    "vulpix-alola", "ninetales-alola",
    "diglett-alola", "dugtrio-alola",
    "meowth-alola", "persian-alola",
    "geodude-alola", "graveler-alola", "golem-alola",
    "grimer-alola", "muk-alola",
    "exeggutor-alola",
];

const alola_dex = [
    "rowlet", "dartrix", "decidueye",
    "litten", "torracat", "incineroar",
    "popplio", "brionne", "primarina",
    "pikipek", "trumbeak", "toucannon",
    "yungoos", "gumshoos",
    "grubbin", "charjabug", "vikavolt",
    "crabrawler", "crabominable",
    "oricorio",
    "cutiefly", "ribombee",
    "rockruff", "lycanroc",
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
    "type-null", "silvally",
    "minior",
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
    "minior-blue",
    "minior-blue-gen7",
    "minior-green",
    "minior-green-gen7",
    "minior-indigo",
    "minior-indigo-gen7",
    "minior-orange",
    "minior-orange-gen7",
    "minior-red",
    "minior-red-gen7",
    "minior-violet",
    "minior-violet-gen7",
    "minior-yellow",
    "minior-yellow-gen7",
    "necrozma-dawn",
    "necrozma-dusk",
    "necrozma-ultra",
    "magearna-original",
    "marshadow-gen7",
];

// ícones do HOME
const icons = alola_forms.map((pokemon) => `https://img.pokemondb.net/sprites/home/normal/${pokemon}n.png`)
    .concat(alola_dex.map((pokemon) => `https://img.pokemondb.net/sprites/home/normal/${pokemon}.png`));

// pokesprite chama o wishiwashi-solo de wishiwashi
alola_dex.splice(alola_dex.indexOf("wishiwashi-solo"), 1);
alola_dex.push("wishiwashi");
const box = alola_forms.map((pokemon) => `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${pokemon}.png`)
    .concat(alola_dex.map((pokemon) => `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${pokemon}.png`));

const alts = alternatives.map((pokemon) => `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${pokemon}.png`)

async function baixarImagem(url, i, dir) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(`Erro $resposta.status}: ${url}`);
    }

    const buffer = Buffer.from(await resposta.arrayBuffer());

    const nome = path.basename(new URL(url).pathname);

    fs.writeFileSync(
        path.join(dir, nome),
        buffer
    );

    console.log(`Baixado: ${nome}`);
}

async function main() {
    const icons_dir = "sprites/icons"
    fs.mkdirSync(icons_dir, { recursive: true });
    for (let i in icons) {
        await baixarImagem(icons[i], i, icons_dir);
    }

    const box_dir = "sprites/box"
    fs.mkdirSync(box_dir, { recursive: true });
    for (let i in box) {
        await baixarImagem(box[i], i, box_dir);
    }

    const alt_dir = "sprites/alt"
    fs.mkdirSync(alt_dir, { recursive: true });
    for (let i in alts) {
        await baixarImagem(alts[i], i, alt_dir);
    }
}

main();
