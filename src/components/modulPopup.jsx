import React from 'react';
import {Modal} from 'react-bootstrap';
import './style/Modal.css'
export default function ModulPopup(props){
    const {handleClose, popupData}= props;
    console.log(popupData);
    return(
        <Modal show={true} onhide={handleClose}>
        <Modal.Header>
            <Modal.Title>BIDS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul>
                <ol><b><div className ="box2"><div className="child">{"Car Title " + ":"}</div><div className="child">{"Amount"}</div> </div></b></ol>
                {(popupData ===undefined || popupData.length===0)?<div className="box2">"Bids does not exist"</div>:popupData.map((data,index)=>
                    <ol><div className ="box1"><div className="child"><b>{data.carTitle + ":"}</b></div><div className="child">{data.amount}</div></div> </ol>
                    
                    )}
            </ul>
        </Modal.Body>
        <Modal.Footer>
            <button className = " btn-danger btn-md "
            onClick={handleClose}>Close</button>
        </Modal.Footer>
        </Modal>
    )
}