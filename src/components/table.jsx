import React, { useContext, useState, useEffect } from 'react';
import CustomerContext from './context/customerContext';
import {paginate} from './paginate';
import ToggleButton from './toggleButton';
export default function Table(){
   
    const [FinalCustomer, setFinalCustomer] = useState([]);

    let {customer, currentPage,pageSize} = useContext(CustomerContext);
    
    let finalCustomer =  paginate(customer, currentPage, pageSize)
    console.log("FinalCustomer",finalCustomer)
    useEffect(() => {setTimeout(()=>{setFinalCustomer(finalCustomer)},5);
    },[customer,currentPage]);
   
  
    console.log("FinalCustomer",FinalCustomer);
    const getMaxBid = (Bid) => {
        try{
        const maxValue = Bid.reduce((max, bid)=>max=max>bid.amount?max:bid.amount,0);
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
    console.log(FinalCustomer);


    const toggle = (cust) =>{
        const Customer = [...FinalCustomer]
        const newCustomer = Customer.map(c=>(c.id==cust.id?{...c, maxSeen:!cust.maxSeen}:c))
        setFinalCustomer(newCustomer);
    }
      
    return(
        <div className = "container">
        <table className="table">
        <thead>
            <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Premimum</th>
            <th>Bid</th>
            </tr>
        </thead>
        <tbody>
            {FinalCustomer.map((cust, index)=><tr key ={index}>
                <td><div className="box"><div className="childbox">{cust.firstname + " "+ cust.lastname}</div><div className="childbox"><img className = "image "src={cust.avatarUrl}></img></div></div></td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{String(cust.hasPremium)}</td>
                <td>{cust.maxSeen===true?("Max " + getMaxBid(cust.bids)):("Min "+ getMinBid(cust.bids))}<ToggleButton cust={cust} toggle ={toggle}/></td>
            </tr>)}
        </tbody>
    </table>
    </div>
    )
}