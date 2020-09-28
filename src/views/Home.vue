<template>
  <teleport to="#content-header">
    <PageHeader>
      <h1
        class="font-serif text-4xl font-regular leading-tight text-gray-800 text-center"
        id="title"
      >
        Amanda Medeiros de Freitas
      </h1>
    </PageHeader>
  </teleport>
  <div class="px-4 py-8 sm:px-0">
    <div class="bg-white">
      <div class="space-y-12">
        <div
          class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0"
        >
          <!-- Image -->
          <div class="relative pb-2/3 sm:pt-2/3">
            <img
              class="absolute inset-0 object-cover h-full w-full shadow-lg rounded-lg"
              src="../assets/Amanda.jpg"
              alt="Amanda Medeiros de Freitas"
            />
          </div>

          <div class="sm:col-span-2">
            <div class="space-y-4">
              <div class="prose text-gray-500">
                <p>
                  Ultricies massa malesuada viverra cras lobortis. Tempor orci
                  hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas
                  cras. Nisl dictum.
                </p>
                <p>
                  Je m'appelle Amanda, je suis brésilienne et j'ai 30 ans. J'ai
                  un diplôme en génie biomédical et j'ai une maîtrise et un
                  doctorat dans le même domaine. J'ai fait un an de doctorat à
                  Lyon (Centre de Recherche en Neurosciences de Lyon - CRNL), et
                  à cette époque ma passion pour la pâtisserie a augmenté de
                  façon exponentielle. Le enchantement était si grand que j'ai
                  décidé de me lancer dans ce nouveau domaine.
                </p>
                <p>
                  Cependant, il n'est pas facile de recommencer une vie
                  professionnelle à 30 ans. Alors, comme je n'ai toujours pas de
                  formation dans le domaine de la pâtisserie, je suis prêt à
                  commencer par le bas, en aidant au nettoyage ou quelque chose
                  du genre. Par conséquent, je pourrai économiser de l'argent
                  pour démarrer le cours de pâtisserie et me familiariserai avec
                  l'environnement de la pâtisserie. Certaines personnes penset
                  que recommencer est honteaux car il faut accepter que j’ai
                  fait une erreur dans le choix précédent, mais pour moi,
                  recommencer est synonyme d'espoir, espérer que je pourrai
                  encore trouver le bon chemin. J'espère également que ce
                  nouveau départ se fera dans la meilleure boutique de chocolat
                  de Lyon.
                </p>
                <p>
                  Je suis extrêmement dévoué dans tout ce que je fais, en plus
                  d'être très détaillé, je propose donc d'être l'une des
                  meilleures apprentis que vous aurez. Je vous demande
                  humblement cette chance de recommencer.
                </p>
                <p>
                  Restant à votre disposition pour toute information
                  complémentaire, je suis disponible pour vous rencontrer lors
                  d’un entretien à votre convenance.
                </p>
                <p>
                  Veuillez agréer, Madame, Monsieur, l’expression de mes
                  sincères salutations.
                </p>
              </div>
              <ul class="flex space-x-5">
                <li>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                  >
                    <span class="sr-only">Twitter</span>
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                  >
                    <span class="sr-only">LinkedIn</span>
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
</style>