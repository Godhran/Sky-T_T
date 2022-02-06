import scss from '../styles/scss/style.scss';

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function hexToRgb(hex, a) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    const rgba = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: a
    }

    return `${rgba.r},${rgba.g},${rgba.b},${rgba.a}`
}

const returnGenreColour = (genre) => {
    switch(genre){
        case 'Kids' : return scss.lime;
        case 'Animation' : return scss.yellow;
        case 'Musical' : return scss.blue;
        case 'Comedy' : return scss.orange;
        case 'Action' : return scss.red;
        case 'Superhero' : return scss.purple;
    }
}

const capitaliseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
    rgbToHex,
    hexToRgb,
    returnGenreColour,
    capitaliseFirstLetter,
    toTitleCase
}
