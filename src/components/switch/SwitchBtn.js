import React from "react";
import { useState, useEffect } from "react";
import "./switch.css";

const SwitchBtn = ({ val = true, action, item = {}, textPrint = true }) => {
  const [open, setOpen] = useState(() => val);

  // TODO: donner onChange function au props

  const switchFunc = (test) => {
    if (test === true) {
      return false;
    }
    else {
      return true;
    }
  }

  useEffect(() => {
    console.log("===== SWITCHBTN =========")
    console.log(textPrint)
  })

  return (
    <div className='switch__container'>
      {textPrint &&
        <p className='switch__container-indication '>
          {open ? "Ouvert" : "Fermé"}
        </p>
      }
      <div
        className={["switch", open ? "active" : ""].join(" ")}
        onClick={() => {
          setOpen(!open);
          if (action) {
            action(item.id, switchFunc(open));
          }
        }}>
        <div className='switch-round'></div>
      </div>
    </div>
  );
};

export default SwitchBtn;
