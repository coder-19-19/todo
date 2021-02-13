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
  firebase.initializeApp(firebaseConfig)


  const date = new Date()
  const day = date.getDay() > 9 ? date.getDay() : '0' + date.getDay()
  const month = date.getMonth() > 9 ? date.getMonth() : '0' + date.getMonth()
  const year = date.getFullYear()
  let userId = ''
  let userEmail = ''

  firebase.auth().onAuthStateChanged((user) => {
    const newTodo = $('#newTodo')
    const addTodo = $('#addTodo')
    if(user){
      userId = user.uid
      userEmail = user.email
      $('.navbar-brand').text(userEmail)
      $('#logout').click(() => {
          firebase.auth().signOut()
          .then(() => {
            window.location.href = 'login.html'
          })
      })


      //add todo database
      addTodo.click(() => {
        if(newTodo){
          firebase.database().ref().child('users').child(userId).child('todos').push({
            todo:newTodo.val(),
            complete:false,
            date:day + '/' + month + '/' + year
          })
          newTodo.val('')
        }
      })

      //write todo from database
      const todoRef = firebase.database().ref().child('users/' + userId).child('todos')
      todoRef.on('value', (snapshoot) => {
       const parent = $('.todoList').children('tbody') 
       parent.html('')
        snapshoot.forEach(todo => {
          let todoname = '<td>' +todo.val().todo + '</td>'
          let check = todo.val().complete == true ? 'checked' : ''
          let complete = `<td><input id=${todo.key} class="switchery" type="checkbox" ${check}></td>`
          let date = '<td>' + todo.val().date + '</td>'
          let delBtn = `<td><button data-key=${todo.key} class="btn btn-danger delBtn">Sil</button></td>`
          
          parent.append(`<tr>${todoname + complete + date + delBtn}</tr>`)
        })

        $('.switchery').each(() => {
          new Switchery(this)
        })

        $('.delBtn').click((e) => {
          todoRef.child(e.target.getAttribute('data-key')).remove()
        })
        $('.switchery').on('change',(e) => {
          let name = $("#"+e.target.getAttribute('id')).is(":checked")
          todoRef.child(e.target.getAttribute('id')).child('complete').set(name)
        })
      })
    }
    else{
      window.location.href = 'login.html'
    }
  })

})

  
