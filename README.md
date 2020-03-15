# v16-bears-team-04
Add-project-description-here | Voyage-16 | https://chingu.io/ | Twitter: https://twitter.com/ChinguCollabs

## Our Team

- [Matthew Burfield](https://github.com/matthew-burfield)
- [Daniel Strong](https://github.com/dastrong)
- [Liam](https://github.com/Liam345)
- [Sarah](https://github.com/smellaphant)
- [Arun](https://github.com/ArunJose)

## Our Project Idea

When having a wedding, a lot of people like to have a wedding registry to let guests know what types would be most needed for the happy couple. This project allows the wedding party to host their own wedding registry where guests can access a public facing page to purchase the gifts.

## MVP

The MVP should satisfy these user stories:

1. I should be able to sign up a new account, and log in.
2. As a user, I should be able to create a wedding registry. Saving data such as a title, wedding description, the date of the wedding and a custom url that my guests will be able to visit.
3. As a user, I should be able to create multiple gifts. Saving data such as a title, description, image, price etc.
4. As a user, I should not be able to view/edit any of the gifts for any other registry, only my own.
5. As a guest, I should be able to visit the custom url specified by the registres custom url value without needing a login.
6. As a guest, I should be able to purchase a gift, or donate money towards part of a gift.
7. As a guest, I should be able to leave a message for the wedding couple when purchasing a gift.

# Project Review

We successfully completed our MVP on time. We also completed one of our stretch goals which was to add a payment page for users, where they can view all of the payments that have been made by guests.

### Things to note:


### .env file you'll need to run locally

```
DB_USER = ""
DB_PASSWORD = ""
DB_URL = ""

AUTH0_DOMAIN=""
AUTH0_CLIENT_ID=""
AUTH0_API_IDENTIFIER=""

PERMISSIONS_ADMIN = ["create:registry", "update:registry", "delete:registry", "all:registry", "all:items"]
PERMISSIONS_PAIDUSER = ["create:registry", "update:registry", "delete:registry"
```

If you have any questions, let us know. Our GitHub's are at the top.



_____________________




## Project B - Wedding registry

### MVP Features

- Frontend
    - landing page
    - Sign up form/flow/page
    - Login
    - Registry page (read only/writable)
    - Add items page
    
- Backend
    - User
        - Authentication
    - Registry
        - Wedding Date
        - Names
        - Location
    - Items
        - Name
        - Description
        - Price
        - Link?
        - Image?
        - isPurchased/reserved
    
- Create account/login
    - Add details of your wedding (skip for now option available)
        - Used to customizes tile/description/background image of website
- Create new registry
- Add/edit/delete gifts in registry
- Show title/image/description/price/number requested/number fulfilled/url for each gift
- Grey out/disable gifts that have already been purchased

### MVP User stories

- As an authenticated user:
    - I can add gifts to my registry
    - I can update the title and description of my wedding


- As a non authenticated user:
    - I can create a new account and login
    - I can navigate to a unique url to see the registry
    - I can mark a gift as “purchased”

### Stretch goals/Bonus features

- Make the registry an iFrame so it can be embedded into another website
- Allow users to design their own home page content
- Send alert (email?) to user when someone buys a gift
    - Could use nodemailer
    - Send a thank you to the buyer
    - Notification to receiver
- Themes
    - Let users have custom urls for their registry
        - Start with editable endpoint (ex: https://v16bears4weddings.com/danielandco)
    - Use CSS variables to hold color palettes? (sorry IE users)
- set a start and end date for when the registry is active
- Allow for partial payments of a gift,
    - GoFundMe style section for particular gifts - i.e. honeymoon, house deposit, etc…
- Create a cart that you can add items to before purchasing
    - Call ‘dibs’ on purchasing an item
    - If it’s in someone’s cart, show other users that that item is pending purchase
- Payment structure (5 items for free, unlimited items for $40, unlimited items + unique url for $80)
- Wedding RSVPs
- Chrome extension
    - Adds the items to your registry
    - When clicking the button, it would grab the image, price, title, url, and description
        - Auto-populate the add items popup with this information or leave blank
        - User can edit or fill in missing info before submitting to registry  
- Cash fund (with target goal, optional)
    - For house, honeymoon, home appliances, couple’s massage, etc.
- Add a “suggested items” section based on user’s current registry items (sponsored advertising space potential?)
- Import existing wishlists from other registries
- Allows you to make public and private lists for family and friends (reception vs ceremony friends..?) 
- Rank gift items based on how much you want them

### Other thoughts on a wedding registry

- I’ve tried out 7 other wedding registry sites and none of them are very good and some are downright unusable. I feel like this would be a really good “real world” app to add to our portfolios. www.theknot.com is probably the best of all of them, but it does everything


- https://www.thehintregistry.com.au/
- https://mygiftregistry.com.au/
- https://www.petersofkensington.com.au/
- https://giftcardregistry.com.au/
- https://www.weddinglistco.com.au/
- https://www.theknot.com/

### I liked two wedding registry 

-  //mygiftregistry.com.au/  : because it has straightforward steps

Steps:

1. Create Registry
2. Edit Items / Add Gifts
3. Share with guests (via URL)
4. Users will access contributions after event



- www.hitchd.com :

Steps:

1. Login. Enter wedding date, Name, venue etc.
2. Wedding registry introduction
3. Add gifts
4. Publish Registry on a url

### Not sure but maybe also worth checking out christmas-gift-list-making websites

- http://www.giftster.com
- http://wantsthis.com/


### Option to use one particular vendor for registry

- i.e. I know that David Jones sometimes did an offer whereby couples would get a $500 giftcard for just having a wedding registry with them
