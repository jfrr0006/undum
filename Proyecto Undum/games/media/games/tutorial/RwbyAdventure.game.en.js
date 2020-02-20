// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
            "<p><h1>Recepcionista en el lobby:</h1>\
        <img src='media/img/recepcionista.png' class='float_right'>\
        <p>&iexcl; ENHORABUENA ! </p> <p> Has sido aceptado/a \
        en la maravillosa y magistral academia de Beacon, &iexcl;justo como quer&iacute;as! \
        Aqu&iacute; comenzar&aacute;s a entrenarte como un aut&eacute;ntico. \
        cazador, o cazadora, siempre dispuesto a derrotar a los Grimms y echar una mano \
        a quien lo necesite. </p>\
        \
        <p>&iquest;C&oacute;mo? &iquest;Qu&eacute; no sabes que es un <a href='./que-es-un-grimm'>Grimm</a>?\
        &iexcl;Es el motivo por el que elegiste entrar aqu&iacute;!\
        Esos bichos horrendos que se alimentan del odio y el miedo de los dem&aacute;s,\
        ya sabes; el pelo negro, ojos rojos y armadura hecha de sus propios huesos.\
        </p>\
        \
        <p class='transient'><a href='hub'>Continuar...</a></p>",
            {
                actions: {
                    'que-es-un-grimm': "<p> <h1>Grimms</h1>\
                  <center><img src='media/img/yaguara.png'></center>\
                  Los Grimm fueron creados originalmente por el Dios de la Oscuridad. \
                  Son descritos como 'criaturas de destrucci&oacute;n' que carecen de un alma; por lo tanto, \
                  no pueden usar Aura. Tambi&eacute;n se sienten\
                  atra&iacute;dos por los sentimientos de negatividad, como la envidia, la tristeza,\
                  la soledad, el odio, etc., que a menudo se congregan en la fuente de estas emociones.</p>"
                }
            }

    ),

    // NB: The 'hub' situation which is the main list of topics, is
    // defined wholly in the HTML file, and doesn't have an entry in
    // the game.situations dictionary in this file.

    // For variety, here we define a situation using the top-level
    // Situation type. This is a neat approach to generate text by
    // looking it up in the HTML document. For static text that makes
    // more sense than writing it longhand.
    situations: new undum.Situation({
        enter: function (character, system, from) {
            system.write($("#s_situations").html());
        },
        tags: ["topic"],
        id: "dorm",
        optionText: "El Dormitorio",
        displayOrder: 1
    }),

    noarma: new undum.SimpleSituation(
            "<p> Decides no darle importancia a aquel extra&ntilde;o bulto que se encontraba en tu cama, &iquest;y si era uno de esos Grimms?\
La opci&oacute;n m&aacute;s sensata era salir corriendo, y as&iacute; lo haces, concretamente en direcci&oacute;n hacia...</br> <a href='hub'>Continuar...</a></p>"

            ),
    
    arma: new undum.SimpleSituation(
            "<p>Decides levantar las s&aacute;banas que yacen debajo tuya, \
         y para tu grata y enorme sorpresa, una especie de arma \
         se encontraba ah&iacute; escondida. Con una peque&ntilde;ita nota adherida a su mango.\
         <center><img src='media/img/arma.png'></center></p>\
         \
        <p style=color:gray;><i> 'Espero que te sirva para limpiar tu camino de injusticias, \
        y para traer la paz que tanto necesitamos. Tu abuelo que te quiere y cuida, \
        desde siempre y para siempre.' </i></p>\
        \
        <p>Se trataba de una compleja guada&ntilde;a capaz de doblarse sobre s&iacute; misma \
        para disparar distintos tipos de proyectiles. Sin duda tu abuelo sab&iacute;a cuidarte.\
        </p>\
        \
        <p class='transient'>\
        <a href='./luck-boost'>Guardar el arma</a> y\
        <a href='./continuar-arma'>continuar</a> </p>\
        \
        <p>",
            {
                actions: {
                    "luck-boost": function (character, system, to) {
                        system.setQuality("arma", 1);
                        system.setCharacterText(
                                "<p>&iexcl;Con este pedazo de arma seguro que eres capaz de protegerte de los peligros venideros!</p>");
                    },
                    "continuar-arma": "<p>Ahora te sientes m&aacute;s seguro y listo para el combate,\
                                    as&iacute; que decides seguir \
                                    explorando el lugar, con tu guada&ntilde;a doblada de \
                                    la manera m&aacute;s compacta posible, \
                                    ocult&aacute;ndola en la parte trasera de tus ropajes.\
                                    <a href='hub'>Continuar...</a></p>"
                },
                exit: function (character, system, to) {
                    system.setQuality("estudiante", 1);
                }
            }
    ),

    links: new undum.SimpleSituation(
            "<p> Deambulando por los pasillos, un delicioso y apetitoso olor llega a tus fosas nasales.\
Tu est&oacute;mago comienza a rugir, y recuerdas que llevas por lo menos veinte minutos sin llevarte nada al est&oacute;mago. Eso est&aacute; claro que no son condiciones para trabajar.\
Bueno, o lo que se supone que vayas a hacer.\
Siguiendo aquel rastro del mismo modo que un tigre persigue a su presa, llegas a una sencilla pero amplia habitaci&oacute;n donde se encontraba la cocina de la academia.\
Varios cocineros y cocineras se encontraban trabajando, las ollas al fuego con enormes guisos, las sartenes rezumando con los sofritos y los hornos desprendiendo calor a la vez que deliciosos olores achocolatados.\
Casi te pod&iacute;as dar por satisfecho con tan solo aquella mezcla de fragancias.\
 </p><p><center><img src='media/img/cocina.png'></center></p>\
         <p>En ese momento, en el que tus ojos casi se pon&iacute;an en blanco y\
            casi parec&iacute;as estar extasiado,</p>\
            una amable cocinera se percata de tu presencia, y ante tu extra&ntilde;o \
            semblante, los ojos de loco \
            y la baba casi cay&eacute;ndose por la comisura de tus labios, te ofrece una \
            peque&ntilde;a quiche casera de\
            distintos tipos de queso, bien tostada y gratinada por arriba.</p>\
        \
        <p>En cuesti&oacute;n de unos segundos, aquella pobre quiche se encontraba siendo engullida casi sin masticar. \
              Amablemente, y en cuanto pudiste dejar la boca vac&iacute;a para hacerlo con educaci&oacute;n, diste las gracias\
              a aquella cocinera que alegremente volv&iacute;a a su trabajo. Ahora si, con el est&oacute;mago lleno, era momento de <a href='hub'>continuar con tu camino</a>.\
             </p>\
        \
        </p>",
            {
                heading: "La cocina",
                diplayOrder: 2,
                tags: ["topic"]
            }

    ),

    qualities: new undum.SimpleSituation(
            "<p>No sabes muy bien c&oacute;mo, pero acabas llegando a una enooooorme puerta,\
         que obviamente decides abrir pues tu curiosidad te sobrepasa.\
         <p><center><img src='media/img/biblio.png'></center></p>\
        Ante ti, se muestra una enorme sala llena de alt&iacute;simas estanter&iacute;as\
        repletas de distintos tipos de libros y otros materiales audiovisuales.\
        El silencio era m&aacute;s que notorio, ni siquiera un leve susurro se escuchaba \
        en aquella vasta habitaci&oacute;n, las personas que consegu&iacute;as divisar con la mirada\
        se encontraban absortas leyendo o estudiando, o incluso alguno que otro que \
        estaba hasta durmiendo sobre una de las mesas.\
       </p>\
       <p><center><img src='media/img/prueba.png'></center></p>\
        \
        Inspeccionas un poco el lugar, caminas por los diferentes pasillos de \
        estanter&iacute;as y de repente, un peque&ntilde;o detalle llama tu atenci&oacute;n.\
        Un libro de cubierta negra, con un ojo rojo en el dorso se encontraba\
        algo m&aacute;s salido que el resto, a la altura de tus ojos y casi parec&iacute;a a punto de caerse.\
        \
        <p><center><img src='media/img/Libro.png'></center></p>\
        \
        <p class='transient'><a href='./skill-boost'>Decides cogerlo, total, un libro es un libro</a> || \
        <a href='hub'>Mejor lo dejas, no te ha dado muy buena espina</a></p>\
        <p> </p>\
        <p>Tras tu decisi&oacute;n decides <a href='hub'>Continuar con la aventura</a></p>\
        </p>",
            {
                heading: "La Biblioteca",
                tags: ["topic"],
                displayOrder: 3,
                actions: {
                    "skill-boost": function (character, system, to) {
                        system.setQuality("libro", 1);
                        system.setCharacterText(
                                "<p>&iexcl;Ahora que has cometido una ilegalidad, sal por patas de ah&iacute;\
                                antes de que te pillen! El Hall principal es el sitio mas seguro.</p>");
                    }
                },
               
            }
    ),
    "quality-types": new undum.SimpleSituation(
            "<p>\
        <br>Sin comerlo ni beberlo, aquella joven de pelo corto y oscuro se hab&iacute;a puesto a soltarte la\
        chapa de tu vida, lo &uacute;nico que sacaste en claro es que se llamaba Ruby y que, como\
        pudiste comprobar, socializar no era su fuerte.\
        and 'Estudiante' is using just a check-mark.</br></p>\
        \
        <p>Antes de que siquiera pudieras contestarle y decirle tu nombre, el director encendi&oacute; una \
           pantalla enorme en la que se pod&iacute;an ver los diferentes huecos de los que ser&iacute;an los equipos. \
           Resulta que todos los a&ntilde;os se hab&iacute;a realizado un sorteo para hacer grupos de cuatro personas,\
           pero esta vez hab&iacute;an decidido que durante el primer mes, el grupo estuviera conformado tan solo \
           por una pareja, y que transcurrido ese mes, cada pareja pudiera seleccionar a otra mediante votaci&oacute;n,\
           para eliminar as&iacute; la mayor cantidad de incompatibilidades posibles en cuanto a la personalidad se refer&iacute;a.\
        </p>\
        <p><br>Poco a poco las parejas iban apareciendo en pantalla de manera totalmente aleatoria,\
            y conforme se establec&iacute;an, ambos miembros sal&iacute;an de aquella sala, dando por concluida \
            la presentaci&oacute;n.</br></p>\
        \
        <p><center><img src='media/img/pantalla.png'></center></p>\
        \
        <p>Era cuesti&oacute;n de tiempo que tu rostro apareciese all&iacute;, y as&iacute; fue, \
           solo que literalmente fue el &uacute;ltimo, as&iacute; que quedaba poco de sorpresa \
           en cuanto a qui&eacute;n podr&iacute;a ser tu pareja.\
           Siendo caprichoso el azar como es, a tu lado apareci&oacute; el rostro \
           y nombre de la persona que te acompa&ntilde;ar&iacute;a durante este primer mes \
           de entrenamiento, efectivamente, se trataba de Ruby, aquella exc&eacute;ntrica \
           joven que acababa de hacer contacto contigo.\
        </p>\
        <br><p>De manera casi instant&aacute;nea, la de hebras casta&ntilde;as se lanz&oacute; hac&iacute;a ti\
            abraz&aacute;ndote y saltando de alegr&iacute;a a tu alrededor. \
            Sin duda iba a ser una ardua tarea el aguantar aquella 'alegr&iacute;a' un d&iacute;a tras otro</p></br>\
        \
        <p>  Justo cuando ambos proced&iacute;ais a salir del lugar, un ligero murmullo se empez&oacute; a formar\
             entre los distintos profesores y cazadores que all&iacute; hab&iacute;an. \
             Alguno de ellos alz&oacute; la vista, e hizo contacto visual contigo. \
             R&aacute;pidamente avanz&oacute; hacia ti, con paso firme y decidido, y agarr&oacute; como pudo tu brazo con cierta gentileza. \
              \
             </p>\
        \
        \
        <p><br><i>'S&eacute; que quiz&aacute;s es algo precipitado decirte algo as&iacute;, pero, &iquest;qu&eacute; te parecer&iacute;a salir ahora mismo en una peque&ntilde;a misi&oacute;n urgente'\
               Si, suena a locura para alguien reci&eacute;n llegado, pero nos acaba de llegar el aviso, y la mayor&iacute;a de cazadores de rango alto tienen asignadas misiones prioritarias.\
               Sin embargo, esta no es una de esas que debemos dejar pasar. \
               Si te preguntas por qu&eacute; a ti, bueno, eres la &uacute;nica persona que quedaba en la sala cuando hemos recibido el aviso.\
               Entender&iacute;amos que no quisieras aceptar esto, est&aacute;s en tu derecho y podemos buscar a otro estudiante de cazador para que acuda a dicho deber.'\
              </br></i></p>\
              <p><br>Efectivamente, tu algo hiperactiva compa&ntildeera deb&iacute;a de haber salido corriendo hacia vuestra ahora compartida habitaci&oacute;n en cuanto se di&oacute; \
                 la noticia, siendo as&iacute; t&uacute;, el &uacute;ltimo en salir del Hall.</br></p>\
        <p>Ahora estaba en tus manos, &iquest;Deber&iacute;as\
        <a href='character-text'>ir a la misi&oacute;n</a> o por el contrario\
        <a href='rechazas-mision'>rechazar ir a la misi&oacute;n para comenzar tu entrenamiento en pareja?</a>.\<p>",
    ),
    
    "character-text": new undum.SimpleSituation(
            "<h1>Misi&oacute;n</h1>\
        <p>Decidiste ir a aquella misi&oacute;n urgente tal como te hab&iacute;an pedido.\
        Para ti, el cumplir con tu deber como cazador as&iacute; como la experiencia adquirida con aquella\
        misi&oacute;n estaban muy por encima de el forjar ning&uacute;n tipo de relaci&oacute;n, y m&aacute;s con una persona\
        como la que te hab&iacute;a tocado por compa&ntilde;era.\
        Una nave de transporte te dej&oacute; en el punto de aterrizaje, se te ha pedido que hagas una\
        peque&ntilde;a expedici&oacute;n pues algunos pueblerinos alegan haber visto un Grimm merodeando\
        por sus tierras, para tu suerte, uno no demasiado grande, o eso esperabas.\
        <br></br>\
        <p><center><img src='media/img/ciudad.png'></center></p>\
        </p>\
        \
        <p>Pasaron d&iacute;as de investigaci&oacute;n, pero por fin, tras hablar con varios habitantes y conseguir </p>\
        peque&ntilde;as pistas e indicaciones acerca de d&oacute;nde podr&iacute;as hallar a dicha criatura as&iacute; como de \
        su comportamiento, sales en direcci&oacute;n a un peque&ntilde;o camino de tierra, atravesando una \
        cueva llena de peque&ntilde;os y relucientes cristales, y volviendo a salir de &eacute;sta para llegar a un\
        claro en lo que parec&iacute;a ser un peque&ntilde;o bosque.\
        \
        <p><center><img src='media/img/cueva.png'></center></p>\
        \
        <p>Aunque, n&oacute;tese la iron&iacute;a de la situaci&oacute;n, aquel claro se estaba volviendo cada vez m&aacute;s oscuro, \
           la luz del d&iacute;a comenzaba a apagarse conforme la noche se echaba encima, aquella rota luna que caracterizaba al mundo \
           de Remnant se alzaba, arrojando algo de claridad.</p>\
           <p>Pasados unos instantes, notas como una peque&ntilde;a perturbaci&oacute;n en el viento se desliza\
              suavemente contra tu piel.\
              Poco a poco, las corrientes de viento se vuelven m&aacute;s fuertes, hasta el punto que tienes que protegerte los ojos con tu brazo para que el polvo no entrase directo en ellos.</p>\
              <p>En cuanto pudiste abrir los p&aacute;rpados y mirar cual era la fuente de aquel molesto </p>\
              espect&aacute;culo, casi se pudo escuchar en todo el bosque como tu mand&iacute;bula tocaba el suelo,\
              boquiabierto ante la bestia que se postraba frente a ti, con intenciones no demasiado buenas.</p>\
              <p>Un enorme monstruo que mezclaba los aspectos caracter&iacute;sticos de un drag&oacute;n y un Grimm,</p>\
              elevaba sus alas a la par que dejaba salir un alt&iacute;simo aullido, casi tan molesto como el\
              discursito de la compa&ntilde;era que casi acaba por acompa&ntilde;arte durante un mes.</p>\
              \
              <br><p><center><img src='media/img/dragon.png'></center></p></br>\
              \
              <br><p>El miedo parece controlarte, pero sabes que no te quedan demasiadas opciones, tienes que\
                     decidir qu&eacute; hacer antes de que el Grimm lo decida primero, pues seguro que no iba a ser \
                     demasiado piadoso contigo. Pero, &iquest;cu&aacute;l ser&iacute;a la mejor de las opciones?</p></br>\
        <p class='transient'>\
        <a href='eleccion'>Realiza con cuidado tu elecci&oacute;n</a></p>\n",
            {
                enter: function (character, system, to) {
                   system.setCharacterText(
                                "<p>Has salido de expedici&oacute;n a la misi&oacute;n</p>");
                    },
            }
    ),
    progress: new undum.SimpleSituation(
            "<p><center><img src='media/img/pasillo.png'></center>\
        A ra&iacute;z de seguir unos pasillos m&aacute;s grandes y amplios que los normales, \
        y decorados algo exc&eacute;ntricos, desembocas en lo que parece ser la entrada \
        a un gran aula.\
        No es otra cosa que el Hall principal del que te hab&iacute;a hablado \
        con anterioridad la recepcionista.\
        \
        <p><center><img src='media/img/sala.png'></center></p>\
        <p>En el momento que entras, varias personas se te quedan mirando, \
        llegabas algo tarde y el director ya se encontraba a punto de empezar su discurso.\
        R&aacute;pidamente, te colocas junto al primer grupo con aspecto de cazadores que all&iacute; se \
        encontraba y un peque&ntilde;o sentimiento de abrumaci&oacute;n se adentraba en tu cuerpo al sentirte \
        tan peque&ntilde;o frente al director, el p&uacute;blico y los dem&aacute;s cazadores de rangos m&aacute;s altos.\
        En cuanto el resto de la sala guard&oacute; silencio, el director, subido a un peque&ntilde;o atril comenz&oacute; a hablar.\
        \
        <a href='discurso'>Continuar...</a> \
        </p>",
            {
                tags: ["topic"],
                heading: "El Hall Principal",
                displayOrder: 4,
            }
    ),

    discurso: new undum.Situation({
        enter: function (character, system, from) {
            system.write($("#s_discurso").html());
        }
    }),

    "atacar": new undum.SimpleSituation(
            "<p> <p> <h1>Decides atacar</h1> \
             \
             <p>Das gracias por haber llevado contigo a Crescent Rose, el arma que tu abuelo \
                te di&oacute; para ayudarte en tu nueva vida. R&aacute;pidamente la despliegas, y esa gran guada&ntilde;a \
                se alza ante ti, por un momento, te ves capaz de cualquier cosas y tu coraz&oacute;n se llena de determinaci&oacute;n. \
                Aquel grimm vuelve a rugir, desplegando las alas y abriendo aquella enorme boca; antes de que te dieras \
                cuenta, se estaba abalanzando sobre t&iacute;, pareciera que iba a engullirte de un momento a otro. \
                <p><center><img src='media/img/dragonV.png'></center></p>\
                <p>Con toda la agilidad que tu algo desentrenado cuerpo te permiti&oacute;, consigues escapar de aquel bocado, \
                   apoyando tu guada&ntilde;a en el suelo para ayudarte a rotar hacia la derecha. Y conforme tu tronco terminaba \
                   de colocarse en aquella posici&oacute;n, levantaste tu arma, gir&aacute;ndola por encima de tu cabeza y propinando un \
                   fuerte golpe contra el lateral de aquel monstruo.\
                   </p>\
                   <p>El corte fue prominente e hizo que la bestia emitiera un fuerte gru&ntilde;ido, pero ni de cerca era suficiente \
                      para tumbarla. Necesitabas alg&uacute;n tipo de estrategia capaz de machacarle antes de que fueras tu quien \
                      sufriera sus golpes, en cuesti&oacute;n de resistencia dudabas poder ganar.</p>\
                      <p>El baile del intercambio de golpes dur&oacute; por varios minutos m&aacute;s, mientras intentabas estudiar \
                         los movimientos del majestuoso pero peligroso rival que ten&iacute;as en frente. \
                         Notaste un peque&ntilde;o patr&oacute;n en sus movimientos, y decidiste intentar una locura para tumbarlo de una vez por todas.</p>\n\
                         <p>Antes de intentar propinarte un fuerte golpe, siempre intentaba coger la suficiente altura para caer en picado a por ti. \
                            As&iacute; que, no tuviste otra idea si no que subir con &eacute;l. Si consegu&iacute;as tumbarlo en su punto m&aacute;s alto, estabas seguro de que \
                            no podr&iacute;a sobrevivir a la ca&iacute;da, el problema es que tus probabilidades de salir ileso tampoco parec&iacute;an estar a tu favor. \
                            \
            \
            <p><center><img src='media/img/DragonMug.png'></center></p>\
            As&iacute; lo decidiste, y as&iacute; lo hiciste. El poderoso Grimm comenz&oacute; a alzar su vuelo, y con un r&aacute;pido movimiento conseguiste clavar la guada&ntilde;a en su espalda para alzarte con &eacute;l. \
            El semidrag&oacute;n comenz&oacute; a vociferar mientras daba vueltas sobre su propio eje para tirarte de su lomo. A duras penas consegu&iacute;as aguantar, como si de una escalada en los Alpes \
            se tratara, clavabas tu guada&ntilde;a cada vez un poco m&aacute;s arriba, hasta que conseguiste llegar a la zona de su cuello.\
            <p>Una vez all&iacute;, agarraste tu mano libre a uno de los huesos que sobresal&iacute;an de sus alas para propinarle un fuerte golpe en la zona baja del pescuezo. \
               Sin embargo &iexcl;tu guada&ntilde;a rebot&oacute;! No pod&iacute;as creer que precisamente aquella zona vital estuviera tan bien protegida por aquellos fastidiosos huesos que usaba de armadura. \
               El tiempo era m&iacute;nimo, si el Grimm segu&iacute;a ascendiendo, te quedar&iacute;as sin ox&iacute;geno y probablemente te desmayar&iacute;as, deb&iacute;as de idear algo para tumbarlo lo antes posible, a esas alturas saltar ya no era una opci&oacute;n. \\n\
               <p>Casi con la rapidez de un cazador profesional, r&aacute;pidamente tomaste otra decisi&oacute;n. \
                  La de cortar con tu guada&ntilde;a el ala sobre el que te hab&iacute;as apoyado con anterioridad. \
                  Ejecutaste un r&aacute;pido y seco golpe que desmembr&oacute; aquel ala del Grimm, provocando as&iacute; dos consecuencias. \
                  </p>\
            <p>La primera, la ca&iacute;da de aquel gigante, solo un ala no era suficiente para que se pudiese mantener, y su enorme peso hizo que cayera como plomo sobre el suelo de aquel claro donde empez&oacute; la lucha.</p>\
             <p>Ni siquiera llegaste a escuchar el golpe, pero dabas por seguro que era imposible que siguiera vivo tras aquella estrepitosa ca`&iacute;da.</p>\
               <p>Por otro lado, el mantenerte agarrado a aquel ala hizo que la membrana te hiciese caer algo m&aacute;s lento de lo que hubiera sido una ca&iacute;da libre mortal, permiti&eacute;ndote ejecutar una habilidosa t&eacute;cnica de aterrizaje antes de llegar al suelo, repartiendo as&iacute; el impacto por ca&iacute;da generado y salv&aacute;ndote de romperte alg&uacute;n que otro hueso.</p>\
                  Hab&iacute;as salido victorioso, y hab&iacute;as salvado al pueblo de la continua opresi&oacute;n a la que el Grimm con aspecto de drag&oacute;n lo ten&iacute;a subyugado. \
                  Cuando ca&iacute;ste, lo hiciste cerca de una cueva en la que no hab&iacute;as reparado con anterioridad, no muy lejos del claro del bosque. \
                    <br></br>\
            <p><center><img src='media/img/cuevaazul.png'></center></p> \
            <p>Como era obvio, decidiste pasar y adentrarte, parec&iacute;a ser la cueva en la que hasta ahora hab&iacute;a estado viviendo aquel bicho.</p>\
                <p>A unos escasos pasos, encontraste un enorme cofre, que abriste sin duda alguna. \
                   Dentro de &eacute;ste hab&iacute; un arma totalmente nueva y resplandeciente. \
                   Una espada a dos manos, con unos extra&ntilde;os cortes grabados en la hoja as&iacute; como una especie de engranajes \
                   </p>\
            <p>que no entend&iacute;as muy bien para qu&eacute; pod&iacute;an servir. Sin duda, daba aspecto de ser de buena calidad, aunque ciertamente tambi&eacute;n parec&iacute;a bastante pesada.</p>\
                   <p><center><img src='media/img/espada.png'></center></p>\
            <p>Quer&iacute;as llev&aacute;rtela, pero solo podr&iacute;as cargar con un arma si no quer&iacute;as morir de agotamiento en tu camino de vuelta al punto de extracci&oacute;n.</p> \
            <p class='transient'><a href='equipar-arma'>&iquest;Deseas equipar tu nueva arma y desechar la que posees?</a> o <a href='no-equipar-arma'>Mantienes el arma que tu abuelo regal&oacute;, aunque parece algo m&aacute;s endeble.</a></p></p>",
            {
                tags: ["eleccion"],
                heading: "Atacas al monstruo (necesitas: Crescent Rose)",
                displayOrder: 1,
                canChoose:
                        function (character, system, to) {
                            return character.qualities.arma == 1;
                        }
            }
    ),

    "ahuyentar": new undum.SimpleSituation(
            "<p>Ahora incluso te alegras de ser un poquito ilegal de vez en cuando.\
R&aacute;pidamente sacas el libro de la mochila y corres lo m&aacute;s raudo y veloz que puedes en direcci&oacute;n al bosque, intentando despistar de toda manera posible a aquella bestia que ahora intentaba darte caza.\
Una vez parece que lo has perdido de vista, te ocultas entre las enormes ra&iacute;ces de un &aacute;rbol de respetable tama&ntilde;o que all&iacute; se alzaba.\
<p><center><img src='media/img/bosque.png'></center></p>\
Empiezas a hojear el libro, las manos a&uacute;n te sudan y te cuesta pasar las p&aacute;ginas.\
Pero consigues avistar una imagen parecida a la del alado monstruo que te acechaba.\
Empiezas a leer, aunque la fuerte respiraci&oacute;n que resuena en tu cabeza casi no te deja concentrarte. La fuerza del viento vuelve a ir in crescendo, es posible que ya te haya olido y cada vez est&eacute; m&aacute;s cerca de ti.\
Consigues ver algo que sin duda te resulta interesante, aparentemente y seg&uacute;n un cazador que hab&iacute;a dejado su amable nota en el libro, a esos bichos no les gustaba nada &iquest;los cristales?, y por no gustar se refiere a que con los suficientes, podr&iacute;as llegar a ser capaz incluso de deshacerte de &eacute;l de una vez por todas.\
Efectivamente, aparentemente los cristales de Remnant pose&iacute;an un tipo de energ&iacute;a que, no solo era capaz de machacar a un Grimm, sino que adem&aacute;s serv&iacute;an para hacer polvo, el cual pod&iacute;a alimentar desde generadores el&eacute;ctricos, hasta distintos tipos de arma.\
Y t&uacute; sab&iacute;as perfectamente donde hab&iacute;a toneladas ingentes de dicho cristal.\
&iexcl;La cueva por la que hab&iacute;as venido antes!\
Entre cavilaciones y pensamientos, notas como tu hombro se siente algo h&uacute;medo, parec&iacute;a que aquella ra&iacute;z segu&iacute;a as&iacute; tras haber absorbido los nutrientes del suelo\
O quiz&aacute;s era la baba de un Grimm sediento de sangre que se alzaba justo detr&aacute;s de ti, exhalando su respiraci&oacute;n por aquellos grandes agujeros que ten&iacute;a por nariz, incluso despein&aacute;ndote levemente para posteriormente abalanzarse sobre ti.\
<p><center><img src='media/img/dragonV.png'></center></p>\
Piernas para que os quiero!, pensaste para ti mismo conforme sal&iacute;as corriendo de aquel lugar en direcci&oacute;n a la anteriormente mencionada cueva.\
Por suerte, aquel semidrag&oacute;n era algo lento debido a su gran volumen y conseguiste llegar antes que &eacute;l a la entrada de la cueva, ahora solo era cuesti&oacute;n de poner en juego tu integridad f&iacute;sica una vez m&aacute;s.\
Deb&iacute;as de llamar su atenci&oacute;n y esperar hasta el &uacute;ltimo segundo posible frente a la entrada de la cueva, donde hab&iacute;as reunido un montoncito de cristales que se encontraban medianamente cerca, si el Grimm se estrellaba,\
era bastante posible que los da&ntilde;os ocasionados fueran bastante graves.\
Y as&iacute; lo hiciste, le gritaste, mientras agitabas las manos como si de una est&uacute;pida presa se tratase para &eacute;l. \
Por suerte para ti, era de todo menos listo, as&iacute; que se lanz&oacute; a ti a toda velocidad\
<p><center><img src='media/img/volador.png'></center></p>\
Aguantaste el tipo como pudiste, &iexcl;y sin hacerte pis encima ni nada!\
En el &uacute;ltimo momento te echaste hacia el lado, lanz&aacute;ndote al suelo como si esquivases una explosi&oacute;n, y bueno la verdad es que es justo lo que hab&iacute;as hecho.\
El semi drag&oacute;n se lanz&oacute; con tant&iacute;simo ah&iacute;nco que cuando colision&oacute; con aquella peque&ntilde;a monta&ntilde;a de cristales que hab&iacute;as hecho, los hizo literalmente polvo que tras el continuo contacto y choque acab&oacute; por explosionar.\
Provocando as&iacute; a&uacute;n m&aacute;s da&ntilde;os de los esperados en aquella bestia, pero cerrando tambi&eacute;n el camino de vuelta al punto de extracci&oacute;n por aquella cueva.\
Las piedras ca&iacute;an sobre la testa del alado ser que r&aacute;pidamente solt&oacute; un rugido mientras intentaba a duras penas elevar el vuelo de nuevo, saliendo como pudo de la cueva.\
Rezabas porque no le quedasen fuerzas para ir a por ti, y por suerte, as&iacute; fue.\
La bestia alz&oacute; el vuelo con notables da&ntilde;os y pocas ganas de seguir d&aacute;ndote guerra.\
Hab&iacute;as conseguido ahuyentarlo, y ahora esperabas que no volviese por estos lares durante mucho, mucho tiempo.\
Te tomaste tras todo esto un rato para descansar, antes de continuar tu camino en b&uacute;squeda de un nuevo camino que seguir de vuelta al sitio donde la nave te deber&iacute;a de recoger.\
Cuando tuviste la suficiente fuerza, seguiste un peque&ntilde;o sendero aparentemente paralelo a la cueva que ahora estaba a medio derruir.\
Tras un no demasiado largo periodo de tiempo, llegaste a la entrada de otra cueva, esta era algo m&aacute;s grande y por el aspecto y las enormes huellas de la entrada, parec&iacute;a que era donde aquel Grimm hab&iacute;a estado habitando hasta ahora.\
<p>Aguantaste el tipo como pudiste, &iexcl;y sin hacerte pis encima ni nada!\
   En el &uacute;ltimo momento te echaste hacia el lado, lanz&aacute;ndote al suelo como si esquivases una explosi&oacute;n, y bueno la verdad es que es justo lo que hab&iacute;s hecho. \
   El semi drag&oacute;n se lanz&oacute; con tant&iacute;simo ah&iacute;nco que cuando colision&oacute; con aquella peque&ntilde;a monta&ntilde;a de cristales que hab&iacute;as hecho, los hizo literalmente polvo que tras el continuo contacto y choque acab&oacute; por explosionar.</p>\
     Provocando as&iacute; a&uacute;n m&aacute;s da&ntilde;os de los esperados en aquella bestia, pero cerrando tambi&eacute;n el camino de vuelta al punto de extracci&ocute;n por aquella cueva.\
     Las piedras ca&iacute;n sobre la testa del alado ser que r&aacute;pidamente solt&oacute; un rugido mientras intentaba a duras penas elevar el vuelo de nuevo, saliendo como pudo de la cueva. \
     Rezabas porque no le quedasen fuerzas para ir a por ti, y por suerte, as&iacute; fue. \
     La bestia alz&oacute; el vuelo con notables da&ntilde;os y pocas ganas de seguir d&aacute;ndote guerra. \
     Hab&iacute;s conseguido ahuyentarlo, y ahora esperabas que no volviese por estos lares durante mucho, mucho tiempo. \
      <br>Te tomaste tras todo esto un rato para descansar, antes de continuar tu camino en b&uacute;squeda de un nuevo camino que seguir de vuelta al sitio donde la nave te deber&iacute;a de recoger.</br>\
          Cuando tuviste la suficiente fuerza, seguiste un peque&ntilde;o sendero aparentemente paralelo a la cueva que ahora estaba a medio derruir.\
          Tras un no demasiado largo periodo de tiempo, llegaste a la entrada de otra cueva, esta era algo m&aacute;s grande y por el aspecto y las enormes huellas de la entrada, parec&iacute;a que era donde aquel Grimm hab&iacute;a estado habitando hasta ahora.\
          <center><img src='media/img/cuevaazul.png'></center>\
      <p>Como era obvio, decidiste pasar y adentrarte. A unos escasos pasos, encontraste un enorme cofre, que abriste sin duda alguna. \
         Dentro de &eacute;ste hab&iacute; un arma totalmente nueva y resplandeciente. Una espada a dos manos, con unos extra&ntilde;os cortes grabados en la hoja as&iacute; como una especie de engranajes \
         que no entend&iacute;as muy bien para qu&eacute; pod&iacute;an servir. Sin duda, daba aspecto de ser de buena calidad, aunque ciertamente tambi&eacute;n parec&iacute;a bastante pesada.\
         <center><img src='media/img/espada.png'></center></p>\
         Quer&iacute;as llev&aacute;rtela, pero solo podr&iacute;as cargar con un arma si no quer&iacute;as morir de agotamiento en tu camino de vuelta al punto de extracci&oacute;n.</p>\
    <p class='transient'><a href='equipar-arma'>&iquest;Deseas equipar tu nueva arma y desechar la que posees?</a> o <a href='no-equipar-arma'>Mantienes el arma que tu abuelo regal&oacute;, aunque parece algo m&aacute;s endeble.</a></p></p>",
           {
                tags: ["eleccion"],
                heading: "Ahuyentas al monstruo (necesitas: Libro de los Grimm)",
                displayOrder: 2,
                canChoose:
                        function (character, system, to) {
                            return character.qualities.libro == 1;
                        }
            }
    ),

    "gritar": new undum.SimpleSituation(
            "<p>\
        Te quedas completamente bloqueado y ni siquiera sabes que hacer. \
        Sin duda no era buena idea haber venido a la misi&oacute;n, no ten&iacute;as realmente mucha idea sobre Grimms, &iexcl;ni siquiera llevabas un arma encima! \
        Pero en qu&eacute; estabas pensando.\
        <p>Tu &uacute;nica opci&oacute;n restante es gritar como si fueras un pobre conejito asustado frente a su presa.</p> \
        El temible semi drag&oacute;n se abalanza contra ti sin piedad ninguna conforme tus gritos\
        comienzan a resonar en todo el bosque. Tu vida comienza a pasar por delante de ti y cierras los ojos, temblando esperando tu &uacute;ltimo soplo de aire.\
        <p><center><img src='media/img/dragonV.png'></center></p>\
        <p>Sin embargo, aquel final no llegaba. Para tu suerte y sorpresa, el que comenz&oacute; a gritar y rugir fue aquel monstruo que antes te atemorizaba. \
        Una cazadora de alto rango le estaba haciendo frente delante de tu a&uacute;n tembloroso cuerpo, deb&iacute;a de haber estado sigui&eacute;ndole la pista y haber escuchado tus gritos, de otra forma ahora mismo no ser&iacute;as m&aacute;s que alimento de Grimm.\
        \
        <center><img src='media/img/giphy.gif'></center> \
        En cuesti&oacute;n de un minuto, el Grimm estaba totalmente abatido y la cazadora reinaba sobre &eacute;l. \
        R&aacute;pidamente agarr&oacute; tu mano, y comenzasteis a hacer el camino de vuelta en direcci&oacute;n a lo que ser&iacute;a el punto de extracci&oacute;n donde una nave de estilo similar a la que te dej&oacute;, se encargar&iacute;a de tu recogida.\
        No dijo una palabra en todo el rato que le hiciste compa&ntilde;&iacute;a. De hecho, parec&iacute;a no querer siquiera hacer contacto visual contigo. Para ella debi&oacute; de ser casi una falta de respeto ver a un estudiante de cazador gritar aterrorizado ante un Grimm. Es bien sabido que un cazador debe luchar hasta su &uacute;ltimo aliento sin importar la situaci&oacute;n, as&iacute; que en cierto modo eras capaz de entenderlo.\
        <center><img src='media/img/nave.png'></center>\
        <p>El viaje de vuelta fue algo inc&oacute;modo, pero peor a&uacute;n ser&iacute; el recibimiento obtenido, sin duda hab&iacute;s demostrado no ser apto para tu futuro puesto. Y el director en persona vino para darte un recibimiento, pero no el que esperabas \
           Efectivamente, la estancia en aquel lugar hab&iacute; llegado a su fin, casi tan pronto como empez&oacute;, tus l&aacute;grimas casi no pod&iacute;n ser contenidas ante tu frustraci&oacute;n y tristeza.</p>\
        <p>Al fondo del lugar pudiste apreciar la figura de Ruby, aquella compa&ntilde;ra que te hab&iacute; sido asignada, decidiste saludarla desde lejos, alzando la mano y esperando que se acercase a saludarte y darte la enhorabuena por tus haza&ntilde;as. \
           Sin embargo, gir&oacute; la cara.</p>\
        <p>Otro compa&ntilde;ro se acerc&oacute; a hablar con ella y se marcharon camino a la sala de entrenamiento, se trataba de su nueva pareja de cazador. \
           Haberla dejado tirada quiz&aacute;s no fue la mejor de las opciones, adem&aacute;s, ya no tendr&iacute;as si quiera posibilidad de arreglarlo. Este era el peor de los futuros que jam&aacutes podr&iacute;as haber imaginado, pero al menos segu&iacute;as con vida.</p>\
           <center><img src='media/img/fin3.png'></center> \
        <p><center><a href='./ascenso'> &iexcl;ESTE NO ES TU LUGAR, FUERA DE LA ACEDEMIA! </a></center></p> </p>",
            {
                tags: ["eleccion"],
                heading: "Gritas atemorizado",
                displayOrder: 3,
                actions: {
                    "ascenso": function (character, system, to) {
                        system.setQuality("estudiante", 0);
                        system.setQuality("arma", 0);
                        system.setQuality("libro", 0);
                        system.setQuality("armanueva", 0);
                        system.setCharacterText(
                                "<p>&iexclTOMA LAS DECISIONES CORRECTAS Y EXPLORA!</p>");
                    }
                },
            }
    ),
    
    "no-equipar-arma": new undum.SimpleSituation(
            "<h1>No equipar el Arma</h1> \
             <p>No puedes por nada del mundo deshacerte del arma que tu abuelo te ha dado, de hecho, ni te lo piensas. \
                No solo te ha dado tu primera victoria contra un Grimm real, y uno bastante grande y feroz. \
                Sino que adem&aacute;s tiene demasiado valor sentimental para ti, as&iacute; que, r&aacute;pidamente cierras el cofre. \
                <p class='transient'><a href='punto-extraccion'>Salir de la cueva en direcci&oacute;n al punto de extracci&oacute;n.</a></p>\</p>"
            ),

    "equipar-arma": new undum.SimpleSituation(
            "<h1>Equipar Arma</h1>\
        <p>No puedes resistirte a los encantos y los ojitos que el nuevo arma te hac&iacute;. \
           Era fuerte, resplandeciente, parec&iacute; efectiva y adem&aacute;s, aquellos engranajes parec&iacute;n encarnar un misterio que te apetec&iacute; investigar y resolver. \
        </p>\
        <p class='transient'><a href='punto-extraccion'>Salir de la cueva en direcci&oacute;n al punto de extracci&oacute;n.</a></p>\
        \
        ",
    {

                enter: function (character, system, to) {
                    system.setQuality("armanueva", 1);
                        
                    },
                exit: function (character, system, to) {
                        system.setQuality("arma", 0);
                        system.setQuality("libro", 0);
                    },
                },
            
            ),

    "punto-extraccion": new undum.SimpleSituation(
            "<p>Tras unas horas de vuelta, consigues llegar al punto de extracci&oacute;n. \
                Env&iacute;s una peque&ntilde;a se&ntilde;al desde el dispositivo localizador que todo estudiante de cazador pose&iacute;, y vuelves de vuelta a la academia en aquella extra&ntilde;a nave. \
                Los pilotos te congratulan, te sientas y casi no te lo crees. \
                La bestia hab&iacute; sido derrotada, una flagrante arma nueva estaba en tu posesi&oacute;n, y estabas seguro de que la experiencia conseguida te ayudar&iacute; a escalar m&aacute;s r&aacute;pidamente los distintos niveles de cazador para llegar lo antes posible al m&aacute;ximo rango y graduarte. \
                Ahora tocaba descansar y cerrar los ojos un poquito. \
              <p><center><img src='media/img/nave.png'></center></p>\
             <p>Cuando llegaste, el mism&iacute;simo director en persona se acerc&oacute; a darte la enhorabuena y reconoci&oacute; tu valor y valent&iacute;a, otorg&aacute;ndote una peque&ntilde;a distinci&oacute;n y avanzando un curso de estudio tu expediente.</p>\
             <p>Al fondo del lugar pudiste apreciar la figura de Ruby, aquella compa&ntilde;ra que te hab&iacute; sido asignada, decidiste saludarla desde lejos, alzando la mano y esperando que se acercase a saludarte y darte la enhorabuena por tus haza&ntilde;as. \
                Sin embargo, gir&oacute; la cara.</p>\
             <p>Otro compa&ntilde;ro se acerc&oacute; a hablar con ella y se marcharon camino a la sala de entrenamiento, se trataba de su nueva pareja de cazador. \
                Haberla dejado tirada quiz&aacute;s no fue la mejor de las opciones, sin embargo, ahora ten&iacute;s otras cosas de las que preocuparte, como tu preparaci&oacute;n para las misiones de segundo grado a las que te tocar&iacute; enfrentarte a partir de ahora.</p>\
             <p><center><img src='media/img/castphoto.png'></center></p>\
            <center><a href='./ascenso'> &iexcl;SUERTE EN TU CAMINO CAZADOR ! </a></center></p>",
      {
                actions: {
                    "ascenso": function (character, system, to) {
                        system.setQuality("cazadormedio", 1);
                        system.setQuality("estudiante", 0);
                        system.setCharacterText(
                                "<p>&iexclENHORABUENA!</p>");
                    }
                },
               
            }
            ),

    "rechazas-mision": new undum.SimpleSituation(
            "<h1>Rechazar ir a la misi&oacute;n para empezar tu entrenamiento en pareja en la academia</h1>\
             <p>Sinceramente, te sientes de todo menos preparado para ir a emprender una misi&oacute;n urgente. \
                A&uacute;n no has recibido tu entrenamiento, de hecho, ni siquiera hab&iacute;s empezado y te acababan de asignar a tu compa&ntilde;ra. \
                Quiz&aacute;s no era la compa&ntilde;era perfecta, pero s&iacute; que era quien te iba a acompa&ntilde;ar durante un largo periodo de tiempo, y tampoco te parec&iacute;a buena idea dejarla tirada. \
                Tu lugar era estar en la academia como estudiante que eres, y siendo as&iacute; rechazas definitivamente el ir a la misi&oacute;n.</p> \
             <p>El cazador que hab&iacute;a acudido en tu b&uacute;squeda lo entiende, y procede a buscar a otro que sea capaz de encargarse de una misi&oacute;n como esa, un peque&ntilde;o atisbo de decepci&oacute;n pod&iacute;a intuirse en su forma de contestarte</p>\
             <p class='transient'><a href='siguiente'>Al d&iacute;a siguiente</a></p></p>"
            ),

    "siguiente": new undum.SimpleSituation(
            "<p>Ahora s&iacute;, tu real y primer d&iacute; en la academia estaba por comenzar. \
                Saludaste a Ruby nada m&aacute;s despertar, ambos hab&iacute;is pasado una noche algo tenebrosa con miedo a que aquellas literas mal colocadas se os pudieran estampar en la frente en cualquier momento, pero al menos eso os di&oacute; algo de lo que hablar durante esa ma&ntilde;ana y sobre lo que re&iacute;ros un buen rato. \
                La hiperactividad de Ruby segu&iacute; siendo ciertamente llamativa, pero eso tambi&eacute;n hac&iacute; que tu d&iacute; se llenase de algo de energ&iacute;. \
                Al poco de despertar, ella misma se encarg&oacute; de hacer el desayuno de ambos, d&aacute;ndote una grata sorpresa con unas tortitas que ten&iacute;an una pinta maravillosa. \
                <p><center><img src='media/img/postre.png'></center></p> \
             <br><p>Poco despu&eacute;s procedisteis a la sala de entrenamiento, donde junto otros equipos y parejas comenzasteis a entrenar y desarrollar vuestras habilidades con distintas armas, piruetas y t&eacute;nicas que podr&iacute;n resultar bastante &uacute;iles de cara a un combate contra un Grimm. \
                    Incluso hac&iacute;ais peleas entre las distintas parejas para comprobar cual de ellas ten&iacute;a mejor nivel de aprendizaje as&iacute; como de comprensi&oacute;n entre ellas.</p></br> \
             <p>Conforme los d&iacute;s pasaban, la relaci&oacute;n entre tu compa&ntilde;ra y t&uacute; iba estrechando lazos. \
                Comenzast&eacute;is a estudiar, entrenar, comer y jugar juntos, el buen rollismo que se respiraba al estar cerca vuestra era genial. \
                Compart&iacute;is as&iacute; vuestro tiempo libre, hablabais de vuestras familias, vuestros problemas, vuestras inquietudes, a qu&eacute; os querr&iacute;is dedicar cuando salierais de all&iacute; \
                Casi todas las parejas quer&iacute;n entrenar con vosotros pues, al llevaros tan bien, vuestra sinergia en el campo de batalla era destacable por encima de la de los dem&aacute;s. </p> \
             <p>Sin embargo, al cabo de un mes surgi&oacute; un peque&ntilde;o problema cuando el momento de forjar los equipos definitivos de cuatro personas.</p> \
             <p>Varias parejas ten&iacute;an inter&eacute;s en vosotros, del mismo modo que a vosotros os interesaban varias parejas. Pero, en la &uacute;ltima semana tu nivel hab&iacute;a estado claramente por encima de todos, inclusive el de tu compa&ntilde;era.</p> \
                <p>Sin duda estabas predestinado a ser cazador, era lo que quer&iacute;as y era por y para lo que quer&iacute;as vivir el resto de tu vida. De hecho, estuviste tan por encima del resto de tus compa&ntilde;eros y compa&ntilde;eras, que el mism&iacute;simo director y dos de los mejores profesores en persona quisieron tener una peque&ntilde;a charla contigo.</p> \
             <p>Te llamaron al despacho principal, y nada m&aacute;s entrar el director Ozpin comenz&oacute; a hablar. </p> \
                <p><i> 'Antes que nada, quiero que sepas que la decisi&oacute;n va a depender exclusivamente de ti y que ni yo, ni el equipo de profesores o cazadores queremos influir de ning&uacute;n tipo de forma en ella. La charla que quiero tener contigo es meramente informativa, pero espero que valores la opci&oacute;n que te tendemos.'</i></p> \
             <p><center><img src='media/img/reunion.png'></center></p> \
             <p><i>Tu nivel es fant&aacute;stico. Tanto que ha sorprendido ya a varios de los profesores que usualmente controlan vuestros entrenamientos. Tu t&eacute;cnica, manejo del arma, rotaciones, fuerza, ingenio son dignas de un cazador bastante m&aacute;s experimentado y avanzado.</i></p> \
             <p><i>Es por ello que quiero ofrecerte lo siguiente, la oportunidad de ascender desde ya mismo al siguiente rango de cazador. \
                   &iquest;Qu&eacute; conseguir&iacute;s con esto? Optar a un entrenamiento m&aacute;s especializado en tu categor&iacute;, con un tipo determinado de arma y con un cazador superior observando de cerca tu mejor&iacute;. \
                   Adem&aacute;s podr&iacute;s asistir a misiones m&aacute;s importantes y con mejores recompensas y agilizar&iacute;s bastante tu progreso.</i></p>\
              <br><p><i>Por el contrario tendr&iacute;s que dejar tanto a tu compa&ntilde;ra como a tu futuro equipo de lado y cuando digo de lado es que raramente podr&aacute;s volver a verlos. S&eacute; que ahora mismo vuestros lazos y amistad es muy fuerte, pero ni siquiera estar&eacute;is en el mismo edificio y ni mucho menos habitaci&oacute;n, y la mayor&iacute; de informaci&oacute;n que obtendr&aacute;s ser&aacute; lo suficientemente confidencial como para no transmitirla a cazadores de menor rango esto es te ser&aacute; casi imposible mantener una amistad con ellos. \
                        Ahora bien, la decisi&oacute;n es tuya.'</i></p></br>\
              <p class='transient'><a href='te-quedas'>&iquest;Te quedas con tu pareja de batalla y futuro grupo?</a> O por el contrario prefieres <a href='asciendes'>&iquest;Ascender al siguiente rango de cazador?</a> </p>\
              </p>"
            ),


    "te-quedas":new undum.SimpleSituation(
            "<p>Lo sientes con todo tu pesar pero debes rechazar la oferta. \
                No eres capaz de dejar tirada a la persona que te ha acompa&ntilde;ado durante ya un mes, con quien te quedan otros tantos a&ntilde;os por delante, que llena tus ma&ntilde;anas y d&iacute;as de energ&iacute;a y momentos alegres, y con quien has llegado a semejante entendimiento en la batalla y entrenamientos. \
                Sabes que est&aacute;s desperdiciando algo de tu potencial, pero &iquest;para qu&eacute; quieres ese potencial si no tienes con quien compartirlo ni a quien proteger? \
                Si no fuera por ella, tu estancia aqu&iacute; podr&iacute;a haber sido infinitamente peor. \
                Adem&aacute;s, varias de las parejas con las que podr&iacute;as hacer equipo tambi&eacute;n te resultaban m&aacute;s que interesantes, y si estabas destinado a ser un cazador no te importaba demasiado que fuese un a&ntilde;o antes o despu&eacute;s, si la compa&ntilde;&iacute;a era buena. \
                <br><p>Tras negarte y dar las gracias amablemente a los tres presentes, saliste del despacho principal en pos de buscar a Ruby y comenzar a decidir con ella quien os gustar&iacute;a que fuesen los dos nuevos integrantes del equipo, as&iacute; como darle un fuerte abrazo, pues aunque pudiera haber parecido una simple decisi&oacute;n, podr&iacute;as no haber tenido siquiera la oportunidad de despedirte de ella.</p></br> \
             \
             <p><center><img src='media/img/risa.png'></center></p> \
             <p>Al poco de llegar y de propinarle dicho abrazo, se pudo escuchar las fuertes pisadas de un cazador resonando por todo el pasillo, corriendo a toda velocidad dirigi&eacute;ndose al despacho principal del cual acababas de volver. \
                Sin mediar palabra alguna, tanto t&uacute; como Ruby decidisteis salir detr&aacute;s de &eacute;l, intentando escuchar lo que fuera que ten&iacute;a que decirle al director y los all&iacute; presentes profesores.</p> \
                <br></br>\
             <p><i>'Ha muerto por lo visto se trataba de un Grimm bastante poderoso con aspecto de drag&oacute;n, fue demasiado para un novato como &eacute;l'</i></p> \
             <br></br>\
             <p>En ese momento tu cuerpo se qued&oacute; completamente paralizado, en seguida relacionaste conceptos y entendiste que se trataba muy posiblemente de la misi&oacute;n que quer&iacute;an haberte asignado a ti</p> \
             <p>No pudiste evitar sentirte culpable, &iquest;y si hubieras acudido t&uacute; en su lugar? &iquest;Podr&iacute;s haber salvado su vida sin dar a cambio la tuya? \
                Ahora ya era tarde para preguntarse aquello el entrenamiento deb&iacute; continuar. \
                <p><center><img src='media/img/castphoto.png'></center></p> \
                <p><center><a href='./quedarse'> &iexcl;SUERTE EN TU CAMINO CAZADOR ! </a></center></p>",
    {
                actions: {
                    "quedarse": function (character, system, to) {
                        system.setCharacterText(
                                "<p>&iexclENHORABUENA!</p>");
                    }
                },
               
            }
                 ),

    "asciendes": new undum.SimpleSituation(
            "<p> Sabes perfectamente que aquella no es una oportunidad que puedas rechazar y que no se le concede a casi nadie. De hecho, dudabas que jam&aacute;s te la volvieran a ofrecer a ti. \
                 Entend&iacute;s que estaba bastante feo el hecho de dejar tirada a tu compa&ntilde;ra y futuro equipo, y que de hecho tras un mes entero de entrenamiento ser&iacute; dif&iacute;il que Ruby pudiera encontrar a otro cazador o cazadora con la que llegar a un nivel decente incluso como para avanzar de rango este a&ntilde;o, deber&iacute; de amoldarse de nuevo al estilo de batalla de otra persona y casi empezar de cero.\
             Pero tu propia vida estaba delante de las dem&aacute;s, y eso es algo que siempre debes de tener en cuenta. \
             Sab&iacute;as que ya no podr&iacute;as volver a verla ni tan siquiera para despedirte de ella, as&iacute; que ahora no te quedaba otra que esperar a que te asignaran a quien ser&iacute;a el responsable de tu entrenamiento as&iacute; como tu nueva habitaci&oacute;n en el edificio de los cazadores de rango medio. \n\
             <p>Sin embargo, quien entr&oacute; por la puerta no fue precisamente tu nuevo entrenador. \
                Antes de que llegase a entrar por la puerta, las fuertes pisadas propinadas retumbaban por todo el pasillo anterior y el mism&iacute;simo despacho. \
                Un cazador con algunas gotas de sudor recorriendo su frente abri&oacute; la puerta apresuradamente y entre jadeos, recit&oacute; lo siguiente.</p>\
             <br></br> \
            <p>'Ha muerto por lo visto se trataba de un Grimm bastante poderoso con aspecto de drag&oacute;n, fue demasiado para un novato como &eacute;l'</p> \
            <p>En ese momento tu cuerpo se qued&oacute; completamente paralizado, en seguida relacionaste conceptos y entendiste que se trataba muy posiblemente de la misi&oacute;n que quer&iacute;n haberte asignado a ti \
               No pudiste evitar sentirte culpable, &iquest;y si hubieras acudido t&uacute; en su lugar? &iquest;Podr&iacute;as haber salvado su vida sin dar a cambio la tuya? \
               Ahora ya era tarde para preguntarse aquello el entrenamiento de tus nuevas cualidades y tu nuevo rango deb&iacute;a continuar.</p> \
            <p><center><img src='media/img/final.png'></center></p> \
                <p><center><a href='./ascenso'> &iexcl;SUERTE EN TU CAMINO, SOLITARIO CAZADOR DE RANGO MEDIO ! </a></center></p>",
            {
                actions: {
                    "ascenso": function (character, system, to) {
                        system.setQuality("cazadormedio", 1);
                        system.setQuality("estudiante", 0);
                        system.setCharacterText(
                                "<p>&iexclENHORABUENA!</p>");
                    }
                },
               
            }
            ),

    "opcion_ataque": new undum.SimpleSituation(
            "<h1>Decides Atacar</h1> \
             \
             <p>Das gracias por haber llevado contigo a Crescent Rose, el arma que tu abuelo \
                te di&oacute; para ayudarte en tu nueva vida. R&aacute;pidamente la despliegas, y esa gran guada&ntilde<a \
                se alza ante ti, por un momento, te ves capaz de cualquier cosas y tu coraz&oacute;n se llena de determinaci&oacute;n. \
                Aquel grimm vuelve a rugir, desplegando las alas y abriendo aquella enorme boca; antes de que te dieras \
                cuenta, se estaba abalanzando sobre t&iacute;, pareciera que iba a engullirte de un momento a otro. \
                <p><center><img src='media/img/dragonV.png'></center></p>\
                <p>Con toda la agilidad que tu algo desentrenado cuerpo te permiti&oacute;, consigues escapar de aquel bocado, \
                   apoyando tu guada&ntilde;a en el suelo para ayudarte a rotar hacia la derecha. Y conforme tu tronco terminaba \
                   de colocarse en aquella posici&oacute;n, levantaste tu arma, gir&aacute;ndola por encima de tu cabeza y propinando un \
                   fuerte golpe contra el lateral de aquel monstruo.\
                   </p>\
                   <p>El corte fue prominente e hizo que la bestia emitiera un fuerte gru&ntilde;ido, pero ni de cerca era suficiente \
                      para tumbarla. Necesitabas alg&uacute;n tipo de estrategia capaz de machacarle antes de que fueras tu quien \
                      sufriera sus golpes, en cuesti&oacute;n de resistencia dudabas poder ganar.</p>\
                      <p>El baile del intercambio de golpes dur&oacute; por varios minutos m&aacute;s, mientras intentabas estudiar \
                         los movimientos del majestuoso pero peligroso rival que ten&iacute;as en frente. \
                         Notaste un peque&ntilde;o patr&oacute;n en sus movimientos, y decidiste intentar una locura para tumbarlo de una vez por todas.</p>\n\
                         <p>Antes de intentar propinarte un fuerte golpe, siempre intentaba coger la suficiente altura para caer en picado a por ti. \
                            Así que, no tuviste otra idea si no que subir con &eacute;l. Si consegu&iacute;as tumbarlo en su punto m&aacute;s alto, estabas seguro de que \
                            no podr&iacute;a sobrevivir a la ca&iacute;da, el problema es que tus probabilidades de salir ileso tampoco parec&iacute;an estar a tu favor. \
                            \
            \
            <p><center><img src='media/img/DragonMug.png'></center></p>\
            As&iacute; lo decidiste, y as&iacute; lo hiciste. El poderoso Grimm comenz&oacute; a alzar su vuelo, y con un r&aacute;pido movimiento conseguiste clavar la guada&ntilde;a en su espalda para alzarte con él. \
            El semidrag&oacute;n comenz&oacute; a vociferar mientras daba vueltas sobre su propio eje para tirarte de su lomo. A duras penas consegu&iacute;as aguantar, como si de una escalada en los Alpes \
            se tratara, clavabas tu guada&ntilde;a cada vez un poco m&acute;s arriba, hasta que conseguiste llegar a la zona de su cuello.\
            <p>Una vez all&iacute;, agarraste tu mano libre a uno de los huesos que sobresal&iacute;an de sus alas para propinarle un fuerte golpe en la zona baja del pescuezo. \
               Sin embargo… &iexcl;tu guada&ntilde;a rebot&oacute;! No pod&iacute;as creer que precisamente aquella zona vital estuviera tan bien protegida por aquellos fastidiosos huesos que usaba de armadura. \
               El tiempo era m&iacute;nimo, si el Grimm segu&iacute;a ascendiendo, te quedar&iacute;as sin ox&iacute;geno y probablemente te desmayar&iacute;as, deb&iacute;as de idear algo para tumbarlo lo antes posible, a esas alturas saltar ya no era una opci&oacute;n.\
               <p>Casi con la rapidez de un cazador profesional, r&aacute;pidamente tomaste otra decisi&oacute;n. \
                  La de cortar con tu guada&ntilde;a el ala sobre el que te hab&iacute;as apoyado con anterioridad. \
                  Ejecutaste un r&aacute;pido y seco golpe que desmembr&oacute; aquel ala del Grimm, provocando as&iacute; dos consecuencias. \
                  </p>\
            <p>La primera, la ca&iacute;da de aquel gigante, solo un ala no era suficiente para que se pudiese mantener, y su enorme peso hizo que cayera como plomo sobre el suelo de aquel claro donde empez&oacute; la lucha.</p>\
             <p>Ni siquiera llegaste a escuchar el golpe, pero dabas por seguro que era imposible que siguiera vivo tras aquella estrepitosa ca&iacute;da.</p>\
               <p>Por otro lado, el mantenerte agarrado a aquel ala hizo que la membrana te hiciese caer algo m&aacute;s lento de lo que hubiera sido una ca&iacute;da libre mortal, permiti&eacute;ndote ejecutar una habilidosa t&eacute;cnica de aterrizaje antes de llegar al suelo, repartiendo as&iacute; el impacto por ca&iacute;da generado y salv&aacute;ndote de romperte alg&uacyte;n que otro hueso.</p>\
                  Hab&iacute;as salido victorioso, y hab&iacute;as salvado al pueblo de la continua opresi&oacute;n a la que el Grimm con aspecto de drag&oacute;n lo ten&iacute;a subyugado. \
                  Cuando ca&iacute;ste, lo hiciste cerca de una cueva en la que no hab&iacute;as reparado con anterioridad, no muy lejos del claro del bosque. \
                    </p>\
            </p>"
            )
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {

    estudiante: new undum.OnOffQuality(
            "Estudiante", {priority: "0002", group: 'progress', onDisplay: "&#10003;"}
    ),
        cazadormedio: new undum.OnOffQuality(
            "Cazador de rango medio", {priority: "0002", group: 'progress', onDisplay: "&#10003;"}
    ),
    arma: new undum.OnOffQuality(
            "Crescent Rose", {priority: "0002", group: 'objetos', onDisplay: "&#10003;"}
    ),
    armanueva: new undum.OnOffQuality(
            "Harbinger", {priority: "0002", group: 'objetos', onDisplay: "&#10003;"}
    ),
    libro: new undum.OnOffQuality(
            "Libro sobre Grimms", {priority: "0002", group: 'objetos', onDisplay: "&#10003;"}
    )
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, {priority: "0001"}),
    progress: new undum.QualityGroup('Progress', {priority: "0002"}),
    objetos: new undum.QualityGroup('Objetos', {priority: "0002"}),
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function (character, system) {
    character.qualities.estudiante = 1;
    character.qualities.cazadormedio = 0;
    character.qualities.arma = 0;
    character.qualities.libro = 0;
    character.qualities.armanueva = 0;
    system.setCharacterText("<p>Te encuentras en la academia.</p>");
};
