/* globals Vue */
;(function () {
  'use strict'

  const template = `
<section  id="liste">
        <ul>
          <li v-for="item in myList">"Id": {{ item.Id }}</li>
		  <li v-for="item in myList">"Mdp":{{ item.Mdp }}</li>
        </ul>
		<button class="btn btn-primary" v-on:click="readElement()">Afficher liste !</button></br>
		<input type="text" v-model="Sup">
		<button class="btn btn-primary" v-on:click="SupElement()">Supprimer compte avec id !</button></br>
		
		<input type="text" v-model="SearchId">
		<button class="btn btn-primary" v-on:click="readById()">rechercher par Id !</button></br>
		<ul v-if="status == 'true'">
            <li>What you searched for
				<ul v-for="item in myList" >
				  <li v-if="item.Id == IdTrouve">"Id": {{ item.Id }}</li>
				  
				  <li v-if="item.Mdp == MdpTrouve">"Mdp":{{ item.Mdp }}</li>
				</ul>
			</li>
        </ul>
		
      </section>
  `

  Vue.component('liste', {
    template: template
  })
})()