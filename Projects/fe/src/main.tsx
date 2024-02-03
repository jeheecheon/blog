import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from '@/common/redux/store';

import App from '@/App';
import '@/main.css'
import PageLoadingSpinner from '@/common/components/PageLoadingSpinner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <PageLoadingSpinner />
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </>
)
