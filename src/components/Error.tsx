import { dictionary } from 'dictionary/dictionary'

const { title, subtitle } = dictionary.error

const Error = () => {
	return (
		<div className='error'>
			<p>{title}</p>
			<p>{subtitle}</p>
		</div>
	)
}

export default Error
