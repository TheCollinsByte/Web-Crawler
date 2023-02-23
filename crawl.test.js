const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

// Top-level Test Function (Test Suite's)
test('normalizedURL strip protocol', () => {
    const input = 'https://kwawingu.com/learn';
    const actual = normalizeURL(input);
    const expected = 'kwawingu.com/learn';
    expect(actual).toEqual(expected);
})

test('normalizedURL strip trailing slash', () => {
    const input = 'https://kwawingu.com/learn/';
    const actual = normalizeURL(input);
    const expected = 'kwawingu.com/learn';
    expect(actual).toEqual(expected);
})

/**
 * No, need of the changes to the actuall code implementation or any logic to change the URL to lower casing the string
 *  This is because the URL() constructor is actually doing for us because it know that the URL a case in-sensitive
 */
test('normalizedURL Capitals', () => {
    const input = 'https://KWAWINGU.com/learn/';  /** Capitals in URL should be case in-sensitive */
    const actual = normalizeURL(input);
    const expected = 'kwawingu.com/learn';
    expect(actual).toEqual(expected);
})

test('normalizedURL strip http', () => {
    const input = 'http://kwawingu.com/learn/';
    const actual = normalizeURL(input);
    const expected = 'kwawingu.com/learn';
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML absolute URLs', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://kwawingu.com/"> 
                KwaWingu
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://kwawingu.com/";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://kwawingu.com/"]
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative URLs', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/learn/"> 
                KwaWingu
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://kwawingu.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://kwawingu.com/learn/"]
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative URLs', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/vps/"> 
                KwaWingu Documentation
            </a>
            <a href="https://kwawingu.com/learn/"> 
                KwaWingu
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://kwawingu.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://kwawingu.com/vps/", "https://kwawingu.com/learn/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid"> 
                Invalid URL
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://kwawingu.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = []
    expect(actual).toEqual(expected);
})