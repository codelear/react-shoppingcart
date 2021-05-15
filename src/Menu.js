import { Button, Col, Container, Row } from "react-bootstrap";
import classes from "./menu.module.css";
import { UseCartContext } from "./Cart";

function Menu() {
  const menu_items = [
    {
      item_id: 101,
      item_name: "Sushi",
      item_description: "Finest fish and veggies",
      item_price: 22.99,
      item_count: 1,
    },
    {
      item_id: 102,
      item_name: "Schnitzel",
      item_description: "A german specialty!",
      item_price: 16.5,
      item_count: 1,
    },
    {
      item_id: 103,
      item_name: "Barbecue Burger",
      item_description: "American, raw, meaty",
      item_price: 12.99,
      item_count: 1,
    },
    {
      item_id: 104,
      item_name: "Green Bowl",
      item_description: "Healthy...and green...",
      item_price: 18.99,
      item_count: 1,
    },
  ];

  const ctx = UseCartContext();

  function AddToCart(eventArgs) {
    const item = menu_items.filter(
      (menu_item) => menu_item.item_id === +eventArgs.target.id
    )[0];
    ctx.AddToCart(item);
  }

  return (
    <>
      <Container>
        {menu_items.map((menu_item) => (
          <Row
            className={`${classes["item-description"]} m-2 align-items-center`}
            key={menu_item.item_id}
          >
            <Col className="sm-col-6 align-self-left">
              <div>
                <h1>{menu_item.item_name}</h1>
              </div>
              <div>{menu_item.item_description}</div>
            </Col>
            <Col className="sm-col-3 d-flex justify-content-center text-center">
              <h4>€{menu_item.item_price}</h4>
            </Col>
            <Col className="sm-col-3 ">
              <Button
                className="bg-fuchsia"
                onClick={AddToCart}
                id={menu_item.item_id}
              >
                Add
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default Menu;
