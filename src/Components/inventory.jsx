import { React, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
//import ClientDetail from './clientDetail';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#F0AA89',
  }
};

const Inventory = () => {

    // Declaring State Variables
    const [inventory, setInventory] = useState();
    const [search, setSearch] = useState("");
    const [filteredInventory, setfilteredInventory] = useState();
    const [productTotal, setProductTotal] = useState(0);
    const [selectedData, setSelectedData] = useState('');
    const [cartTotal, setCartTotal] = useState('');

    const [customerName, setCustomerName]= useState('');
    const [customerPhone, setCustomerPhone]= useState('');

    /*const [ {data, customerNames, customerPhones}, setTest] = useState({
      data: [],
      customerNames,
      customerPhones
    });*/
    
     const [modalIsOpen, setModalIsOpen] = useState(false);

    //var inventoryData = '';
    // Getting Data For Inventory
    const getInventory = async () => {  
      try {

        //const inventoryData = await axios.get("http://localhost:5000/");

        const inventoryData = await axios.get("https://akstore-server.herokuapp.com/");

        if( inventoryData ) {
          
          alert( inventoryData.data );
        
          setInventory( inventoryData.data );
          
          setfilteredInventory( inventoryData.data );

          //alert( JSON.stringify ( filteredInventory  ) );
           
        }
      } catch(error) {
        console.log(error)
      }
    }

    // Function Call on Add To Cart Button
    const preSendemail = () => {
      alert( customerName + ' ' + customerPhone );
      /*setTest({
        data: selectedData,
        customerNames: customerName,
        customerPhones: customerPhone
      });*/
      
      sendMail();
    }

    // Passing Data to Server
    const sendMail = () => {

      const headers = { 
        'Content-Type': 'application/json',
      };

      alert( selectedData + customerName + customerPhone );
 
      let body = JSON.parse( selectedData );

      //let name = customerName ;

      //let phone = JSON.parse( customerPhone ); 

      //alert ( body );

      //alert ( name );

      //alert ( phone );

      axios.post('http://localhost:500/sendmail', ({ data : body, customername: customerName, customerphone : customerPhone  }) )
      .then((res) => {
        alert("got response")
      })
      .catch((err) => {
        console.error(err);
      });
    }

    //useEffect(() => {
      //getInventory();
    //}, []);

    useEffect(() => {
        const result = inventory.filter( (inventoryItem) => {
            return inventoryItem.product.toLowerCase().match(search.toLowerCase());
        })

        setfilteredInventory(result);
    });

    const handleChange = (state) => {
      setSelectedData( JSON.stringify(state.selectedRows) );
    }
    
    // Modal Functions 
    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false)
  }

    // Declaring Data Tables Columns
    const columns = [
      {
        name: "SKU",
        selector: (row) => row.sku
      },
      {
        name: "Product",
        selector: (row) => row.product
      },
      {
        name: "Quantity",
        selector: (row) => row.quantity
      },
      {
        name: "MRP",
        selector: (row) => row.mrp
      },
      {
        name: "price",
        selector: (row) => row.price
      },
      {
        name: "Units",
        cell: (row) => (
          <input type="number" className="btn btn-primary w-20 inventory-quantity" onChange="{unit_total}"/>
        ),
        selector: (row) => row.units
      },
      {
        name: "Total",
        selector: (row) => row.total,
        cell: (row) => ( row.units * row.price )
      }
    ];

    //useEffect(() => {

      //setInventory(inventoryData.data);
      //setfilteredInventory(inventoryData.data);
      //console.log("Behavior before the component is added to the DOM");
    //}, []); // Mark [] here.


    // Component Rendering
    return (
      <>
        
        <DataTable
        title="AK Store Inventory"
        columns={columns}
        data={filteredInventory}
        pagination
        fixedHeader
        selectableRows
        onSelectedRowsChange={handleChange}
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent = {

          <>
            <input
                type="text"
                className="form-control inventory-search-box"
                placeholder="Searc Here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
    
           <select
                className="form-control inventory-search-box" placeholder="Category Filter"
                onChange={(e) => setSearch(e.target.value)} >
                {
                //filteredInventory.map(cat => cat.category ? <option value={cat.category}>{cat.category}</option> : '' )
                }
            </select>
            

            </>
            
        }
        
        />
        <input type="button" onClick={setModalIsOpenToTrue} value="Add To Cart" />
        
        <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=> setModalIsOpen(false)}>
          <button onClick={setModalIsOpenToFalse}>x</button>
          <>
          <form action="" id="customerDetail" onSubmit={preSendemail}>
            <div class="row">
               <div class="col-25">
                  <label for="customer_name"></label>
               </div>
               <div class="col-75">
                  <input required type="text" id="customer_name" name="customer_name" placeholder="Enter your name" onChange={e => setCustomerName(e.target.value)} />
               </div>
            </div>

            <div class="row">
               <div class="col-25">
                  <label for="customer_mobile"></label>
               </div>
               <div class="col-75">
                  <input required type="text" id="customer_mobile" name="customer_mobile" placeholder="Enter your mobile number" onChange={e => setCustomerPhone(e.target.value)} />
               </div>
            </div>

            <div class="row">
               <div class="col-25">
                  <label for="customer_submit"></label>
               </div>
               <div class="col-75">
                  <input required type="submit" id="customer_submit" name="customer_submit" value="Submit" />
               </div>
            </div>

            </form>
          </>
        </Modal>
        </>
    )
}

//Exporting The Component
export default Inventory