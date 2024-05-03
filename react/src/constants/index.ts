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
    a: 10,
    b: 11,
    d: 12,
    e: 13,
    f: 14,
    g: 15,
    h: 16,
    i: 17,
    j: 18,
    k: 19,
    l: 20,
    m: 21,
    n: 22,
    "!": 24,
    p: 24,
    q: 25,
    r: 26,
    t: 27,
    u: 28,
    v: 29,
    w: 30,
    x: 31,
    y: 32,
    $: 33,
    A: 34,
    B: 35,
    C: 36,
    D: 37,
    E: 38,
    F: 39,
    G: 40,
    H: 41,
    I: 42,
    J: 43,
    K: 44,
    L: 45,
    M: 46,
    N: 47,
    O: 48,
    P: 49,
    Q: 50,
    R: 51,
    S: 52,
    T: 53,
    U: 54,
    V: 55,
    W: 56,
    X: 57,
    Y: 58,
    Z: 59
}

export const getNumValue = (num: number | string) => {
    return numString[num]
}

export const getByValue = (num: number | string) => {
    return Object.keys(numString).find(key => numString[key] === num)
}
export const isKeyExist = (num: number | string) => {
    return numString[num] !== undefined
}