


## Update Status of Accomodation

**URL** : ``` /api/updateStay/ ```

**Method** : ``` PUT ```

**Auth required** : NO

**Permissions required** : None

**Data constraints:**

```
{
    "id":"[must be unique,not null]",
    "userId":"[must be unique,not null]",
    "state": "[not null]",
    "lat": "[not null]",
    "long":"[not null]",
    "purpose":"[not null]",
    "price":"[not null]",
    "title":"[not null]",
    "title":"[not null]",
    "rooms":"[not null]",
    "bath":"[not null]",
    "area":"[not null]",
}
```
| Parameter      | Description
| :---        |    ----:  
| ID | RequestID
| UserID | ID of User     
| State      | Status of user e.g., active 
| lat | Latitude of Location
| long | Longitude of Location
| Purpose | Purpose for stay e.g., for rent
| Price | Price of Accomodation
| Title | Any special offers or Extra Details
| Rooms | No of Rooms in accomodation        
| Baths      | No of Bathrooms available      
| Area   | Area of Accomodation

#Data Examples for user
```
{
    "Id" : 1234,
    "UserId" :"6789",
    "State" : "Active" ,
    "Lat" : 23.408,
    "Long" : 26.876,
    "Purpose" : "For-rent",
    "Price" : 16798.00,
    "Title"  : "4 bed 3 bath",
    "Rooms" : 4,
    "Baths" : 3,
    "Area" : 1000.4
}
}
```
| Parameter      | Description
| :---        |    ----:  
| ID | 1234
| UserID | 6789     
| State      | Active 
| lat | 23.408
| long | 26.876
| Purpose | For-rent
| Price | 16798.00
| Title | 4 bed 3 bath
| Rooms | 4       
| Baths      | 3      
| Area   | 1000.4   
## Success Response

Condition : If everything is OK 
Code : Updated Data Displayed

## Error Responses
Condition : Error in Entry

Code : 400 BadRequest

Content : {"error": "Error"}
