
# Sprint 2

### Tasks accomplished

## Frontend
- Integrated Frontend and Backend
- Automated frontend testing using Cypress
- Unit frontend testing using Jest
- Documentation


## Backend

### Feaures added - 
- Login Register Page Setup
- Models Added
- JWT Authentication for Data Security
- Google auth setup
- Backend API's developed and tested
- Unit Tests added
<<<<<<< Updated upstream
- Documentation
=======

### API Reference

#### Get all stays

```http
  GET /api/v1/stay
```

![image](https://user-images.githubusercontent.com/9784110/156868714-4db45c11-eb28-40be-ac94-d26c2dac2353.png)


#### Get item

```http
  /api/v1/stay/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

![image](https://user-images.githubusercontent.com/9784110/156868778-d625a930-1890-4b06-b739-615a154a4f8f.png)


#### Add new Stay

```http
  POST /api/v1/stay
```

#### Delete Stay

```http
  POST /api/v1/stay/:id
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



### User Authorization 

Admin Panel Authorization implemented using NextAuth 

![image](https://user-images.githubusercontent.com/9784110/156868845-e183ccdb-7251-4b6f-9fcf-4d2bb419464e.png)


#### Returns user loggedin Status

```http
  /profile
```
![image](https://user-images.githubusercontent.com/9784110/156868808-d4925180-338c-41bc-bcde-036426f20ed7.png)


#### Admin Panel

```http
  /homescreen
```
>>>>>>> Stashed changes
