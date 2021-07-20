import { calcTotalPages } from 'utils/calcTotalPages'

test('it should return 1 if there are less than or equal 100 repos', () => {
	expect(calcTotalPages(0)).toEqual(1)
	expect(calcTotalPages(50)).toEqual(1)
	expect(calcTotalPages(100)).toEqual(1)
})

test('it should return more than 1 if there are more than 100 repos', () => {
	expect(calcTotalPages(101)).toEqual(2)
	expect(calcTotalPages(150)).toEqual(2)
	expect(calcTotalPages(375)).toEqual(4)
})
