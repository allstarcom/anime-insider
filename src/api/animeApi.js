import * as locaAnimeDataList from './animeData'

const api_key = "810d8b38fbmsha91d95f0b623e68p19afd3jsne51d7b3428fd"
const url = 'https://anime-db.p.rapidapi.com/anime'

let genreList = [
    {
        "_id": "Award Winning"
    },
    {
        "_id": "Action"
    },
    {
        "_id": "Suspense"
    },
    {
        "_id": "Horror"
    },
    {
        "_id": "Ecchi"
    },
    {
        "_id": "Avant Garde"
    },
    {
        "_id": "Sports"
    },
    {
        "_id": "Supernatural"
    },
    {
        "_id": "Fantasy"
    },
    {
        "_id": "Gourmet"
    },
    {
        "_id": "Boys Love"
    },
    {
        "_id": "Drama"
    },
    {
        "_id": "Comedy"
    },
    {
        "_id": "Mystery"
    },
    {
        "_id": "Girls Love"
    },
    {
        "_id": "Slice of Life"
    },
    {
        "_id": "Adventure"
    },
    {
        "_id": "Romance"
    },
    {
        "_id": "Sci-Fi"
    }
]

async function get_all_animes(page = 1, size = 10) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
        }
    };

    let filteredURL = `${url}?page=${page}&size=${size}`;

    try {
        const response = await fetch(filteredURL, options);
        const result = await response.json();
        const finalData =  result.data || locaAnimeDataList.localDataList(page, size).data; // Use locaAnimeDataList as fallback
        return finalData

    } catch (error) {
        console.error('Error fetching anime data:', error);
        return [];
    }
}


export {
    get_all_animes,
}





