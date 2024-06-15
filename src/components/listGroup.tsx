import { MouseEvent, useState } from "react";

interface Props {
	items: string[];
	heading: string;
}

function ListGroup({ items, heading }: Props) {
//   let selected_index = 0;
  const [selectedIndex, setselectedIndex] = useState(-1);
  
  const handleClick = (event: MouseEvent) => {
    console.log(event);
  };

  

  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.length === 0 && <p>No items found</p>}
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === (index)
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => setselectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
