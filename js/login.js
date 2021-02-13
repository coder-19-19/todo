$(document).ready(()=>{

    // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBe6gnjVV6qRs-M7vg4mzRrrEeCdsd_H9o",
    authDomain: "todo-c1226.firebaseapp.com",
    projectId: "todo-c1226",
    storageBucket: "todo-c1226.appspot.com",
    messagingSenderId: "258011857637",
    appId: "1:258011857637:web:8de91420570f6165dc8a0c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged((user) => {
    if(!user){
        $('#login').click(() => {
          const email = $('#email').val()
          const password = $('#password').val()
        
          firebase.auth().signInWithEmailAndPassword(email,password).then(() =>{
            window.location.href = 'index.html'
          }).catch((error) => {
            alert('Email və şifrə uyğunlaşmır')
          })
        })
      }
      else{
        window.location.href = 'index.html'
      }
  })
})

  
