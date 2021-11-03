const createDatasource = (nameOfFirstPerson, nameOfSecondPerson) => {
    return `${nameOfFirstPerson.toUpperCase()}LOVES${nameOfSecondPerson.toUpperCase()}`;
}

const getCharacterOccuranceCountInStr = (str, character) => {
    return [...str].filter(l => l === character).length;
}

const deleteCharacterOccuranceInArray = (str, character) => {
    return str.replaceAll(character, "");
}

const getCharacterOccuranceCountArray = (str, charCountArray) => {
    if (str.length === 0) return charCountArray;

    let charCount = getCharacterOccuranceCountInStr(str, str[0]);
    charCountArray.push(charCount);
    str = deleteCharacterOccuranceInArray(str, str[0]);
    return getCharacterOccuranceCountArray(str, charCountArray);
}

const singleLineCalculation = (charCountArray, newCharCountArray) => {
    if (charCountArray.length === 0) return newCharCountArray;

    let firstElement = charCountArray.shift();
    let lastElement = (charCountArray.length > 0) ? charCountArray.pop() : 0;
    let tempNewVal = firstElement + lastElement;
    if (tempNewVal >= 10) {
        let digit = tempNewVal.toString().split('');
        for (d of digit){
            newCharCountArray.push(parseInt(d));
        }
    } else {
        newCharCountArray.push(tempNewVal);
    }
    return singleLineCalculation(charCountArray, newCharCountArray);
}

const overallCalculation = (charCountArray) => {
    if (charCountArray.length <= 2) return charCountArray; 
    
    let newCharCountArray = []
        newCharCountArray = singleLineCalculation(charCountArray, newCharCountArray);
        charCountArray = [];
        charCountArray = [...newCharCountArray];
    return overallCalculation(charCountArray);
}

exports.loveComparisonCalculator = (nameOfFirstPerson, nameOfSecondPerson) => {
    let datasource = createDatasource(nameOfFirstPerson, nameOfSecondPerson);
    let charCountArray = [];
    charCountArray = getCharacterOccuranceCountArray(datasource, charCountArray);
    return parseInt(overallCalculation(charCountArray).join(''));
}
