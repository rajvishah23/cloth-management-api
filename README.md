# cloth-management-api

Approach for the task -

1 Defined Two roles of user

 -> Basic
 -> Admin
 
2 connection with MongoDB Atlas

3 Using RBAC ( Role Based Access Controls) grant certain permissions to each user 

    ac.grant("basic")
        .readOwn("profile")
        .updateOwn("profile")
        .createOwn("cloth")
        .readOwn("cloth")
        .updateOwn("cloth")
        .deleteOwn("cloth")
        .readAny("cloth")
    
    ac.grant("admin")
        .readAny("profile")
        .deleteAny("profile")
        .readAny("cloth")

4 login and registration using Json Web Tokens for authentication of user. 
   "x-access-token" is passed in headers to verify if user is logged in

5 Performed CRUD operations on both 
   Profile and clothes (with image upload using multer package)
   
6 Deployment on Heroku 
https://cloth-management-app.herokuapp.com/

7 Using @analytics/google-analytics added page view tracking  

