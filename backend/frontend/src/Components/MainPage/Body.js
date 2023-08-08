import React, { useState, useEffect } from "react";
import IncidentAddFunc from "./Body/Add/IncidentAdd";
import IncidentViewFunc from "./Body/View/IncidentView";
import CustomerAddFunc from "./Body/Add/CustomerAdd";
import CustomerViewFunc from "./Body/View/CustomerView";
import EmployeeViewFunc from "./Body/View/EmployeeView";
import EmployeeAddFunc from "./Body/Add/EmployeeAdd";
import ServiceAddFunc from "./Body/Add/ServiceAdd";
import ServiceViewFunc from "./Body/View/ServiceView";
import ProductAddFunc from "./Body/Add/ProductAdd";
import ProductViewFunc from "./Body/View/ProductView";
import SkillAddFunc from "./Body/Add/SkillAdd";
import SkillViewFunc from "./Body/View/SkillView";
import SparePartAddFunc from "./Body/Add/SparePartAdd";
import SparePartViewFunc from "./Body/View/SparePartView";
import QueryFunc from "./Body/View/Query";
import UserViewFunc from "./Body/View/UserView";
import LevelViewFunc from "./Body/View/LevelView";
import IncidentStatusViewFunc from "./Body/View/IncidentStatusView";
import DegreeViewFunc from "./Body/View/DegreeView";
import ImageFunc from "./Body/Image/Image";
const BodyFunc = (props) => {
    return(
        <div>
            {props.comp==="IncidentAdd"?
                <IncidentAddFunc/>
            :null}
            {props.comp==="IncidentView"?
                <IncidentViewFunc/>
            :null}

            {props.comp==="CustomerAdd"?
                <CustomerAddFunc/>
            :null}
            {props.comp==="CustomerView"?
                <CustomerViewFunc/>
            :null}

            {props.comp==="EmployeeAdd"?
                <EmployeeAddFunc/>
            :null}
            {props.comp==="EmployeeView"?
                <EmployeeViewFunc/>
            :null}

            {props.comp==="ServiceAdd"?
                <ServiceAddFunc/>
            :null}
            {props.comp==="ServiceView"?
                <ServiceViewFunc/>
            :null}

            {props.comp==="ProductAdd"?
                <ProductAddFunc/>
            :null}
            {props.comp==="ProductView"?
                <ProductViewFunc/>
            :null}

            {props.comp==="SkillAdd"?
                <SkillAddFunc/>
            :null}
            {props.comp==="SkillView"?
                <SkillViewFunc/>
            :null}

            {props.comp==="SparePartAdd"?
                <SparePartAddFunc/>
            :null}
            {props.comp==="SparePartView"?
                <SparePartViewFunc/>
            :null}

            {props.comp==="Query"?
                <QueryFunc/>
            :null}
            
            {props.comp==="UserView"?
                <UserViewFunc/>
            :null}

            {props.comp==="LevelView"?
                <LevelViewFunc/>
            :null}

            {props.comp==="IncidentStatusView"?
                <IncidentStatusViewFunc/>
            :null}

            {props.comp==="DegreeView"?
                <DegreeViewFunc/>
            :null}

            {props.comp==="Image"?
                <ImageFunc/>
            :null}
        </div>
    )
}

export default BodyFunc