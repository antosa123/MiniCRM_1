var OBJETO={
	//propiedades
	numero:0,
	frase:"Andrea",
	//metodo para iniciar
	initialize:function(){
		this.numero=4;
		this.mostrar(this.frase);
		this.mostrar(this.numero);
	},
	mostrar:function(mensaje){
		alert(mensaje);
	}
}

OBJETO.initialize();