import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet , TextInput  , Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase' 
import db from '../config'

export default class TransactionScreen extends React.Component{
    constructor (){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedBookId: '',
            scannedStudentId: '',
            buttonState: 'normal'
            transactionMessage : ''

        }
    }
    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: 'clicked',
            scanned: false
        })
    }

    handleBarCodeScanned = async({type , data})=>{
      const{buttonState} = this.state

      if(buttonState === "BookId"){
          this.setState({
            scanned: true,
            scannedData:data,
            buttonstate: 'normal'
        });
    }
    else if(buttonState === "StudentId"){
      this.setState({
        scanned:true,
        scannedStudentId:data,
        buttonState: 'normal'
      })
    }
  }

  initiateBookIssue = async ()=>{
    db.collection("transaction").add({
      'studentId' : this.state.scannedStudentId,
      'bookId': this.state.scannedBookId,
      'data' : firebase.firetore.Timestamp.now().toData(),
      'transactiontype :"Issue'
    })

    db.collection("books").doc(this.state.scannedBookId).update({
      'bookAvailability' : false
    })

    db.collection("students").doc (this.state.scannedStudentId).update({
      'numberOfBooksIssued' : false
    })
  this.setState({
    scannedStudentId : '',
    scannedBookId : ''
  })
}

     initiateBookReturn = async ()=>{
       db.collection("transactions").add({
         'studentid' : this.state.scannedStudentId,
         'bookId' : this.state.scannedBookId,
         'date' : firebase.firestore.Timestamp.now().toDate(),
         'transactiontype' : "Return"
       })

       db.collection("books").doc(this.state.scannedBookId).update({
        'bookAvailability' : true
      })
  
      db.collection("students").doc (this.state.scannedStudentId).update({
        'numberOfBooksIssued' : firebase.firestore.FieldValue.increment(-1)
      })

    this.setState({
      scannedStudentId : '',
      scannedBookId : ''
    })
       
     }

     handleTransaction = async()=>{
       var transactionMessage = null;
       db.collection("books").doc(this.state.scannedBookid).get()
       .then((doc)+
     }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
  
        if (buttonState === "clicked" && hasCameraPermissions){
          return(
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          );
        }
  
        else if (buttonState === "normal"){
          return(
            <View style={styles.container}>
              <View>
                <Image
                source={require("../assets/booklogo.jpg")}
              style={{width:200, height:200}}/>
              <Text style= {{textAllign: 'center', fontSize: 30}}>Willy</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput 
                style={styles.inputbox}
                placeholder="Book Id"
                value={this.state.scannedBookId}/>
                <TouchableOpacity
                style={styles.scanButton}
                onPress={()=>{
                  this.getCameraPermissions("BookId")
                }}>
                  <text style={styles.buttonText}>scan</text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
                <TextInput
                style={styles.inputBox}
                placeholder="Student Id"
                value={this.state.scannedStudentId}/>
                <TouchableOpacity
                style={styles.scanButton}
                onPress={()=>{
                  this.getCameraPermissions("StudentId")
                }}>
                  <Text style={styles.buttonText}>Scan</Text>
                </TouchableOpacity>
              </View>
  
            
          </View>
          );
        }
      }
    }
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
      },
      scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
      buttonText:{
        fontSize: 15,
        textAllign: 'center',
        marginTop:10 
      },
      inputView:{
        flexDirection: 'row',
        margin:20
      },
      inputbox:{
        eidth:200,
        height:40,
        boderWidth:1.5,
        borderRightWidth:0,
        fontSize: 20
      },
      scanBotton:{
        backgroundColor:'#66BB6A',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0
      }


    });