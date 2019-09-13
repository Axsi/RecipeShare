const rules = {
    guest: {
        unauthorized: [
            "public-home-page:visit",
            "signIn-page:visit",
            "register-page:visit",
            "recipe-list:visit",
            "recipe-page:visit"
        ]
    },
    user: {
        authorized: [
            "private-home-page:visit",
            "recipe-list:visit",
            "recipe-page:visit",
            "own-recipe:edit",
            "own-recipe:delete",
            "favorite-recipe:add",
            "favorite-recipe:remove",
            "recipes:create",
            "own-recipes-page:visit"
        ]
    }
};

export default rules;