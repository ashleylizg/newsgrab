
# newsgrab

Grab news headlines for search terms you care about.

## Usage

Install newsgrab globally.

```
npm install -g newsgrab
```
 
Execute Google News headline searches for a line-separated file to return a JSON file (`output.json`) of search results.

```
newsgrab <path_to_list_of_search_terms>
```

## Example

Save the text contents below to a file `sample.txt` in the present working directory.

```
adelphi university
albany college of pharmacy and health sciences
albany law school
```

With your terminal in this directory, run the following.

```
newsgrab sample.txt
```

The output will appear as  `output.json` and look something like what's below.

```
[{"search_term":"adelphi university","results":["Adelphi University Spring 2020 Dean's List Honorees","Student from Ozark on Adelphi University Spring 2020 Dean’s List","Adelphi Introduces New Career-Focused BS in Health Sciences","Adelphi to Host Virtual Hispanic Community Partnership, Pre ...","SHELVED: Northeast-10 Conference suspends all sports ...","Union Student Among Adelphi University Spring 2020 Dean's ...","Why colleges are launching virtual gap years |","Adelphi offers new gap year program","No. 517: The universe ages, Adelphi goes for the Goldman and the AC is \ninvented (thank goodness)","Union Student Named Adelphi University Spring 2020 Dean's ..."]},{"search_term":"albany college of pharmacy and health sciences","results":["College chooses Albany NanoTech for new biopharmaceutical training center","Albany biopharma training center's goal: Grow a 'hub' of companies upstate","College of Pharmacy partnering with SUNY Poly","St. Peter's Hospital Congratulates Pharmacy Residency ...","Medical exemptions increased after NY ended religious ...","UAlbany, Siena, Skidmore plan early start to reduce on ...","COVID-19: How Safe Are You When Activities Reopen?","Broad-Spectrum Antibiotics Are Overused in Treatment of CA ...","Academic All-Star: Carina Willard","Greenberg shows leadership during COVID-19 | Letters To Editor"]},{"search_term":"albany law school","results":["The Court of Appeals Canceled the Bar Exam. Now What?","A Dozen Legal Education Entities Snagged PPP Loans ...","Albany officials: Wear masks, social distance, and avoid crowds","UAlbany, Siena, Skidmore plan early start to reduce on ...","“Landmark” SCOTUS Ruling Could Have Implications for NY's ...","The 2020 Albany 40 Under 40 Rising Stars | CSNY","Primary day kicks off in New York; includes Albany DA race","Trump tax ruling a new front in defamation suits against him","In Business","Parents concerned about student safety amid uptick in Albany violence"]}]
```
