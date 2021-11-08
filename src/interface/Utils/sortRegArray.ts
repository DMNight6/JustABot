/**
 * 
 * @param match - RegExpMatchArray // Unfiltered Match
 * @returns {Array<string>} // Filtered Match
 */

export async function sortRegArray(match: RegExpMatchArray): Promise<Array<string>> {
    let filteredMatch: Array<string> = [];

    for ( let i = 0; i< match.length; i++) {
        if (typeof match[i] != 'undefined') filteredMatch.push(match[i])
    }

    return filteredMatch
}