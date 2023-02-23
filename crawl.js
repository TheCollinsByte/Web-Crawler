const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
    console.log(`Actively crawling: ${currentURL}`);

    try {
        /**
         * Fetch API is an experimental feature. (Experimental feature)
         *      This is because fetch was only available in the browser environment and 
         *      we a running javascript now the command-line using node
         * 
         */
        const resp = await fetch(currentURL);

        if(resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`);
            return 
        }

        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page ${currentURL}`)
            return
        }

        console.log(await resp.text());
    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
    }
}

/**
 * Purpose: Grab all of the URLs or links embeded within a HTML page
 * 
 * @param {*} htmlBody HTML of the page
 * @param {*} baseURL  The website URL that we a in the process of crawling
 * @returns An Array of Strings
 */
function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");

    
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative 
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`error with relative url: ${err.message}`);
            }
        } else {
            // absolute 
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`);
            }
        }
    }

    return urls
}

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
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}