import { ReactComponent as ArrowIcon } from 'icons/arrow-right-icon.svg'
import { FC } from 'react'
import { ReactComponent as RepoIcon } from 'icons/repo-icon.svg'

interface IProps {
	href?: string
	text: string
	onClick?: () => void
}

const ListItem: FC<IProps> = ({ text, onClick, href }) => {
	if (href) {
		return (
			<li>
				<a className='list-item' href={href} target='_blank' rel='noreferrer noopener'>
					<RepoIcon className='list-item-repo-icon' />
					<span className='list-item-link-text'>{text}</span>
					<ArrowIcon className='list-item-arrow-icon' />
				</a>
			</li>
		)
	}

	return (
		<li>
			<button onClick={onClick} className='list-item'>
				<RepoIcon className='list-item-repo-icon' />
				<span className='list-item-button-text'>{text}</span>
				<ArrowIcon className='list-item-arrow-icon' />
			</button>
		</li>
	)
}

export default ListItem
