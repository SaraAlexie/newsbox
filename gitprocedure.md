1. stage alle filer: git stage .
    (eller git add .)
    git add src/html/index.html (tilføjer KUN index.html i html-mappen i src-mappen)

2. committe inklusiv commit besked:
    git commit -m "din besked her"

3. push din(e) commits til github:
    første gang på ny brach: git push -u origin branchname

    Herefter git push

## Oprette ny branch:
1. git branch branchname
2. git checkout branchname

## Skifte mellem branches
git checkout branchname

## Update master
git checkout master - gå over på master branch
git pull origin master - trækker det som er blevet merged til master på github ned på computeren.