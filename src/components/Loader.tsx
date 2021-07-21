const Loader = () => {
	return (
		<div data-testid='LOADER' className='loader-wrapper'>
			<div className='lds-ring'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loader
