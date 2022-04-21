


## Schedule Appointment


**URL** : ``` /api/schedule/ ```

**Method** : ``` POST ```

**Auth required** : NO

**Permissions required** : None

**Data constraints:**

```
{
    "AppointmentDate":"[not null]",
    "PhoneNumber":"[not null]",
    "Email": "[must be unique,not null]",
    "RegistrationNumber": "[must be unique,not null]",
    "ServiceType":"[not null]",
    "URL":"[must be unique,not null]",
    "TrackingID":"[must be unique,not null]",
    "Firstname": "[not null]",
    "Lastname": "[not null]",
}
```
| Parameter      | Description
| :---        |    ----:  
| AppointmentDate | date of appointment
| PhoneNumber | phone number of user     
| Email      |email of user 
| RegistrationNumber | unique id of user
| ServiceType | purpose of visit
| TrackingID | Request ID for schedule        
| Firstname      | first name of user      
| Lastname   | last name of user 
Data Examples for user
```
{
    "AppointmentDate":"[2022-04-11]",
    "PhoneNumber":"[1234567890]",
    "Email": "[abcde@ufl.edu]",
    "RegistrationNumber":"[123]",
    "ServiceType":"[AC Repair]",
    "TrackingID":"[12]"
    "Firstname": "[abcde]",
    "Lastname": "[xyz]",
}
```
| Parameter      | Sample Input 
| :---        |    ----: 
| AppointmentDate | 2022-04-11
| PhoneNumber | 1234567890     
| Email      |abcde@ufl.edu 
| RegistrationNumber | 123
| ServiceType | AC Repair
| TrackingID | 12        
| Firstname      | abcde      
| Lastname   | xyz |    
## Success Response

Condition : If everything is OK 
Code : 201 SUCCESS

## Error Responses
Condition : If Account already exists for User, which include two situation: RegistrationNumber or email already exists or user left fields empty.

Code : 400 BadRequest

Content : {"error": "Could Not Login!"}
