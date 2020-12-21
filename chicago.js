export const oxford = (arr, conjunction, ifempty) => {
    const l = arr.length;
    if (!l) return ifempty;
    if (l<2) return arr[0];
    if (l<3) return arr.join(` ${conjunction} `);
    arr = arr.slice();
    arr[l-1] = `${conjunction} ${arr[l-1]}`;
    return arr.join(", ");
}

export const nameLastFirst = name =>`${name.last}, ${name.first}`
	
export const nameFirstLast = name =>`${name.first} ${name.last}`

export const humaniseArray = (arr) => oxford(arr, "and", "")

export const names = arr => {
    const l = arr.length
    if (!l) return
	let flat = [nameLastFirst(arr[0])]
	if (l>1) flat = flat.concat(arr.slice(1).map(name=>nameFirstLast(name)))
	return humaniseArray(flat)
}