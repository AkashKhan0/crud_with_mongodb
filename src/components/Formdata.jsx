import React from "react";
import { Icon } from "@iconify/react";
import "../App.css";

export const Formdata = ({
  handlSubmit,
  handleOnCahnge,
  handleClose,
  rest,
}) => {
  return (
    <>
      <div className="form">
        <div className="topTitle">
          <h1>Enter Your Data</h1>
          <span>
            <Icon
              icon="ph:x-fill"
              className="display-1-1"
              onClick={handleClose}
            />
          </span>
        </div>
        <form onSubmit={handlSubmit}>
          <label htmlFor="">
            <Icon icon="openmoji:european-name-badge" className="display-1" />
            Name :
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleOnCahnge}
            value={rest.name}
          />
          <label htmlFor="">
            <Icon icon="fxemoji:email" className="display-1" /> em@il :
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={rest.email}
            onChange={handleOnCahnge}
          />
          <label htmlFor="">
            <Icon icon="bxs:message" className="display-1" /> Message :
          </label>
          <textarea
            name="message"
            id="message"
            value={rest.message}
            onChange={handleOnCahnge}
          ></textarea>
          <button>SUBMIT</button>
        </form>
      </div>
    </>
  );
};
