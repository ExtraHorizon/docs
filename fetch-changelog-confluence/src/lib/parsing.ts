import { NodeHtmlMarkdown } from 'node-html-markdown'

/**
 * Function extracts the interesting data from the 
 * @param body raw confluence body html
 */
export function extractReleaseData(body:string){

  // Extract release notes 
  const notesRegex = /<tr><th><p><strong>Release Notes<\/strong><\/p><\/th><td>(.*?)<\/td>/i

  const releaseNotes = body.match(notesRegex)

  const releaseDateRegex = /<tr><th><p><strong>Release Date:<\/strong><\/p>.*?datetime="(.*)".*<\/tr>/i

  const releaseDate = body.match(releaseDateRegex);


  return {
    date: releaseDate? releaseDate[1] : null,
    notes: releaseNotes? releaseNotes[1] : null,
    notesMarkdown: releaseNotes? NodeHtmlMarkdown.translate(releaseNotes[1]): null

  }

}