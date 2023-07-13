interface PropTypes {
  item: object;
}
export const Item = ({ item }: PropTypes) => {
  return (
    <div>
      <li>{item.name}</li>
    </div>
  );
};
