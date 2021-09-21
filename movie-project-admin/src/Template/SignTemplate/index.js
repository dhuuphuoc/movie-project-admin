import { Fragment } from "react";
import { Route } from "react-router";


export const SigninTemplate = (props) =>{
    const {Component, ...restRoute} = props;
    return <Route {...restRoute} render={(propsRoute)=>{
        return (
            <Fragment>
                <Component {...propsRoute}/>
            </Fragment>
        )
    }}/>
}