const papa = require('papaparse')
const fs = require('fs');
const LinkService = require('./link.service')

class WordService{
	#instance
	static getInstance(){
		let newInstance
		try {
			if (this.instance===undefined){
				this.instance = new WordService()
			}
		} catch (error) {
			throw error
		}
		return this.instance
	}
	
	#data
	
	
	#linkService
	
	// protected
	clone = (obj) => JSON.parse(JSON.stringify(obj))
	
	// should be private, use factory method instead
	constructor(){
		this.linkService = LinkService.getInstance()
		let rawData 
		papa.parse(fs.readFileSync('test_input.csv', { encoding: 'utf-8' }), {
			header:true,
			skipEmptyLines:true,
			complete: results => {rawData = results},
		})
		rawData.data.forEach((e,i,arr)=> {
			//TODO language code
			e.generatedSiteReferences = e.original_site_reference_optimized!==undefined && e.original_site_reference_optimized.trim()!==''  ? 
				this.linkService.getLinks(e.original_site_reference_optimized,undefined):
				this.linkService.getLinks(e.original,undefined)
			e.hungarianJson = WordService.parseMeaningsColumnInCsv(e.hungarian)
			e.prevId = arr[i-1]!==undefined?i-1:undefined
			e.nextId = arr[i+1]!==undefined?i+1:undefined
		})
		this.data = rawData.data
	}
	
