


## Show Scheduled Appointments


**URL** : ``` /api/schedule/ ```

**Method** : ``` GET ```

**Auth required** : NO

**Permissions required** : None

**Data constraints:**

```
{
    "id":"[must be unique,not null]",
    "Created_at":"[not null]",
    "Updated_at":"[not null]",
    "Deleted_at":"[not null]",
    "AppointmentDate":"[not null]",
    "phoneNumber":"[not null]",
    "Email": "[must be unique,not null]",
    "RegistrationNumber": "[must be unique,not null]",
    "ServiceType":"[not null]",
    "URL":"[must be unique,not null]",
    "TrackingID":"[must be unique,not null]",
    "Firstname": "[not null]",
    "Lastname": "[not null]",
    "status": "[not null]",
}
```
| Parameter      | Description
| :---        |    ----:  
| ID | RequestID
| Created_at | Request Creation Date and Time   
| Updated_at | Request Updation Date and Time  
| Deleted_at | Request Deletion Date and Time   
| AppointmentDate | date of appointment
| PhoneNumber | phone number of user     
| Email      |email of user 
| RegistrationNumber | unique id of user
| ServiceType | purpose of visit
| TrackingID | Request ID for schedule        
| Firstname      | first name of user      
| Lastname   | last name of user 
| Status | Status of Request

#Data Examples for user
```
{
    "Id" : "[1234]",
    "Created_at" :"[2022-04-14 22:44:37.031117 04:00]",
    "Updated_at" :"[2022-04-14 22:44:37.031117 04:00]",
    "Deleted_at" :"",
    "AppointmentDate":"[2022-04-11]",
    "PhoneNumber":"[1234567890]",
    "Email": "[abcde@ufl.edu]",
    "RegistrationNumber":"[123]",
    "ServiceType":"[AC Repair]",
    "url":"",
    "TrackingID":"[12]"
    "Firstname": "[abcde]",
    "Lastname": "[xyz]",
    "Status":"1",
}

```
| Parameter      | Description
| :---        |    ----:  
| ID | 1234
| Created_at | 2022-04-14 22:44:37.031117 04:00   
| Updated_at | 2022-04-14 22:44:37.031117 04:00  
| Deleted_at |    
| AppointmentDate | 2022-04-11
| PhoneNumber | 1234567890     
| Email      |abcde@ufl.edu 
| RegistrationNumber | 123
| ServiceType | AC Repair
| TrackingID | 12        
| Firstname      | abcde      
| Lastname   | xyz 
| Status | 1 
## Success Response

Condition : If everything is OK 
Code : Schedule Instance Displayed

## Error Responses
Condition : Error in Entry

Code : 400 BadRequest

Content : {"error": "Error"}
