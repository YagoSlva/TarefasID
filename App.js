import React, { Component } from "react"
import { View, Text, Button, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native"

import DataBase from "./src/database/DataBase.js"

import Tarefa from './src/Models/Tarefa';

import styles from './src/style/style';



export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: null,
      descricao: null,
      prazo: null,
      dia: null,
      mes: null,
      ano: null,
      prioridade: null,
      conclusao: null,
      textConclusao: "Concluído!",
      styleConcluido: "concluido",
      lista: [],
      btnRemover: "REMOVER",
      btnConcluir: "CONCLUIR",
      displayBtn: 'none',
      displayBtnShow: "flex",

    }

    this.Listartf()
  }
  

  Listartf = () => {
    const banco = new DataBase();
    banco.listartf().then(
      ListaTarefas => {
        this.setState({lista: ListaTarefas})
      }
    )
  }

  Adicionar = (id, descricao, prazo, prioridade, conclusao) => {
    const novaTarefa = new Tarefa(id, descricao, prazo, prioridade, conclusao);
    const banco = new DataBase();
    banco.adicionartf(novaTarefa)
    this.Listartf()
    this.setState({
      descricao: null,
      prazo: null,
      prioridade: null,
      conclusao: null,
      dia: null,
      mes: null,
      ano: null,
      displayBtn: 'none',
      displayBtnShow: 'flex'
    })
  }

  Remover = (id) => {
    const banco = new DataBase();
    banco.deletartf(id)
    this.Listartf()
  }
  
