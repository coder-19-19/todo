$(document).ready(()=>{

    // Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyBe6gnjVV6qRs-M7vg4mzRrrEeCdsd_H9o",
    authDomain: "todo-c1226.firebaseapp.com",
    projectId: "todo-c1226",
    storageBucket: "todo-c1226.appspot.com",
    messagingSenderId: "258011857637",
    appId: "1:258011857637:web:8de91420570f6165dc8a0c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user)=> {
        if(!user){
            const email = $('#email')
            const password = $('#password')
            const username = $('#username')
            const newpassword = $('#newpassword')
            
            $('#register').click(() => {

                if(!username.val()){
                    alert("adi doldurun")
                }
                else if(!email.val()){
                    alert("emaili doldurun")
                }
                else if(!password.val()){
                    alert("sifreni yazin")
                }
                else if(password.val().length < 6){
                    alert('minimum 6 herfli olmalidir sifre')
                }
                else if(!newpassword.val()){
                    alert("ikinci sifreni yazin")
                }
                else if(password.val() !== newpassword.val()){
                    alert('sifreleri uygunlasmir')
                }
             else{
                firebase.auth().createUserWithEmailAndPassword(email.val(),password.val()).then(() => {
                    firebase.auth().signInWithEmailAndPassword(email.val(),password.val()).then(() =>{
                        window.location.href = 'index.html'
                      }).catch((error) => {
                        alert(error)
                      })
                }).catch((error) => {
                    console.log(error)
                })
            }
            })
        }
        else{
            window.location.href = 'index.html'
        }

    })

})
  
