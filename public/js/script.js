function AddProfile(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.reg_profile_pic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
function openChat(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
  
  // Get the element with id="defaultOpen" and click on it

  // for socket.io
    const socket = io('http://localhost:3000');
    var loggedin_user_id = $('#logged_in_user_id').val();
    
    socket.on('chat-message'+loggedin_user_id,data =>{
        console.log(data);
        appendFriendMessage(data.message,data.from_id);
    });  
    
    socket.on('typing-status'+loggedin_user_id,data_typing =>{
        console.log(data_typing);
        displayTypingStatus(data_typing.message,data_typing.from_id)
    });  

    function subMessage(id,from_id){             
        var from_id = from_id;
        var message = $('#txt_msg'+id).val();       
        socket.emit('send-chat-msg',{'message':message,'to_id':id,'from_id':from_id});
        appendMessage(message,id);
    }

    function appendMessage(msg,id){
        var txt = '<div class="me_reply">'+                  
                    '<div>'+msg+'</div>'+
                    '<img src="/images/profile1.jpg"  alt="profile pic" />'+
                   '</div>';
        $('#messages'+id).append(txt);
        $('#txt_msg'+id).val('');    
    }

    function appendFriendMessage(msg,from_id){
        var txt =   '<div class="frnd_rply">'+ 
                        '<img src="/images/profile1.jpg"  alt="profile pic" />'+                 
                        '<div>'+msg+'</div>'+                        
                    '</div>';       

        $('#messages'+from_id).append(txt);
        $('#typing_status'+from_id).html('');
    }

    function showStatusTyping(elm,to_id,from_id,from_name){
        var inp_val = $(elm).val();
        if(inp_val.length > 0){
            var typing_message = from_name+' is typing ...';
        }else{
            var typing_message = ' ';
        }
        
        socket.emit('send-typing-status',{'message':typing_message,'to_id':to_id,'from_id':from_id})
    }
    
    function displayTypingStatus(msg,from_id){
        $('#typing_status'+from_id).html(msg);
        var inp_val = $('#txt_msg'+from_id).val();        
    }


