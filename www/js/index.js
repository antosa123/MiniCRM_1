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
 var confDB = {
    existe_db:"",
    db:"",
    initialize: function(){
    //abrir base de datos
    this.db=window.openDatabase("localDB","1.0","Base de datos miniCRM",2*1024*1024);
    this.existe_db=window.localStorage.getItem("existe_db");
        if(this.existe_db==null){
            console.log("No existe Base de Datos");
            this.createDB();
        }
    },

    createDB:function(){
        console.log("Creamos la base de datos");
        //transaccion
        this.db.transaction(this.createLocalDB,this.createDBError,this.createDBSucc);
    },

    createLocalDB:function(tx){
        var sql="CREATE TABLE IF NOT EXISTS localDB ("+
            "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
            "nombre VARCHAR(50), "+
            "apellido VARCHAR(256), "+
            "cargo VARCHAR(256), "+
            "ciudad VARCHAR(128), "+
            "email VARCHAR(64) );";

        tx.executeSql(sql);

        //Insertamos valores de ejemplo
        var insert1="INSERT INTO localDB(nombre, apellido, cargo, ciudad, email)"+
            " VALUES('Jose', 'Ortiz', 'Desarollador', 'Bilbao', 'josort@mail.com')";
        tx.executeSql(insert1);

        var insert2="INSERT INTO localDB(nombre, apellido, cargo, ciudad, email)"+
            " VALUES('Mark', 'Zuckerberg','Panadero', 'Nueva York', 'markitos@baker.com')";   
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
       
       //lanzamos la config de la base de datos
        confDB.initialize();

     //alerta de arranque 
        navigator.notification.alert(
            'Alerta de arranque',  // message
            this.alertDismissed,         // callback
            'Arranque',            // title
            'Perfecto'                  // buttonName
        );

    },
    alertDismissed:function()  {
            // do something
        }

};

app.initialize();