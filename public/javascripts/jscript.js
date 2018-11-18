


// Sans cette ligne + l'import de axios.js (2e <script>), this.$http ne fonctionnera pas
Vue.prototype.$http = axios
const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'accueil',
	status: 'false',
	connected: 'false',
    filter: '',
    menu: '',
    myList: [],
	myList2: [],
    Id: '',
	IdCo: '',
	Name: '',
	Description: '',
	Price: '',
	Image: '',
	Mdp:'',
	IdUpd:'',
	MdpUpd:'',
	Sup:'',
	ProdId:'',
	ProdSup:'',
	IdLogin:'',
	MdpLogin:'',
	SearchId:'',
	MdpTrouve:'',
	IdTrouve:''
  },
  created () {
    // Ici, l'utilisation d'une fonction flêchée () => {} plutôt que function () {} est primordial !
    // sans fonction fléchée, this.myList = ... ne fonctionnera pas comme prévu
    this.$http.get('/obj')
      .then(obj => {
        console.log('affichage de ma liste', obj.data.table)
        this.myList = obj.data.table
      })
      .catch(err => {
        console.log('error', err)
      })
  },
  methods: {
    sendNewElement () {
      this.$http.post('/obj', {
        Id: this.Id,
		Mdp: this.Mdp
      })
      .then(() => {
	  	 console.log('ajout a ma liste', this.Id),
        this.myList.push({
          Id: this.Id,
		  Mdp: this.Mdp
        })
		swal({title: "Bravo!",
				  text: "Nouveau compte crée!",
				  icon: "success",
				  button: "Let's go!"})
				.then(
				  this.currentPage='accueil'
				);
      })
    },
	addProduct () {
      this.$http.post('/addpd', {
		Id:this.IdCo,
		Name:this.Name,
		Image:this.Image,
		Description:this.Description,
		Price:this.Price
      })
      .then(() => {
	  	console.log('ajout a ma liste', this.Id),
        this.myList.push({
		Id:this.IdCo,
		Name:this.Name,
		Image:this.Image,
		Description:this.Description,
		Price:this.Price
        })
		swal({title: "Bravo!",
				  text: "Nouveau produit!",
				  icon: "success",
				  button: "Let's go!"})
				.then(
				  this.currentPage='info'
				);
      })
    },
	display_menu : function(){
			var body = document.getElementsByTagName("body")[0];
			(!body.classList.contains("display_menu")) ? body.classList.add("display_menu") : body.classList.remove("display_menu");
		},
	display_drop_menu : function(event){
			
			var target = event.target;
			var parent = target.parentElement;//parent of "target"
				//Rest of your code
		
			var drop_menu = parent.getElementsByClassName("drop_menu")[0];
			var drop_menus = document.getElementsByClassName("drop_menu");
			event.currentTarget.classList.toggle('is-active');

			Array.from(drop_menus).forEach(function(e){
				if(e != drop_menu){
					e.classList.remove("display");
				}
			});
			var lis = document.getElementById("menu").getElementsByTagName("li");
			Array.from(lis).forEach(function(e){
				e.style.marginTop = 0;
			});
			(!drop_menu.classList.contains("display")) ? drop_menu.classList.add("display") : drop_menu.classList.remove("display");
			if(window.innerWidth < 660 && drop_menu.classList.contains("display")) {
				event.target.parentElement.nextSibling.nextSibling.style.marginTop = drop_menu.clientHeight + "px";
			}
		},
		loaded : function(){
        	document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        	this.load = true;
		},	
	toLogin () {
      this.$http.post('/login',{
		IdLogin: this.IdLogin,
		MdpLogin: this.MdpLogin
      }).then(sess => {
		console.log('session', sess.data.test)
		if (sess.data.test) {
				console.log('MARCHE')
				if (this.IdLogin == "toto" ) {
					this.connected='admin'
				}else{
					this.connected='true'
					this.IdCo=this.IdLogin	
				}
				swal({title: "Good job!",
				  text: "You are now connected!",
				  icon: "success",
				  button: "Let's go!"})
				.then(
				  this.currentPage='accueil'
				);
			}
			else{
			console.log('MARCHE pas')
			} 
			if (this.connected == 'false') {
				swal({title: "Bad!",
				  text: "You are not connected!",
				  icon: "success",
				  button: "Let's try again!"})
				.then(
				  this.currentPage='login'
				);
			}
      })
      .catch(err => {
        console.log('error', err)
      })
    },
	toLogout () {
      swal({
		  title: "Are you sure?",
		  text: "Once unconnected it's loo late!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
			this.IdLogin=''
			swal("Poof! You are now disconnected!", {
			  icon: "success",
			})
			.then(
				  this.currentPage='login'
				);
			this.connected='false';
		  } else {
			swal(" So you are not disconnected");
		  }
		});
    },
	readElement () {
      this.$http.get('/obj')
      .then(obj => {
        console.log('affichage de ma liste', obj.data.table)
        this.myList = obj.data.table
      })
      .catch(err => {
        console.log('error', err)
      })
    },
	readElement2 () {
      this.$http.get('/obj2')
      .then(obj2 => {
        console.log('affichage de ma liste', obj2.data.table)
        this.myList2 = obj2.data.table
		console.log('affichage de ma d', this.myList2)
      })
      .catch(err => {
        console.log('error', err)
      })
    },
	readElement3 () {
      this.$http.get('/obj2')
      .then(obj2 => {
        console.log('affichage de ma liste', obj2.data.table)
		this.myList2=[]
		for (var i = 0; i < obj2.data.table.length; i++) {
		  var elem = Object.values(obj2.data.table[i])
		  if (elem[0] == this.IdCo) {
					console.log(elem)
					
					this.myList2.push({
					  Id:elem[0],
					  Name:elem[1],
					  Image:elem[2],
					  Description:elem[3],
					  Price:elem[4]
					})
				}
			}
			console.log('affichage de ma d', this.myList2)
      })
      .catch(err => {
        console.log('error', err)
      })
    },
	readById () {
      this.$http.get('/obj')
      .then(obj => {
	  for (var i = 0; i < obj.data.table.length; i++) {
	  var elem = Object.values(obj.data.table[i])
	  if (elem[0] == this.SearchId) {
				console.log('MARCHE')
				this.status='true'
				console.log(this.status)
				this.IdTrouve =elem[0]
				console.log(this.IdTrouve)
				this.MdpTrouve = elem[1]
				console.log(this.MdpTrouve)	
			}
		}
      })
      .catch(err => {
        console.log('error', err)
      })
    },
	UpdateElement () {
      this.$http.post('/upd', {
	  IdCo: this.IdCo,
	  MdpUpd: this.MdpUpd
      })
      .then(() => {
		for (var i = 0; i < this.myList.length; i++) {
			  var elem = Object.values(this.myList[i])
			  if (elem[0] == this.IdCo) {
					var index=i	
					} 
				}
		console.log('le sup', this.IdCo)
		console.log(index)
		this.myList.splice(index, 1)
		console.log('ajout a ma liste', this.IdCo),
        this.myList.push({
          Id: this.IdCo,
		  Mdp: this.MdpUpd
        })
		swal({title: "Bravo!",
				  text: "Compte miise à jour!",
				  icon: "success",
				  button: "Let's go!"})
				.then(
				  this.currentPage='accueil'
				);
		})
    },
	editProd () {
      this.$http.post('/editPd', {
		ProdId: this.ProdId,
		ProdSup: this.ProdSup,
		Id:this.IdCo,
		Name:this.Name,
		Image:this.Image,
		Description:this.Description,
		Price:this.Price
      })
      .then(() => {
		for (var i = 0; i < this.myList.length; i++) {
			  var elem = Object.values(this.myList[i])
			  if (elem[0] == this.IdCo) {
					var index=i	
					} 
				}
		console.log('le sup', this.ProdId)
		console.log('le sup', this.ProdSup)
		console.log('le sup', this.IdCo)
		console.log(index)
		this.myList.splice(index, 1)
		console.log('le sup', this.ProdId)
		console.log('le sup', this.ProdSup)
		console.log('le sup', this.IdCo)
		console.log('ajout a ma liste', this.IdCo)
        this.myList.push({
			Id:this.IdCo,
			Name:this.Name,
			Image:this.Image,
			Description:this.Description,
			Price:this.Price
        })
		swal({title: "Bravo!",
				  text: "Objet miise à jour!",
				  icon: "success",
				  button: "Let's go!"})
				.then(
				  this.currentPage='prod1'
				);
		})
    },
	supProd () {
       this.$http.post('/del2', {
	  ProdId: this.ProdId,
	  ProdSup: this.ProdSup
      })
      .then(() => {
		 console.log('le sup', this.ProdSup)
		 swal({title: "Bravo!",
				  text: "Supr",
				  icon: "success",
				  button: "Let's go!"})
				.then(
				  this.currentPage='prod1'
				);
			
		})
    },
	SupElement () {
      this.$http.post('/del', {
	  Sup: this.Sup
      })
      .then(() => {
		for (var i = 0; i < this.myList.length; i++) {
			  var elem = Object.values(this.myList[i])
			  if (elem[0] == this.Sup) {
					var index=i	
					} 
				}
		 console.log('le sup', this.Sup)
		 console.log(index)
		 this.myList.splice(index, 1)
		})
    }
  }
})





