import { Nav, Navbar, Button, Badge } from "react-bootstrap";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseCartContext } from "./Cart";
import { useEffect, useState } from "react";
import classes from "./NavBar.module.css";

function NavBar(props) {

  const cartctx = UseCartContext();

  const [isCartHighlighted, setIsCartHighlighted]=useState(false);

  const highlightclass = `${isCartHighlighted ? classes.bump : ''}`;

  useEffect(()=>{
    setIsCartHighlighted(true);
    const timer = setTimeout(()=>setIsCartHighlighted(false), 300);
    return ()=>clearTimeout(timer);
  }, [cartctx.items]);

  return ReactDOM.createPortal(

    <Navbar bg="light" expand="lg" >
      <Navbar.Brand href="#home">Food Order</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Menu</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <Button variant="primary" onClick={cartctx.ShowCart} > 
        <FontAwesomeIcon icon={"shopping-cart"} color="yellow"/>{" "}
        <Badge variant="light" className={highlightclass}>{cartctx.items.reduceRight((a,b)=>a+b.item_count, +0)}</Badge>
        <span className="sr-only">Items in Cart</span>
      </Button>

    </Navbar>
,
    document.getElementById("navi")
  );
}

export default NavBar;
