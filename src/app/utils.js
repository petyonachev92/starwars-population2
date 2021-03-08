/**
 * Here you can define helper functions to use across your app.
 */

export default async function delay(n, fn) {
    setTimeout(fn, n * 1000)
}