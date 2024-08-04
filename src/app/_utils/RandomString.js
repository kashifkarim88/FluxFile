export const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let results = ''
    for (let i = 0; i <= 6; i++) {
        results += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return results
}