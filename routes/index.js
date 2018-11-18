var express = require('express');
var router = express.Router();
var fs = require('fs');
var bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var test = "false";



var obj;
fs.readFile('./public/utilisators.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

var obj2;
fs.readFile('./public/produits.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj2 = JSON.parse(data);
});



router.get('/obj', (req, res) => {
	if(req.session.id)
	{
		console.log("You are connected");
	}
  res.json(obj)
})

router.get('/obj2', (req, res) => {
  res.json(obj2)
})
router.post('/obj', (req, res) => {
	bcrypt.hash(req.body.Mdp, 8, function(err, hash) {
			obj.table.push({Id:req.body.Id, Mdp:hash})
			fs.writeFile('./public/utilisators.json',JSON.stringify(obj),function(err){
				if(err) throw err;
			})
			res.send(obj)
			});

})

router.post('/addpd', (req, res) => {
		  obj2.table.push({Id:req.body.Id,
							Name:req.body.Name,
							Image:req.body.Image,
							Description:req.body.Description,
							Price:req.body.Price})
		  fs.writeFile('./public/produits.json',JSON.stringify(obj2),function(err){
			if(err) throw err;
		  })
		res.send(obj2)
})


router.post('/del', (req, res) => {
	for (var i = 0; i < obj.table.length; i++) {
		  var elem = Object.values(obj.table[i]);
		  if (elem[0] == req.body.Sup) {
				var index=i;
				}
			}
	 obj.table.splice(index, 1);
	  fs.writeFile('./public/utilisators.json',JSON.stringify(obj),function(err){
		if(err) throw err;
	  })
	res.send(obj)
})

router.post('/del2', (req, res) => {
	for (var i = 0; i < obj2.table.length; i++) {
		  var elem = Object.values(obj2.table[i]);
		  var eleme = Object.values(req.body);
		  var elem2 = Object.values(req.body.ProdId);
		   var elem3 = Object.values(req.body.ProdSup);
		  console.log("BCRYPT TEST : " + elem[0] +" 2: " +elem[1] + " le tout "+ eleme);
		  console.log("value :" + elem2 +" 2:" +elem3);
		  if (elem[0] == req.body.ProdId && elem[1] == req.body.ProdSup) {
				var index=i;
				}
			}
	console.log("BCRYPT TEST :" + index);
	 obj2.table.splice(index, 1);
	  fs.writeFile('./public/produits.json',JSON.stringify(obj2),function(err){
		if(err) throw err;
	  })
	res.send(obj2)
})




router.post('/upd', (req, res) => {
	for (var i = 0; i < obj.table.length; i++) {
		  var elem = Object.values(obj.table[i]);
		  if (elem[0] == req.body.IdCo) {
				var index=i;
				}
			}
	 obj.table.splice(index, 1);
	 bcrypt.hash(req.body.MdpUpd, 8, function(err, hash) {
			obj.table.push({Id:req.body.IdCo, Mdp:hash})
			fs.writeFile('./public/utilisators.json',JSON.stringify(obj),function(err){
				if(err) throw err;
			})
			res.send(obj)
			});
})

router.post('/editPd', (req, res) => {
	for (var i = 0; i < obj2.table.length; i++) {
		  var elem = Object.values(obj2.table[i]);
		  var eleme = Object.values(req.body);
		  var elem2 = Object.values(req.body.ProdId);
		   var elem3 = Object.values(req.body.ProdSup);
		  console.log("BCRYPT TEST : " + elem[0] +" 2: " +elem[1] + " le tout "+ eleme);
		  console.log("value :" + elem2 +" 2:" +elem3);
		  if (elem[0] == req.body.ProdId && elem[1] == req.body.ProdSup) {
				var index=i;
				}
			}
	console.log("BCRYPT TEST :" + index);
	 obj2.table.splice(index, 1);
	 obj2.table.push({Id:req.body.Id,
							Name:req.body.Name,
							Image:req.body.Image,
							Description:req.body.Description,
							Price:req.body.Price})
	  fs.writeFile('./public/produits.json',JSON.stringify(obj2),function(err){
		if(err) throw err;
	  })
	res.send(obj2)
})

router.post('/login', (req, res) => {
	console.log("DEBUG " + req.body.IdLogin)
	console.log(obj);
	let user;
	try{
		if(typeof req.body.IdLogin != 'string' || !req.body.IdLogin){
			throw new Error("IdLogin non défini")
		}
		if(typeof req.body.MdpLogin != 'string' || !req.body.MdpLogin){
			throw new Error("MdpLogin non défini")
		}
	obj.table.forEach((u) => {
	  if (u.Id == req.body.IdLogin) {
		  user = u;
		  console.log("FOUND USER :" + u);

	  }
	});
	if(user){
		let test = bcrypt.compareSync(req.body.MdpLogin, user.Mdp);
		console.log("BCRYPT TEST :" + test);
		if(test){
			req.session.id = user.Id;
			var sess= req.session.id;
			res.status(200).send({ test,sess});
			console.log("RES");
			console.log(sess);

		}
		else {
			res.status(200).send(test);
		}
	}
	else {
		res.status(500).send();
	}


	}catch(err){
		next(err)
	}
})

module.exports = router;
