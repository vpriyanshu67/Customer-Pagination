import React from 'react';
import './style/toggleButton.css';


export default function ToggleButton(props){
       const {cust, toggle}=props;
       return(
        <div>
        <label class="switch">
        <input type="checkbox" onClick = {()=>toggle(cust)}/>
         <span class="slider round"></span>
         </label>
       </div>
    )
}