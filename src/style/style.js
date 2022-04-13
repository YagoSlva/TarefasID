import { StyleSheet, Dimensions } from "react-native";


const styles = StyleSheet.create({
    app: {
      paddingTop: "1%",
      backgroundColor: '#0B3B59',
      width: "100%",
      height: "100%"
    },
    inputData: {
      width: 80,
      
    },
    txtPrazo: {
      marginTop: '3%',
      backgroundColor: '#115D8C',
      //borderRadius: 5,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginLeft: '2%',
      marginRight: '2%',
      fontSize: 12,
      textAlign: 'center',
      fontWeight: "400",
      color: "#F0F1F2",
    },
    data: {
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      marginLeft: '2%',
      marginRight: '2%',
      backgroundColor: '#115D8C',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center'
    },
    txtnomeApp: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#F0F1F2",
      marginTop: '3%',
      marginLeft: '25%',
  
      /*
      textAlign: "center",
      flex: 1,
      fontFamily: "Open Sans",
      fontSize: 30,
      fontWeight: "bold",
      color: "#F0F1F2",
      flexDirection: "column",
      alignItems: "center",*/
    },
    txtAdcTarefa: {
      fontSize: 18,
      fontWeight: "600",
      color: "#F0F1F2",
      textAlign: "center",
    },
    nomeApp: {
      marginTop: '5%',
      marginBottom: '5%',
      flexDirection: "row",
      justifyContent: "space-between"
    },
    iconapp : {
      width: 50,
      height: 50,
      marginRight: '20%',
      marginLeft: '20%',
    },
    formTarefa: {
      
      //flexDirection: "column",
      
    },
    inputs: {
      textAlign: 'center',
      backgroundColor: '#115D8C',
      borderRadius: 5,
      paddingLeft: 25,
      marginTop: '3%',
      marginLeft: '2%',
      marginRight: '2%',    
    },
    tarefa: {
      marginTop: '3%',
      marginLeft: '2%',
      marginRight: '2%',
      borderRadius: 5,
      backgroundColor: '#90EE90',
      flex: 1,
      flexDirection: "column"
    },
    tarefaAtrasada: {
      marginTop: '3%',
      marginLeft: '1%',
      marginRight: '1%',
      borderRadius: 5,
      backgroundColor: '#B22222',
      flex: 1,
      flexDirection: "column"
    },
    status: {
      alignItems: "center",
      flex: 1,
      textAlign: "center"
    },
    descricao: {
      marginLeft: '1%',
      marginRight: '1%',
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    descricaoTxt: {
      color: "#F0F1F2",
      fontSize: 16,
      fontWeight: "700",
      color: "#F0F1F2",
      marginTop: '3%',
      marginBottom: '3%',
    },
    descTxt: {
      color: "#F0F1F2",
      fontSize: 14,
      fontWeight: "500",
      color: "#F0F1F2",
    },
    tarefaTexto: {
      marginLeft: '1%',
      marginRight: '1%',
      flex: 1,
      flexDirection: "row",
      alignItems: "center"
    },
    areaprazo: {
      marginLeft: '1%',
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    prazo: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
    },
    prioridade: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
    },
    btnImgHide: {
      width: 40,
      height: 40,
      marginLeft: '45%',
      marginRight: '45%',
      marginTop: '3%',
      marginBottom: '3%',
  
  
    },
    btnImgAdc: {
      width: 40,
      height: 40,
      marginTop: '3%',
      marginBottom: '3%',
  
  
    },
    btnImg: {
      width: 40,
      height: 40,
      marginLeft: '17%',
      marginRight: '17%'
    },
    areaBtnForm: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '3%',
      marginBottom: '3%',
  
    },
    areabtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 5,
      paddingRight: 5,
      margin: '03%'
    },
    tarefaBtn: {
      borderRadius: 5,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    }
  
  })

export default styles
