/**
 * Normalized URL's
 *      We normalize different string to the same stings if they represent the same web page:
 *          eg: https://kwawingu.com,   ->  kwawingu.com
 *              http://kwawingu.com,    ->  kwawingu.com
 *              https://KWAWINGU.com    ->  kwawingu.com
 */
function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if (hostPath.length > 0 && (hostPath.slice(-1) === '/')) {
        return hostPath.slice(0, -1);
    }

    return hostPath;
}

module.exports = {
    normalizeURL
}