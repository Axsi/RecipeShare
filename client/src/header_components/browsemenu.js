// import React from 'react';
// import '../style/menu.css';
// import { Link, withRouter } from 'react-router-dom';
// import Right from '../assets/icons8-windows-metro-26.png';
//
// class BrowseMenu extends React.Component{
//     constructor(props){
//         super(props);
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     handleClick(event){
//         event.preventDefault();
//         let selection = event.target.name;
//         console.log(selection);
//         let route = '';
//         if(selection === "Breakfast" || "Lunch" || "Dinner" || "Dessert"){
//             route = '/mealType/'+selection;
//         }
//         if(selection === "Beef" || "Chicken" || "Pork" || "Salmon"){
//             route = '/search/'+selection;
//         }
//         console.log("whats the route?");
//         console.log(route);
//         fetch(route)
//             .then(response=> response.json())
//             .then(data=>{
//                 console.log("Received data back from browseRecipe in MealType");
//                 console.log(data);
//                 console.log(data.rows);
//                 this.props.history.push({pathname:"/", searchResult: data.rows, username:this.props.location.username,
//                     userID: this.props.location.userID});
//             })
//             .catch(err=>{
//                 console.log("Error occurred in fetch request within browseRecipe at mealtype");
//                 console.log(err);
//             })
//     }
//     //will have to change <a> to <Link>
//     render(){
//         return(
//             <div>
//                 <li className="Browse-Categories">
//                     <h3>Meal Type</h3>
//                     <ul className="Browse-SubCategories">
//                         <li>
//                             <a className="Breakfast" name="Breakfast" onClick={this.handleClick}>Breakfast</a>
//                         </li>
//                         <li>
//                             <a className="Lunch" name="Lunch" onClick={this.handleClick}>Lunch</a>
//                         </li>
//                         <li>
//                             <a className="Dinner" name="Dinner" onClick={this.handleClick}>Dinner</a>
//                         </li>
//                         <li>
//                             <a className="Dessert" name="Dessert" onClick={this.handleClick}>Dessert</a>
//                         </li>
//                     </ul>
//                 </li>
//                 <li className="Browse-Categories">
//                     <h3>Ingredient</h3>
//                     <ul className="Browse-SubCategories">
                        {/*<li>*/}
                        {/*    <a className="Beef" name="Beef" onClick={this.handleClick}>Beef</a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <a className="Chicken" name="Chicken" onClick={this.handleClick}>Chicken</a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <a className="Pork" name="Pork" onClick={this.handleClick}>Pork</a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <a className="Salmon" name="Salmon" onClick={this.handleClick}>Salmon</a>*/}
                        {/*</li>*/}
//                     </ul>
//                 </li>
//             </div>
//         )
//     }
// }
//
// export default withRouter(BrowseMenu);