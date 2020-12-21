import * as c from './chicago.js';
 
describe('humaniseArray', () => {
	it('humanises 1 item', () => {
		expect(c.humaniseArray(["a"])).toEqual("a")
	})
	it('humanises 2 items', () => {
		expect(c.humaniseArray(["a","b"])).toEqual("a and b")
	})
	it('humanises 3 items', () => {
		expect(c.humaniseArray(["a","b","c"])).toEqual("a, b, and c")
	})
	it('humanises 4 items', () => {
		expect(c.humaniseArray(["a","b","c","d"])).toEqual("a, b, c, and d")
	})
})

describe('name', () => {
	it('last, first', () => {
		expect(c.nameLastFirst({last: "Wittgenstein",first: "Ludwig"})).toEqual("Wittgenstein, Ludwig")
	})
	it('first, last', () => {
		expect(c.nameFirstLast({last: "Wittgenstein",first: "Ludwig"})).toEqual("Ludwig Wittgenstein")
	})
})

describe('names', () => {
	it('one name', () => {
		expect(c.names([{last: "Wittgenstein",first: "Ludwig"}])).toEqual("Wittgenstein, Ludwig")
	})
	it('two names', () => {
		expect(c.names(
			[
				{last: "Wittgenstein",first: "Ludwig"},
				{last: "Dodd", first:"Ken"}
			]
		)).toEqual("Wittgenstein, Ludwig and Ken Dodd")
	})
	it('four names', () => {
		expect(c.names(
			[
				{last: "Asheton",first: "Scott"},
				{last: "Asheton", first:"Ron"},
				{last: "Williamson", first:"James"},
				{last: "Pop", first:"Iggy"},
			]
		)).toEqual("Asheton, Scott, Ron Asheton, James Williamson, and Iggy Pop")
	})
})

const anonymousAuthor = {
	authors: [],
	title: "Beowulf"
}

const oneAuthor = {
	authors: [{last: "Acker", first: "Kathy"}],
	title: "Blood and Guts in High School"
}

const twoAuthors = {
	authors: [{last: "Deleuze", first: "Giles"},{last: "Guattari", first: "Félix"}],
	title: "Mille Plateaux"
}

const edited = {
	editors: [{last: "Joshi", first: "S.T."}],
	title: "The Call of Cthulhu and Other Weird Stories",
	authors: [{last: "Lovecraft", first:"H.P"}]
}

const editedOnly = {
	editors: [{last: "Tatar", first: "Maria"}],
	title: "The Cambridge Companion to Fairy Tales",
}

const editedOnlyTwo = {
	editors: [{last: "Heaney", first: "Seamus"},{last: "Hughes", first: "Ted"}],
	title: "The Rattle Bag"
}

describe('editors', () => {
	it('single editor', () => {
		expect(c.editors(editedOnly)).toEqual("Tatar, Maria, ed. ")
	})
	it('two editors', () => {
		expect(c.editors(editedOnlyTwo)).toEqual("Heaney, Seamus and Ted Hughes, eds. ")
	})
})

describe('authorship', () => {
	it('anonymous', () => {
		expect(c.authorship(anonymousAuthor)).toEqual("")
	})
	it('one author', () => {
		expect(c.authorship(oneAuthor)).toEqual("Acker, Kathy. ")
	})
	it('two authors', () => {
		expect(c.authorship(twoAuthors)).toEqual("Deleuze, Giles and Félix Guattari. ")
	})
	it('single editor', () => {
		expect(c.authorship(editedOnly)).toEqual("Tatar, Maria, ed. ")
	})
	it('two editors', () => {
		expect(c.authorship(editedOnlyTwo)).toEqual("Heaney, Seamus and Ted Hughes, eds. ")
	})
	it('edited', () => {
		expect(c.authorship(edited)).toEqual("Lovecraft, H.P. ")
	})
})