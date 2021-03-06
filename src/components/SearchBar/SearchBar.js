import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import './SearchBar.css';

const SearchBar = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}>
        <FormControl
          autoFocus
          className="mx-3 my-2 searchBar"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value ||
              child.props.title.toLowerCase().includes(value) ||
              child.props.edits.some((edit) => edit.name.includes(value))
          )}
        </ul>
      </div>
    );
  }
);

export default SearchBar;
