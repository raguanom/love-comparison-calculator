exports.isCorruptStr = (str) => {
    return !str.match(/^[A-Za-z]+$/);
}