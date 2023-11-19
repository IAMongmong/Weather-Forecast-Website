# React Weather Forecast APP with FastAPI

## requirements
- nodejs    
- npm
- python3
- pip3
- fastapi

```
pip install fastapi
pip install fastapi uvicorn
```

## React install
```sh=
npm install
```

## api document
You can check api document at http://127.0.0.1:8000/docs .

## Deploy
You need to run fastapi server first, then run react app.
```sh=
uvicorn app:app --reload
npm start
```