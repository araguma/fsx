function stringToRegex(string: string) {
    // Matches the pattern in the first group and flags in the third group
    const groups = string.match(/^\/(.*)\/(?!.*(.).*\2)([gmiyuvsd]*)$/m);
    if(groups === null)
        throw new Error(`Invalid regex: ${string}`);
    return new RegExp(groups[1], groups[3]);
}

export {
    stringToRegex,
}