import './index.css'

const OptionsOfGame = props => {
  const {optionDetails, onClickSetUserChoice} = props
  const {imageUrl, id} = optionDetails

  const userClick = () => {
    onClickSetUserChoice(id)
  }
  return (
    <div className="container">
      <li className="items">
        <button
          className="button"
          type="button"
          onClick={userClick}
          data-testid={`${id.toLowerCase()}Button`}
        >
          <img className="button-img" src={imageUrl} alt={id} />
        </button>
      </li>
    </div>
  )
}
export default OptionsOfGame
