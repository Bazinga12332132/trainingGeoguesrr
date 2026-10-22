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
nz|Nueva Zelanda|Oceanía|L|nz|64|new zealand
al|Albania|Europa|R|al|355|
ad|Andorra|Europa|R|ad|376|
ba|Bosnia y Herzegovina|Europa|R|ba|387|bosnia,bosnia herzegovina
bg|Bulgaria|Europa|R|bg|359|
hr|Croacia|Europa|R|hr|385|croatia
cy|Chipre|Europa|L|cy|357|cyprus
ee|Estonia|Europa|R|ee|372|
lv|Letonia|Europa|R|lv|371|latvia
lt|Lituania|Europa|R|lt|370|lithuania
lu|Luxemburgo|Europa|R|lu|352|luxembourg
md|Moldavia|Europa|R|md|373|moldova
mc|Mónaco|Europa|R|mc|377|monaco
me|Montenegro|Europa|R|me|382|
mk|Macedonia del Norte|Europa|R|mk|389|north macedonia
rs|Serbia|Europa|R|rs|381|
si|Eslovenia|Europa|R|si|386|slovenia
sm|San Marino|Europa|R|sm|378|san marino
li|Liechtenstein|Europa|R|li|423|
va|Ciudad del Vaticano|Europa|R|||vaticano,vatican city
by|Bielorrusia|Europa|R|by|375|belarus
dz|Argelia|África|R|dz|213|algeria
ao|Angola|África|R|ao|244|
bj|Benín|África|R|bj|229|benin
bf|Burkina Faso|África|R|bf|226|
cm|Camerún|África|R|cm|237|cameroon
cd|República Democrática del Congo|África|R|cd|243|dr congo,congo kinshasa
cg|República del Congo|África|R|cg|242|congo brazzaville
ci|Costa de Marfil|África|R|ci|225|ivory coast,cote d ivoire
et|Etiopía|África|R|et|251|ethiopia
ls|Lesoto|África|L|ls|266|lesotho
mg|Madagascar|África|R|mg|261|
mu|Mauricio|África|L|mu|230|mauritius
mz|Mozambique|África|L|mz|258|
na|Namibia|África|L|na|264|
rw|Ruanda|África|R|rw|250|rwanda
sz|Esuatini|África|L|sz|268|eswatini,swazilandia,swaziland
tz|Tanzania|África|L|tz|255|
ug|Uganda|África|L|ug|256|
zm|Zambia|África|L|zm|260|
zw|Zimbabue|África|L|zw|263|zimbabwe
af|Afganistán|Asia|R|af|93|afghanistan
am|Armenia|Asia|R|am|374|
az|Azerbaiyán|Asia|R|az|994|azerbaijan
bd|Bangladés|Asia|L|bd|880|bangladesh
bt|Bután|Asia|L|bt|975|bhutan
bn|Brunéi|Asia|L|bn|673|brunei
kh|Camboya|Asia|R|kh|855|cambodia
ge|Georgia|Asia|R|ge|995|
kz|Kazajistán|Asia|R|kz||kazakhstan
kg|Kirguistán|Asia|R|kg|996|kyrgyzstan
la|Laos|Asia|R|la|856|
lb|Líbano|Asia|R|lb|961|lebanon
mm|Myanmar|Asia|R|mm|95|birmania,burma
np|Nepal|Asia|L|np|977|
pk|Pakistán|Asia|L|pk|92|pakistan
qa|Catar|Asia|R|qa|974|qatar
lk|Sri Lanka|Asia|L|lk|94|
tw|Taiwán|Asia|R|tw|886|taiwan
uz|Uzbekistán|Asia|R|uz|998|uzbekistan
jo|Jordania|Asia|R|jo|962|jordan
kw|Kuwait|Asia|R|kw|965|
bh|Baréin|Asia|R|bh|973|bahrain
om|Omán|Asia|R|om|968|oman
bs|Bahamas|América|L|bs||
bb|Barbados|América|L|bb||
bz|Belice|América|R|bz|501|belize
sv|El Salvador|América|R|sv|503|
hn|Honduras|América|R|hn|504|
ht|Haití|América|R|ht|509|haiti
ni|Nicaragua|América|R|ni|505|
tt|Trinidad y Tobago|América|L|tt||
gy|Guyana|América|L|gy|592|
sr|Surinam|América|L|sr|597|suriname
fj|Fiyi|Oceanía|L|fj|679|fiji
pg|Papúa Nueva Guinea|Oceanía|L|pg|675|papua new guinea
sb|Islas Salomón|Oceanía|L|sb|677|solomon islands
vu|Vanuatu|Oceanía|R|vu|678|
ws|Samoa|Oceanía|L|ws|685|
to|Tonga|Oceanía|L|to|676|
bi|Burundi|África|R|bi|257|
cf|República Centroafricana|África|R|cf|236|central african republic,centroafricana
td|Chad|África|R|td|235|chad
km|Comoras|África|R|km|269|comoros
dj|Yibuti|África|R|dj|253|djibouti
gq|Guinea Ecuatorial|África|R|gq|240|equatorial guinea
er|Eritrea|África|R|er|291|
ga|Gabón|África|R|ga|241|gabon
gm|Gambia|África|R|gm|220|
gn|Guinea|África|R|gn|224|
gw|Guinea-Bisáu|África|R|gw|245|guinea bissau,guinea bisau
lr|Liberia|África|R|lr|231|
ly|Libia|África|R|ly|218|libya
mw|Malaui|África|L|mw|265|malawi
ml|Malí|África|R|ml|223|mali
mr|Mauritania|África|R|mr|222|
ne|Níger|África|R|ne|227|niger
sl|Sierra Leona|África|R|sl|232|sierra leone
so|Somalia|África|R|so|252|
ss|Sudán del Sur|África|R|ss|211|south sudan
sd|Sudán|África|R|sd|249|sudan
tg|Togo|África|R|tg|228|
tn|Túnez|África|R|tn|216|tunisia
cv|Cabo Verde|África|R|cv|238|cape verde
st|Santo Tomé y Príncipe|África|R|st|239|sao tome y principe,sao tome and principe
sc|Seychelles|África|L|sc|248|
ir|Irán|Asia|R|ir|98|iran
iq|Irak|Asia|R|iq|964|iraq
sy|Siria|Asia|R|sy|963|syria
ye|Yemen|Asia|R|ye|967|
tj|Tayikistán|Asia|R|tj|992|tajikistan
tm|Turkmenistán|Asia|R|tm|993|turkmenistan
tl|Timor Oriental|Asia|L|tl|670|east timor,timor leste
mv|Maldivas|Asia|L|mv|960|maldives
kp|Corea del Norte|Asia|R|kp|850|north korea
ps|Palestina|Asia|R|ps|970|palestine
ki|Kiribati|Oceanía|R|ki|686|
mh|Islas Marshall|Oceanía|R|mh|692|marshall islands
fm|Micronesia|Oceanía|R|fm|691|estados federados de micronesia,federated states of micronesia
nr|Nauru|Oceanía|L|nr|674|
pw|Palaos|Oceanía|R|pw|680|palau
tv|Tuvalu|Oceanía|L|tv|688|
ag|Antigua y Barbuda|América|L|ag||antigua and barbuda,antigua
dm|Dominica|América|L|dm||
gd|Granada|América|L|gd||grenada
kn|San Cristóbal y Nieves|América|L|kn||saint kitts and nevis,san cristobal y nieves,st kitts
lc|Santa Lucía|América|L|lc||saint lucia,santa lucia
vc|San Vicente y las Granadinas|América|L|vc||saint vincent,san vicente
mt|Malta|Europa|L|mt|356|
xk|Kosovo|Europa|R|xk|383|`;
