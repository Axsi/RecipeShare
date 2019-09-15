import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import CameraIcon from './assets/icons8-camera-100.png';
import './style/createrecipe.css';
import MessageBox from './messagebox';
import Header from "./header_components/header";
import utensils from "./assets/utensils.png";

class CreateRecipeForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            PhotoUpload: null,
            Username: '',
            UserID: null,
            PrepTime: '',
            CookTime:'',
            Servings:'',
            MealType:'',
            RecipeTitle:'',
            RecipeDescription:'',
            RecipeIngredients:'',
            RecipeDirections:'',
            ImageWarning: '',
            RecipeID:'',
            BooleanPhotoUpload: true,
            BooleanUsername: true,
            BooleanUserID: true,
            BooleanPrepTime: true,
            BooleanCookTime: true,
            BooleanServings: true,
            BooleanMealType: true,
            BooleanRecipeTitle: true,
            BooleanRecipeDescription: true,
            BooleanRecipeIngredients: true,
            BooleanRecipeDirections: true,
            Required: ' Required'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.getExtensions = this.getExtensions.bind(this);
        this.checkValue = this.checkValue.bind(this);
    }

    componentDidMount() {
        console.log("We just entered the recipe form page");
        // console.log(this.props);
        // console.log(this.props.location.username);
        // console.log(this.props.location.userID);
        // console.log(this.state.MealType);
        console.log(this.props.location.recipeDetails);

        this.setState({Username: this.props.location.username});
        this.setState({UserID: this.props.location.userID});

        if(this.props.location.pathname === "/editpage"){
            this.setState({
                PrepTime: this.props.location.recipeDetails.preptime,
                CookTime: this.props.location.recipeDetails.cooktime,
                Servings: this.props.location.recipeDetails.servings,
                MealType: this.props.location.recipeDetails.mealtype,
                RecipeTitle: this.props.location.recipeDetails.recipetitle,
                RecipeID: this.props.location.recipeDetails.recipeid,
                RecipeDescription: this.props.location.recipeDetails.description,
                RecipeIngredients: this.props.location.recipeDetails.ingredients.join('**'),
                RecipeDirections: this.props.location.recipeDetails.directions.join('**')
            }, function(){ console.log(this.state)});
        }
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("inside handlesubmit of createrecipe");

        if((this.state.Username === '') && (this.state.UserID === null)){
            this.setState({Username: this.props.location.username});
            this.setState({UserID: this.props.location.userID});
        }


        let SubmitOk = this.checkValue();

        if((this.state.PhotoUpload === null) && (this.props.location.pathname !== "/editpage")){
            this.setState({ImageWarning: "Please select a file to upload"});
        }

        console.log("right before checking submitOk conditional");
        if(SubmitOk === true){
            console.log('file is not too big');
            let description = this.state.RecipeDescription;
            // console.log(this.state);
            // console.log("before descirption change");
            // console.log(description);
            if((description[0] !== '"') && (description[description.length - 1] !== '"')){
                // this.setState({RecipeDescription: '"'+description+'"'});
                description = '"'+description+'"';
            }
            // console.log(description);
            // console.log(this.state);
            // console.log(this.state.RecipeDescription);
            let formData = new FormData();
            // console.log(photo);

            // if((this.state.PhotoUpload !== null) && (this.props.location.pathname === "/editpage")){
            //     formData.append('file', this.state.PhotoUpload);
            // }else if()

            formData.append('file', this.state.PhotoUpload);
            formData.append('Creator', this.state.UserID);
            formData.append('Username', this.state.Username);
            formData.append('PrepTime', this.state.PrepTime);
            formData.append('CookTime', this.state.CookTime);
            formData.append('Servings', this.state.Servings);
            formData.append('MealType', this.state.MealType);
            formData.append('RecipeTitle', this.state.RecipeTitle);
            formData.append('RecipeDescription', description);
            formData.append('RecipeIngredients', this.state.RecipeIngredients);
            formData.append('RecipeDirections', this.state.RecipeDirections);
            formData.append('RecipeID', this.state.RecipeID);

            // console.log(formData);

            let fetchData = {
                method: '',
                body: formData
            };
            if(this.props.location.pathname !== "/editpage"){
                console.log("We go to createRecipe fetch");
                fetchData.method = 'POST';
                console.log(fetchData);
                fetch('/createRecipe', fetchData)
                    .then(data=>{
                        console.log("createRecipe return fetch");
                        // console.log(data);
                        // console.log(this.props.location.username);
                        // console.log(this.props.location.userID);
                        this.props.history.push({pathname:"/", username:this.props.location.username,
                            userID:this.props.location.userID});
                    }).catch(error=>{console.log("Error: " + error)});
            }else{
                fetchData.method = 'PUT';
                console.log(fetchData);
                console.log("We go to editRecipe fetch");
                fetch('/editPage', fetchData)
                    .then(response=> response.json())
                    .then(data=>{
                        console.log("editRecipe return fetch");
                        console.log(data);
                        console.log(data.recipeid);
                        this.props.history.push({pathname:"/recipepage/"+data.recipeid, username:this.props.location.username,
                            userID:this.props.location.userID});
                    }).catch(error=>{console.log("Error: " + error)});
            }
        }
        else{
            //not a message to say not all required data is filled out
            console.log("not all required data is filled out");
        }
    }

    handleChange(event){
        // event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name);
        // console.log(value);
        this.setState({
            [name]: value
        })
    }

    handleImage(event){
        event.preventDefault();
        console.log("whats the image?");

        let photo = event.target.files[0];
        let size = photo.size;

        let extension = this.getExtensions(photo.name);

        if(((extension === 'jpg') && (extension !== 'png')) || ((extension === 'png') && (extension !== 'jpg'))){
            let img = new Image();
            img.src = window.URL.createObjectURL(photo);
            console.log("new image just got created");
            //image.onload: this event handler will be called on the image element when the image has finished loading
            img.onload = ()=> {
                if (size / 1024 > 5120) {
                    console.log('file size is too big, must be less then 5mb');
                    this.setState({ImageWarning: "The file size is too big, must be less then 5mb"});
                } else if ((img.width < 960) || (img.height < 960)) {
                    console.log("Either the width or the height of the image is too small");
                    this.setState({ImageWarning: "The file width or height is too small"})
                }else{
                    console.log("file is ok");
                    this.setState({
                        PhotoUpload: photo,
                        ImageWarning:''
                    }, ()=>console.log(this.state.PhotoUpload));
                }
            }
        }else{
            console.log("wrong file type dude");
            this.setState({ImageWarning:"The selected file must be a jpg or png"})
        }
    }

    getExtensions(filename){
        return filename.split('.').pop();
    }

    checkValue(){
        console.log("Are we in checkValue?");
        let states = Object.keys(this.state);
        let count = 11;
        for(let i = 0; i < 11; i++){
            let booleanStateKey = 'Boolean'+states[i];
            let booleanStateObj = {};

            if((this.state[states[i]] === null) || (this.state[states[i]] === '')){
                if((states[i] === 'PhotoUpload') && (this.props.location.pathname === "/editpage")){
                    console.log("PhotoUpload here during update was not changed!");
                    booleanStateObj[booleanStateKey] = true;
                }else{
                    booleanStateObj[booleanStateKey] = false;
                    count -= 1;
                }
                this.setState(booleanStateObj);
            }else{
                booleanStateObj[booleanStateKey] = true;
                this.setState(booleanStateObj);
            }
        }
        console.log("what is count? " + count);
        return count === 11;
    }
    render(){
        return(
            <div className="Create-Recipe-Container">
                <form className="Create-Recipe-Form" onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
                    <div className="Left-Container">
                        <div className="Recipe-Photo">
                            <label className="Camera-Icon">
                                <input id="Photo-Upload" type="file" name="PhotoUpload" accept="image/png, image/jpeg"
                                       onChange={this.handleImage}/>
                            </label>
                            <span className="Recipe-Photo-Size">(no smaller than 960 x 960)</span>
                        </div>
                        <MessageBox ImageWarning={this.state.ImageWarning}/>
                        <ul className="Create-Recipe-Stats">
                            <li className="PrepTime-Label">
                                <label htmlFor="PrepTime">Prep Time</label>
                                {this.state.BooleanPrepTime ? '' :
                                    <span className='Requirement'>{this.state.Required}</span>}
                                <input id="Prep-Time" type="text" name="PrepTime" maxLength="25"
                                       value={this.state.PrepTime}
                                       onChange={this.handleChange}/>
                            </li>
                            <li className="CookTime-Label">
                                <label htmlFor="CookTime">Cook Time</label>
                                {this.state.BooleanCookTime ? '' :
                                    <span className='Requirement'>{this.state.Required}</span>}
                                <input id="Cook-Time" name="CookTime" type="text" maxLength="25"
                                       value={this.state.CookTime}
                                       onChange={this.handleChange}/>
                            </li>
                            <li className="Servings-Label">
                                <label htmlFor="Servings">Number Of Servings</label>
                                {this.state.BooleanServings ? '' :
                                    <span className='Requirement'>{this.state.Required}</span>}
                                <input id="Servings" name="Servings" type="text" maxLength="25"
                                       value={this.state.Servings}
                                       onChange={this.handleChange}/>
                            </li>
                            <li className="Meal-Type-Option">
                                    <label>
                                        <div className="Meal-Type-Title-Container">
                                        <p className="Meal-Type-Title">Meal Type</p>
                                        {this.state.BooleanMealType ? '' :
                                            <span className='Requirement'>{this.state.Required}</span>}
                                        </div>
                                        <div className="Options">
                                        <label>
                                            <input id="Breakfast-Option" type="radio" name="MealType"
                                                   value="Breakfast"
                                                   checked={(this.state.MealType === "Breakfast") ? "checked" : ''}
                                                   onChange={this.handleChange}/>
                                                   Breakfast
                                        </label>
                                        <label>
                                            <input id="Lunch-Option" type="radio" name="MealType"
                                                   value="Lunch"
                                                   checked={(this.state.MealType === "Lunch") ? "checked" : ''}
                                                   onChange={this.handleChange}/>
                                                   Lunch
                                        </label>
                                        <label>
                                            <input id="Dinner-Option" type="radio" name="MealType"
                                                   value="Dinner"
                                                   checked={(this.state.MealType === "Dinner") ? "checked" : ''}
                                                   onChange={this.handleChange}/>
                                                   Dinner
                                        </label>
                                        <label>
                                            <input id="Dessert-Option" type="radio" name="MealType"
                                                   value="Dessert"
                                                   checked={(this.state.MealType === "Dessert") ? "checked" : ''}
                                                   onChange={this.handleChange}/>
                                                   Dessert
                                        </label>
                                        </div>
                                    </label>
                            </li>
                        </ul>
                    </div>
                    <div className="Right-Container">
                        <ul className="Create-Recipe-Info">
                            <li className="Info-Label">
                                <label htmlFor="RecipeTitle">Recipe Title</label>
                                {this.state.BooleanRecipeTitle ? '' :
                                    <span className='Requirement'>{this.state.Required}</span>}
                                <input id="Recipe-Title" name="RecipeTitle" type="text" maxLength="45"
                                       value={this.state.RecipeTitle}
                                       onChange={this.handleChange}/>
                            </li>
                            <li className="Info-Label">
                                <label htmlFor="RecipeDescription">Description </label>
                                {this.state.BooleanRecipeDescription ? '' :
                                    <span className='Requirement'>{this.state.Required}</span>}
                                <textarea id="Recipe-Description" name="RecipeDescription" type="text"
                                          value={this.state.RecipeDescription}
                                          onChange={this.handleChange}/>
                            </li>
                            <li className="Info-Label">
                                <label htmlFor="RecipeIngredients">Ingredients</label>
                                {this.state.BooleanRecipeIngredients ? '' :
                                    <span className='Requirement'>{this.state.Required}</span>}
                                <textarea id="Recipe-Ingredients" name="RecipeIngredients" type="text"
                                          value={this.state.RecipeIngredients}
                                          placeholder="Please add ** at the end of every sentence/point"
                                          onChange={this.handleChange}
                                />
                            </li>
                            <li className="Info-Label">
                                <label htmlFor="RecipeDirections">Directions</label>
                                {this.state.BooleanRecipeDirections ? '' :
                                    <span className='Requirement'>{this.state.Required}</span>}
                                <textarea id="Recipe-Directions" name="RecipeDirections" type="text"
                                          value={this.state.RecipeDirections}
                                          placeholder="Please add ** at the end of every sentence/point"
                                          onChange={this.handleChange}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="Submit-Container">
                        <input className="Submit-Recipe-Button" type="submit"
                               value={this.props.location.pathname === "/editpage" ? "Update Recipe":"Submit Recipe"}
                               onSubmit={this.handleSubmit}/>
                               <Link to={{pathname:"/", username: this.props.location.username,
                                   userID: this.props.location.userID}} className="Cancel">
                                   <span>Cancel</span>
                               </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(CreateRecipeForm);