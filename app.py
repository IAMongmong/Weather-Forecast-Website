from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with the allowed origins (e.g., ["http://localhost"])
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
    allow_credentials=True,  # Allow credentials (e.g., cookies)
)

# Initialize an empty list to store favorite cities
favorite_cities = list()

@app.post("/favorite/post/", response_model=str)
def create_city(city: str):
    """ Add a city to the list of favorite cities.
    """
    if city not in favorite_cities:
        favorite_cities.append(city)
    return city

response_model_dict = Dict[str, List[str]]
@app.get("/favorite/get/", response_model=response_model_dict)
def read_cities():
    """ Return the list of favorite cities
    """
    return {"cities": favorite_cities}

@app.put("/favorite/put/{city}", response_model=str)
def update_city(city_idx: int, city: str):
    """ 
    Update the city in the list of favorite cities, 
    user can use when they misspelled the city name.
    """
    if city_idx < 0 or city_idx >= len(favorite_cities):
        raise HTTPException(status_code=404, detail="City not found")
    favorite_cities[city_idx] = city
    return favorite_cities[city_idx]

@app.delete("/favorite/delete/{city}", response_model=str)
def delete_city(city: str):
    """
    Delete the city from the list of favorite cities.
    """
    if city not in favorite_cities:
        raise HTTPException(status_code=404, detail="City not found")
    city_index = favorite_cities.index(city)
    return favorite_cities.pop(city_index)
