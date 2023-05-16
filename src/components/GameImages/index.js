import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import OptionsOfGame from '../OptionsOfGame'
import './index.css'

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

class GameImages extends Component {
  state = {
    score: 0,
    gameStatus: gameStatusConstants.inProgress,
    userClick: '',
    gameClick: '',
  }

  onClickSetUserChoice = id => {
    this.setState(
      {userClick: id, gameClick: this.getGameChoice()},
      this.evaluateGame,
    )
  }

  onClickGoToGameView = () => {
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  getGameChoice = () => {
    const {choicesList} = this.props
    const gameChoicesList = choicesList.map(choice => choice.id)
    const randomIndex = Math.floor(Math.random() * 3)
    return gameChoicesList[randomIndex]
  }

  evaluateGame = () => {
    const {userClick, gameClick} = this.state

    if (userClick === gameClick) {
      this.setState({gameStatus: gameStatusConstants.draw})
    } else if (userClick === 'ROCK') {
      if (gameClick === 'SCISSORS') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userClick === 'PAPER') {
      if (gameClick === 'ROCK') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userClick === 'SCISSORS') {
      if (gameClick === 'PAPER') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    }
  }

  renderGameInProgressView = () => {
    const {choicesList} = this.props
    return (
      <ul>
        {choicesList.map(eachOption => (
          <OptionsOfGame
            key={eachOption.id}
            optionDetails={eachOption}
            onClickSetUserChoice={this.onClickSetUserChoice}
          />
        ))}
      </ul>
    )
  }

  renderGameWonView = () => {
    const {gameClick, userClick} = this.state
    const {choicesList} = this.props
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userClick,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameClick,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]

    return (
      <div className="container">
        <div>
          <h1 className="hading">YOU</h1>
          <img src={userChoiceObject.imageUrl} alt="your choice" />
        </div>
        <div>
          <h1>OPPONENT</h1>
          <img src={gameChoiceObject.imageUrl} alt="opponent choice" />
        </div>
        <div>
          <h1 className="heading">YOU WON</h1>
          <button type="button" onClick={this.onClickGoToGameView}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  renderGameLostView = () => {
    const {gameClick, userClick} = this.state
    const {choicesList} = this.props
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userClick,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameClick,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]

    return (
      <div className="container">
        <div>
          <h1 className="hading">YOU</h1>
          <img src={userChoiceObject.imageUrl} alt="your choice" />
        </div>
        <div>
          <h1>OPPONENT</h1>
          <img src={gameChoiceObject.imageUrl} alt="opponent choice" />
        </div>
        <div>
          <h1 className="heading">YOU LOSE</h1>
          <button type="button" onClick={this.onClickGoToGameView}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  renderGameDrawView = () => {
    const {gameClick, userClick} = this.state
    const {choicesList} = this.props
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userClick,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameClick,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]

    return (
      <div className="container">
        <div>
          <h1 className="hading">YOU</h1>
          <img src={userChoiceObject.imageUrl} alt="your choice" />
        </div>
        <div>
          <h1>OPPONENT</h1>
          <img src={gameChoiceObject.imageUrl} alt="opponent choice" />
        </div>
        <div>
          <h1 className="heading">IT IS DRAW</h1>
          <button type="button" onClick={this.onClickGoToGameView}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  renderGameView = () => {
    const {gameStatus} = this.state
    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return this.renderGameInProgressView()
      case gameStatusConstants.win:
        return this.renderGameWonView()
      case gameStatusConstants.lost:
        return this.renderGameLostView()
      case gameStatusConstants.draw:
        return this.renderGameDrawView()
      default:
        return null
    }
  }

  render() {
    const {score} = this.state

    return (
      <div className="images-cont d-flex flex-row justify-content-center">
        <div className="">
          <div className="cont d-flex  justify-content-center">
            <h1>
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </h1>
          </div>
          <div className="">
            <p className="score-para">Score</p>
            <p className="score">{score}</p>
          </div>
        </div>
        <div className="game">{this.renderGameView()}</div>
        <div className="popup">
          <Popup
            modal
            trigger={<button type="button">Rules</button>}
            closeOnEscape
            window
          >
            {close => (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />

                <button type="button" onClick={() => close()}>
                  <RiCloseLine />
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}
export default GameImages
