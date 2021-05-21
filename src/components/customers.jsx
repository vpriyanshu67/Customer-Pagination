import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './style/Customer.css'
import Pagination from './Pagination';
import Table from './table';
import CustomerContext from './context/customerContext';

export default function Customer(){
 
    const [customer, setCustomer] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [pageNumberLimit, setPageNumberLimit] = useState(3);
    const [MaxPage, setMaxPage] = useState(3);
    const [MinPage, setMinPage] = useState(0);

    useEffect(() => {
        async function getCustomer(){
        const {data} = await axios.get("https://intense-tor-76305.herokuapp.com/merchants");
          let trueCustomer = data.map(f=>({...f,maxSeen:true }));          
           setCustomer(trueCustomer);
        }
        getCustomer();          
    },[setCustomer]);

   //console.log(customer)

    const onPageChange = page =>{
        setCurrentPage(page);
    }

    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > MaxPage) {
          setMaxPage(MaxPage + pageNumberLimit);
          setMinPage(MinPage + pageNumberLimit);
        }
      };
    
      const handlePrevbtn = () => {
        setCurrentPage(currentPage - 1);
    
        if ((currentPage - 1) % pageNumberLimit == 0) {
          setMaxPage(MaxPage - pageNumberLimit);
          setMinPage(MinPage - pageNumberLimit);
        }
      };


    return(<div>
  
        <CustomerContext.Provider value={{pageSize, 
            customer,
            setCustomer,
            currentPage,
            onPageChange,
            MaxPage,
            MinPage,
            handlePrevbtn,
            handleNextbtn}}>
                  <div className =" bg-dark header"><h2>CUSTOMER DETAILS</h2></div>
                   <Table/>
                   <marquee><b>Click on the Row to get the Bid details </b></marquee>
                   <Pagination/>
                  
             
                    
                  
               
        </CustomerContext.Provider>  
        </div>
    )
}