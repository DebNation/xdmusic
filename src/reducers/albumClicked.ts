const albumClickedReducer = (state = false, action: any) => {
  switch (action.type) {
    case "albumClicked":
      return !state;
    default:
      return state;
  }
};

export default albumClickedReducer;
