import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from "../store/states";

const DataTable = () => {
    const authToken = JSON.parse(localStorage.getItem('token')).token
    const requestOptionsGet = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD",
            Authorization: `Bearer ${authToken}`
        },
    };

    const requestOptionsDel = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD",
            Authorization: `Bearer ${authToken}`
        },
    };

    const [ empty, setEmpty ] = useState(false)
    const { carRows, setCarRows } = useContext(UserContext)

    // Table Columns
    const columns = [
        { field: 'registration_number', headerName: 'Reg#', width: 150 },
        { field: 'make', headerName: 'Make', width: 150 },
        { field: 'model', headerName: 'Model', width: 150 },
        { field: 'color', headerName: 'Color', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 110,
            renderCell: (params) => (
              <DeleteIcon
                style={{ cursor: 'pointer' }}
                onClick={() => handleDelete(params.row.id)}
              />
            ),
          },

    ];

    const fetchCarData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/car/read-cars', requestOptionsGet)
            if(response.status === 400){
                setEmpty(true)
            }
            else{
                const result = await response.json()
                const cars = result.cars
                console.log(cars)
                const finalData = cars.map(item => { // after fetching car Data , setting 'id' variable as a key because Data Table MUI specifically needs 'id' variable in its object
                    return {...item, id: item._id}
                })
                setCarRows(finalData)
            }
            
        }
        catch(err){
            console.log('errr',err)
        }
    }

    const handleDelete = async(id) => {
        const removedCar = await fetch('http://localhost:5000/api/car/remove-car/'+id, requestOptionsDel)
        if(removedCar){
            fetchCarData()
        }
      };

    useEffect(() => {
        fetchCarData();
    },[])

    return (
        <>
            <div className="items-center justify-center rounded-lg bg-gray-100-100">
                <div className="w-auto rounded-lg shadow-lg bg-gray-100">

                    {!empty? <div>
                        <div className="p-4">
                            <p>No of Car: {carRows.length}</p>
                        </div>
                        <DataGrid
                        rows={carRows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                    </div>: <p>No Record</p>
                    }
                    
                </div>

            </div>
        </>
    );
}

export default DataTable