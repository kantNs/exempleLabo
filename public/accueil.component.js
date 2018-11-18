/* globals Vue */
;(function () {
  'use strict'

  const template = `
<section id="accueil">
  <h1>Titre de ma page d'accueil</h1>
  <p>Mon super texte</p>
</section>
  `

  Vue.component('accueil', {
    template: template
  })
})()