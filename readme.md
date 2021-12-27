# Simple Post API using Clean Architecture

## Instructions

### Pre requirements

- Execute the script in the desired postgresql database
- Install node.js
- Install npm


### Bash commands

```bash
git clone https://github.com/SeoSoojin/API-CleanArch-Node
```

- Description: Clone the git repo to the current directory

```bash
npm i
```

- Description: Use to get all the requirements 

```bash
nodemon index.ts
```

- Description: starts the server on a localhost


## Design Pattern

 - Clean Ach pattern
    
## /

  - Description: Get all endpoints defined by the API
  - Curl to test:
    ```bash
    curl    --request GET
            --url http://localhost:3000/
    ```


## /getPosts
    
- Description: Returns all the posts on DB with their author's names
- Curl to test: 
    ``` bash 
    curl    --request GET
            --url http://localhost:3000/getPosts
    ```

## /getPost/byid
    
- Description: Returns the post by the given id
- Curl to test: 
    ```bash 
    curl    --request GET 
            --url http://localhost:3000/getPost/byid/:id
    ```

## /updatePost/:id

- Description: Updates the post with the given id
- Curl to test: 
    ```bash 
    curl    --request POST 
            --url http://localhost:3000/updatePost/:id
            --header 'Content-Type: application/json' 
            --data '{
                        "title": "test updated",
                        "author": {
                            "id": 1
                        },
                        "description": "description",
                        "category": "category"
                    }'
    ```

## /insertPost 

- Description: Insert a new post on DB
- Curl to test: 
    ```bash 
    curl    --request POST 
            --url http://localhost:3000/insertPost
            --header 'Content-Type: application/json' 
            --data '{
                        "title": "test inserted",
                        "author": {
                            "id": 1
                        },
                        "description": "description",
                        "category": "category"
                    }'
    ```

## /deletePost/:id

- Description: Delete a post on DB by the given id
- Curl to test: 
    ```bash 
    curl    --request POST 
            --url http://localhost:3000/deletePost/:id
    ```