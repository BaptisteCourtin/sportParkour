import React from "react";

const Custom404 = () => {
  return (
    <main className="page404">
      <div className="containerText">
        <h1>Bonjour, valeureux guerrier ! Voulez-vous jouer avec moi ?</h1>
        <h2 className="linkToNext">
          <a href="#0" className="button">
            OUI avec plaisir
          </a>
          <a href="/" className="button">
            NON sans façon, ramenez moi à l'accueil
          </a>
        </h2>
      </div>

      {/* 0 */}
      <div className="containerText" id="0">
        <p>
          Votre objectif, si vous l'acceptez, est de retrouver votre route.
          Malheureusement pour vous (et avec un grand plaisir pour moi), il vous
          faudra traverser le Royaume de Pluie (c'est une forêt), les Griffes
          des Montagnes Nuageuses (c'est dans le nom, ce sont des montagnes) et
          faire un plongeon dans la Baie des 1000 Écailles (c'est de l'eau).
          <br />
          <br />
          Et non, vous ne pouvez pas y aller sur le dos d'un gros aigle. De
          toute façon, c'est moi qui décide ! Nananère.
        </p>
        <div className="linkToNext">
          <a href="#1" className="button">
            Faire un pas en avant
          </a>
          <a href="#2" className="button">
            Faire un pas en arrière
          </a>
        </div>
      </div>

      {/* 1 */}
      <div className="containerText" id="1">
        <p>
          Vous vous avancez vers votre destin, d'un pas affirmé, vers le Royaume
          de Pluie. En arrivant à l'orée de la forêt, vous regardez à
          l'intérieur. C'est sombre. Les arbres forment un toit dense de
          branches et de feuilles, la lumière perce peu à travers la canopée. À
          l'extérieur, le soleil est encore haut dans le ciel. Quel chemin
          voulez-vous emprunter ?
        </p>
        <div className="linkToNext">
          <a href="#3" className="button">
            Avancer dans la forêt
          </a>
          <a href="#4" className="button">
            Faire le tour de la forêt
          </a>
        </div>
      </div>

      {/* 8 */}
      <div className="containerText" id="8">
        <p>
          De votre main droite, vous agrippez le bout de votre pantalon, tandis
          qu'avec votre main gauche, vous vous tenez aux racines.
          <br />
          <br />
          Doucement et prudemment, un pied après l'autre, vous commencez à
          descendre. Vous y êtes presque, vous tendez votre bras gauche pour
          prendre de l'eau et la porter à votre bouche. Ça fait du bien.
          <br />
          <br />
          Le rocher sous vos pieds vacille et se détache de la falaise. Vous
          attrapez une racine en toute hâte, vous n'avez plus rien sur quoi
          poser vos pieds. Vos habits semblent résister.
        </p>
        <div className="linkToNext">
          <a href="#9" className="button">
            Continuer à boire
          </a>
          <a href="#5" className="button">
            Remonter
          </a>
        </div>
      </div>

      {/* 5 */}
      <div className="containerText" id="5">
        <p>
          Vous hésitez mais finissez par choisir d'aller dans la forêt. Il y
          fait sombre, très sombre, trop sombre... sombre. Dans toute cette
          obscurité, vous arrivez tout de même très bien à distinguer la falaise
          qui s'enfonce dans la forêt. Elle semble même continuer à s'étendre
          peu à peu, mais aucun bruit ne vous donne de confirmation. Vous avez
          faim, soif et sommeil. Décidément.
        </p>
        <div className="linkToNext">
          <a href="#15" className="button">
            Se reposer
          </a>
          <a href="#16" className="button">
            Continuer à explorer
          </a>
        </div>
      </div>

      {/* 14 */}
      <div className="containerText" id="14">
        <p>
          Vous décidez de commencer par combler votre faim. Vous vous aventurez
          dans la forêt. Vous préférez repérer le terrain avant toute chose.
          Mais vous entendez un clapotis non loin de vous. Vous continuez à
          inspecter le terrain avant de vous rendre dans une petite clairière
          traversée par un léger cours d'eau. Vous vous désaltérez avant de
          reprendre le fil de vos pensées.
        </p>
        <div className="linkToNext">
          <a href="#17" className="button">
            Chercher des fruits
          </a>
          <a href="#18" className="button">
            Poser des pièges
          </a>
        </div>
      </div>

      {/* 16 */}
      <div className="containerText lose" id="16">
        <p>
          Vous continuez à explorer la forêt, vous n'y voyez bientôt plus rien.
          Les bruits environnants vous surprennent et vous font peur. Vous ne
          distinguez plus vos pieds, vous avancez complètement à l'aveugle.
          <br />
          <br />
          Votre pied se prend dans une racine, vous trébuchez et vous ouvrez le
          crâne sur ce qui semble être un gros caillou. De petites lumières
          apparaissent ici et là, mais votre vision se brouille. Du sang coule
          sur vos yeux. Ne pas dormir, ne pas dormir, ne pas... C'est trop tard,
          épuisé, frigorifié, vous vous endormez pour la dernière fois.
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 45 */}
      <div className="containerText" id="45">
        <p>
          Les nains se sont arrêtés.
          <br />
          <br /> Leur chef lève la main. « Continuez à remuer ! » Les autres
          nains cessent de bouger. Ils se regardent avec de grands yeux. Une
          vague de murmures se fait sentir. La marmite est toujours en train de
          chauffer. Il serait bien qu'ils se dépêchent. <br />
          <br />
          Le plus vieux des nains s'avance sur l'estrade. « Arrêtez le feu,
          c'est la parole des dieux. »
          <br />
          <br />
          Le feu s'éteint. Les cordes qui vous retenaient se détendent puis
          tombent. Vous vous relevez et sortez de la marmite.
        </p>
        <div className="linkToNext">
          <a href="#46" className="button">
            Vous enfuire
          </a>
          <a href="#47" className="button">
            Parler au vieux nain
          </a>
        </div>
      </div>

      {/* 3 */}
      <div className="containerText nainDeJardin" id="3">
        <p>
          Vous vous avancez de plus en plus profondément dans l'immensité de la
          forêt. Les minutes deviennent des heures, et votre vision s'habitue
          peu à peu à l'obscurité ambiante. Vous avez perdu la notion du temps.
          <br />
          <br />
          Au loin, vous remarquez de petits points lumineux. Vous vous en
          approchez. De petits bruits vous parviennent. Vous continuez à vous
          rapprocher. Plus aucun bruit. Plus de lumière. Une seule lumière
          s'approche de vous. Un nain de jardin apparaît.
          <br />
          <br />
          "Bonsoir, voyageur. Qu'est-ce qui vous amène par ici ?"
        </p>
        <div className="linkToNext">
          <a href="#52" className="button">
            Je suis à la recherche de la page perdu
          </a>
          <a href="#32" className="button">
            Mes pieds (lol)
          </a>
        </div>
      </div>

      {/* 39 */}
      <div className="containerText" id="39">
        <p>
          Vous essayez de les convaincre comme vous pouvez. « Je vous apporterai
          de la viande. »
          <br />
          <br />
          Leur chef vous regarde de travers. « Il n’y a que des serpents et des
          piafs dans ce bois, et ce n’est pas bon. »
        </p>
        <div className="linkToNext">
          <a href="#41" className="button">
            Il doit bien y avoir d'autres viandes
          </a>
          <a href="#42" className="button">
            Ne rien faire
          </a>
        </div>
      </div>

      {/* 2 */}
      <div className="containerText lose" id="2">
        <p>
          Vous faites un pas en arrière. Nous sommes dans un monde ouvert, et il
          n'y a pas de mur invisible ni de glitch, mon mode est parfait.
          <br />
          <br />
          Malheureusement, vous n'avez pas regardé derrière vous, pourtant le
          vent dans vos cheveux aurait dû vous prévenir. Vous tombez de la
          falaise. Vous hurlez de terreur. Vos cris s'évanouirent bien avant que
          ne résonne le craquement de vos os sur les rochers. Vous êtes mort.
          Dommage.
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 31 */}
      <div className="containerText lose" id="31">
        <p>Vous êtes mort. Dead. Finito. Kaput. Crevé, quoi... (feur)</p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 13 */}
      <div className="containerText ruisseau" id="13">
        <p>
          Vous vous enfoncez de plus en plus dans la forêt. Le soleil passe
          difficilement à travers l'épais feuillage, mais vos yeux s'y habituent
          peu à peu.
          <br />
          <br />
          Il vous a fallu peu de temps pour reconnaître le clapotis de la
          rivière non loin de vous. Vous vous y aventurez et trouvez une petite
          clairière. Un léger cours d'eau se faufile entre les rochers. Vous
          étanchez votre soif. Ça va mieux. Vous profitez de cet endroit pour
          vous asseoir deux minutes et réfléchir à votre périple. Vous savez
          qu'il vous faudra passer par les Griffes des Montagnes Nuageuses. Ce
          cours d'eau doit sûrement provenir de ces montagnes.
          <br />
          <br />
          Vous ne pouvez pas partir maintenant. Il faut vous préparer un
          minimum.
        </p>
        <div className="linkToNext">
          <a href="#17" className="button">
            Chercher des fruits
          </a>
          <a href="#18" className="button">
            Poser des pièges
          </a>
        </div>
      </div>

      {/* 22 */}
      <div className="containerText" id="22">
        <p>
          Vous n'avez pas mangé, votre ventre vous fait mal, mais vous êtes trop
          faible pour poser des pièges, et avec quoi, de toute façon ? Vous
          buvez l'eau claire pour combler ce vide et faites une pause. Vous ne
          pouvez pas repartir ainsi, il vous faut trouver quelque chose à
          grignoter.
        </p>
        <div className="linkToNext">
          <a href="#23" className="button">
            Manger de l'écorce
          </a>
          <a href="#24" className="button">
            Continuer à chercher
          </a>
        </div>
      </div>

      {/* 4 */}
      <div className="containerText falaise" id="4">
        <p>
          Vous commencez à faire le tour de la forêt par la gauche. Le soleil
          vous chauffe le dos. Vous marchez d'un pas assuré sur la route de
          gravier qui s'étend devant vous. Petit à petit, le chemin se rétrécit,
          se rétrécit, se rétrécit trop, jusqu'à disparaître. La falaise
          s'enfonce désormais dans la forêt. Vous commencez à fatiguer de cette
          longue marche.
          <br />
          <br />
          Vous regardez vers la forêt. Il y fait encore plus sombre que tout à
          l'heure. Le soleil est bas dans le ciel, dans peu de temps il passera
          derrière l'horizon dans un magnifique coucher de soleil sur la mer.
        </p>
        <div className="linkToNext">
          <a href="#5" className="button">
            Aller dans la forêt
          </a>
          <a href="#6" className="button">
            Rester au bord de la falaise
          </a>
        </div>
      </div>

      {/* 17 */}
      <div className="containerText" id="17">
        <p>
          Vous ne voulez pas vous embêter à poser des pièges et préférez
          chercher s'il n'y aurait pas des fruits. Vous êtes dans une forêt,
          tout de même. Vous finissez par trouver un cocotier. Vous n'avez pas
          encore vu d'autres fruits.
        </p>
        <div className="linkToNext">
          <a href="#19" className="button">
            Monter à l'arbre
          </a>
          <a href="#20" className="button">
            Passer votre chemin
          </a>
        </div>
      </div>

      {/* 56 */}
      <div className="containerText win" id="56">
        <p>
          « Merci, mais je dois reprendre ma route au plus vite. » Vous repartez
          sur votre chemin pour trouver la page perdue.
        </p>
        <div className="linkToNext">
          <a href="/" className="button">
            Votre voyage s'arrête là pour l'instant...
          </a>
        </div>
      </div>

      {/* 41 */}
      <div className="containerText lose" id="41">
        <p>
          Les nains se sont arrêtés.
          <br />
          <br />
          Leur chef lève la main. « Qui peut lui éclater le crâne, s'il vous
          plaît ? »
          <br />
          <br />
          Une branche vous tombe dessus et vous assomme.
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 47 */}
      <div className="containerText win" id="47">
        <p>
          « Votre peuple va affronter un grand danger. Je vois la terre s'ouvrir
          sans un bruit, les arbres sombrer en enfer pour y ramener les feux
          vengeurs. »
          <br />
          <br />
          Le vieux nain vous regarde, subjugé. « Amis nains, il faut partir au
          plus vite, prévenez les autres clans, le jour est arrivé. »<br />
          <br /> Ce fut instantanément la pagaille. Tous s'affairèrent à
          emballer leurs affaires et à prendre des provisions. Leur chef et leur
          vieux sage donnaient des ordres à des messagers et organisaient toute
          cette bousculade. Dans la tourmente, vous en profitez pour reprendre
          vos affaires et vous éclipser sans un bruit.
          <br />
          <br />
          Vous arrivez en fin de journée à la frontière de la forêt. Personne ne
          vous avait suivi. Vous êtes libre.
        </p>
        <div className="linkToNext">
          <a href="/" className="button">
            Votre voyage s'arrête là pour l'instant...
          </a>
        </div>
      </div>

      {/* 11 */}
      <div className="containerText lose" id="11">
        <p>
          Votre mouvement brusque entraîne une partie du pantalon avec vous.
          Vous essayez tant bien que mal de vous raccrocher à tout ce qui
          pourrait dépasser de la falaise, mais c'est trop tard. Vous tombez,
          toujours avec le bout de pantalon à la main. Vous êtes mort ? Oui.
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 54 */}
      <div className="containerText win" id="54">
        <p>
          « Merci, mais mon destin m'appelle. Je dois repartir au plus vite pour
          retrouver ma voie. »
          <br />
          <br /> Vous repartez de suite vers d'autres aventures.
        </p>
        <div className="linkToNext">
          <a href="/" className="button">
            Votre voyage s'arrête là pour l'instant...
          </a>
        </div>
      </div>

      {/* 40 */}
      <div className="containerText" id="40">
        <p>
          "J'ai cru comprendre qu'il y avait d'autres tribus. Je serais votre
          allié." <br />
          <br />
          Le chef des nains semble intrigué. "Arrêtez le feu !"
          <br />
          <br />
          Vous sentez le fond de la marmite cesser de chauffer. "Oui, vous
          pourriez nous être utile. Mais comment pouvons-nous vous faire
          confiance ?"
        </p>
        <div className="linkToNext">
          <a href="#43" className="button">
            Je n'ai qu'une parole
          </a>
          <a href="#43" className="button">
            Vous avez mes vêtements
          </a>
        </div>
      </div>

      {/* 55 */}
      <div className="containerText lose" id="55">
        <p>
          Vous mangez les écorces. C'est dur, avec un arrière-goût amer. Mais
          vous vous sentez léger, comme un oiseau. Les nains forment une ronde
          autour de vous. Vous battez des ailes de plus en plus vite.
          <br />
          <br />« Vite, au gouffre ! » crie leur chef. Les nains vous emmènent
          vers un plongeoir. Vous allez pouvoir sentir le vent battre contre vos
          ailes pour la première fois. Vous vous élancez dans la crevasse...
          <br />
          <br />« J'espère que ce sacrifice nous vaudra les faveurs de Mère
          Nature. Retardons notre départ d'un jour. Nous verrons demain si la
          descente aux enfers a reculé. »
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 37 */}
      <div className="containerText" id="37">
        <p>
          « Rebellez-vous, je suis venu en ami. On ne fait pas cuire ses amis,
          même quand ils font des blagues nulles. Frères nains, arrêtez cette
          cuisson et je vous aiderai de la meilleure des façons. Je vous
          apporterai à manger, autant que vous le souhaiterez. »
          <br />
          <br />
          Le chef s’adresse à vous : « Nous ne manquons pas de nourriture. Ces
          bois ne sont pas très prolifiques, mais les tribus naines ont su
          cultiver les buissons fruitiers. »
          <br />
          <br />
          Le fond de la marmite commence à se réchauffer.
        </p>
        <div className="linkToNext">
          <a href="#39" className="button">
            Je vous apporterais de la viande
          </a>
          <a href="#40" className="button">
            Je vous protègerais
          </a>
        </div>
      </div>

      {/* 23 */}
      <div className="containerText" id="23">
        <p>
          Miam, c'est croquant mais pas fondant. Je ne suis vraiment pas sûr de
          la qualité nutritive.
          <br />
          <br /> En vrai, c'est un peu con, non ?
          <br />
          <br />
          Tiens, une fourmi derrière ce bout d'écorce. Vous l'écrasez avec votre
          pied. Ça fait mal. Vous allez bien ? Pas sûr. Les couleurs sont
          inversées, les formes deviennent toutes des bulles, et vous sentez la
          terre tourner…
        </p>
        <div className="linkToNext">
          <a href="#26" className="button">
            Vous battre contre un ours
          </a>
          <a href="#27" className="button">
            Devenir un poisson
          </a>
        </div>
      </div>

      {/* 20 */}
      <div className="containerText buisson" id="20">
        <p>
          Vous commencez à fatiguer, mais vous finissez par trouver plusieurs
          arbustes fruitiers. Vous ne connaissez pas ces fruits, mais ils
          semblent appétissants.
        </p>
        <div className="linkToNext">
          <a href="#21" className="button">
            Manger
          </a>
          <a href="#22" className="button">
            Retourner à la clairière
          </a>
        </div>
      </div>

      {/* 9 */}
      <div className="containerText" id="9">
        <p>
          De la main droite, vous vous cramponnez de toutes vos forces à votre
          pantalon. De la main gauche, vous continuez à prendre de l'eau. Votre
          soif est étanchée, mais vous entendez un craquement. Vous relevez les
          yeux, et constatez que votre pantalon se déchire.
        </p>
        <div className="linkToNext">
          <a href="#11" className="button">
            Agripper rapidement une racine
          </a>
          <a href="#12" className="button">
            Agripper doucement une racine
          </a>
        </div>
      </div>

      {/* 46 */}
      <div className="containerText win" id="46">
        <p>
          Vous courez, courez, courez. Vous esquivez les branches et les
          racines. Votre coeur s'affole. Vos mouvements deviennent automatiques.
          De la lumière au loin. Vous ne décellerez pas, ne retournez pas non
          plus la tête. Vous sentez qui si vous atteignez la lumière vous serrez
          en sécurité.
          <br />
          <br />
          Une bouffée de vent frais vous souffle sur le visage. Vous avez réussi
          à passer cette forêt. Vous regarder derrière vous. Il y fait toujours
          aussi sombre.
        </p>
        <div className="linkToNext">
          <a href="/" className="button">
            Votre voyage s'arrête là pour l'instant...
          </a>
        </div>
      </div>

      {/* 42 */}
      <div className="containerText lose" id="42">
        <p>
          Vous ne faites rien. L'eau se réchauffe peu à peu. Vous vous endormez.
          <br />
          <br />
          Dead, finito.
          <br />
          <br />
          C'était très con.
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 33 */}
      <div className="containerText" id="33">
        <p>
          Il vous reste peu de temps. Le fond de la marmite va bientôt vous
          brûler le derrière. Les nains arborent des peintures sur leurs joues,
          avec des cercles de toutes les couleurs.
          <br />
          <br />
          Vous entamez votre discours.
        </p>
        <div className="linkToNext">
          <a href="#37" className="button">
            Rebellez vous
          </a>
          <a href="#38" className="button">
            Avoir une vision
          </a>
        </div>
      </div>

      {/* 43 */}
      <div className="containerText" id="43">
        <p>
          "Je vous aiderai de toutes les manières possibles, à condition que
          vous me sortiez de là." Le chef des nains semble réfléchir un instant.
          "Bien, détachez-le, ça vaut le coup d'essayer." <br />
          <br />
          L'un des nains, qui semble diriger les opérations autour des cordes,
          exprime une inquiétude. "Vous êtes sûr, chef ? Il n'y a pas beaucoup
          d'humains qui passent par ici." <br /> "Oui, allez-y. La dernière fois
          qu'il y en a eu un, plusieurs sont arrivés peu après," répond le chef
          avec détermination.
          <br />
          <br /> Vous vous redressez et sortez de la marmite.
        </p>
        <div className="linkToNext">
          <a href="#46" className="button">
            Vous enfuire
          </a>
          <a href="#48" className="button">
            Demandez vos vêtements
          </a>
        </div>
      </div>

      {/* 38 */}
      <div className="containerText lanceLeDe" id="38">
        <p>
          « Il est écrit que seul le dernier des poulpes à sept bras pourra voir
          la comète à friture s'écraser dans les lianes de l'ayahuasca. Alors,
          les bulles de savon nous libéreront de l'emprise du grand chou-fleur
          gris. Elles seules nous amèneront vers la terre du ciel promis. »
          <br />
          <br />
          Lancez un dé à 20 faces.
        </p>
        <div className="linkToNext">
          <a href="#41" className="button">
            Résultat entre 1 et 10
          </a>
          <a href="#45" className="button">
            Résultat entre 11 et 20
          </a>
        </div>
      </div>

      {/* 30 */}
      <div className="containerText" id="30">
        <p>
          Le bruit ambiant vous réveille. Vous avez toujours mal au dos, mais
          vous pouvez bouger. Enfin... pas totalement. <br />
          <br />
          Vous êtes dans une grande marmite. Autour de vous, une bande de nains
          de jardin s'active. Ils sont en train d'allumer un feu sous votre
          marmite. Vous crachez la pomme que vous avez dans la bouche.
        </p>
        <div className="linkToNext">
          <a href="#33" className="button">
            S'adresser aux nains
          </a>
          <a href="#34" className="button">
            Ronger les cordes
          </a>
        </div>
      </div>

      {/* 15 */}
      <div className="containerText" id="15">
        <p>
          Après une nuit peu agréable, vous vous réveillez avec la bouche sèche
          et des gargouillis dans le ventre.
        </p>
        <div className="linkToNext">
          <a href="#13" className="button">
            Chercher un ruisseau
          </a>
          <a href="#14" className="button">
            Chercher à manger
          </a>
        </div>
      </div>

      {/* 27 */}
      <div className="containerText lose" id="27">
        <p>
          Bloup bloup! Bloup bloup bloup, bloup bloup. Bloup bloup, bloup bloup
          bloup, bloup bloup. Bloup bloup bloup bloup bloup bloup bloup bloup
          bloup bloup bloup bloup! Bloup bloup ?
          <br />
          <br />
          Bloup bloup, bloup bloup, bloup bloup bloup bloup bloup bloup, bloup
          bloup.
          <br />
          <br />
          Vous vous êtes éclaté la tête sur un rocher dans la rivière.
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 49 */}
      <div className="containerText lose" id="49">
        <p>
          Vous réduisez le clan adverse en cendres. Vous avez pris goût au sang.
          Bientôt, toute la forêt sera à vous. Vous décidez finalement de rester
          avec votre clan pour le reste de votre vie, ou du moins pour
          l'instant, jusqu'à ce que toute la forêt se prosterne à vos pieds.
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 12 */}
      <div className="containerText" id="12">
        <p>
          Vous prenez votre temps, vous fixez le pantalon des yeux. Un mouvement
          brusque et c'est la fin. Une sueur froide parcourt votre dos, mais
          vous résistez. Vous finissez par attraper une racine avec votre main
          gauche, puis une autre avec votre main droite. Vous remontez et vous
          vous rhabillez.
          <br />
          <br />
          Vous êtes exténué, et vous vous endormez rapidement. Votre périple
          d'hier a calmé vos ardeurs. Vous évitez de vous rapprocher de la
          falaise et vous vous enfoncez dans la forêt. Vous avez passé une bonne
          nuit, mais il faut penser à manger. Vous êtes dans une forêt, vous
          devriez pouvoir trouver à manger et à boire.
        </p>
        <div className="linkToNext">
          <a href="#13" className="button">
            Chercher un ruisseau{" "}
          </a>
          <a href="#14" className="button">
            Chercher à manger
          </a>
        </div>
      </div>

      {/* 51 */}
      <div className="containerText" id="51">
        <p>
          Un nain un peu plus grand que les autres s'avance. « Merci, humain.
          Sans vous, nous serions tous morts. Pour vous remercier, veuillez
          accepter ce présent. »
          <br />
          <br />
          Il vous donne un petit sachet rempli d'écorce. « Mangez, vous verrez,
          c'est très bon. »
        </p>
        <div className="linkToNext">
          <a href="#55" className="button">
            Manger
          </a>
          <a href="#56" className="button">
            Ne pas manger
          </a>
        </div>
      </div>

      {/* 6 */}
      <div className="containerText" id="6">
        <p>
          Vous vous asseyez sur le bord de la falaise pour observer le coucher
          de soleil. En fouillant dans vos poches, vous y trouvez un vieux
          paquet de petits beurres LU à moitié cassés. En mangeant vos biscuits
          cassés, vous vous dites que le monde n'est peut-être pas si horrible
          que ça. Par contre, vous avez soif.
          <br />
          <br />
          Vous regardez en contrebas, un filet d'eau sort de la falaise, cette
          eau doit certainement venir d'une rivière souterraine, elle devrait
          donc être potable.
        </p>
        <div className="linkToNext">
          <a href="#7" className="button">
            Essayer de boire cette eau
          </a>
          <a href="#5" className="button">
            Aller dans la forêt
          </a>
        </div>
      </div>

      {/* 28 */}
      <div className="containerText lanceLeDe" id="28">
        <p>
          Vous tentez de jeter le serpent, mais sa queue est toujours enroulée
          autour d'une branche.
          <br />
          <br />
          Vous avez un fort mouvement de recul et tombez à la renverse. Aïe !
          Votre dos vous fait mal ; vous essayez de bouger, mais c'est
          impossible. Vous criez à l'aide. Rien. Pas un bruit, si ce n'est les
          oiseaux qui viennent de s'enfuir.
          <br />
          <br />
          Jetez un dé à 20 faces.
        </p>
        <div className="linkToNext">
          <a href="#30" className="button">
            Résultat entre 1 et 10
          </a>
          <a href="#31" className="button">
            Résultat entre 11 et 20
          </a>
        </div>
      </div>

      {/* 32 */}
      <div className="containerText" id="32">
        <p>
          « Tu te fous de ma gueule, petit con ? Pétez-lui les rotules, les gars
          ! »
          <br />
          <br />
          Une horde de nains de jardin enragés vous saute dessus. Vous croulez
          sous leur poids. Vous avez du mal à respirer et sombrez peu à peu dans
          les vapes.
          <br />
          <br />
          Vous vous réveillez dans une grande marmite avec une pomme dans la
          bouche. Vous essayez de partir, mais de larges cordes vous retiennent.
          Un nain avec une épée gonflable commence à faire une danse autour de
          la marmite.
          <br />
          <br />
          Celui qui semble être leur chef commence à faire un discours. Vous
          crachez votre pomme.
        </p>
        <div className="linkToNext">
          <a href="#33" className="button">
            S'adresser aux nains
          </a>
          <a href="#34" className="button">
            Ronger les cordes
          </a>
        </div>
      </div>

      {/* 50 */}
      <div className="containerText" id="50">
        <p>
          Juste avant que les premières lames s'entrechoquent, vous vous
          retournez et attaquez votre clan. Un mouvement de panique se propage
          dans vos rangs. En peu de temps, votre ancienne armée est défaite.
          <br />
          <br />
          Vous vous retrouvez dans ce nouveau village. Beaucoup de sacs remplis
          sont à terre. Plusieurs fenêtres sont barricadées et une foule
          s'approche de vous.
        </p>
        <div className="linkToNext">
          <a href="#46" className="button">
            Vous enfuire
          </a>
          <a href="#51" className="button">
            Parler à leur chef
          </a>
        </div>
      </div>

      {/* 18 */}
      <div className="containerText" id="18">
        <p>
          Huuuuuum ! Comment poser des pièges ? Pas de fil de fer. Pas de pelle.
          Huuuuuuuuuuuuuuuuuuuuuuuuuuum !!!! 🤔🤔🤔🤔🤔
          <br />
          <br />
          Bah, vous allez créer une lance. Ah bah non, vous n'avez pas de
          couteau.
          <br />
          <br />
          Tailler une branche sur un caillou ? Long. Et après, vous n'avez pas
          de feu.
          <br />
          <br />
          Bon, du coup, les fruits c'est bien. Vous finissez par trouver un
          cocotier. Vous n'avez pas encore vu d'autres fruits.
        </p>
        <div className="linkToNext">
          <a href="#19" className="button">
            Monter à l'arbre
          </a>
          <a href="#20" className="button">
            Passer votre chemin
          </a>
        </div>
      </div>

      {/* 7 */}
      <div className="containerText" id="7">
        <p>
          Vous observez la falaise, elle est toujours abrupte mais vous devriez
          pouvoir accéder à cette eau si précieuse. Vous tendez le bras pour
          mieux mesurer la distance. Trois bras. Vous pouvez peut-être y arriver
          avec une corde, pourquoi pas, faite avec vos vêtements. Les arbres
          étant juste à côté de la falaise, plusieurs racines sont accessibles.
          Avec un peu d'agilité et de force, vous devriez pouvoir vous y
          agripper. Vous vous déshabillez et attachez votre pantalon avec votre
          T-shirt, lui-même attaché autour d'une branche basse d'un arbre.
        </p>
        <div className="linkToNext">
          <a href="#8" className="button">
            Continuer
          </a>
          <a href="#5" className="button">
            Aller dans la forêt
          </a>
        </div>
      </div>

      {/* 10 */}
      <div className="containerText" id="10">
        <p>
          Vous remontez et vous vous rhabillez. Vous êtes exténué, et vous vous
          endormez rapidement. Votre périple d'hier a calmé vos ardeurs. Vous
          évitez de vous rapprocher de la falaise et vous vous enfoncez dans la
          forêt. Vous avez passé une bonne nuit, mais il faut penser à manger
          chef. Vous êtes dans une forêt, vous devriez pouvoir trouver à manger
          et à boire.
        </p>
        <div className="linkToNext">
          <a href="#13" className="button">
            Chercher un ruisseau
          </a>
          <a href="#14" className="button">
            Chercher à manger
          </a>
        </div>
      </div>

      {/* 34 */}
      <div className="containerText" id="34">
        <p>
          Vous attrapez l'une des cordes et commencez à la ronger. Vous sentez
          l'eau se réchauffer. Vite, plus vite ! La première corde saute, mais
          il en reste encore trois.
          <br />
          <br />
          Le fond de la marmite devient brûlant. Une deuxième corde vient de
          rompre. Les nains commencent à vous jeter des fruits et des légumes.
          <br />
          <br />
          Vous réussissez à couper la troisième corde. En vous débattant un peu,
          vous finissez par vous libérer de vos chaînes. Vous faites tomber la
          marmite sur le côté, mais vous êtes toujours pieds et poings liés.
        </p>
        <div className="linkToNext">
          <a href="#35" className="button">
            S'enfuir en sautillant
          </a>
          <a href="#36" className="button">
            Péter la gueule aux nains
          </a>
        </div>
      </div>

      {/* 26 */}
      <div className="containerText win" id="26">
        <p>
          Un ours ! Vous attaquez, il esquive, et vous vous ramassez
          lamentablement par terre. Vous roulez sur le côté et attrapez une
          branche que vous lui envoyez en plein museau. Il est aveuglé, vous en
          profitez pour lui sauter dessus, vous lui mordez l'oreille, mais il
          vous repousse. Vous vous rattrapez et invoquez le pouvoir de l'amitié
          pour lui envoyer un Kamé Hamé Ha. L'ours se désintègre en petits
          canards en plastique.
          <br />
          <br />
          Vous avez gagné et devenez la nouvelle ballerine du royaume des
          écrevisses. Vous assistez à la cérémonie de remise des prix, mais
          tombez de la table.
          <br />
          <br />
          Vous vous réveillez quelques heures plus tard dans un buisson. Vous
          avez des égratignures et une dent en moins (évitez de sourire trop
          fort). Vous reprenez votre chemin et trouvez des buissons de fruits en
          fin de journée. Vous les mangez tous, ils sont succulents.
        </p>
        <div className="linkToNext">
          <a href="/" className="button">
            Votre voyage s'arrête là pour l'instant...
          </a>
        </div>
      </div>

      {/* 52 */}
      <div className="containerText" id="52">
        <p>
          Des voix résonnent en fond : « Encore un », « Ça faisait longtemps »,
          « Tu crois qu'il va y arriver ? », « Comment ça, il n'est pas frais,
          mon poisson ? », « Je crois que le dernier est mort avant de retourner
          dans son monde », « Il n'est pas au bout de ses peines », « 10 balles
          sur le fait qu'il crève avant de passer la forêt ».
          <br />
          <br />« Chut ! » dit leur chef. D'un coup, plus aucun bruit.
          <br />
          <br />« Voyageur, vous pouvez passer la nuit ici si vous le voulez.
          Certes, nous n'avons pas de maison à votre taille, mais vous pouvez
          allumer le feu du village. »
        </p>
        <div className="linkToNext">
          <a href="#53" className="button">
            Rester pour la nuit
          </a>
          <a href="#54" className="button">
            Repartir
          </a>
        </div>
      </div>

      {/* 36 */}
      <div className="containerText lose" id="36">
        <p>
          Les nains foncent sur vous. Vous attrapez l’un d’eux avec votre bouche
          et le mordez jusqu’à ce qu’il éclate.
          <br />
          <br />
          Cela ne freine pas les autres, qui commencent à vous donner de petits
          coups de lance. Ça pique, ça pique même très fort. Vous roulez sur le
          côté, mais ils vous surpassent. Vous vous retrouvez de nouveau ligoté,
          mais cette fois, il n’y a pas le temps de tergiverser. Un groupe vous
          lance une grosse pierre en plein sur la tête depuis le haut d’un
          arbre.
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 25 */}
      <div className="containerText win" id="25">
        <p>
          C'est trop haut et les forces vous manquent. Vous continuez votre
          chemin et buvez pour ne plus ressentir votre ventre vide. La chance
          vous sourit enfin en fin de journée : des arbustes fruitiers remplis
          de fruits se présentent à vous. Vous dévorez tous les fruits. Il n'en
          reste plus un seul. (Miam)
        </p>
        <div className="linkToNext">
          <a href="/" className="button">
            Votre voyage s'arrête là pour l'instant...
          </a>
        </div>
      </div>

      {/* 24 */}
      <div className="containerText" id="24">
        <p>
          Vous vous sentez trop faible pour creuser un trou et attendre qu'un
          lapin tombe dedans. Sans promesse de réussite, c'est définitivement
          une mauvaise idée. Vous décidez de continuer à chercher des fruits en
          remontant le cours d'eau.
          <br />
          <br />
          Vous apercevez un cocotier.
        </p>
        <div className="linkToNext">
          <a href="#19" className="button">
            Monter à l'arbre
          </a>
          <a href="#25" className="button">
            Passer votre chemin
          </a>
        </div>
      </div>

      {/* 21 */}
      <div className="containerText win" id="21">
        <p>
          Vous mangez les fruits, ils sont succulents, fruités à souhait et
          légèrement acides.
          <br />
          <br />
          Tout se passe bien. Vous en mangez plein et en mettez dans vos poches
          pour demain. De retour à la clairière, vous vous accordez un peu de
          repos et plongez dans un profond sommeil.
          <br />
          <br />
          Vous êtes réveillé à l’aube par un cri strident. Pas le temps ni
          l’envie d’enquêter, vous vous remettez en route, direction la source
          du cours d'eau. Sur votre route, d’autres baies vous attendent, vous
          n’en faites qu’une bouchée.
        </p>
        <div className="linkToNext">
          <a href="/" className="button">
            Votre voyage s'arrête là pour l'instant...
          </a>
        </div>
      </div>

      {/* 29 */}
      <div className="containerText" id="29">
        <p>
          Vous lâchez le serpent. Il vous attaque et vous mord le nez.
          <br />
          <br /> Vous arrivez à redescendre avec difficulté. Les couleurs sont
          inversées, les formes deviennent toutes des bulles, et vous sentez la
          terre tourner…
        </p>
        <div className="linkToNext">
          <a href="#26" className="button">
            Vous battre contre un ours
          </a>
          <a href="#27" className="button">
            Devenir un poisson
          </a>
        </div>
      </div>

      {/* 35 */}
      <div className="containerText lose" id="35">
        <p>
          Vous essayez de vous enfuir, mais les nains vous rattrapent. Vous
          croulez une nouvelle fois sous leur poids. Cette fois, vous n'y
          échapperez pas.
          <br />
          <br />
          Certes, la viande est plus tendre quand l'invité n'est pas encore mort
          dans la casserole, mais si il s'enfuit, il n'y a plus de viande du
          tout.
        </p>
        <div className="linkToNext">
          <a href="#0" className="button">
            Relancer une partie
          </a>
          <a href="/" className="button">
            Nul, ce jeu (alt F4)
          </a>
        </div>
      </div>

      {/* 48 */}
      <div className="containerText" id="48">
        <p>
          Vous récupérez vos vêtements et devenez l'esclave des nains. Votre
          première tâche est de ranger tout ce bazar pendant qu'ils vont manger
          leurs fruits favoris. Une garde rapprochée vous surveille en
          permanence. Pendant la nuit, un boulet vous est attaché au pied.
          <br />
          <br />
          Vous vivez ainsi parmi eux pendant un certain temps. Le jour de
          l'attaque du village voisin se prépare. Dans 2 jours, vous marcherez
          vers l'Est.
          <br />
          <br />
          Deux jours plus tard, en fin de journée, vous arrivez au village
          voisin. Le plan est simple : raser le village et faire le plus de
          prisonniers possible. Vous remarquez que ceux-là ont des bonnets
          bleus, alors que votre clan en a des rouges. À l'attaque !!!
        </p>
        <div className="linkToNext">
          <a href="#49" className="button">
            Attaquer avec votre clan
          </a>
          <a href="#50" className="button">
            Se retourner contre votre clan
          </a>
        </div>
      </div>

      {/* 19 */}
      <div className="containerText serpent" id="19">
        <p>
          Vous montez à l'arbre sans trop d'encombre. Arrivé à la cime, vous
          commencez à détacher des noix de coco à la chaîne et les jetez sur un
          caillou en contrebas pour les casser. Vous tombez finalement sur une
          noix de coco qui gigote. Un serpent !
        </p>
        <div className="linkToNext">
          <a href="#28" className="button">
            Le jeter
          </a>
          <a href="#29" className="button">
            Le lâcher
          </a>
        </div>
      </div>

      {/* 53 */}
      <div className="containerText win" id="53">
        <p>
          « Merci de votre hospitalité. Je repartirai demain aux aurores. »
          <br />
          « Bien, si vous le voulez », lança le chef.
          <br />
          <br />
          Il ordonna ensuite à trois autres nains d'aller chercher du petit bois
          pour allumer le feu.
          <br />
          <br />« Avant que vous repartiez, je dois vous prévenir de ce qui
          pourrait vous attendre. » Intrigué, vous l'écoutez avec attention. «
          Seule une poignée de voyageurs, dans le même cas que vous, a réussi à
          retourner dans son monde. En tout cas, c'est ce que nous laisse penser
          les éclairs bleus qui percent le ciel au-dessus de la baie des 1000
          écailles. Ils sont visibles depuis tout le continent. Ils sont du même
          bleu azur que le portail qui amène les voyageurs devant la forêt. Ils
          sont rapidement suivis de nuages mauves qui tournoient au-dessus
          d'eux. Il y en a peu par rapport au nombre d'arrivées, trop peu. Nous,
          les nains rouges, ne sommes jamais allés bien plus loin que la forêt.
          Les seules cartes que nous avons du continent ont été écrites par les
          nains bleus il y a 500 ans. Autant dire que nos connaissances du monde
          extérieur sont limitées. Il y a bien Gaston, qui est parti il y a
          presque 30 ans ; il avait soif d'aventure mais il n'est jamais revenu
          nous les conter. Enfin bref, pour atteindre la baie, il vous faudra
          passer par les pics des montagnes nuageuses. Les légendes racontent
          qu'un immense dragon y vit. »
          <br />
          <br />
          Vous passez le reste de la soirée à discuter avec le chef du village :
          leurs croyances, les différents clans, la nourriture, le monde au-delà
          de la forêt. Vous repartez le lendemain matin après avoir dit au
          revoir au village.
        </p>
        <div className="linkToNext">
          <a href="/" className="button">
            Votre voyage s'arrête là pour l'instant...
          </a>
        </div>
      </div>
    </main>
  );
};

export default Custom404;
