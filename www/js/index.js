/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
  var cargarDB = {
     db:"",
     initialize: function(){
          //Generamos el conector
          this.db=window.openDatabase("localDB","1.0","Base de datos miniCRM",2*1024*1024);
          this.cargaDB();
        },
        cargaDB:function(){
             console.log("Cargar la base de datos");
                //transaccion
            this.db.transaction(this.mostrarDB,this.mostrarDBError);
      },
       mostrarDB:function(tx){
            var sql="SELECT * FROM contactos ORDER BY ultimos DESC;";
            console.log("Lanzamos la consulta");
             tx.executeSql(
                sql,
                [],
                //funcion de resultado OK
                function(tx,result){
                    console.log("Se ha realizado la consulta con éxito");
                    if(result.rows.length>0){
                        for (var i=0;i<result.rows.length;i++){
                            var fila=result.rows.item(i);
                            //actualizaría automaticamente mi html
                            
                            console.log("ROW "+i+" nombre: "+fila.nombre);
                           
                            $("#listaContactos ul").append("<li><a href='detallesAdri.html' data-ajax='false'><img src='./img/paco.png' class='imagenLista'><div class='nombreLista'>"+fila.nombre+"</div><div class='profesionLista'>"+fila.cargo+"</div></a></li>").listview('refresh');
                            /*$("#listaContactos ul").append("<li><a href='detallesMark.html' data-ajax='false'><img src='./img/rubio.png' class='imagenLista'><div class='nombreLista'>"+fila.nombre+"</div><div class='profesionLista'>panadero</div></a></li>").listview('refresh');*/
                            
                        }
                    }
                },
                //funcion de error
                function(tx,error){
                    this.mostrarDBError(error);
                }
             );
       },
       mostrarDBError:function(err){
        console.log("Se ha producido un al mostrar la base de datos: "+err.code);
        console.log("MENSAJE DE ERROR: "+err.message);
    }
       

  };
 var confDB = {
    existe_db:"",
    db:"",
    initialize: function(){
        //variable existe db
        this.existe_db=window.localStorage.getItem("existe_db");
        console.log("COMPROBANDO BASE DE DATOS");
    //abrir base de datos
    if(this.existe_db!=1){
        console.log("BASE DE DATOS NO DETECTADA");
            
            this.createDB();
            cargarDB.initialize();
        }else{
            console.log("BASE DE DATOS DETECTADA");
            //Base de datos creada
            cargarDB.initialize();
        }
    },


    createDB:function(){
        console.log("Creamos la base de datos");
        //transaccion
        this.db=window.openDatabase("localDB","1.0","Base de datos miniCRM",2*1024*1024);
        this.db.transaction(this.createLocalDB,this.createDBError,this.createDBSucc);
    },

    createLocalDB:function(tx){
        tx.executeSql("DROP TABLE IF EXISTS contactos");

        var sql="CREATE TABLE IF NOT EXISTS contactos ("+
            "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
            "nombre VARCHAR(50), "+
            "apellido VARCHAR(256), "+
            "cargo VARCHAR(256), "+
            "ciudad VARCHAR(128), "+
            "email VARCHAR(64), "+
            "ultimos NUMERIC(1) );";

        tx.executeSql(sql);

        //Insertamos valores de ejemplo
        var insert1="INSERT INTO contactos(nombre, apellido, cargo, ciudad, email,ultimos)"+
            " VALUES('Jose', 'Ortiz', 'Desarollador', 'Bilbao', 'josort@mail.com',1)";
        tx.executeSql(insert1);

        var insert2="INSERT INTO contactos(nombre, apellido, cargo, ciudad, email,ultimos)"+
            " VALUES('Pedro', 'Zuckerberg','Panadero', 'Londres', 'pedro@p.es',0)";   
        tx.executeSql(insert2);   

        var insert2="INSERT INTO contactos(nombre, apellido, cargo, ciudad, email,ultimos)"+
            " VALUES('Jorge', 'Zuckerberg','Maestro', 'Madrid', 'george@ggg.com',0)";   
        tx.executeSql(insert2); 

        var insert2="INSERT INTO contactos(nombre, apellido, cargo, ciudad, email,ultimos)"+
            " VALUES('Pablo', 'Zuckerberg','Dependiente', 'Valencia', 'pablo_22@hh.es',1)";   
        tx.executeSql(insert2); 

        var insert2="INSERT INTO contactos(nombre, apellido, cargo, ciudad, email,ultimos)"+
            " VALUES('Adrian', 'Zuckerberg','Abogado', 'Cali', 'adri_90@jiji.com',1)";   
        tx.executeSql(insert2); 

        var insert2="INSERT INTO contactos(nombre, apellido, cargo, ciudad, email,ultimos)"+
            " VALUES('Gonzalo', 'Zuckerberg','futbolista', 'Shangai', 'gonzi@gmail.com',0)";   
        tx.executeSql(insert2); 


    },
    createDBError:function(err){
        console.log("Se ha producido un error en la creación de la base de datos: "+err.code);

    },
    createDBSucc:function(){
        console.log("Se ha generado la base de datos con éxito");
        window.localStorage.setItem("existe_db",1);
    }

};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       

     //alerta de arranque 
        navigator.notification.alert(
            'Alerta de arranque',  // message
            this.alertDismissed,         // callback
            'Arranque',            // title
            'Perfecto'                  // buttonName
        );

        //lanzamos la config de la base de datos
        confDB.initialize();
    },
    alertDismissed:function()  {
            // do something
        }

};

app.initialize();