import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
export function Accordion1({
  // @ts-ignore
  accordionHeader,
  color = "bg-primary",
  isCollapse = true,
  // @ts-ignore
  children,
}) {
  function switchCollapse() {
    const obj = document.getElementById("accordion1");
    const classname =
      // @ts-ignore
      obj.getAttribute("class") === "accordion-collapse collapse m-0 p-0"
        ? "accordion-collapse m-0 p-0"
        : "accordion-collapse collapse m-0 p-0";
    // @ts-ignore
    obj.setAttribute("class", classname);
  }
  return (
    <div className={""}>
      <div
        className="accordion container container-fluid"
        id="accordionPanelsStayOpenExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className={`accordion-button ${color}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
              onClick={switchCollapse}
            >
              {accordionHeader}
            </button>
          </h2>
          <div
            id="accordion1"
            className={
              isCollapse
                ? "accordion-collapse collapse m-0 p-0"
                : "accordion-collapse m-0 p-0"
            }
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// @ts-ignore
export function Navbar1({ title }) {
  return (
    <div>
      <div className={"container text-center m-1 p-1"}>
        <Link
          className={"text-decoration-none btn btn-lg btn-outline-primary"}
          to={"/"}
        >
          Image list
        </Link>
        <Link
          className={"text-decoration-none btn btn-lg btn-outline-secondary"}
          to={"/upload"}
        >
          Upload Image
        </Link>
      </div>
      <header className="display-6 text-center m-1 p-1">{title}</header>
    </div>
  );
}

// @ts-ignore
export function webStatus({ storeVar, isArray = false }) {
  return (
    <div>
      {storeVar.load === true && (
        <div className="text-center alert alert-success" role="alert">
          Идёт загрузка!
        </div>
      )}
      {storeVar.error && (
        <div className="text-center alert alert-danger" role="alert">
          {storeVar.error}
        </div>
      )}
      {storeVar.fail && (
        <div className="text-center alert alert-danger" role="alert">
          {storeVar.fail}
        </div>
      )}
      {storeVar.data && isArray === false && (
        <div className="text-center alert alert-success" role="alert">
          {storeVar.data}
        </div>
      )}
    </div>
  );
}
