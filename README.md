
# 🏡 Stay.in
*One Stop solution for all your stay-in-g problems*
## 📝 Project Description
Stay.in is a one-stop shop for all of your subleasing needs. Our mission is to provide a global marketplace where tenants and landlords can match ALL their rental housing needs.
We have two portals: one for clients and one for administrators.

Ordinary users can see residences for sale and rent on the client side, depending on their needs. We've also added Filter, which allows users to narrow down their search by applying several filters such as purpose, rent frequency, minimum and maximum price, rooms, bathrooms, beds, and furnish kind.

We developed a signin for the administrator panel so that registered users can login to the portal and then fill out a form to display their property to the client panel.

For TENANTS
Easily search every type of rental. Whether it's for short term or long term, furnished or unfurnished, browse apartments from our updated database of rentals and find a rental that is perfect for you.

For LANDLORDS
POST FREE & SUBLEASE EASY! If you are a landlord, leaseholder or a roommate with a place to rent, you can post it on our platform. Post daily, weekly, monthly or yearly rentals and rooms and tenants will contact you directly.

PRIVACY AND SECURITY
Stay.in does not share any personal information or save credit card information. Even email addresses are not accessible to landlords or tenants.

## Demo video functionality


## Cypress test video


## Backend unit test video


## 📑 API Documentation

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


## 📋 Link to Project board

https://github.com/RajdevKapoor/Stay.in/projects


## 🏃 Link to Sprint4 deliverables

https://github.com/RajdevKapoor/Stay.in/blob/main/sprint4.md

## 🚀 Team members

- Dharani Kanchanapalli [@dkanchanapalli](https://www.github.com/dkanchanapalli) - (Backend)
- Kshitij Sinha [@sinarest1608](https://www.github.com/sinarest1608) - (Frontend / Automation)
- Rajdev Kapoor [@RajdevKapoor](https://www.github.com/RajdevKapoor) - (Frontend / Backend)
- Shivam Gupta [@shivamgupta-7](https://www.github.com/shivamgupta-7) - (Frontend / Backend)


#Tech Stack
Front-End: React
Back - End: GoLang
Database: SQLite
