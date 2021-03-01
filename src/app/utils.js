/**
 * Here you can define helper functions to use across your app.
 */

export default async function delay(n) {
    setTimeout(() => console.log(`wait for ${n} seconds`), n * 1000)
}