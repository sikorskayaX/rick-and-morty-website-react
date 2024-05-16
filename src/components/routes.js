import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Characters from './Characters';
import Locations from './Locations';
import Episodes from './Episodes';
import CharacterElement from './CharacterElement';
import EpisodeElement from './EpisodeElement';
import LocationElement from './LocationElement';

// Создаем массив объектов для маршрутизации
const routes = [
  { path: '/', component: Characters },
  { path: '/locations', component: Locations },
  { path: '/episodes', component: Episodes },
  { path: '/characters/:characterId', component: CharacterElement },
  { path: '/locations/:locationId', component: LocationElement },
  { path: '/episodes/:episodeID', component: EpisodeElement },
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
