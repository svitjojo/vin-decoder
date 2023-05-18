import { FC } from "react";

// interface Props {
//   children: ,
//   items: string[]
// }

const List: FC = () => {
  return (
    <ul className="last-five-searched__list">
      {/* {lastSearched.map(item => (
        <li className="last-five-searched__item" key={item + Math.random()}>{item}</li>
      ))} */}
    </ul>
  );
};

export default List;
