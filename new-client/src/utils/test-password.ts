const atLeastMinimumLength = (password: string) => new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password: string) => new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password: string) => new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password: string) => new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password: string) => new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

export function testPasswordStrenght(password?: string): number {
    if(!password) return 0
    let points = 0
    if (atLeastMinimumLength(password)) points += 1
    if (atLeastOneUppercaseLetter(password)) points += 1
    if (atLeastOneLowercaseLetter(password)) points += 1
    if (atLeastOneNumber(password)) points += 1
    if (atLeastOneSpecialChar(password)) points += 1
    return points
}

export function validatePassword(password: string): boolean {
    return (testPasswordStrenght(password) > 3)
}