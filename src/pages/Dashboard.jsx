import React from "react";
import CarAddForm from "../components/AddCar";
import DataTable from "../components/DataTable";

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
           <div className="p-1">
           <CarAddForm/>
           </div>
            <div className="col-span-2 p-1">
            <DataTable />
            </div>

        </div>
    )
}

export default Dashboard