sequenceDiagram
    participant browser
    participant server

    Note right of browser: The POST request contains the new note as JSON data containing both the content of the note (content) and the timestamp (date)

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    activate server
    server-->>browser: Status Code 201: Created
    deactivate server