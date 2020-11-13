import React from "react";

const FilterPosts = (props) => {
  const { searchTerm, setSearchTerm } = props;

  return (
    <input
      type="text"
      placeholder="Filter Posts"
      value={searchTerm}
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
    ></input>
  );
};

export default FilterPosts;
