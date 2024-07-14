import React from "react";

const Custom404 = () => {
  return (
    <main className="page404">
      <div className="containerText">
        <h1>Bonjour valeureux guerrier! Voulez-vous jouer avec moi ?</h1>
        <h2 className="linkToNext">
          <a href="#0">OUI avec plaisir</a>
          <a href="/">NON sans façon, ramenez moi à l'accueil</a>
        </h2>
      </div>

      {/* 0 */}
      <div className="containerText" id="0">
        <p>
          Votre objectif si vous l'accepté est de retrouver votre route.
          Malheureusement pour vous (et avec un grand plaisir pour moi), il vous
          faudra traverser le Royaume de pluie (c'est une forêt), les griffes
          des montagnes nuageuses (c'est dans le nom, c'est des montagnes) et
          faire une plongeons dans la baie des 1000 écailles (c'est de l'eau).
          Et non, vous ne pouvons pas y aller sur le dos d'un gros aigle. De
          toute façon c'est moi qui décide! Nananère.
        </p>
        <div className="linkToNext">
          <a href="#1">Faire un pas en avant</a>
          <a href="#2">Faire un pas en arrière</a>
        </div>
      </div>

      {/* 1 */}
      <div className="containerText" id="1">
        <p>
          Vous vous avancer vers votre destin d'un pas affirmé. Vous vous
          aventurez vers le royaume de pluie. En arrivant à l'orée de la forêt,
          vous regardez à l'intérieur. C'est sombre, les arbres forme un toit
          dense de branches et de feuilles, la lumière perce peu à travers la
          canopée. A l'extérieur, le soleil est encore haut dans le ciel. Quel
          chemin voulez vous empreinter?
        </p>
        <div className="linkToNext">
          <a href="#3">Avancer dans la forêt</a>
          <a href="#4">Faire le tour de la forêt</a>
        </div>
      </div>

      {/* 2 */}
      <div className="containerText" id="2">
        <p>
          Vous faites un pas en arrière. Nous sommes dans un mode ouvert, et il
          n'y a pas de mur invisible, ni de glitch, mon mode est parfait.
          Malheureusement vous n'avez pas regardé derrière vous, pourtant le
          vent dans vos cheveux aurait dû vous prévenir. Vous tomber de la
          falaise. Vous hurlez de terreur. Vos crient s'évanouirent bien avant
          que ne résonne le craquement de vos os sur les rochers. Vous êtes
          mort. Dommage.
        </p>
        <div className="linkToNext">
          <a href="#0">Relancer une partie</a>
          <a href="/">Nul, ce jeu (alt F4)</a>
        </div>
      </div>

      {/* 4 */}
      <div className="containerText" id="4">
        <p>
          Vous commencer à faire le tour de la forêt par la gauche. Le soleil
          vous chauffe le dos. Vous marchez d'un pas assurer sur la route de
          gravier qui s'étant devant vous. Peu petit à petit, le chemin se
          rétrécit, se rétrécit, se rétrécit trop, jusqu'à disparaitre. La
          falaise est désormais au pied de la forêt. Vous commencez a fatiguer
          de cette longue marche. Vous regardez vers la forêt. Il y fait encore
          plus sombre que tout à l'heure. Le soleil est bas de le ciel, dans peu
          de temps il passera derrière l'horizon dans un magnifique couché de
          soleil sur la mer.
        </p>
        <div className="linkToNext">
          <a href="#5">Aller dans la forêt</a>
          <a href="#6">Rester au bord de la falaise</a>
        </div>
      </div>

      {/* 5 */}
      <div className="containerText" id="5">
        <p>
          Vous hésitez mais finissez par choisir d'allez dans la forêt. Il y
          fait sombre, très sombre, trop sombre... Sombre. Vous avez faim, et
          soif et sommeille. Décidemment.
        </p>
        <div className="linkToNext">
          <a href="#15">Se reposer</a> - <a href="#16">Continuer à explorer</a>
        </div>
      </div>

      {/* 6 */}
      <div className="containerText" id="6">
        <p>
          Vous vous asseyait sur le bord de la falaise pour observer le coucher
          de soleil. En fouillant dans vos poches, vous y trouvez un vieux
          paquet de petit beurre LU à moitié cassés. En mangeant vos biscuits,
          vous vous dites que le monde est peut être pas si horrible que ça. Par
          contre vous avez soif. Vous regarder en contrebas, un filé d'eau sort
          de la falaise, cette eau doit certainement venir d'une rivière
          souterraine, elle devrait donc être potable.
        </p>
        <div className="linkToNext">
          <a href="#7">Essayer de boire cette eau</a>
          <a href="#5">Aller dans la forêt</a>
        </div>
      </div>

      {/* 7 */}
      <div className="containerText" id="7">
        <p>
          Vous observez la falaise, elle est toujours abrupte mais vous devriez
          pouvoir accéder à cette eau si précieuse. Vous tendez le bras pour
          mieux mesurer la distance. 3 bras. Vous pouvez peut y arrivez avec une
          corde, pourquoi pas faites avec vos vêtements. Les arbres étant juste
          à côté de la falaise, plusieurs racines sont accessibles. Avec un peu
          d'agilité et de force vous devriez pouvoir vous y agripper. Vous vous
          déshabiller et attacher votre pantalons avec votre T-shirt, lui même
          attacher autour d'une branche base d'un arbre.
        </p>
        <div className="linkToNext">
          <a href="#8">Continuer</a>
          <a href="#5">Aller dans la forêt</a>
        </div>
      </div>

      {/* 8 */}
      <div className="containerText" id="8">
        <p>
          De votre main droite vous agrippez le bout de votre pantalon, tandis
          que de votre main gauche, vous vous tenez aux racine. Doucement et
          prudemment, un pied après l'autre vous commencez à descendre. Vous y
          êtes presque, vous tendez votre bras gauche pour prendre de l'eau et
          la porter à votre bouche. Ca fait du bien. Le rocher sous vos pieds
          vacille et se détache de la falaise. Vous attrapez une racine en toute
          hâte, vous n'avez plus rien sur quoi poser vos pieds. Vos habits
          semblent résister.
        </p>
        <div className="linkToNext">
          <a href="#8">Continuer à boire</a>
          <a href="#5">Remonter</a>
        </div>
      </div>

      {/* 9 */}
      <div className="containerText" id="9">
        <p>
          De la main droite vos vous cramponnez de toutes vos forces à votre
          pantalon. De la main gauche, vos continuez à prendre de l'eau. Votre
          soif est étanché, mais vous entendez un craquement, vous relevez les
          yeux, votre pantalon se déchire.
        </p>
        <div className="linkToNext">
          <a href="#11">Agripper rapidement une racine</a>
          <a href="#12">Agripper doucement une racine</a>
        </div>
      </div>

      {/* 11 */}
      <div className="containerText" id="11">
        <p>
          Votre mouvement brusque entraine une moitié de pantalon. Vous essayez
          tant bien que mal de vous raccrochez à tout ce qui pourrait dépasser
          de la falaise mais c'est trop tard. Vous tombez, toujours avec votre
          bout de pantalon à la main. Vous êtes mort? Oui.
        </p>
        <div className="linkToNext">
          <a href="#0">Relancer une partie</a>
          <a href="/">Nul, ce jeu (alt F4)</a>
        </div>
      </div>

      {/* 12 */}
      <div className="containerText" id="12">
        <p>
          Vous prenez votre temps, vous fixez le pantalons des yeux. Un
          mouvement brusque et c'est la fin. Une sueur froide parcours votre dos
          mais vos résistez. Vous finissez par attraper une racine avec votre
          main gauche puis une autre avec votre main droite. Vous remonter et
          vous vous rhabillez. Vous êtes exténuez, et vous vous endormez
          rapidement. Votre périple d'hier à calmez vous ardeurs. Vous évitez de
          vous rapprochez de la falaise et vous vous enfoncez dans la forêt.
          Vous avez passer une bonne nuit mais il faut penser à manger chef.
          Vous êtes dans une forêt, vous devriez pouvoir trouver à manger et à
          boire.
        </p>
        <div className="linkToNext">
          <a href="#13">Chercher un ruisseau </a>
          <a href="#14">Chercher à manger</a>
        </div>
      </div>

      {/* 10 */}
      <div className="containerText" id="10">
        <p>
          Vous remonter et vous vous rhabillez. Vous êtes exténuez, et vous vous
          endormez rapidement. Votre périple d'hier à calmez vous ardeurs. Vous
          évitez de vous rapprochez de la falaise et vous vous enfoncez dans la
          forêt. Vous avez passer une bonne nuit mais il faut penser à manger.
          Vous êtes dans une forêt, vous devriez pouvoir trouver à manger et à
          boire.
        </p>
        <div className="linkToNext">
          <a href="#13">Chercher un ruisseau</a>
          <a href="#14">Chercher à manger</a>
        </div>
      </div>

      {/* 15 */}
      <div className="containerText" id="15">
        <p>
          Après une nuit peu agréable, vous voulez réveillez avec la bouche
          sèche et des gargouillis dans le ventre.
        </p>
        <div className="linkToNext">
          <a href="#13">Chercher un ruisseau</a>
          <a href="#14">Chercher à manger</a>
        </div>
      </div>

      {/* 16 */}
      <div className="containerText" id="16">
        <p>
          Vous continuez à explorer la forêt, vous n'y voyais bientôt plus rien.
          Les bruits environnent vous surprenne et vous font peur. Vous ne
          distinguais plus vos pieds, vous avancez complètement à l'aveugle.
          Votre pied se prend dans une racine, vous trébuchez et vous ouvrez le
          crane sur ce qui semble être un gros cailloux. Des lumières, de
          petites lumières apparaissent ici et là, mais votre vision se
          brouille. Du sang coule sur vos yeux. Ne pas dormir, ne pas dormir, ne
          pas... C'est trop tard, épuisé, frigorifié, vous vous endormez pour la
          dernière fois
        </p>
        <div className="linkToNext">
          <a href="#0">Relancer une partie</a>
          <a href="/">Nul, ce jeu (alt F4)</a>
        </div>
      </div>

      {/* 13 */}
      <div className="containerText" id="13">
        <p>
          Vous vous enfoncez de plus dans la forêt, le soleil passe
          difficilement à travers l'épais feuillage mais vos yeux s'y habitue
          peu à peu. Il vous auras fallu peu de temps pour reconnaitre le
          clapotis de rivière non loin de vous. Vous vous y aventurez et trouvez
          une petite clairière. Un léger cours d'eau se faufile entre les
          rochers. Vous étanchez votre soif. Ca va mieux. Vous profitez de cette
          endroit pour vous assoir 2 minutes. Et réfléchir à votre périple. Vous
          savez qu'il vous faudra passer par les griffes des montagnes
          nuageuses. Ce court d'eau doit surement provenir de ces montagnes.
          Vous ne pouvez pas partir maintenant. Il faut vous préparer un
          minimum.
        </p>
        <div className="linkToNext">
          <a href="#17">Chercher des fruits</a>
          <a href="#18">Poser des pièges</a>
        </div>
      </div>

      {/* 14 */}
      <div className="containerText" id="14">
        <p>
          Vous décider de commencer par combler votre faim. Vous vous aventurez
          dans la forêt. Vous préférer repérer le terrain avant toute chose.
          Mais vous entendez un clapotis non loin de vous. Vous continuer à
          inspecter le terrain avant de vous rendre dans une petite clairière
          traversé par un léger court d'eau. Vous vous désaltérer avant de
          reprendre le fil de vos pensées.
        </p>
        <div className="linkToNext">
          <a href="#17">Chercher des fruits</a>
          <a href="#18">Poser des pièges</a>
        </div>
      </div>

      {/* 17 */}
      <div className="containerText" id="17">
        <p>
          Vous ne voulez pas vous embêté à poser des pièges et préférer chercher
          si il n'y aurait pas des fruits. Vous êtes dans une forêt tout de
          même. Vous finissez par trouver un bananier. Vous n'avez pas encore vu
          d'autres fruits.
        </p>
        <div className="linkToNext">
          <a href="#19">Monter à l'arbre</a>
          <a href="#20">Passer votre chemin</a>
        </div>
      </div>

      {/* 20 */}
      <div className="containerText" id="20">
        <p>
          Vous commencez à fatiguez mais finissez par trouver plusieurs arbustes
          fruitiers. Vous ne connaissez pas ces fruits mais ils semblent
          appétissants.
        </p>
        <div className="linkToNext">
          <a href="#21">Manger</a>
          <a href="#22">Retourner à la clairière</a>
        </div>
      </div>

      {/* 21 */}
      <div className="containerText" id="21">
        <p>
          Vous mangez les fruits, ils sont succulents. Fruités à souhaits et
          légèrement acides. Tout se passe bien. Vous en mangez plein et en
          mettez dans vos poches pour demain. De retour à la clairière vous vous
          accordez un peu de repos et plongez dans un profond sommeil. Vous êtes
          réveillé à l'aube par un cri strident. Pas le temps ni l'envie
          d'enquêter. Vous vous remettez en route. Direction la source du cours
          d'eau. Sur votre route, d'autres baies vous attendent, vous n'en faite
          qu'une bouchée.
        </p>
        <div className="linkToNext">
          <a href="#XX">XXX</a>
          <a href="#XX">XXX</a>
        </div>
      </div>

      {/* 22 */}
      <div className="containerText" id="22">
        <p>
          Vous n'avez pas mangez, votre ventre vous fait mal mais vous êtes trop
          faible pour poser des pièges et avec quoi de toute façon ? Vous buvez
          l'eau clair pour combler se vide et faite une pause. Vous ne pouvez
          pas repartir ainsi, il vous faut trouver quelque chose à grignoter.
        </p>
        <div className="linkToNext">
          <a href="#23">Manger de l'écorce</a>
          <a href="#24">Continuer à chercher</a>
        </div>
      </div>

      {/* 24 */}
      <div className="containerText" id="24">
        <p>
          Vous vous sentez trop faible pour creusez un trou et attendre qu'un
          lapin tombe dedans. Sans promesse de réussite, c'est définitivement
          une mauvaise idée. Vous décidez de continuer à chercher des fruits en
          remontant le cours d'eau. Vous apercevez une bananier.
        </p>
        <div className="linkToNext">
          <a href="#19">Monter à l'arbre</a>
          <a href="#25">Passer votre chemin</a>
        </div>
      </div>

      {/* 25 */}
      <div className="containerText" id="25">
        <p>
          C'est trop haut et les forces vous manques. Vous continuez votre
          chemin et a boire pour ne plus ressentir votre ventre vide. La chance
          vous sourit enfin en fin de journée. Des arbustes fruités rempli se
          présentes à vous. Vous dévorer tous les fruits. Il n'en reste plus un
          seul.
        </p>
        <div className="linkToNext">
          <a href="#XX">XXX</a>
          <a href="#XX">XXX</a>
        </div>
      </div>

      {/* 23 */}
      <div className="containerText" id="23">
        <p>
          Miam, c'est croquant mais pas fondant. Je suis vraiment pas sûr de la
          qualité nutritive. En vrai c'est un peu con non ? Tient une fourmi
          derrière ce bout d'écorce. Vous l'écrasez avec votre tête. Ca fait
          mal. Vous allez bien ? Pas sûr. Les couleurs sont inversées, les
          formes deviennent toutes des bulles, vous sentez la terre tournée…
        </p>
        <div className="linkToNext">
          <a href="#26">Vous battre contre un ours</a>
          <a href="#27">Devenir un poisson</a>
        </div>
      </div>

      {/* 26 */}
      <div className="containerText" id="26">
        <p>
          Un ours ! Vous attaquez, il esquive, vous vous ramassez lamentablement
          parterre. Vous roulez sur le côté et attrapez une branche que vous lui
          envoyez en plein museau. Il est aveuglé, vous en profitez pour lui
          sauter dessus, vous lui mordez l'oreille mais il vous repousse. Vous
          vous rattrapez et invoquez le pouvoir de l'amitié pour lui envoyer un
          Kamé Hamé Ha. L'ours se désintègre en petits canards en plastique.
          Vous avez gagnez et devenez la nouvelle ballerine du royaume des
          écrevisses. Vous passez à la cérémonie des remises de prix. Mais
          tombez de la table. Vous vous réveillez quelques heures plus tard dans
          un buisson. Vous avez des égratignures et une dent en moins (évitez de
          sourire trop fort). Vous reprenez votre chemin et trouvez des buissons
          de fruits en fin de journée. Vous les mangez tous, ils sont
          succulents.
        </p>
        <div className="linkToNext">
          <a href="#XX">XXX</a>
          <a href="#XX">XXX</a>
        </div>
      </div>

      {/* 19 */}
      <div className="containerText" id="19">
        <p>
          Vous montez à l'arbre sans trop d'encombre. Arrivé à la cime, vous
          commencez à détacher des grappes de bananes et les jetez dans un
          buisson en contre bas pour amortir leurs chutes. Vous mettez
          finalement sur une banane qui gigote. Un serpent !
        </p>
        <div className="linkToNext">
          <a href="#28">Le jeter</a>
          <a href="#29">Le lâcher</a>
        </div>
      </div>

      {/* 31 */}
      <div className="containerText" id="31">
        <p>Vous êtes mort. Dead. Finito. Kaput. Crevé quoi... (feur)</p>
        <div className="linkToNext">
          <a href="#0">Relancer une partie</a>
          <a href="/">Nul, ce jeu (alt F4)</a>
        </div>
      </div>

      {/* 27 */}
      <div className="containerText" id="27">
        <p>
          Bloup bloup! Bloup bloup bloup, bloup bloup. Bloup bloup, bloup bloup
          bloup, bloup bloup. Bloup bloup bloup bloup bloup bloup bloup bloup
          bloup bloup bloup bloup! Bloup bloup ? Bloup bloup, bloup bloup, bloup
          bloup bloup bloup bloup bloup, bloup bloup. Vous vous êtes éclaté la
          tête sur un rocher dans la rivière.
        </p>
        <div className="linkToNext">
          <a href="#0">Relancer une partie</a>
          <a href="/">Nul, ce jeu (alt F4)</a>
        </div>
      </div>

      {/* 28 */}
      <div className="containerText" id="28">
        <p>
          Vous tentez de jeter le serpent mais sa queue est toujours enroulé
          autour d'une branche. Vous avez un fort mouvement de recule. Et tombez
          à la renverse. Aïe! Votre dos vous fait mal, vous essayez de bouger
          mais impossible. Vous criez à l'aide. Rien. Pas un bruit si ce n'est
          les oiseaux qui viennent de s'enfuir. Jetez un dé 20.
        </p>
        <div className="linkToNext">
          <a href="#30">Résultat entre 1 et 10</a>
          <a href="#31">Résultat entre 11 et 20</a>
        </div>
      </div>

      {/* 29 */}
      <div className="containerText" id="29">
        <p>
          Vous lâchez le serpent. Il vous attaque et vous mort le nez. Vous
          arrivez à redescendre avec difficulté. Les couleurs sont inversées,
          les formes deviennent toutes des bulles, vous sentez la terre tournée…
        </p>
        <div className="linkToNext">
          <a href="#26">Vous battre contre un ours</a>
          <a href="#27">Devenir un poisson</a>
        </div>
      </div>

      {/* 18 */}
      <div className="containerText" id="18">
        <p>
          Huuuuuum! Comment poser des pièges ? Pas de fil de fer. Pas de pelle.
          Huuuuuuuuuuuuuuuuuuuuuuuuuuum!!!! Bah vous allez créer une lance. Ah
          bah non, vous avez pas de couteau. Tailler une branche sur un
          cailloux? Long. Et après vous avez pas de feu. Bon du coup les fruits
          c'est bien. Vous finissez par trouver un bananier. Vous n'avez pas
          encore vu d'autres fruits.
        </p>
        <div className="linkToNext">
          <a href="#19">Monter à l'arbre</a>
          <a href="#20">Passer votre chemin</a>
        </div>
      </div>

      {/* 3 */}
      <div className="containerText" id="3">
        <p>
          Vous vous avancez de plus en plus profondément dans l'immensité de la
          forêt. Les minutes deviennent des heures, votre vision s'habitue peu à
          peu à l'obscurité ambiante. Vous avez perdu la notion du temps. Au
          loin, vous remarquez de petits points lumineux. Vous vous en
          approchez. De petits bruits vous parvienne. Vous vous en approchez.
          Plus aucun bruit. Plus de lumière. Une lumière seule s'approche de
          vous. Un nain de jardin. "Bonsoir voyageur. Qu'est ce qui vous amène
          par ici ?"
        </p>
        <div className="linkToNext">
          <a href="#31">Je suis à la recherche de la page perdu</a>
          <a href="#32">Mes pieds (lol)</a>
        </div>
      </div>

      {/* 32 */}
      <div className="containerText" id="32">
        <p>
          "Tu te fous de ma gueule petit con? Pétez lui les rotules les gars!"
          Une horde de nain de jardin enragée vous saute dessus. Vous croulez
          sous leurs poids. Vous avez du mal à respirer. Vous sombrez peu à peu
          dans les vapes. Vous vous réveillez dans une grande marmite avec une
          pomme dans la bouche. Vous essayez de partir mais de larges cordes
          vous retiennent. Un nain avec une épée gonflable commence à faire une
          danse autour de la marmite. Celui qui semble être leurs chef commence
          à faire un discours. Vous vous retrouvez avec une pluie de huit
          fourchette qui s'abattent sur vous. Vous crachez votre pomme.
        </p>
        <div className="linkToNext">
          <a href="#33">S'adresser aux nains</a>
          <a href="#34">Ronger les cordes</a>
        </div>
      </div>

      {/* 34 */}
      <div className="containerText" id="34">
        <p>
          Vous attraper l'une des cordes et commencez à la ronger. Vous sentez
          l'eau se réchauffer. Vite, plus vite. La première corde saute mais il
          en reste encore 3. Le fond de la marmite devient brulant. Une deuxième
          corde vient de rompre. Les nains commencent à vous jeter des fruits et
          des légumes. Vous réussissez à couper les troisième corde. Vous
          réussissez à couper la troisième corde. En vous débâtant un peu vous
          finissez par vous libérer de vos chaines. Vous faites tomber la
          marmite sur le côté. Mais vous êtes toujours pieds et poings liés.
        </p>
        <div className="linkToNext">
          <a href="#35">S'enfuir en sautillant</a>
          <a href="#36">Péter la gueule aux nains</a>
        </div>
      </div>

      {/* 35 */}
      <div className="containerText" id="35">
        <p>
          Vous essayez de vous enfuir mais les nains vous rattrapes. Vous
          croulez une nouvelle fois sous leurs poids. Cette fois vous n'y
          échapperez pas, certes la viande est plus tendre quand l'invité n'est
          pas encore mort dans la casserole mais si il s'enfuit y'a plus de
          viande du tout.
        </p>
        <div className="linkToNext">
          <a href="#0">Relancer une partie</a>
          <a href="/">Nul, ce jeu (alt F4)</a>
        </div>
      </div>

      {/* 36 */}
      <div className="containerText" id="36">
        <p>
          Les nains vous foncent dessus. Vous en attrapez un avec votre bouche
          et le mordais jusqu'à ce qu'il éclate. Cela ne freine pas les autres
          qui commencent à vous donner de petits coups de lances. Ca pique, ça
          pique très fort même. Vous roulez sur le côté mais ils vous
          surpassent. Vous vous retrouvez de nouveau ligoté mais cette fois pas
          le temps de tergiversé. un groupe vous lance une grosse pierre en
          plein sur la tête depuis le haut d'un arbre.
        </p>
        <div className="linkToNext">
          <a href="#0">Relancer une partie</a>
          <a href="/">Nul, ce jeu (alt F4)</a>
        </div>
      </div>

      {/* 33 */}
      <div className="containerText" id="33">
        <p>
          Il vous reste peu de temps. Le fond de la marmite va bientôt vous
          cramer le cul. Les nains arborent des peinture sur leurs joues. Des
          cercles de toutes les couleurs. Vous entamez votre discours.
        </p>
        <div className="linkToNext">
          <a href="#37">Rebellez vous</a>
          <a href="#38">Avoir une vision</a>
        </div>
      </div>

      {/* 37 */}
      <div className="containerText" id="37">
        <p>
          "Rebellez vous, vous je suis venu en ami, on ne fait pas cuire ses
          amis même quand ils font des blagues nulles. Frères nains arrêtez
          cette cuisson et je aiderais de la meilleure des façon. Je vous
          apporterais à manger, autant que vous le souhaitez."" Le chef
          s'adresse à vous. "Nous ne manquons pas de nourriture. Ces bois ne
          sont pas très prolifiques mais les tribus naines on su cultiver les
          buissons fruitiers." Le fond de la marmite commence à ce réchauffer.
        </p>
        <div className="linkToNext">
          <a href="#39">Je vous apporterais de la viande</a>
          <a href="#40">Je vous protègerais</a>
        </div>
      </div>
    </main>
  );
};

export default Custom404;

// {/* 3 */}
// <div className="containerText" id="3">
//   <p></p>
//   <div className="linkToNext">
//     <a href="#"></a>
//     <a href="#"></a>
//   </div>
// </div>
