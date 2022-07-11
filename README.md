# Living Sober - Raisely
Raisely Components and Styles for livingsober.org.nz donation website

## Dev Setup
Raisely uses a react component library and stylesheets that we can use to overide and style existing components and add new ones.

Raisley also essentially acts as a second remote, even though its not using git. Regardless you can pull down and push up code to it.
But you can't look at the history on it. So be careful

To setup the the [Raisely CLI](https://github.com/raisely/cli) follow thes instructions:

1. Install the CLI
```
npm install @raisely/cli -g
```

2. Login (Use the email and password in lastpass)
```
raisley login
```

NOTE: this will create/add credentials to the .raisely.json file. This is git ignored and should not be commited.

3. Run local dev
```
raisely local
```

4. Push your code to raisley
```
raisely deploy
```

If you want to live update the site (ie a dev site or draft site) you can run raisley in watch mode and it will auto deploy your changes, this is helpful for realtime collaborating/coding.
```
raisely start
```