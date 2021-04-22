### try it out! http://butterfly-texteditor.surge.sh/

to start working on this repo:

install npm

1. create your own branch
2. push any changes to that branch
3. create a PR from that branch

to run the code:
```npm start``` in the terminal
```npm test``` to run any tests inside .test.js files


some useful git commands:

to start off:

```
git init
git clone https://github.com/Butterfly354/ButterflyEffectEditor.git
npm install
```

creating a new branch:

```
git fetch origin
git branch FEATURE_NAME origin/main
git push -u origin FEATURE_NAME
git checkout FEATURE_NAME
git pull
```

correct way to create a PR:

```
git add .
git commit -m"useful message"
git push origin BRANCH_NAME
```

on github: go to original repo, new pull request, select your branch, put reviewers, put description
