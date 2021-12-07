# Projektdokumentation

#### Navn: Sara Nederskov

##### Hold: 1146521c105 / WU05

##### Uddannelse: Webudvikler

##### Uddannelsessted: Roskilde Tekniske Skole

[Link til (min applikaton)](https://gracious-gates-0b2cc0.netlify.app)


## Teknologier

-   HTML
-   CSS
-   JavaScript
-   Gulp
-   ...

---



### Redegørelse for oprindelsen af evt. tredjeparts kode anvendt i opgaveløsningen (Teknisk dokumentation)

(Hvilke node-pakker har du installeret for at dit projekt virker? Beskriv kort hvilket "problem" hver pakke løser.)

---

### Argumentation for de valg du selvstændigt har truffet under løsningen af opgaven

(Hvilke overvejelser har du gjort dig, fx. i forbindelse med dit valg af animationer)

---
### Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)

(Hvad gik godt. Hvor prioriterede du forkert. Klagesange fra de varme lande om halvfærdigt produkt, på grund af manglende nattesøvn, fordi din kæle-skildpadde havde tandpine er IKKE interessante.)

---
### En beskrivelse af særlige punkter til bedømmelse

(er der en særlig detalje som du synes din underviser bør lægge mærke til når dit projekt evalueres)

Du kan vise kode i markdown på følgende måder: 
```js
function myFunction() {
	
}
```

```css
.my__CSSrule {
	property: value;
}
```

## Saras dokumentation

### Gulp-template
Jeg startede med at tilføje min gulp-template til projektet, installerede devDependencies og sørgede for at det fungerede først. Jeg har gjort brug af de samme dependensies, som der var på templaten til at starte med, og har indtil videre ikke haft grund til at fjerne nogle eller installere nye.

### Kanban-board og arbejdsgang
Efter jeg havde fået styr på min gulp-process oprettede jeg et projekt på github og lavede et kanban-board. Til at starte med oprettede jeg de obligatoriske opgaver, som er beskrevet i projektet med kort og labels. Efterhånden som arbejdsprocessen er skredet frem, er der blevet oprettede flere issues med mere specifikke opgaver efterhånden som de er dukket op. Kanban-boardet er blevet opdateret løbende gennem hele processen. 

### De basale ting
Det første jeg gik i gang med at kode var html-siderne og stylingen af dem. Disse opgaver var nemme at gå til, og gav ikke de store problemer. Næste punkt blev at lave collapsibles på newsbox og archive siderne. Løsningen på denne opgave fandtes på w3schools og det var nemt at gå til. Alle farver der skal tilføjes bliver konsekvent skrevet i light.scss, darkmode kommer senere. Link til navigering mellem siderne er lavet med hhv. html og JavaScript. Der er blevet lavet en goBack funktion med history.back i JS til pilene i øverste venstre hjørne på settings og archive siderne.

### Xml og artiklerne
Jeg brugte metoden, som Carsten viste første dag med Praktisk web 2, til at konvertere xml til json. Da det kom til at skulle fetche artiklerne fra NYT og sætte dem ind under de forskellige kategorier på newsbox-siden, var der brug for hjælp. Problemet blev løst. Herefter kunne jeg se på archive- og settings-siderne, at der kom syv fejl i konsollen grundet fetchet til newsbox-siden. Dette blev løst med et if-statement. Dernæst lavede jeg hver artikel om til at a-tag, som ville føre videre til den valgte artikel på NYTs hjemmeside.

### Darkmode og lightmode
Denne del startede med at være mere besværlig end jeg havde regnet med. Jeg havde ikke holdt så godt styr på farverne som jeg troede, så det ordnede jeg først. I hele processen med at finde farver til darkmode opdagede jeg en del småfejl i min html og scss, som jeg fixede. Da darkmode.scss var færdig var der gået en hel dag. Efter at have rettet i dark-mode.js med hjælp fra Carsten virkede det, men kun på settings.html. Efter åbenbaringen med at datatyper har en betydning lykkedes det at få det til at virke.

## Nyhedsvisning
Den var lidt tricky. Først blev toggleswitches sat til at være checked, og så blev de kodet til at kunne huske, hvorvidt de var checked eller ej, også efter siden var blevet forladt. Herefter lavede jeg et array med alle mine switches og loopede igen dem, så jeg kunne få fat i hver enkelt. Herefter ændrede jeg koden i xmlfetch, så den kune fetchede, hvis den korresponderende toggleswitch var slået til. Koden viste sig at være mere enkel end jeg havde regnet med, men svær at tænke sig frem til, derfor var der også brug for hjælp.

## Swipefunktionerne, gem og slet
Denne opgave er uden tvivl den sværeste. Det første skridt var, at lave selve swipefunktionen på de artikler der allerede var blevet fetchet på newsbox-siden. Der blev lavet en generisk swipefunktion, der kan genbruges i andre projekter, og det virkede. Herefter stylede og indsatte jeg gem-knappen, som nu bare skal virke. Den virker nu med localStorage efter hjælp fra Carsten, findIndex() og closest. Nu er næste problem at få de gemte nyheder vist på archive-siden.

## De sidste tanker
Hvad gik godt? Jeg vil mene, at jeg generelt har været god til at prioritere arbejdsopgaverne og disponere over min tid, med undtagelse af den dag jeg arbejdede hjemme, da jeg bare ikke er god til hjemmearbejde. Jeg har benyttet mig meget af muligheden for at snakke med folk i klassen om mulige løsninger på forskellige opgaver i projektet, hvilket har været meget givende i arbejdsprocessen.
Hvad gik ikke så godt? Jeg tror nogle gange jeg spurgte andre lidt for hurtigt om hjælp. I stedet vil jeg i fremtidige opgaver gøre mere ud af at prøve at finde en løsning selvstændigt, så jeg også kan det.