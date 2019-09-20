import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style/createrecipe.css';
import MessageBox from './messagebox';


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
            Required: ' Required',
            recipeDetails:{}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.getExtensions = this.getExtensions.bind(this);
        this.checkValue = this.checkValue.bind(this);
    }

    componentDidMount() {
        fetch('/authenticate')
            .then(response=> response.json())
            .then(data=>{
                if(data){
                    this.setState({Username: sessionStorage.username});
                    this.setState({UserID: sessionStorage.userID});
                    if((this.props.location.pathname === "/editpage")){
                        this.setState({recipeDetails: this.props.location.recipeDetails });
                        this.setState({
                            PrepTime: this.state.recipeDetails.preptime,
                            CookTime: this.state.recipeDetails.cooktime,
                            Servings: this.state.recipeDetails.servings,
                            MealType: this.state.recipeDetails.mealtype,
                            RecipeTitle: this.state.recipeDetails.recipetitle,
                            RecipeID: this.state.recipeDetails.recipeid,
                            RecipeDescription: this.state.recipeDetails.description,
                            RecipeIngredients: this.state.recipeDetails.ingredients.join('**'),
                            RecipeDirections: this.state.recipeDetails.directions.join('**')
                        });
                    }
                }else{
                    this.props.history.push('/loginpage');
                }
            })
            .catch(error=>{
                console.log('Error: ' + error);
            });
    }

    handleSubmit(event){
        event.preventDefault();
        let SubmitOk = this.checkValue();
        if((this.state.PhotoUpload === null) && (this.props.location.pathname !== "/editpage")){
            this.setState({ImageWarning: "Please select a file to upload"});
        }
        if(SubmitOk === true){
            let description = this.state.RecipeDescription;
            if((description[0] !== '"') && (description[description.length - 1] !== '"')){
                description = '"'+description+'"';
            }
            let formData = new FormData();
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
            let fetchData = {
                method: '',
                body: formData
            };
            if(this.props.location.pathname !== "/editpage"){
                fetchData.method = 'POST';
                fetch('/createRecipe', fetchData)
                    .then(data=>{
                        this.props.history.push({pathname:"/", username:this.state.Username,
                            userID:this.state.UserID});
                    }).catch(error=>{console.log("Error: " + error)});
            }else{
                fetchData.method = 'PUT';
                fetch('/editPage', fetchData)
                    .then(response=> response.json())
                    .then(data=>{
                        this.props.history.push({pathname:"/recipepage/"+data.recipeid, username:this.state.Username,
                            userID:this.state.UserID});
                    }).catch(error=>{console.log("Error: " + error)});
            }
        }
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    handleImage(event){
        event.preventDefault();
        let photo = event.target.files[0];
        let size = photo.size;
        let extension = this.getExtensions(photo.name);
        if(((extension === 'jpg') && (extension !== 'png')) || ((extension === 'png') && (extension !== 'jpg'))){
            let img = new Image();
            img.src = window.URL.createObjectURL(photo);
            //image.onload: this event handler will be called on the image element when the image has finished loading
            img.onload = ()=> {
                if (size / 1024 > 5120) {
                    this.setState({ImageWarning: "The file size is too big, must be less then 5mb"});
                } else if ((img.width < 960) || (img.height < 960)) {
                    this.setState({ImageWarning: "The file width or height is too small"})
                }else{
                    this.setState({
                        PhotoUpload: photo,
                        ImageWarning:''
                    });
                }
            }
        }else{
            this.setState({ImageWarning:"The selected file must be a jpg or png"})
        }
    }

    getExtensions(filename){
        return filename.split('.').pop();
    }

    checkValue(){
        let states = Object.keys(this.state);
        let count = 11;
        for(let i = 0; i < 11; i++){
            let booleanStateKey = 'Boolean'+states[i];
            let booleanStateObj = {};
            if((this.state[states[i]] === null) || (this.state[states[i]] === '')){
                if((states[i] === 'PhotoUpload') && (this.props.location.pathname === "/editpage")){
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
                        <Link to={{pathname:"/", username: this.state.Username, userID: this.state.UserID}}
                              className="Cancel">
                            <span>Cancel</span>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(CreateRecipeForm);