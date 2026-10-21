/* ============ DATOS ============
   iso|nombre|continente|lado(L/R)|dominio|prefijo|alias (separados por coma)
   Prefijo vacío = compartido entre varios países (no se pregunta). */
const RAW=`ar|Argentina|América|R|ar|54|
bo|Bolivia|América|R|bo|591|
br|Brasil|América|R|br|55|brazil
cl|Chile|América|R|cl|56|
co|Colombia|América|R|co|57|
ec|Ecuador|América|R|ec|593|
py|Paraguay|América|R|py|595|
pe|Perú|América|R|pe|51|
uy|Uruguay|América|R|uy|598|
ve|Venezuela|América|R|ve|58|
mx|México|América|R|mx|52|mejico
us|Estados Unidos|América|R|us||eeuu,usa,ee uu,united states
ca|Canadá|América|R|ca||
cu|Cuba|América|R|cu|53|
do|República Dominicana|América|R|do||rd
cr|Costa Rica|América|R|cr|506|
pa|Panamá|América|R|pa|507|
gt|Guatemala|América|R|gt|502|
jm|Jamaica|América|L|jm||
es|España|Europa|R|es|34|spain
pt|Portugal|Europa|R|pt|351|
fr|Francia|Europa|R|fr|33|france
de|Alemania|Europa|R|de|49|deutschland,germany
it|Italia|Europa|R|it|39|italy
gb|Reino Unido|Europa|L|uk|44|uk,gran bretana,inglaterra,united kingdom
ie|Irlanda|Europa|L|ie|353|ireland
nl|Países Bajos|Europa|R|nl|31|holanda,netherlands
be|Bélgica|Europa|R|be|32|belgium
ch|Suiza|Europa|R|ch|41|switzerland
at|Austria|Europa|R|at|43|
pl|Polonia|Europa|R|pl|48|poland
cz|Chequia|Europa|R|cz|420|republica checa,czechia
sk|Eslovaquia|Europa|R|sk|421|slovakia
se|Suecia|Europa|R|se|46|sweden
no|Noruega|Europa|R|no|47|norway
fi|Finlandia|Europa|R|fi|358|finland
dk|Dinamarca|Europa|R|dk|45|denmark
is|Islandia|Europa|R|is|354|iceland
gr|Grecia|Europa|R|gr|30|greece
ru|Rusia|Europa|R|ru||russia
ua|Ucrania|Europa|R|ua|380|ukraine
ro|Rumania|Europa|R|ro|40|romania
hu|Hungría|Europa|R|hu|36|hungary
tr|Turquía|Asia|R|tr|90|turkey
jp|Japón|Asia|L|jp|81|japan
kr|Corea del Sur|Asia|R|kr|82|south korea
cn|China|Asia|R|cn|86|
in|India|Asia|L|in|91|
th|Tailandia|Asia|L|th|66|thailand
id|Indonesia|Asia|L|id|62|
my|Malasia|Asia|L|my|60|malaysia
ph|Filipinas|Asia|R|ph|63|philippines
vn|Vietnam|Asia|R|vn|84|
sg|Singapur|Asia|L|sg|65|singapore
il|Israel|Asia|R|il|972|
ae|Emiratos Árabes Unidos|Asia|R|ae|971|emiratos arabes,eau,uae
sa|Arabia Saudita|Asia|R|sa|966|arabia saudi,saudi arabia
mn|Mongolia|Asia|R|mn|976|
za|Sudáfrica|África|L|za|27|south africa
ke|Kenia|África|L|ke|254|kenya
ng|Nigeria|África|R|ng|234|
eg|Egipto|África|R|eg|20|egypt
ma|Marruecos|África|R|ma|212|morocco
sn|Senegal|África|R|sn|221|
bw|Botsuana|África|L|bw|267|botswana
gh|Ghana|África|R|gh|233|
au|Australia|Oceanía|L|au|61|
nz|Nueva Zelanda|Oceanía|L|nz|64|new zealand`;
