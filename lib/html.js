import sanitizeHtml from 'sanitize-html';
export function cleanHtml(html='') {
 return sanitizeHtml(html, {allowedTags:['p','br','strong','b','em','i','u','h2','h3','h4','ul','ol','li','blockquote','a'],allowedAttributes:{a:['href','title','target','rel']},allowedSchemes:['http','https','mailto','tel'],transformTags:{a:sanitizeHtml.simpleTransform('a',{rel:'noopener noreferrer'})}});
}
