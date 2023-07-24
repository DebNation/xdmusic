const setSongUrlReducer = (
  state = "https://aac.saavncdn.com/511/0b6fabc337a7418e905ec6223fe9be47_320.mp4",
  action: any
) => {
  switch (action.type) {
    case "setSongUrl":
      return action.payload;

    default:
      return state;
  }
};

export default setSongUrlReducer;
