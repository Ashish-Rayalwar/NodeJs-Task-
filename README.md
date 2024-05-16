# Nodejs Assignment

## Save User's Contact



### Overview -Make an api where user’s contact get sync in one table (Duplicate contacts can not get saved in database) (Phone numbers should be encrypted in database)


### How to start project ?

- Step 1 - run command - npm install 
- Step 2 - create database name with  "assignment"
- Step 2 - run command - npm start



## FEATURE I - User

### Models

- User Model

```yaml
{
  userId : {INT},
  name: { string },
  number: { string},
  commonUser: { string },
  createdAt: { timestamp },
  updatedAt: { timestamp },
  
}
```

## User APIs

### POST http://localhost:5000/api/add-contacts

- Create a user document from request body.
- Save number in encrypted format.
- **Response format**

```yaml
{
    "success": true,
    "message": "data saved successfully"
}
```

### GET commonUsers -  http://localhost:5000/api/common-users?searchNumber=6657991246

- Make an api to find common user for particular number.
- **Response format**

```yaml

{
    "Name": "darshan",
    "commonUsers": [
        2
    ]
}
```


### GET user's contact - http://localhost:5000/api/search?userId=2&page=1&PageSize=2

- Get contacts by userId (Pagination should work, Name search should work)
- **Response format**

```yaml

{
    "currentPage": 1,
    "totalCount": 1,
    "rows": [
        {
            "name": "darshan",
            "number": "6657991246"
        }
    ]
}
```
