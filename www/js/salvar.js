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

 var nombre="";
 var cargo="";
 var ciudad="";
 var facebook="";
 var twitter="";

 function insertaDatos(tx){
 	//insertamos valores de ejemplo
 	sql="INSERT INTO contactos(nombre, apellido, cargo, ciudad, email)"+ 
 	" VALUES('"+nombre+"', '"+cargo+"', '"+ciudad+"', '"+facebook+"', '"+twitter+"')";
        tx.executeSql(sql);
      console.log("ROW INSERT: "+sql);  
 };

 function mostrarDBErrorSalvar(err){
 	console.log("Se ha producido un error en la busqueda de la base de datos: "+err.code);
 	console.log("MENSAJE DE ERROR: "+err.message);

 };

 $("#salvar").click(
 				function(event){
 					console.log("NUEVO ELEMENTO DE LA LISTA");
 					nombre=$("#nombre").val();
 					cargo=$("#cargo").val();
 					ciudad=$("#ciudad").val();
 					facebook=$("#fb").val();
 					twitter=$("#twitter").val();


 					//conexion con la base de datos
 					db = window.openDataBase("localDB","1.0","Base de datos miniCRM",2*1024*1024);
 					db.transaction(
 						insertaDatos,
 						mostrarDBErrorSalvar
 						);				
 				}
 	);
