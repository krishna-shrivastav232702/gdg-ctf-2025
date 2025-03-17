export const FLAG = "Congratulations_you_found_the_secret_flag";

export const xorEncrypt = (plainText: string, key: string) => {
    const result = Buffer.from(plainText.split('').map((char, i) =>
        char.charCodeAt(0) ^ key.charCodeAt(i % key.length)
    ));
    return result.toString('hex');
}


export const generateChallengeForUser = (username: string) => {
    return xorEncrypt(FLAG, username);
}

export const validateSolution = (submittedFlag: string) => {
    return submittedFlag === FLAG;
}