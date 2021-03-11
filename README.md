to start working on this repo:

1. fork it
2. push any changes to a branch on your own fork
3. create a PR from that branch

some useful git commands:

to start off:
```
git init
git clone https://github.com/YOUR_USERNAME/ButterflyEffectEditor.git
git remote add upstream https://github.com/Butterfly354/ButterflyEffectEditor.git
```

working on new feature, create a new branch and then start working from there:
```
git fetch upstream
git branch feature-name upstream/main
git push -u origin feature-name
git checkout feature-name
git pull
```

correct way to create a PR:
```
git add .
git commit -m"useful message"
git push origin main
```
on github: go to original repo, new pull request, compare across forks, select your forked repo to head fork, put reviewers, put description
