import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { saveToken, getToken } from './utils/EncStorage';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // axios.post(`${API_URL}/function/${param}`), {
    //   'data here': 'data here'
    // }, {
    //   headers: {
    //     'x-api-key': 'your_api_key'
    //   }
    // });
    const login = async () => {
      axios.post(`${API_URL}/login`,
        {
          "sessionToken": "1932aa2c-dad7-4caa-a2ca-51b7d08fbc56"
        })
        .then(async (response) => {
          if (response.status == 200) {
            const { apiKey, sessionToken, data } = response.data;
            setMessage(response.data.status + '\nSession token:' + sessionToken.SessionToken
              + '\nAPI key:' + apiKey.ApiKey
            );
            console.log(response);

            await saveToken("API_KEY", apiKey.ApiKey);

            console.log(await getToken("API_KEY"));
          }
        }
        )
        .catch(error => {
          setMessage(error);
        }
        )
    }
    const updateData = async () => {
      axios.put(`${API_URL}/update-user/7E0oYWzhvT5KJKeJ1GGH`,
        {
          "Email": "helijacky12345@gmail.com",
          "EmailVerified": true,
        },
        {
          headers: {
            "x-api-key": await getToken("API_KEY")
          }
        })
        .then(async (response) => {
          if (response.status == 200) {
            setMessage(response.data.status);
            console.log(response);

          }
          else {
            console.log(response);
          }
        }
        )
        .catch(error => {
          console.log(error.response);
        }
        )
    }
    // login();
    updateData();


  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message || 'Loading...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 }
});

export default App;
