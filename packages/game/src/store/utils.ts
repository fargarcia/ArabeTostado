import { PlayerActions, OponentActions } from "./player/playerReducer"
import { GameActions } from "./game/gameReducer"
import { Minion } from "models"

interface InitPlayerData {
    id: string
    deck: number[]
}

interface InitGameData {
    opener: number
    player: InitPlayerData
    oponent: InitPlayerData
}


export const selectEntity = (dispatch: any, id: number) => {
    dispatch(PlayerActions.selectEntity(id))
    dispatch(GameActions.selectEntity(id))
}
