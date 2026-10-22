/* ============ DATOS ============
   iso|nombre|continente|lado(L/R)|dominio|prefijo|alias (separados por coma)
   Prefijo vacío = compartido entre varios países (no se pregunta). */
const RAW=`ar|Argentina|América|R|ar|54|
bo|Bolivia|América|R|bo|591|
br|Brasil|América|R|br|55|brazil
cl|Chile|América|R|cl|56|
co|Colombia|América|R|co|57|
ec|Ecuador|América|R|ec|593|
pe|Perú|América|R|pe|51|
uy|Uruguay|América|R|uy|598|
mx|México|América|R|mx|52|mejico
us|Estados Unidos|América|R|us||eeuu,usa,ee uu,united states
ca|Canadá|América|R|ca||
do|República Dominicana|América|R|do||rd
gt|Guatemala|América|R|gt|502|
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
in|India|Asia|L|in|91|
th|Tailandia|Asia|L|th|66|thailand
id|Indonesia|Asia|L|id|62|
my|Malasia|Asia|L|my|60|malaysia
ph|Filipinas|Asia|R|ph|63|philippines
sg|Singapur|Asia|L|sg|65|singapore
il|Israel|Asia|R|il|972|
ae|Emiratos Árabes Unidos|Asia|R|ae|971|emiratos arabes,eau,uae
mn|Mongolia|Asia|R|mn|976|
za|Sudáfrica|África|L|za|27|south africa
ke|Kenia|África|L|ke|254|kenya
ng|Nigeria|África|R|ng|234|
sn|Senegal|África|R|sn|221|
bw|Botsuana|África|L|bw|267|botswana
gh|Ghana|África|R|gh|233|
au|Australia|Oceanía|L|au|61|
nz|Nueva Zelanda|Oceanía|L|nz|64|new zealand
al|Albania|Europa|R|al|355|
ad|Andorra|Europa|R|ad|376|
bg|Bulgaria|Europa|R|bg|359|
hr|Croacia|Europa|R|hr|385|croatia
ee|Estonia|Europa|R|ee|372|
lv|Letonia|Europa|R|lv|371|latvia
lt|Lituania|Europa|R|lt|370|lithuania
lu|Luxemburgo|Europa|R|lu|352|luxembourg
mc|Mónaco|Europa|R|mc|377|monaco
me|Montenegro|Europa|R|me|382|
mk|Macedonia del Norte|Europa|R|mk|389|north macedonia
rs|Serbia|Europa|R|rs|381|
si|Eslovenia|Europa|R|si|386|slovenia
sm|San Marino|Europa|R|sm|378|san marino
ls|Lesoto|África|L|ls|266|lesotho
mg|Madagascar|África|R|mg|261|
rw|Ruanda|África|R|rw|250|rwanda
sz|Esuatini|África|L|sz|268|eswatini,swazilandia,swaziland
ug|Uganda|África|L|ug|256|
bd|Bangladés|Asia|L|bd|880|bangladesh
bt|Bután|Asia|L|bt|975|bhutan
kh|Camboya|Asia|R|kh|855|cambodia
kg|Kirguistán|Asia|R|kg|996|kyrgyzstan
la|Laos|Asia|R|la|856|
pk|Pakistán|Asia|L|pk|92|pakistan
qa|Catar|Asia|R|qa|974|qatar
lk|Sri Lanka|Asia|L|lk|94|
tw|Taiwán|Asia|R|tw|886|taiwan
jo|Jordania|Asia|R|jo|962|jordan
mt|Malta|Europa|L|mt|356|
tn|Túnez|África|R|tn|216|tunez,tunisia
im|Isla de Man|Europa|L|im||isle of man,man
fo|Islas Feroe|Europa|R|fo|298|feroe,faroe,faroe islands,islas faroe
gl|Groenlandia|América|R|gl|299|greenland
re|Reunión|África|R|re||isla reunion,la reunion,reunion
yt|Mayotte|África|R|yt||
gi|Gibraltar|Europa|R|gi|350|
je|Jersey|Europa|L|je||
gg|Guernsey|Europa|L|gg||
ax|Åland|Europa|R|ax||aland,islas aland
pr|Puerto Rico|América|R|pr||
vi|Islas Vírgenes de EE. UU.|América|L|vi||islas virgenes,virgenes,us virgin islands,islas virgenes de estados unidos
gu|Guam|Oceanía|R|gu||
mp|Islas Marianas del Norte|Oceanía|R|mp||marianas,marianas del norte,northern mariana islands
as|Samoa Americana|Oceanía|R|as||american samoa
hk|Hong Kong|Asia|L|hk|852|
mo|Macao|Asia|L|mo|853|macau
ps|Palestina|Asia|R|ps|970|palestine
cw|Curazao|América|R|cw|599|curacao
mq|Martinica|América|R|mq|596|martinique
gp|Guadalupe|América|R|gp|590|guadeloupe
gf|Guayana Francesa|América|R|gf|594|french guiana,guyane
fk|Islas Malvinas|América|L|fk|500|malvinas,falkland,falklands,islas falkland,falkland islands
bm|Bermudas|América|L|bm||bermuda
nf|Isla Norfolk|Oceanía|L|nf|672|norfolk,norfolk island
cx|Isla de Navidad|Oceanía|L|cx||christmas island,navidad`;
