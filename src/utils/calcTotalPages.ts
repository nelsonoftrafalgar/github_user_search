export const calcTotalPages = (totalRepos: number) => {
	if (totalRepos < 100) return 1
	return Math.ceil(totalRepos / 100)
}
