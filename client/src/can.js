import rules from "./rbac_rules";

const check = (rules, role, action, data)=>{
    //check to see if the role of said user exists
    const permissions = rules[role];
    if(!permissions){
        return false;
    }
    //your here, so that means the role exists, so now check to see if this role has unauthorized permission, and
    //if the action they are trying to perform is including in said permissions
    const unauthorizedPermissions = permissions.unauthorized;

    if(unauthorizedPermissions && unauthorizedPermissions.includes(action)){
        return true;
    }

    //now check to see if they have authorized access

    const authorizedPermissions = permissions.authorized;

    //I see so the authorizedPermissions[action] checks to see if said action exists in authorized role, if it does then puts the user data into that role action and executes to return a boolean
    if(authorizedPermissions && authorizedPermissions.includes(action)){
        return true;
    }
    return false;
};
//is props.data or just data in general what is in the yes?????
const Can = props =>
    check(rules, props.role, props.perform, props.data) ? props.yes() :props.no();

Can.defaultProps = {
    yes: () => null,
    no: () => null
};

export default Can;