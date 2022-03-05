
# Sprint 2

## Frontend

## Backend
### API Reference

#### Get all stays

```http
  GET /api/v1/stay
```


#### Get item

```http
  /api/v1/stay/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

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

#### Returns user loggedin Status

```http
  /profile
```

#### Admin Panel

```http
  /homescreen
```