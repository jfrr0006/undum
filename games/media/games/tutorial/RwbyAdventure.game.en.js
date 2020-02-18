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
        <p class='transient'>Haz <a href='hub'>click aqu&iacute;\
        para continuar...</a></p>",
    
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
        enter: function(character, system, from) {
            system.write($("#s_situations").html());
        },
        tags: ["topic"],
        id: "dorm",
        optionText: "El Dormitorio",
        displayOrder: 1
    }),
    
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
                "luck-boost": function(character, system, to) {
                    system.setQuality("arma", 1);
                },
                "continuar-arma": "<p>Ahora te sientes m&aacute;s seguro y listo para el combate,\
                                    as&iacute; que decides seguir \
                                    explorando el lugar, con tu guada&ntilde;a doblada de \
                                    la manera m&aacute;s compacta posible, \
                                    ocult&aacute;ndola en la parte trasera de tus ropajes.\
                                    <a href='hub'>click aqu&iacute;\
                                    para continuar...</a></p>"
            },
            exit: function(character, system, to) {
                system.setQuality("novice", 1);
            }
        }
    ),
    
    todo: new undum.SimpleSituation(
        "<p>Two things can happen in a situation. The character either\
        <a href='links'>leaves</a> the situation and enters another one, or\
        they carry out some <a href='./do-something'>action</a>. Actions may\
        perform some processing, they may display some results, but\
        ultimately they put the character back into the same situation\
        again.</p>\
        \
        <p>When you are designing your game, use situations to reflect a\
        change in what the character can do. So you would change situation if\
        the character pulls a lever to open a trapdoor, for example. Actions\
        are intended for situations where the character can examine things\
        more closely, or maybe top up their magic by drinking a potion.\
        Things that don't affect the state of the world around them.</p>\
        \
        <p>Situations generate content when they are <em>enter</em>ed,\
        <em>exit</em>ed, and when they receive an <em>act</em>ion (the\
        italicised words are the names of the three methods that do this).\
        You can write code to generate content in any way you like, so the\
        content that is displayed can be totally dynamic: taking into\
        account the current state of the character.\
        Content is just plain HTML, so you use regular HTML tags to make\
        things <strong>bold</strong> or <em>italic</em>, or to include\
        images. This gives you a lot of flexibility. For example, since Undum\
        targets HTML5 browsers, you could use the <em>audio</em> or\
        <em>video</em> tags to include rich media.</p>\
        \
        <p class='transient'>Make sure you've carried out the action above,\
        then <a href='hub'>return to the topic list</a>.</p>",
        {
            actions: {
                'do-something': "<p>You carried out the action, well done.\
                                 You'll notice that the links for this\
                                 situation are still active. This means you\
                                 can click to perform the action again.</p>"
            }
        }
    ),
    links: new undum.SimpleSituation(
        "<p><center><img src='media/img/cocina.png'></center></p>\
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
    
    oneshot: new undum.SimpleSituation(
        "<p>\
        <a href='./one-time-action' class='once'>this link</a>) for\
        actions that you only want to be possible once. There is no\
        point using 'once' on situation links because they'll be turned\
        into text as soon as you click them anyway (unless they are also\
        <em>sticky</em>, of course).</p><p>Once links are useful\
        for actions such as examining an object more carefully. You\
        don't want lots of repeated descriptions, so making the link\
        a <em>once</em> link is more user friendly.</p>\
        <p>If you have more than one link to the same action, then all\
        matching links will be removed, so you don't have to worry about\
        the player having an alternative way to carry out the action.</p>\
        <p class='transient'>After you've clicked the link, let's\
        <a href='hub'>move on</a>.</p>",
        {
            actions: {
                "one-time-action": "<p>As I said, one time actions are\
                                   mostly used to describe something in\
                                   more detail, where you don't want the\
                                   same descriptive text repeated over and\
                                   over</p>"
            }
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
                "skill-boost": function(character, system, action) {
                    system.setQuality("inspiration", character.qualities.inspiration+1);
                    system.setCharacterText(
                            "<p>&iexcl; ahora que has cometido una ilegalidad, sal por patas de ah&iacute;\
                                antes de que te pillen! El Hall principal es el sitio mas seguro.</p>");
                }
            },
                exit: function(character, system, to) {
                system.setQuality("stamina", character.qualities.stamina+1);
            }
        }
   ),
    "quality-types": new undum.SimpleSituation(
        "<p>\
        <br>Sin comerlo ni beberlo, aquella joven de pelo corto y oscuro se hab&iacute;a puesto a soltarte la\
        chapa de tu vida, lo &uacute;nico que sacaste en claro es que se llamaba Ruby y que, como\
        pudiste comprobar, socializar no era su fuerte.\
        and 'Novice' is using just a check-mark.</br></p>\
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
        <p>Ahora estaba en tus manos, &iquest;Deber&iacute;as?\
        <a href='character-text'>ir a la misi&oacute;n</a> o por el contrario\
        <a href='./luck-reduce'>rechazar ir a la misi&oacute;n para comenzar tu entrenamiento en pareja</a>.\
        of different display types provided with Undum, and you can easily\
        add your own too.<p>",
        {
            actions: {
               "luck-boost": function(character, system, to) {
                    system.setQuality("arma", 1);
                },
                "luck-reduce": function(character, system, action) {
                    system.setQuality("skill", character.qualities.skill+3);
                }
            },
            exit: function(character, system, to) {
                system.setQuality("novice", 0);
            }
        }
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
        <p class='transient'>Let's go back to the\
        <a href='hub'>topic list</a>. As you do, I'll change the\
        character text. Notice that it is highlighted, just the same as\
        when a quality is altered.</p>",
        {
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>We're nearing the end of the road.</p>"
                );
            }
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
        <a href='discurso'>click aqu&iacute; para continuar...</a> \
        </p>",
        {
            tags: ["topic"],
            heading: "El Hall Principal",
            displayOrder: 4,
            actions: {
                // I'm going indirect here - the link carries out an
                // action, which then uses doLink to directly change
                // the situation.  This isn't the recommended way (I
                // could have just changed situation in the link), but
                // it illustrates the use of doLink.
                "boost-stamina-action": function(character, system, action) {
                    system.doLink("boost-stamina");
                }
            },
            exit: function(character, system, to) {
                system.animateQuality(
                    'stamina', character.qualities.stamina+1
                );
            }
        }
    ),
    
    discurso: new undum.Situation({
            enter: function(character, system, from){
                system.write($("#s_discurso").html());
            }
        }),
    
    "boost-stamina": new undum.SimpleSituation(
        "<p>\
        <img src='media/games/tutorial/woodcut3.png' class='float_right'>\
        The progress bar is also useful in situations where the\
        character block is displaying just the whole number of a quality,\
        whereas some action changes a fraction. If the quality is displaying\
        the character's level, for example, you might want to show a progress\
        bar to indicate how near the character is to levelling up.</p>\
        \
        <p>After a few seconds, the progress bar disappears, to keep the\
        focus on the text. Undum isn't designed for games where a lot of\
        statistic management is needed. If you want a change to be part\
        of the permanent record of the game, then write it in text.</p>\
        \
        <p>Let's <a href='hub'>return to the topic list.</a></p>"
        ),
    // Again, we'll retrieve the text we want from the HTML file.
    

  
    "high-luck-only": new undum.SimpleSituation(
        "<p>Your luck is higher than 'fair'. The link to this \
        situation would not\
        have appeared if it were lower.</p>",
        {
            tags: ["example"],
            enter: function(character, system, from) {
                system.doLink('example-choices');
            },
            optionText: "High Luck Option",
            displayOrder: 3,
            canView: function(character, system, host) {
                return character.qualities.luck > 0;
            }
        }
    ),
    "low-luck-only": new undum.SimpleSituation(
        "<p>Your luck is lower than 'fair'. The link to this situation \
        appears whether\
        it is low or high, but can only be chosen if it is low. It does this\
        by defining a <em>canChoose</em> method.</p>",
        {
            tags: ["example"],
            enter: function(character, system, from) {
                system.doLink('example-choices');
            },
            optionText: "Low Luck Option (requires low luck to be clickable)",
            displayOrder: 3,
            canChoose: function(character, system, host) {
                return character.qualities.luck < 0;
            }
        }
    ),

    "last": new undum.SimpleSituation(
        "<h1>Where to Go Now</h1>\
        <p>So that's it. We've covered all of Undum. This situation is the\
        end, because it has no further links. The 'The End' message is\
        just in the HTML output of this situation, it isn't anything special\
        to Undum</p>\
        \
        <p>I've added an\
        inspiration quality to your character list. Its time for you to\
        crack open the game file and write your own story.</p>\
        <h1>The End</h1>",
        
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
    skill: new undum.IntegerQuality(
        "Skill", {priority:"0001", group:'stats'}
    ),
    stamina: new undum.NumericQuality(
        "Stamina", {priority:"0002", group:'stats'}
    ),
    luck: new undum.FudgeAdjectivesQuality( // Fudge as in the FUDGE RPG
        "<span title='Skill, Stamina and Luck are reverently borrowed from the Fighting Fantasy series of gamebooks. The words representing Luck are from the FUDGE RPG. This tooltip is illustrating that you can use any HTML in the label for a quality (in this case a span containing a title attribute).'>Luck</span>",
        {priority:"0003", group:'stats'}
    ),

    inspiration: new undum.NonZeroIntegerQuality(
        "Inspiration", {priority:"0001", group:'progress'}
    ),
    novice: new undum.OnOffQuality(
        "Novice", {priority:"0002", group:'progress', onDisplay:"&#10003;"}
    ),
    arma: new undum.OnOffQuality(
            "Crescent Rose", {priority:"0002", group:'objetos', onDisplay:"&#10003;"} 
            )
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, {priority:"0001"}),
    progress: new undum.QualityGroup('Progress', {priority:"0002"}),
    objetos: new undum.QualityGroup('Objetos', {priority:"0002"}),
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    character.qualities.skill = 12;
    character.qualities.stamina = 12;
    character.qualities.luck = 0;
    character.qualities.novice = 1;
    character.qualities.inspiration = 0;
    character.qualities.arma = 0;
    system.setCharacterText("<p>Te encuentras en la academia.</p>");
};
