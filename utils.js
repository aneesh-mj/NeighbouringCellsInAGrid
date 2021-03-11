const randomBinaryGenerator = () => {
    return Math.random() < 0.5 ? 0 : 1
}

const generateRandomArray = size => {
    return Array.from(Array(size), () => randomBinaryGenerator());
}

const randomMultiArray = size => {
    return Array.from(Array(size), () => generateRandomArray(size));
}