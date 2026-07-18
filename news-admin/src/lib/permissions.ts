export const permissions = {
  Admin: {
    routes: {
      dashboard: true,
      articles: true,
      categories: true,
      tags: true,
      media: true,
      users: true,
      analytics: true,
      settings: true,
      aiTools: true,
      places: true,
      pincodes: true,
    },

    actions: {
      createUser: true,
      editUser: true,
      deleteUser: true,

      createArticle: true,
      editArticle: true,
      deleteArticle: true,
      publishArticle: true,

      manageMedia: true,
    },
  },


  Editor: {
    routes: {
      dashboard: true,
      articles: true,
      categories: true,
      tags: true,
      media: true,
      users: true,
      analytics: false,
      settings: false,
      aiTools: true,
      places: false,
      pincodes: false,
    },

    actions: {
      createUser: false,
      editUser: false,
      deleteUser: false,

      createArticle: true,
      editArticle: true,
      deleteArticle: false,
      publishArticle: true,

      manageMedia: true,
    },
  },


  Reporter: {
    routes: {
      dashboard: true,
      articles: true,
      categories: false,
      tags: false,
      media: true,
      users: false,
      analytics: false,
      settings: false,
      aiTools: false,
      places: false,
      pincodes: false,
    },

    actions: {
      createUser: false,
      editUser: false,
      deleteUser: false,

      createArticle: true,
      editArticle: true,
      deleteArticle: false,
      publishArticle: false,

      manageMedia: false,
    },
  },
};