import React from 'react';
import Header from './header_components/header';
import CreateRecipeForm from './create_recipe_form';
import './style/homepage.css';

class EditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="Site-Content">
                <Header />
                <CreateRecipeForm />
            </div>
        )
    }
}
export default EditPage;