import { observer } from "mobx-react-lite";

import React from "react";


import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";

const CheckboxMenu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      "aria-labelledby": labeledBy,
      onSelectAll,
      onSelectNone
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`${className} CheckboxMenu`}
        aria-labelledby={labeledBy}
      >
        <div
          className="d-flex flex-column"
          style={{ maxHeight: "calc(100vh)", overflow: "none" }}
        >
          <ul
            className="list-unstyled flex-shrink mb-0"
            style={{ overflow: "auto" }}
          >
            {children}
          </ul>
          <div className="dropdown-item border-top pt-2 pb-0">
            <ButtonGroup size="sm">
              <Button variant="link" onClick={onSelectAll}>
                Select All
              </Button>
              <Button variant="link" onClick={onSelectNone}>
                Select None
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
);

const CheckDropdownItem = React.forwardRef(
  ({ children, id, checked, onChange }, ref) => {
    return (
      <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
        <Form.Check
          type="checkbox"
          label={children}
          checked={checked} ONKO DEFAULT CHECKED VAI EI
          onChange={onChange && onChange.bind(onChange, id)}
        />
      </Form.Group>
    );
  }
);
//name="Level" values={level_list} img={imageLevel} className="app-dropdown"
export const CheckboxDropdown = observer(({ name, items, img }) => {
  const handleChecked = (key, event) => {
    items.find(i => i.id === key).checked = event.target.checked;
  };

  const handleSelectAll = () => {
    items.forEach(i => (i.checked = true));
  };

  const handleSelectNone = () => {
    items.forEach(i => (i.checked = false));
  };

  return (
    <Dropdown>
      <div className="image">
          <img src={img} alt="Image" />
        </div>

      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        <option value="" selected>{name}</option>
      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CheckboxMenu}
        onSelectAll={handleSelectAll}
        onSelectNone={handleSelectNone}
      >
            

            {items.map((value, index) => (
          <Dropdown.Item
            key={index}
            as={CheckDropdownItem}
            //id={i.id}
            checked={index.checked}
            onChange={handleChecked}
          >
            {value}
          </Dropdown.Item>


        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export {CheckboxMenu, CheckDropdownItem}