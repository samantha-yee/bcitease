import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

//const FBSDK = require('react-native-fbsdk');
import FBSDK, {
    LoginManager,
    GraphRequest,
    GraphRequestManager,
    AccessToken
} from 'react-native-fbsdk';

export default class APP extends Component<{}>{
    constructor(props){
        super(props);
        
        this._fbAuth = this._fbAuth.bind(this);
    }
    _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
        (result)=>{
            console.log("HI"+result.toString());
        if (result.isCancelled) {
          console.log("Login Cancelled");
        } else {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                //alert(data.accessToken.toString())
                console.log("Token"+data.accessToken.toString());
                var str = data.accessToken.toString();
                this.getMe(data.accessToken);
              }
            )
          console.log("Login Success permission granted:" + result.grantedPermissions);
        
        
        }
      }, function(error) {
         console.log("some error occurred!!");
      })
        
    }
    
    getMe(str) {
    console.log("getme");
        const infoRequest = new GraphRequest(
          '/me',
          {
            parameters: {
              fields: {
                string: 'name,id'
                  // what you want to get
              },
              access_token: {
                string: str // put your accessToken here
              }
            }
          },
          this._responseInfoCallback,
        );

        new GraphRequestManager().addRequest(infoRequest).start();
    }
    
    _responseInfoCallback(error: ?Object, result: ?Object) {
      if (error) {
        console.log("GRAPH ERROR - "+error);
        //alert('Error fetching data: ' + error.toString());
      } else {
          console.log("RESULT- is " + result.name);
          console.log("RESULT- is " + result.id);
          
        //alert('Success fetching data: ' + result.toString());
      }
    }
   
    

    render() {
        return (
            <View style={styles.container}>
                <View >
                    <TouchableOpacity 
                    onPress={this._fbAuth}>
                        <Text>
                            Login to facebook
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});