	static parseMeaningsColumnInCsv = (meaningsColumnEntryInCsv) => {
		const ESCAPE_CHARACTER = '\\'
		
		const COMMENT_DELIMITER = ';'
		
		// lvl 3 = meaning group
		const MEANING_GROUP_DELIMITER = ';'
		const LVL3_COMMENT_OPENING = '['
		const LVL3_COMMENT_CLOSURE = ']'
		
		// lvl 2 = close meanings
		const CLOSE_MEANINGS_DELIMITER = ','
		const LVL2_COMMENT_OPENING = '{'
		const LVL2_COMMENT_CLOSURE = '}'
		
		// lvl 1 = almost identical meanings
		const ALMOST_IDENTICAL_MEANINGS_DELIMITER = '/'
		const LVL1_COMMENT_OPENING = '('
		const LVL1_COMMENT_CLOSURE = ')'
		
		const COMMENT_CHARACTERS = new Set([
			LVL1_COMMENT_OPENING,
			LVL1_COMMENT_CLOSURE,
			LVL2_COMMENT_OPENING,
			LVL2_COMMENT_CLOSURE,
			LVL3_COMMENT_OPENING,
			LVL3_COMMENT_CLOSURE,
		])
		
		const findEscapedPositions = (str, specialCharacters) => {
			specialCharacters = new Set(specialCharacters)
			specialCharacters.add(ESCAPE_CHARACTER)
			//console.log(specialCharacters)
			let positions = new Set();
			let previousCharacter
			if (str.length>0){
				previousCharacter = str[0]
			}
			for (let i = 1; i<str.length;++i){
				//console.log(str[i-1] === ESCAPE_CHARACTER)
				if (str[i-1] === ESCAPE_CHARACTER && specialCharacters.has(str[i])){
					[i-1,i].forEach(e => positions.add(e))
					//console.log(str[i-1])
					++i // dupla ugratás
				}
			}
			// ha az utolsó karakter ESCAPE_CHARACTER és az előtte álló nincs az eredményhalmazban, dobhatnánk hibát
			//console.log(positions)
			return positions
		}
		
		const splitStringWithoutScanningParenthesesContent = (str,delimiter) => {
			let escapedPositions = findEscapedPositions(str, new Set([delimiter,...COMMENT_CHARACTERS]))
			let isInsideLvl1Comment = false;
			let isInsideLvl2Comment = false;
			let resultArray = []
			let splittingPoints = []
			for(let i=0;i<str.length;++i){
				if (!escapedPositions.has(i)){
					if (isInsideLvl1Comment!==true && isInsideLvl2Comment!==true){
						if (str[i] === LVL1_COMMENT_OPENING) {
							isInsideLvl1Comment = true
						} else if (str[i] === LVL3_COMMENT_OPENING) {
							isInsideLvl2Comment = true
						} else if (str[i] === delimiter) {
							splittingPoints.push(i)
						}
						
					} else if (isInsideLvl1Comment===true && str[i] === LVL1_COMMENT_CLOSURE) {
						isInsideLvl1Comment=false
					} else if (isInsideLvl2Comment===true && str[i] === LVL3_COMMENT_CLOSURE) {
						isInsideLvl2Comment=false
					}
				}
			}
			splittingPoints = [-1 ,...splittingPoints,str.length]
			// starting with second element
			for(let i=1;i<splittingPoints.length;++i){
				resultArray.push(str.substring(splittingPoints[i-1]+1,splittingPoints[i]).trim().replace(new RegExp(delimiter+delimiter+'+',"g"), delimiter));
			}
			resultArray = resultArray.filter(e => e!=='')
			if (resultArray.length===0){
				resultArray=['']
			}
			return resultArray
		}
		
		const extractComments=(str,openingSymbol,closureSymbol,commentDelimiter,valueFieldName) => {
			let escapedPositions = findEscapedPositions(str, new Set([openingSymbol,closureSymbol,commentDelimiter]))
			let outsideSections = ['']
			let insideSections = ['']
			let isInsideComment = false;
			for(let i=0;i<str.length;++i){
				if (isInsideComment!==true){
					if(!escapedPositions.has(i) && str[i] === openingSymbol){ 
						isInsideComment = true
						insideSections.push('')
					}else{
						outsideSections[outsideSections.length-1]=outsideSections[outsideSections.length-1]+str[i]
					}
				} else if (isInsideComment===true) { 
					if (!escapedPositions.has(i) && str[i] === closureSymbol) {
						isInsideComment=false
						outsideSections.push('')
					} else {
						insideSections[insideSections.length-1]=insideSections[insideSections.length-1]+str[i]
					}
				}
			}
			insideSections = insideSections.map(e=>e.trim()).flatMap(e=> splitStringWithoutScanningParenthesesContent(e,commentDelimiter)).map(e => e.trim()).filter(e=> e!== '')
			outsideSections = outsideSections.map(e=>e.trim())
			let result = {
				comments:insideSections.filter(e=> e[e.length-1]!=='!'),
				tags:insideSections.filter(e=> e[e.length-1]==='!').map(e=> e.substring(0,e.length-1)),
			}
			result[valueFieldName] = outsideSections.join(' ')
			return result
		}
		
		
		// un-escape string
		const unesc = str => {
			let escapedPositions = findEscapedPositions(str, new Set([
				...COMMENT_CHARACTERS,
				COMMENT_DELIMITER,
				MEANING_GROUP_DELIMITER,
				CLOSE_MEANINGS_DELIMITER,
				ALMOST_IDENTICAL_MEANINGS_DELIMITER,
				ESCAPE_CHARACTER,
			]))
			escapedPositions = Array.from(escapedPositions)
			//escape characters are always the first from a pair
			//as we are deleting from string, we process it in backwards direction
			for (let i=escapedPositions.length-2; i>=0; i-=2){
				let pos = escapedPositions[i]
				str = str.substr(0, pos)+str.substring(pos+1);
			}
			return str
		}
		//console.log(meaningsColumnEntryInCsv)
		let meaningsResult = 
			splitStringWithoutScanningParenthesesContent(meaningsColumnEntryInCsv,MEANING_GROUP_DELIMITER).
			map(e => extractComments(e,LVL3_COMMENT_OPENING,LVL3_COMMENT_CLOSURE,COMMENT_DELIMITER,'lvl2'))
		meaningsResult.forEach(e=> {
			e.lvl2 = 
				splitStringWithoutScanningParenthesesContent(e.lvl2,CLOSE_MEANINGS_DELIMITER).
				map(e => extractComments(e,LVL2_COMMENT_OPENING,LVL2_COMMENT_CLOSURE,COMMENT_DELIMITER,'lvl1'))
		})
		meaningsResult.forEach(e2=> e2.lvl2.forEach(e=>{
			e.lvl1 = 
				splitStringWithoutScanningParenthesesContent(e.lvl1,ALMOST_IDENTICAL_MEANINGS_DELIMITER).
				map(e => extractComments(e,LVL1_COMMENT_OPENING,LVL1_COMMENT_CLOSURE,COMMENT_DELIMITER,'value'))
		}))
		meaningsResult.forEach(e3=> e3.lvl2.forEach(e2=> e2.lvl1.forEach(e=>{
			e.comments=e.comments.map(e=> unesc(e))
			e.tags=e.tags.map(e=> unesc(e))
			e.value=unesc(e.value)
		})))
		meaningsResult.forEach(e2=> e2.lvl2.forEach(e=>{
			e.comments=e.comments.map(e=> unesc(e))
			e.tags=e.tags.map(e=> unesc(e))
		}))
		meaningsResult.forEach(e=>{
			e.comments=e.comments.map(e=> unesc(e))
			e.tags=e.tags.map(e=> unesc(e))
		})
		
		return meaningsResult
	}

	get = id => this.data[id]
	
	getAll = () => this.data.map(e => ({id:e.id,original: e.original}))
}

module.exports=WordService