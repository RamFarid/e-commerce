# E-commerce 
Most wanted website. I won't talk about its difficulty, It's enough for me to tell you that it took me only 30 hours to implement.  
**How is it only 30 hours and the date is shown above two months?**  
Because my academic studies were in August 2023 to July 2024; this was limited to a few minutes a day and for this reason it took months to build it but basically it only took 30 hours  
## Features
- Authentication  
   - **Guest mode**  
You can browse the website in `Guest mode` without need to register. The `Guest mode` allow you to browse products.
   - **User mode**  
      - Create account
      - Login to account
      - Forgot password  

\
After _having an account_ you can shopping and 
enjoy app features:
- **Favorites**  
   You can add any products in the favorites page to save them in your account to check them later
- **Info save**  
   The User can save them information to easily Pay them products the web app allows the user to save:
  - **Addresses**  
      There is a limited number of addresses the user can add and after adding different addresses the user can active a specific address in their order
  - **Credit cards**  
   The credit cards is considered as a sensitive information so I should dealing with cards in a careful manner.
      - You can save `master` or `visa` cards
      - The way I get to secure the credit cards information is to make a field `secure_number` in the schema that contains only the four digits in the credit card 
      - With making the `number` field of the credit number `select: false` which secure the number from get in the query if I didn't request it
      - There is no repeated card in the whole `database`.
      - As `addresses` the user can choose the active card to deal with
      > `Credit cards` is The Only Payment method avaliable to try to reach a more realistic website even if it is a demo. I mean if I made the payment via cash there would be no real orders and this is not realistic.
- **Cart**  
   The cart is the basic component in the e-commerce Web Apps. when you go to checkout after choose products and quantity then go and select the address and the card. The  click `order now` . The Server save the order in my database it is the traditional But it is really take the money from credit card
   - I have used **`Strapi`** to management the **financial transactions**  and it is make an order on strapi
- **Products Reviews**  
   Each user has registered could give review on any products.

> Some of the product images on the website don't work as expected. This surprised me and there's nothing I can do!  

---

## Products of E-commerce
I want a fake data. So, I have collected about _160 products_ from different sources including: `Fake Store API`, `Dummyjson API` and `Mock API`, After collected the data I have put them on My `Mongo database`

### Why I didn't use any ready API?
1. The amount of products of any API I have seen was about **20 products** in the maximum value it was **30 products**. I want more than 100 products
2. The APIs I saw had limited fields. If someAPI had `product views` they didn't have a `gallery` and if they had a `gallery` they didn't have a `product category`. In this cycle I had to find the perfect solution.
3. The ready APIs I saw has no CRUD operations mechanism. How can I use a specific API with only get the data? I want to manage the data and the E-commerce website should be **real demo**

> Now some of the images are not working and it seems that the image source in one of the APIs is no longer working or has been deprecated, and unfortunately this API was the largest number of products collected

> I was supposed to make a dashboard that would control orders and show statistics and some other things, but unfortunately I don't have time and I'm busy with academic studies.