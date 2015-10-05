import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import Cache from './utils/Cache';
import App from './components/App';
import ContentPage from './components/ContentPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import GitEvents from './components/GitEvents';

const router = new Router(on => {

  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/gitevents', async (state) => {
    let data = await http.get('https://api.github.com/events');
    Cache.put('events', data);
    const content = { data: data };
    return <GitEvents {...content} />
  });

  on('*', async (state) => {
    const content = await http.get(`/api/content?path=${state.path}`);
    return content && <ContentPage {...content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );

});

export default router;
