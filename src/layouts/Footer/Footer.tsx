import './Footer.scss'
import classNames from 'classnames'

function Footer(props) {
  const {
    className,
  } = props

  return (
    <div
      className={classNames(className, 'footer')}
    >
      Footer
    </div>
  )
}

export default Footer