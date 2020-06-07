export type CloseDrawerAction = {
  type: string
}

export type OpenDrawerAction = {
  type: string
}

export type PageActionTypes = CloseDrawerAction | OpenDrawerAction

export type PageDrawerState = {
  isOpen: boolean
}

export type PageState = {
  drawer: PageDrawerState
}
