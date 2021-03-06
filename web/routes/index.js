import { getUsersInfo } from '../../common/actions/user'

/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./search').default,
    require('./user').default,
    // require('./contact').default,
    require('./login').default,
    // require('./register').default,
    //
    // // place new routes before...
    // require('./content').default,
    require('./notFound').default,
  ],

  /*
   全局钩子 action触发时前
   */
  async beforeEach({ route, context }) {
    if (route === this) {
      return
    }
    if (route.isAuth) {
      let usersInfo = context.store.getState().usersInfo
      if (!usersInfo) {
        usersInfo = await context.store.dispatch(getUsersInfo())
      }
      if (!usersInfo) {
        context.redirect(`/login?sourceurl=${encodeURIComponent(context.path)}`)
      }
    }
  },

  async action({ next }) {
    let route

    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    do {
      route = await next()
    } while (!route)
    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - 金字塔`
    route.description = route.description || ''

    return route
  },

}
