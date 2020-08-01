
const iconv = require('iconv-lite');
class LinkService{
	#instance
	static getInstance(){
		let newInstance
		try {
			if (this.instance===undefined){
				this.instance = new LinkService()
				//console.log(JSON.stringify(this.instance.getLinks('ferðast þýða ad')))
			}
		} catch (error) {
			throw error
		}
		return this.instance
	}
	constructor(){
	}
	
	getLinks = (word,languageCodes) => {
		const encodeURI = (str, encoding) => {
			if (!encoding || encoding == 'utf8' || encoding == 'utf-8') {
				return encodeURIComponent(str);
			}

			let buf = iconv.encode(str, encoding);
			let encoded = [];
			for (let pair of buf.entries()) {
				let value = pair[1]
				// Test if value is unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~" https://tools.ietf.org/html/rfc3986#section-2.3
				if ((value >= 65 && value <= 90) || // A-Z 
					(value >= 97 && value <= 122) || // a-z
					(value >= 48 && value <= 57) || // 0-9
					value == 45 || value == 46 ||  // "-" / "."
					value == 95 || value == 126   // "_" / "~"      
				) {
					encoded.push(String.fromCharCode(value))
				} else {
					let hex = value.toString(16).toUpperCase()
					encoded.push("%" + (hex.length === 1 ? '0' + hex : hex))
				}
			}
			return encoded.join("");
		}
		word = word.trim()
		const firstNWordVariations = (str, func) => {
			let pages = []
			str.split(/\s+/).forEach((e,i,arr)=>{
				//console.log(func(arr.slice(0,i+1).join(' ')))
				pages.push(func(arr.slice(0,i+1).join(' ')))
			})
			
			return pages
		}
		//TODO  dinamikussá tenni
		languageCodes = ['de']
		let data = {
			'de':[
				{
					siteName: 'Duden',
					siteMainPage: 'https://www.duden.de',
					pageGroups: [
						{
							groupMainPage: 'https://www.duden.de',
							title: 'Keresés',
							pages: [
								...firstNWordVariations( word ,inp => ({
									title: 'Keresés(' +inp + ')',
									url: 'https://www.duden.de/suchen/dudenonline/'+inp,
								})),
							],
						},
					],
				},
				{
					siteName: 'Wiktionary',
					siteMainPage: 'https://wiktionary.org',
					pageGroups: [
						{
							groupMainPage: 'https://en.wiktionary.org/wiki/',
							title: 'Lehetséges adatlapok (angol)',
							pages: [
								...firstNWordVariations( word ,inp => ({
									title: inp,
									url: 'https://en.wiktionary.org/wiki/'+inp+'#Icelandic',
								})),
							],
						},
					],
				},
			],
			'ice':[
			// opcionális: egyedi aszinkron függvények találatokhoz, találatok megjelenítése tömbben
				{
					siteName: 'Íslensk nútímamálsorðabók',
					siteMainPage: 'https://islenskordabok.arnastofnun.is',
					pageGroups: [
						{
							groupMainPage: 'https://islenskordabok.arnastofnun.is',
							title: 'Keresés',
							pages: [
								...firstNWordVariations( word ,inp => ({
									title: 'Keresés(' +inp + ')',
									url: 'https://islenskordabok.arnastofnun.is/leit/'+inp,
								})),
							],
						},
					],
				},
				{
					siteName: 'Wiktionary',
					siteMainPage: 'https://wiktionary.org',
					pageGroups: [
						{
							groupMainPage: 'https://en.wiktionary.org/wiki/',
							title: 'Lehetséges adatlapok (angol)',
							pages: [
								...firstNWordVariations( word ,inp => ({
									title: inp,
									url: 'https://en.wiktionary.org/wiki/'+inp+'#Icelandic',
								})),
							],
						},
						{
							groupMainPage: 'https://de.wiktionary.org/wiki/',
							title: 'Lehetséges adatlapok (német)',
							pages: [
								...firstNWordVariations( word ,inp => ({
									title: inp,
									url: 'https://de.wiktionary.org/wiki/'+inp+'#'+inp+'_(Isländisch)',
								})),
							],
						},
					],
				},
				{
					siteName: 'University of Wisconsin - Icelandic Online',
					siteMainPage: 'http://digicoll.library.wisc.edu/cgi-bin/IcelOnline/IcelOnline.TEId-idx',
					pageGroups: [
						{	
							groupMainPage: 'http://digicoll.library.wisc.edu/cgi-bin/IcelOnline/IcelOnline.TEId-idx',
							title: 'Keresés',
							pages: [
								...firstNWordVariations( word ,inp => ({
									title: 'Keresés(' +inp + ')',
									url: 'http://digicoll.library.wisc.edu/cgi-bin/IcelOnline/IcelOnline.TEId-idx?type=simple&size=First+100&rgn=lemma&q1='+encodeURI(inp, 'iso-8859-1')+'&submit=Search',
								})),
							],
						},
					],
				},
			]
		}
		let result = {}
		languageCodes.forEach(e=> result[e]=data[e])
		return result;
		
	}
}
module.exports = LinkService