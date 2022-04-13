 //Importação do plugin SQLite
import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true); 
SQLite.enablePromise(true);


//Variáveis de conexão/criação do banco de dados 
const database_name = "tarefas.db"; //Nome do banco de dados
const database_version = "1.0"; //Versão do banco de dados
const database_displayname = "DB do app de tarefas"; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

export default class DataBase { 
    conectarDB() {  
        let db;
        return new Promise((resolve) => {    
            console.log("Checando a integridade do plugin ..."); 
            
            SQLite.echoTest().then(() => {        
                console.log("Integridade Ok ...");        
                console.log("Abrindo Banco de Dados ...");        
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;            
                    console.log("Banco de dados Aberto");            
                    db.executeSql('SELECT 1 FROM Tarefas LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                    }).catch((error) =>{
                        console.log("Erro Recebido: ", error);
                        console.log("O Banco de dados não está pronto ... Criando Dados");
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Tarefas (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao VARCHAR(100) NOT NULL, prazo VARCHAR(10), prioridade INTEGER, conclusao VARCHAR(10))');
                        }).then(() => {
                            console.log("Tabela criada com Sucesso");                
                        }).catch(error => {                    
                            console.log(error);                
                        });            
                    });            
                resolve(db);          
            }).catch(error => {           
                console.log(error);          
            });      
        }).catch(error => {        
            console.log("echoTest Falhou - plugin não funcional");      
        });    
    });
    };

    desconectar(db) {  
        if (db) {    
            console.log("Fechando Banco de Dados");    
            db.close().then(status => {        
                console.log("Banco de dados Desconectado!!");      
            }).catch(error => {        
                console.log(error);    
            });  
        } else {    
            console.log("A conexão com o banco não está aberta");  
        } 
    };

    adicionartf(Tarefa) {  
        return new Promise((resolve) => {    
            this.conectarDB().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para inserir um novo produto   
                    tx.executeSql('INSERT INTO Tarefas (descricao, prazo, prioridade, conclusao) VALUES (?, ?, ?, ?)', [Tarefa.descricao, Tarefa.prazo, Tarefa.prioridade, Tarefa.conclusao]).then(([tx, results]) => { 
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

    listartf() {  
        return new Promise((resolve) => {    
            const tarefas = [];    
            this.conectarDB().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT t.id, t.descricao, t.prazo, t.prioridade, t.conclusao FROM Tarefas t', []).then(([tx,results]) => {          
                    console.log("Função de listagem - Consulta completa");          
                    var len = results.rows.length;          
                    for (let i = 0; i < len; i++) {            
                        let row = results.rows.item(i);            
                        console.log(`ID: ${row.id}, Descrição: ${row.descricao}, Prazo: ${row.prazo}, Concluído: ${row.conclusao}`)            
                        const {id, descricao, prioridade, prazo, conclusao } = row;
                        tarefas.push({id,descricao,prazo,prioridade,conclusao});
                    }
                    console.log(tarefas);          
                    resolve(tarefas);
                });
            }).then((result) => {
                this.desconectar(db);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    });
    }

    deletartf(id) {  
        return new Promise((resolve) => {    
            this.conectarDB().then((db) => {      
                db.transaction((tx) => {    
                    //Query SQL para deletar um item da base de dados    
                    tx.executeSql('DELETE FROM Tarefas WHERE id = ?', [id]).then(([tx, results]) => {          
                        console.log(results);          
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.closeDatabase(db);      
                }).catch((err) => {        
                    console.log(err);
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

    concluirtf(id, status) { 
        return new Promise((resolve) => {   
            this.conectarDB().then((db) => {   
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql('UPDATE Tarefas SET conclusao = ? WHERE id = ?', [status, id]).then(([tx, results]) => {          
                    resolve(results);
                });      
            }).then((result) => {        
                  this.closeDatabase(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }
}