<h1 align="center">
  lunchbox
</h1>

## 🚀 Quick start

1.  **Start developing**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd lunchbox/
    npm run develop
    ```

    From here you can start developing with hot-reloading enabled.

2.  **Open the code and start customizing**

    Your site is now running at http://localhost:8000!

    Each page that exists in the `/src/pages` folder automagically creates a new page with an associated path, so right now we have:

    ```
    /index.js --> lunchboxgame.io/
    /404.js --> lunchboxgame.io/404
    ```

    Each page then renders the `<Layout />` component as the wrapper for the page and then has a content component like `<Homepage />` or `<Roadmap />`. Each component has an associated SCSS file for styling purposes. We use [BEM](https://css-tricks.com/bem-101/) methodology for styling.

    NOTE: All values that are repeated should be put in the `/src/styles/base.scss` file.

    We use [Contentful](https://www.contentful.com/) for the majority of our content. As you'll see in files like `/src/components/homepage/homepage.js`, we use Contentful's GraphQL API to pull in the content for the page and then render it.

    NOTE: When you run the above `npm run develop` command, you can also navigate over the GraphQL visually at `http://localhost:8000/___graphql`. Read more at the docs [here](https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/).

3.  **Redirects**

    This app uses Netlfiy for deploying / hosting, so we use their logic for redirects which you can read more about [here](https://docs.netlify.com/routing/redirects/). In the `/static/_redirects` file, you can find the redirects for the site. The redirects file MUST live in the `/static` folder since Gatsby takes the files in that folder, and builds them into the production `/public` folder that is used in the deploy.

4.  **Building the site and deploying**

    Once the site is operating / looking how you like, you can build it and deploy it from the command line.

    To build a production deploy of the site use:

    `gatsby build`

    And to then deploy to Netlify, assuming you've set up their CLI already, you use:

    `npm run netlify:deploy`

5.  **Learn more**

    - [Gatsby Documentation](https://www.gatsbyjs.com/docs/)

    - [Netlify Documentation](https://docs.netlify.com/)

    - [Contentful GraphQL Documentation](https://www.contentful.com/developers/docs/references/graphql/)
