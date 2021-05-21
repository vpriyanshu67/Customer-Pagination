import React, { useContext, useState, useEffect } from 'react';
import CustomerContext from './context/customerContext';
import {paginate} from './paginate';
import ToggleButton from './toggleButton';
import _ from 'lodash';
import ModulPopup from './modulPopup';
import './style/table.css'
export default function Table(){
   
    const [FinalCustomer, setFinalCustomer] = useState([]);
    const [order, setOrder] = useState('asc');
    const [show, setShow] = useState(false);
    const [popupData, setPopupData] = useState([]);

    let {customer, currentPage,pageSize} = useContext(CustomerContext);
    
    let finalCustomer =  paginate(customer, currentPage, pageSize)
    
    useEffect(() => {setTimeout(()=>{setFinalCustomer(finalCustomer)},5);
    },[customer,currentPage]);
   
  
    const getMaxBid = (Bid) => {
        try{
        const maxValue = Bid.bids.reduce((max, bid)=>max=max>bid.amount?max:bid.amount,0);
        return maxValue
        }
        catch (error){
          return 0
        }
    }

    const getMinBid = (Bid) => {
        try {
            const min = Bid.reduce((min, bid)=>min=min<bid.amount?min:bid.amount,Bid[0].amount);
        return min
        }
        catch (error){
            return 0
        }
    }

    const changeIcon = () =>{
        const reverse = order==='asc'?'desc':'asc';
        setOrder(reverse);
    }

    const renderSortIcon = ()=>{
      if  (order=== 'asc') return <i className="fa fa-sort-asc" onClick={()=>changeIcon()}></i>;
      return <i className="fa fa-sort-desc" onClick={()=>changeIcon()}></i>
    }
   
    const toggle = (cust) =>{
        const Customer = [...FinalCustomer];
        const newCustomer = Customer.map(c=>(c.id==cust.id?{...c, maxSeen:!cust.maxSeen}:c));
        setFinalCustomer(newCustomer);
    }

    const handleShow = (cust)=> {
        setShow(true);
        setPopupData(cust.bids);
            
    }
    ;
    const handleClose = ()=> setShow(false);
   

      
    return(
        
        <div className = "container bg-light">
        <table className="table ">
        <thead className="bg-secondary">
            <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Premimum</th>
            <th>Bid{renderSortIcon()}</th>
            </tr>
        </thead>
        <tbody>
            {FinalCustomer.map((cust, index)=><tr key ={index} className="tablerow">
                <td onClick={()=>handleShow(cust)}><div className="box"><div className="childbox">{cust.firstname===undefined?"no data found": cust.firstname+ " "+ cust.lastname}</div><div className="childbox"><img className = "image "src={cust.avatarUrl} alt = {"No data Found"}></img></div></div></td>
                <td onClick={()=>handleShow(cust)}>{cust.email}</td>
                <td onClick={()=>handleShow(cust)}>{cust.phone}</td>
                <td onClick={()=>handleShow(cust)}>{cust.hasPremium===undefined?"No data Found":String(cust.hasPremium)}</td>
                <td >{cust.maxSeen===true?("Max " + getMaxBid(cust)):("Min "+ getMinBid(cust.bids))}<ToggleButton cust={cust} toggle ={toggle}/></td>
           
            </tr>)}
            {show?<ModulPopup handleClose={handleClose} popupData={popupData}/>:null}
        </tbody>
    </table>
    </div>
    )
}