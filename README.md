# TO DO LIST (Rest API)

## How to run API
To start API using command: 
```
  docker-compose up
```

Docker will build rest API application image then start `api` and `db` service. <br>Root URL is `http://localhost:3000`

At `26/01/2019` I'm using `Docker version 18.09.0, build 4d60db4` and `docker-compose version 1.21.2, build a133471`

## API Document

* ### View all item in the list
  __URL:__ `/api/v1/tasks`<br>
  __Method:__ `GET`<br>
  __Content-type:__ `application/json`<br>
  __Success response:__
  ```
  Status code: 200
  Response data:
    [
      {
          "id": "5c4c45b2216949001e5014c4",
          "subject": "Example 1",
          "detail": "",
          "status": 0
      },
      {
          "id": "5c4c6501804649001eafc6f0",
          "subject": "Example 2",
          "detail": "This is descriptio",
          "status": 0
      },
    ]
  ```
* ### View a single task in the list
  __URL:__ `/api/v1/tasks/:taskId`<br>
  __Method:__ `GET`<br>
  __Content-type:__ `application/json`<br>
  __URL params:__
  ```
    Required:
      taskId: hexadecimal string (objectId of mongodb)
      example: 5c4c6501804649001eafc6f0
  ```
  __Success response:__
  ```
  Status code: 200
  Response data:
    {
        "id": "5c4c6501804649001eafc6f0",
        "subject": "Example 1",
        "detail": "",
        "status": 0
    }
  ```
  __Errors response:__
  If `taskId` is not valid.
  ```
  Status code: 400
  Response data:
    {
      "message": "Invalid params",
      "errors": [
        {
            "location": "params",
            "param": "taskId",
            "value": "1",
            "msg": "taskId is invalid"
        }
      ]
    }
  ```
  If a task not found.
  ```
  Status code: 404
  Response data:
    {
      "message": "Not found"
    }
  ```
* ### Add a task to the list
  __URL:__ `/api/v1/tasks`<br>
  __Method:__ `POST`<br>
  __Content-type:__ `application/json`<br>
  __Body params:__
  ```
    Required:
      subject: string
      example: "example subject"
    Optional:
      detail: string
      example: "this is description"
  ```
  __Success response:__
  ```
  Request body:
  {
    "subject": "example subject",
    "detail": "this is description"
  }
  ```

  ```
  Status code: 201
  Response data:
    {
      "id": "5c4c6c68804649001eafc6f1",
      "subject": "example subject",
      "detail": "this is description",
      "status": 0
    }
  ```
  __Errors response:__
    If `subject` is empty or not string.
  ```
  Request body:
  {

  }
  ```
  ```
  Status code: 400
  Response data:
    {
      "message": "Invalid params",
      "errors": [
        {
          "location": "body",
          "param": "subject",
          "msg": "subject is required"
        },
        {
          "location": "body",
          "param": "subject",
          "msg": "subject must be string"
        }
      ]
    }
  ```
* ### edit existing task
  __URL:__ `/api/v1/tasks/:taskId`<br>
  __Method:__ `PUT`<br>
  __Content-type:__ `application/json`<br>
  __URL params:__
  ```
    Required:
      taskId: hexadecimal string (objectId of mongodb)
      example: 5c4c6501804649001eafc6f0
  ```
  __Body params:__
  ```
    Required:
      subject: string
      example: "example subject edit"
    Optional:
      detail: string
      example: "this is description edit"
  ```
  __Success response:__
  ```
  Request body:
  {
    "subject": "example subject edit",
    "detail": "this is description edit",
  }
  ```
  ```
  Status code: 200
  Response data:
    {
      "id": "5c4c6c68804649001eafc6f1",
      "subject": "example subject edit",
      "detail": "this is description edit",
      "status": 0
    }
  ```
  __Errors response:__
  If a task not found.
  ```
  Status code: 404
  Response data:
    {
      "message": "Not found"
    }
  ```
  If `taskId` is not valid.
  ```
  Status code: 400
  Response data:
    {
      "message": "Invalid params",
      "errors": [
        {
            "location": "params",
            "param": "taskId",
            "value": "1",
            "msg": "taskId is invalid"
        }
      ]
    }
  ```
  If `subject` is empty or not string.
  ```
  Request body:
  {
  }
  ```
  ```
  Status code: 400
  Response data:
    {
      "message": "Invalid params",
      "errors": [
        {
          "location": "body",
          "param": "subject",
          "msg": "subject is required"
        },
        {
          "location": "body",
          "param": "subject",
          "msg": "subject must be string"
        }
      ]
    }
  ```
* ### Set the task status
  __URL:__ `/api/v1/tasks/:taskId/status`<br>
  __Method:__ `PUT`<br>
  __Content-type:__ `application/json`<br>
  __URL params:__
  ```
    Required:
      taskId: hexadecimal string (objectId of mongodb)
      example: 5c4c6501804649001eafc6f0
  ```
  __Body params:__
  ```
    Required:
      status: Number (1 or 0 , 0 = pending, 1 = done)
      example: 1
  ```
  __Success response:__
  ```
  Request body:
  {
    "status": 1
  }
  ```
  ```
  Status code: 200
  Response data:
    {
      "id": "5c4c6c68804649001eafc6f1",
      "subject": "example subject edit",
      "detail": "this is description edit",
      "status": 1
    }
  ```
  __Errors response:__
  If a task not found.
  ```
  Status code: 404
  Response data:
    {
      "message": "Not found"
    }
  ```
  If `taskId` is not valid.
  ```
  Status code: 400
  Response data:
    {
      "message": "Invalid params",
      "errors": [
        {
            "location": "params",
            "param": "taskId",
            "value": "1",
            "msg": "taskId is invalid"
        }
      ]
    }
  ```
  If `status` is not be `1` or `0`.
  ```
  Status code: 400
  Response data:
  {
    "message": "Invalid parameter or body",
    "errors": [
      {
        "location": "body",
        "param": "status",
        "value": "Example String",
        "msg": "status is invalid"
      }
    ]
  }
  ```
* ### Delete a task from the list
  __URL:__ `/api/v1/tasks/:taskId`<br>
  __Method:__ `DELETE`<br>
  __Content-type:__ `application/json`<br>
  __URL params:__
  ```
    Required:
      taskId: hexadecimal string (objectId of mongodb)
      example: 5c4c6501804649001eafc6f0
  ```
  __Success response:__
  ```
  Status code: 200
  Response data: -
  ```
  __Errors response:__
  If a task not found.
  ```
  Status code: 404
  Response data:
    {
      "message": "Not found"
    }
  ```
  If `taskId` is not valid.
  ```
  Status code: 400
  Response data:
    {
      "message": "Invalid params",
      "errors": [
        {
            "location": "params",
            "param": "taskId",
            "value": "1",
            "msg": "taskId is invalid"
        }
      ]
    }
  ```
