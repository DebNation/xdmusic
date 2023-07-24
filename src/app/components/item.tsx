interface PropTypes {
  item: object;
}
export const Item = ({ item, key }: PropTypes) => {
  return (
    <div className="bg-gray-800 p-2 m-4 rounded-md">
      <li>{item.name}</li>
    </div>
  );
};
