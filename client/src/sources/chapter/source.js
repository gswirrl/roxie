// CHAPTER

import {
	authorship,
	imprint,
	names
} from '../citation.js';

export const bibliography = (item,wrap=(x,opts)=>x) =>
	`${wrap(authorship(item,"bibliography"),{class:"author"})}${wrap(`“${item.title}.”`,{class:"title"})} In _${wrap(item.in.title,{class:"maintitle"})}_, ${names(item.in.editors).length>0 ? wrap(`edited by ${names(item.in.editors)},`,{class:"editor"}):""} ${wrap(item.location,{class:"location"})}.${wrap(imprint(item.in.imprint,"bibliography"),{class:"imprint"})}.`

export const note = (item) =>
`${authorship(item,"notes")}“${item.title},” in _${item.in.title}_, ${names(item.in.editors).length>0 ?`ed. ${names(item.in.editors)}`:""} ${imprint(item.in.imprint,"notes")}XX.`