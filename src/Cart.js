import React, { useContext, useState } from "react";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import classes from "./menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartContext = React.createContext({
  items: [],
  AddToCart: (item) => {},
  ShowCart: (visible) => {},
});

export function UseCartContext() {
  return useContext(CartContext);
}

export function Cart(props) {
  const [cartItems, addCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  function addToCartHandler(new_item) {
    let match = cartItems.filter(
      (cart_item) => cart_item.item_id === +new_item.item_id
    )[0];

    if (match) {
      const items = cartItems;
      const updated_list = items.map((item) => {
        if (item.item_id === new_item.item_id) {
          return { ...item, item_count: item.item_count + new_item.item_count };
        }
        return item;
      });
      addCartItems(updated_list);
    } else {
      addCartItems((previousState) => [...previousState, new_item]);
    }
  }

  function removeFromCartHandler(eventArgs) {
    addCartItems((previousState)=>previousState.filter(state_item=>state_item.item_id!==+eventArgs.target.id));
  }

  function increaseItemCountHandler(eventArgs) {
    addCartItems((previousState) => {
      const newstate = [...previousState];
      return newstate.map((state_item) => {
        if (state_item.item_id === +eventArgs.target.id) {
          return { ...state_item, item_count: state_item.item_count + 1 };
        }
        return state_item;
      });
    });
  }

  function reduceItemCountHandler(eventArgs) {
    addCartItems((previousState) => {
      const newstate = [...previousState];
      return newstate.map((state_item) => {
        if (
          state_item.item_id === +eventArgs.target.id &&
          state_item.item_count > 0
        ) {
          return { ...state_item, item_count: state_item.item_count - 1 };
        }
        return state_item;
      });
    });
  }

  function showCartHandler() {
    setShowCart(true);
  }

  function closeCartHandler() {
    setShowCart(false);
  }

  function DisplayCart() {
    return (
      <Modal show={showCart} onHide={closeCartHandler}>
        <Modal.Header>
          <Modal.Title>Items in Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {cartItems.map((menu_item) => (
              <Row
                className={`${classes["item-description"]} m-2 align-items-center align-items-left`}
                key={menu_item.item_id}
              >
                <Col className="sm-col-1">
                <FontAwesomeIcon icon={"times"} id={menu_item.item_id} onClick={removeFromCartHandler}/>
                </Col>

                <Col className="sm-col-5 align-self-left">
                    <h5>{menu_item.item_name}</h5>
                </Col>
                <Col className="sm-col-3 align-content-end justify-content-end">
                  <div>
                    <div>
                      <h5>{menu_item.item_price}</h5>
                    </div>
                    <div>
                      <div className="float-left">
                        <Button
                          size="sm"
                          onClick={reduceItemCountHandler}
                          id={menu_item.item_id}
                        >
                          -
                        </Button>
                      </div>
                      <div className="float-left">
                        <h5>{menu_item.item_count}</h5>
                      </div>
                      <div className="float-left">
                        <Button
                          size="sm"
                          onClick={increaseItemCountHandler}
                          id={menu_item.item_id}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="sm-col-3">
                  <div className="justify-content-sm-start">
                    <h4>
                      €
                      {(menu_item.item_price * menu_item.item_count).toFixed(2)}
                    </h4>
                  </div>
                </Col>
              </Row>
            ))}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeCartHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        AddToCart: addToCartHandler,
        ShowCart: showCartHandler,
      }}
    >
      {showCart && DisplayCart()}
      {props.children}
    </CartContext.Provider>
  );
}

export default Cart;
