# Rick and Morty React app

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) <img src = "https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge"/> ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## clone
```bash
$ git clone https://github.com/sikorskayaX/rick-and-morty-website-react.git

$cd rick-and-morty-website-react
```
## install
```bash
$ npm install

$ npm start
```

## description

This is a ReactJS app about Rick and Morty with an API connected via axios. To keep states of entities I used Redux.

The site includes the following pages and functionality:

- Characters
  - Table of all characters with their images, names and species displayed by 8 on the page
  - Filter by name, species, gender and status
  - The load more button, displayed if filters are not applied
    ![rickymorty](https://github.com/sikorskayaX/rick-and-morty-website/assets/106336275/38d3ddf8-aefa-40c3-8773-ba2d4c5994e5)
- Locations
  - Table of all locations with their names and types by 12 on the page
  - Filter by name, type and dimension
  - The load more button, displayed if filters are not applied
    ![rickymorty2](https://github.com/sikorskayaX/rick-and-morty-website/assets/106336275/153a5d49-d291-40d1-8484-d449e011ba4b)
- Episodes
  - Table of all episodes with their names and types by 12 on the page
  - Filter by name
  - The load more button, displayed if filters are not applied
    ![rickymorty3](https://github.com/sikorskayaX/rick-and-morty-website/assets/106336275/a5289ecd-b26a-41e8-a9e9-9f32b2181dc9)
- Character details
  - Character image and name
  - List of character characteristics with clickable elements location and origin
  - A scrolling list of episodes, for each you can go
- Location details
  - Location characteristics
  - List of characters, for each you can go
- Episode details
  - Episode characteristics
  - List of characters, for each you can go
    
There is also a fixed navigation and footer on each page. All the elements that the user interacts with have active and hover states.
