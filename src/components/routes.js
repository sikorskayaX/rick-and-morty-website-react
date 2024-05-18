import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Characters from './pages/Characters';
import Locations from './pages/Locations';
import Episodes from './pages/Episodes';
import CharacterElement from './pages/CharacterElement';
import EpisodeElement from './pages/EpisodeElement';
import LocationElement from './pages/LocationElement';

// Создаем массив объектов для маршрутизации
const routes = [
  { path: '/', component: Characters },
  { path: '/characters', component: Characters },
  { path: '/locations', component: Locations },
  { path: '/episodes', component: Episodes },
  { path: '/characters/:characterId', component: CharacterElement },
  { path: '/locations/:locationId', component: LocationElement },
  { path: '/episodes/:episodeId', component: EpisodeElement },
];


const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