//  tarefaStatus =  "tarefaConcluida";

  tarefaStatus = (status) => {
    //console.log(status)
    switch (status) {
      case "Concluído!":
        var str = '#02735E'
        return str;
        break;
    
      case "Atrasado!":
        var str = '#F27405'
        return str
        break;
      case undefined:
        var str = '#115D8C'
        return str
        break;
    }
    
    
  }

  Concluir = (id, conclusao) => {
    const banco = new DataBase();
    switch (conclusao) {
      case null:
      var status = "Concluído!";
        break;
      case "Concluído!":
      var status = null;
        break;
    }
    banco.concluirtf(id, status);
    this.Listartf()
    
  }

  Atrasado = (prazo, status) => {
    //Invertendo posição dia e mes (DD/MM/AAAA) -> (MM/DD/AAAA)
    var prazoReceb = prazo;
    var diaPrazoReceb = prazoReceb.charAt(0) + prazoReceb.charAt(1);
    var mesPrazoReceb = prazoReceb.charAt(3) + prazoReceb.charAt(4);
    var anoPrazoReceb = prazoReceb.charAt(6) + prazoReceb.charAt(7) + prazoReceb.charAt(8) + prazoReceb.charAt(9);
    const newPrazoMontado = mesPrazoReceb + "/" + diaPrazoReceb + "/" + anoPrazoReceb;
    const newPrazo = new Date(newPrazoMontado);
    const atualData = new Date();
    const strDay = atualData.getDate();
    const strMonth = atualData.getMonth()+1;
    const strYear = atualData.getFullYear();
    var strData = strMonth+"/"+strDay+"/"+strYear
    const newData = new Date(strData);
    
    if (status != "Concluído!") {
      if (newData > newPrazo) { 
        var atraso = "Atrasado!";
        return atraso;
      }
    } else {
      return "Concluído!";
    }
  }

  DisplayForm(){
    this.setState({
      displayBtn: 'flex',
      displayBtnShow: 'none'
    })
  }

  render() {
    return(      
      <View style={styles.app}>
        <View style={styles.nomeApp} >
          <View>
            <Text style={styles.txtnomeApp}>ID Tarefas</Text>
          </View>
          <View>
            <Image
              source={require('./src/img/iconapp.png')}
              style={styles.iconapp}
            />
          </View>
        </View>
        <View style={styles.formTarefa}>
          <Text style={styles.txtAdcTarefa}>Adicionar Tarefa</Text>
          <View style={{display: this.state.displayBtn}}>
            <TextInput value={this.state.descricao} color="#F0F1F2" selectionColor="#F0F1F2" placeholderTextColor="#F0F1F2" onChangeText={(valor) => {this.setState({descricao: valor})}} placeholder="  Descrição" style={styles.inputs}/>
            <Text style={styles.txtPrazo}>Prazo</Text>
            <View style={styles.data}>
              <TextInput value={this.state.dia} maxLength={2} keyboardType="number-pad" color="#F0F1F2" selectionColor="#F0F1F2" placeholderTextColor="#F0F1F2" 
                  onChangeText={
                    (valor) => {
                      this.setState({dia: valor})
                  }} 
                  placeholder="Dia" style={[styles.inputs, styles.inputData]}/>
              <TextInput value={this.state.mes} maxLength={2} keyboardType="number-pad" color="#F0F1F2" selectionColor="#F0F1F2" placeholderTextColor="#F0F1F2" onChangeText={(valor) => {this.setState({mes: valor})}} placeholder="Mês" style={[styles.inputs, styles.inputData]}/>
              <TextInput value={this.state.ano} maxLength={4} keyboardType="number-pad" color="#F0F1F2" selectionColor="#F0F1F2" placeholderTextColor="#F0F1F2" 
                onChangeText={
                    (valor) => {
                    this.setState({ano: valor})
                    }} 
                    placeholder="Ano" style={[styles.inputs, styles.inputData]}/>
            </View>
            <TextInput value={this.state.prioridade} keyboardType="number-pad" color="#F0F1F2" selectionColor="#F0F1F2" placeholderTextColor="#F0F1F2" onChangeText={(valor) => {this.setState({prioridade: valor})}} placeholder="  Prioridade" style={styles.inputs}/>
          <View style={styles.areaBtnForm}>
            <TouchableOpacity 
              onPress={() => 
                {
                  if (this.state.dia == null)
                  {
                    var gdia = new Date().getDate()
                    if (gdia <= 9){
                    var gdia = "0" + gdia
                    this.state.dia = gdia
                    }
                    console.log(gdia)
                    this.state.dia = gdia
                  }
                  if (this.state.mes == null)
                  {
                    var gmes = new Date().getMonth()+1
                    if (gmes <= 9){
                    var gmes = "0"+ gmes
                    }
                    this.state.mes = gmes
                  }
                  if (this.state.ano == null)
                  {
                    var gano = new Date().getFullYear()
                    this.state.ano = gano
                  }
                var dataFull = this.state.dia + "/" + this.state.mes + "/" + this.state.ano
                if (this.state.descricao == null) {
                  Alert.alert(
                    "Campo obrigatório",
                    "Preencha o campo descrição!",
                    [
                      {
                        text: "OK"
                      }
                    ]
                  );
                }
                this.Adicionar(this.state.descricao, dataFull, this.state.prioridade, this.state.conclusao)
                }
                }>
                          <Image
                          source={require('./src/img/plusL.png')}
                          style={styles.btnImgAdc}
                          />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({displayBtn: 'none', displayBtnShow: 'flex'})}>
            <Image
            source={require('./src/img/up.png')}
            style={styles.btnImgAdc}
            />
          </TouchableOpacity>
          
          </View>
        </View>
        <View style={{display: this.state.displayBtnShow}}>
        <TouchableOpacity onPress={() => this.DisplayForm() /*this.setState({displayBtn: 'flex'})*/}>
            <Image
            source={require('./src/img/down.png')}
            style={styles.btnImgHide}
            />
          </TouchableOpacity>
        </View>
        </View>
        
        
        <ScrollView>
          <Text style={styles.txtAdcTarefa}>Lista de Tarefas</Text>
          {
            this.state.lista.map(   
              item => ( 
                
                <View key={item.id} /*{this.tarefaStatus()}*/ style={[styles.tarefa,{backgroundColor: this.tarefaStatus(this.Atrasado(item.prazo, item.conclusao))}]}>
                  <View style={styles.status}>
                      <Text style={styles.descTxt}>{this.Atrasado(item.prazo, item.conclusao)}</Text>
                    </View>
                  <View style={styles.descricao}>
                    <View style={styles.tarefaTexto}>
                      <Text style={styles.descricaoTxt}>{item.descricao}</Text>
                    </View>
                  </View>
                  <View style={styles.tarefaBtn}>
                    <View style={styles.areaprazo}>
                      <View style={styles.prazo}>
                        <Text style={styles.descTxt}>Prazo</Text>
                        <Text style={styles.descTxt}>{item.prazo}</Text>
                      </View>
                      <View style={styles.prioridade}>
                        <Text style={styles.descTxt}>Prioridade</Text>
                        <Text style={styles.descTxt}>{item.prioridade}</Text>
                      </View>
                    </View>
                    <View style={styles.areabtn}>
                      <TouchableOpacity 
                      onPress={() => 
                            {
                              Alert.alert(
                                "Cuidado",
                                "Deseja realmente cancelar?",
                                [
                                  {
                                    text: "Sim",
                                    onPress: () => this.Remover(item.id),
                                  },
                                  {
                                    text: "Não"
                                  }
                                ]
                              );
                              
                            }}>
                        <Image
                        source={require('./src/img/trashL.png')}
                        style={styles.btnImg}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity 
                      onPress={
                        () =>{
                        this.Concluir(item.id, item.conclusao)}}>
                        <Image
                        source={require('./src/img/checkL.png')}
                        style={styles.btnImg}
                        />
                      </TouchableOpacity>
                      </View>
                  </View>
                </View>
              )
            )
          }
        </ScrollView>
      </View>
    )
  }
}


