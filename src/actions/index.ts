export const albumClickedAction = () => {
  return {
    type: "albumClicked",
  };
};

export const setSongUrlAction = (songUrl: string) => {
  return {
    type: "setSongUrl",
    payload: songUrl,
  };
};
