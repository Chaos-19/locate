const numString: { [key: number | string]: number } = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 18,
    J: 19,
    K: 20,
    L: 21,
    M: 22,
    N: 23,
    O: 24,
    P: 25,
    Q: 26,
    R: 27,
    S: 28,
    T: 29,
    U: 30,
    V: 31,
    W: 32,
    X: 33,
    Y: 34,
    Z: 35,
    a: 36,
    b: 37,
    d: 38,
    e: 39,
    f: 40,
    g: 41,
    h: 42,
    i: 43,
    j: 44,
    k: 45,
    l: 46,
    m: 47,
    n: 48,
    q: 49,
    r: 50,
    t: 51,
    v: 52,
    w: 53,
    x: 54,
    y: 55,
    "#": 56,
    "*": 57,
    "!": 58,
    $: 59
}

export const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9!$*#]+$"



export const getNumValue = (num: number | string) => {
    return numString[num]
}

export const getByValue = (num: number | string) => {
    return Object.keys(numString).find(key => numString[key] === num)
}
export const isKeyExist = (num: number | string) => {
    return numString[num] !== undefined
}