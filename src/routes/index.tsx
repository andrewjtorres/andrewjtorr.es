import loadable from '@loadable/component'
import { PartialRouteObject } from 'react-router'

const Home = loadable(() => import('routes/home'))
const NotFound = loadable(() => import('routes/not-found'))

const routes: PartialRouteObject[] = [
  {
    caseSensitive: true,
    element: <Home />,
    path: '/',
  },
  {
    caseSensitive: true,
    element: <NotFound />,
    path: '*',
  },
]

export default routes
